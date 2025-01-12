import { z } from 'zod';

export const SignUpSchema = z
  .object({
    nickname: z.string().min(1, { message: '닉네임을 입력해주세요' }),
    password: z.string().min(1, { message: '비밀번호를 입력해주세요' }).min(5, '최소 5글자 이상 입력해주세요'),
    passwordConfirm: z.string().min(1, { message: '비밀번호 확인을 입력해주세요' }),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    path: ['passwordConfirm'],
    message: '비밀번호가 일치하지 않습니다.',
  });

export type SignUpSchemaType = z.infer<typeof SignUpSchema>;
