import { HttpException, HttpStatus } from '@nestjs/common';
import { ErrorCode } from './error-code';

export type ErrorDomain = 'auth' | 'user';

export class BusinessException extends HttpException {
  public readonly id: string;
  public readonly timestamp: Date;

  constructor(
    public readonly errorCode: ErrorCode,
    public readonly message: string, // 로깅 메시지
    public readonly apiMessage: string, // 사용자 메시지
    status: HttpStatus,
  ) {
    super(
      {
        id: BusinessException.genId(),
        errorCode,
        message,
        apiMessage,
        status,
        timestamp: new Date(),
      },
      status,
    );
    this.id = BusinessException.genId();
    this.timestamp = new Date();
  }

  private static genId(length = 12): string {
    const p = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    return [...Array(length)].reduce((a) => a + p[Math.floor(Math.random() * p.length)], '');
  }
}
