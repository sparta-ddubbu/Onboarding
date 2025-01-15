import { ApiProperty } from '@nestjs/swagger';

export class SignInReqDto {
  @ApiProperty()
  nickname: string;

  @ApiProperty({ minLength: 6 })
  password: string;
}
