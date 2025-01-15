import { ApiProperty } from '@nestjs/swagger';

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
