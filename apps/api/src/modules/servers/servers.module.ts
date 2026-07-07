import { Module } from '@nestjs/common';

import { PrismaModule } from '../../prisma/prisma.module';

import { ServersController } from './servers.controller';
import { ServersService } from './servers.service';

@Module({
  imports: [PrismaModule],
  controllers: [ServersController],
  providers: [ServersService],
})
export class ServersModule {}