import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';

export function getCorsOptions(): CorsOptions {
  const whitelist = {
    local: ['http://127.0.0.1:3000', 'http://localhost:3000'],
    prod: [''],
  };

  return {
    origin: [...whitelist.local, ...whitelist.prod],
    credentials: true,
  };
}
