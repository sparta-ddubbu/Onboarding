import { ArgumentMetadata, BadRequestException, PipeTransform } from '@nestjs/common';
import { ZodTypeAny } from 'zod';

export class RequestBodyValidator implements PipeTransform {
  constructor(private readonly schema: ZodTypeAny) {}

  transform(value: unknown, metadata: ArgumentMetadata) {
    if (metadata.type !== 'body') return value;
    try {
      return this.schema.parse(value);
    } catch (error) {
      const path = error.issues[0].path;
      const message = error.issues ? path[path.length - 1] + '에서 ' + error.issues[0].message : '';
      throw new BadRequestException(message);
    }
  }
}
