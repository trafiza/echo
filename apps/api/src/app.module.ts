import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { HealthModule } from './modules/health/health.module';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { ServersModule } from './modules/servers/servers.module';
import { ChannelsModule } from './modules/channels/channels.module';


@Module({
  imports: [PrismaModule, HealthModule, UsersModule, AuthModule, ServersModule, ChannelsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}