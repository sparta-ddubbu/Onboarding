import { ZodTypeAny, z, ZodObject } from 'zod';
import 'reflect-metadata';

export const objectIdValidator = z.string().refine((value) => /^[a-fA-F0-9]{24}$/.test(value), {
  message: 'Invalid ObjectId format',
});

/**
 * 특정 클래스의 프로퍼티에 대한 Swagger 메타데이터를 읽어와서
 * 타입과 required 여부 등을 추출한다.
 */
function getPropsWithTypeAndRequiredValueFromSwaggerApiProps(className: any) {
  const properties = Reflect.getMetadata('swagger/apiModelPropertiesArray', className.prototype) || [];

  const info = properties.map((propertyKey: string) => {
    // key에 ':', ';' 등이 붙어오는 경우 제거
    const cleanKey = propertyKey.replace(':', '');

    const metadata = Reflect.getMetadata('swagger/apiModelProperties', className.prototype, cleanKey);
    // 실제 JS 레벨의 생성자 (예: String, Number, Boolean, RewardCondition, ...)
    const metadataType = Reflect.getMetadata('design:type', className.prototype, cleanKey);

    return {
      name: cleanKey,
      type: metadataType,
      required: metadata?.required === undefined || metadata?.required,
      enum: metadata?.enum || null,
    };
  });

  return info;
}

/**
 * getPropsWithTypeAndRequiredValueFromSwaggerApiProps() 로부터
 * 각 프로퍼티 정보를 받아 ZodObject 스키마로 변환한다.
 */
function convertSwaggerApiPropsToZodObject(props: any[]): ZodObject<any> {
  const result = props.reduce(
    (acc, prop) => {
      let zodType: ZodTypeAny;

      // 실제 JS 레벨의 생성자
      const actualType = prop.type;
      // 예: String, Number, Boolean, Array, 혹은 사용자 정의 클래스(RewardCondition 등)

      // 기본 타입 분기
      if (actualType === String) {
        zodType = z.string().nonempty();
      } else if (actualType === Boolean) {
        zodType = z.boolean();
      } else if (actualType === Number) {
        zodType = z.number().int();
      }
      // 혹시 Array 처리가 필요하다면 여기에 분기 추가
      else if (actualType === Array) {
        // TODO: array 내부 요소에 대해서도 재귀적으로 처리할 수 있다면 좋을 듯, 현재는 그냥 any 로 처리
        zodType = z.array(z.any());
      }
      // 위 기본 타입이 아니면, 사용자 정의 클래스라 가정하고
      // 재귀적으로 스키마 생성
      else if (typeof actualType === 'function') {
        zodType = createZodSchema(actualType);
      }
      // 그 외는 일단 any
      else {
        zodType = z.any();
      }

      // enum 이 지정되어 있는 경우
      if (prop.enum) {
        zodType = zodType.refine((value) => prop.enum.includes(value), {
          message: 'Invalid enum value',
        });
      }

      // required 값이 정의되어 있고, false 라면 optional nullable
      if (prop.required !== undefined && !prop.required) {
        zodType = zodType.optional().nullable();
      }

      acc[prop.name] = zodType;
      return acc;
    },
    {} as Record<string, ZodTypeAny>,
  );
  return z.object(result);
}

/**
 * class(예: CreateRewardPackageDto) 을 받아서
 * 1) Swagger 메타데이터 추출
 * 2) ZodObject 변환
 * 을 한 번에 처리하는 편의함수
 */
export function createZodSchema(className: any): ZodObject<any> {
  const props = getPropsWithTypeAndRequiredValueFromSwaggerApiProps(className);
  return convertSwaggerApiPropsToZodObject(props);
}
