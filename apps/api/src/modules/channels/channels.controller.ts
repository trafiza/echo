import { Controller, Get, Param, UseGuards } from '@nestjs/common';

import { JwtAuthGuard } from '../auth/jwt-auth.guard';

import { ChannelsService } from './channels.service';

@Controller('servers/:serverId/channels')
@UseGuards(JwtAuthGuard)
export class ChannelsController {
  constructor(private readonly channelsService: ChannelsService) {}

  @Get()
  findAll(@Param('serverId') serverId: string) {
    return this.channelsService.findAll(serverId);
  }
}