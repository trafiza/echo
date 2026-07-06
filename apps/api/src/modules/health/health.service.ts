import { Injectable } from '@nestjs/common';

@Injectable()
export class HealthService {
  getHealth() {
    return {
      status: 'ok',
      service: 'echo-api',
      version: '0.1.0',
      timestamp: new Date().toISOString(),
    };
  }
}