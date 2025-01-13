import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';

export function getCorsOptions(): CorsOptions {
  const whitelist = {
    local: [/^http:\/\/localhost:\d+$/],
    prod: [''],
  };

  return {
    origin: [...whitelist.local, ...whitelist.prod],
    methods: ['POST', 'PUT', 'DELETE', 'GET'],
    credentials: true,
  };
}
