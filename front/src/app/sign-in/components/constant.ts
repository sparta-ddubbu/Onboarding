import { z } from 'zod';

export const SignInSchema = z.object({
  nickname: z.string().min(1, { message: '닉네임을 입력해주세요' }),
  password: z.string().min(1, { message: '비밀번호를 입력해주세요' }).min(5, '최소 5글자 이상 입력해주세요'),
});

export type SignInSchemaType = z.infer<typeof SignInSchema>;
