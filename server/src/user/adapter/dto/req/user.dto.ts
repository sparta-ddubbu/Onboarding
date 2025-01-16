import { ApiProperty } from '@nestjs/swagger';
import { createZodSchema } from 'src/utils/validation/createZodSchema.util';

export class CreateUserReqDto {
  @ApiProperty({
    description: 'The nickname of the user',
  })
  nickname: string;

  @ApiProperty({
    description: 'The password of the user',
    minLength: 6,
  })
  password: string;
}

export const createUserReqDtoSchema = createZodSchema(CreateUserReqDto);
