import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
} from '@nestjs/common';

import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CurrentUser } from '../../common/decorators/current-user.decorator';

import { CreateServerDto } from './dto/create-server.dto';
import { ServersService } from './servers.service';

@Controller('servers')
@UseGuards(JwtAuthGuard)
export class ServersController {
  constructor(private readonly serversService: ServersService) {}

  @Post()
  create(
    @CurrentUser() user: any,
    @Body() createServerDto: CreateServerDto,
  ) {
    return this.serversService.create(user.id, createServerDto);
  }

  @Get()
  findAll(@CurrentUser() user: any) {
    return this.serversService.findAll(user.id);
  }
}