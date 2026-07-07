import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';

import { JwtAuthGuard } from '../auth/jwt-auth.guard';

import { CurrentUser } from '../../common/decorators/current-user.decorator';
import type { JwtUser } from '../../common/interfaces/jwt-user.interface';

import { CreateMessageDto } from './dto/create-message.dto';
import { MessagesService } from './messages.service';

@Controller('channels/:channelId/messages')
@UseGuards(JwtAuthGuard)
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @Post()
  create(
    @Param('channelId') channelId: string,
    @CurrentUser() user: JwtUser,
    @Body() createMessageDto: CreateMessageDto,
  ) {
    return this.messagesService.create(
      channelId,
      user.id,
      createMessageDto,
    );
  }

  @Get()
  findAll(@Param('channelId') channelId: string) {
    return this.messagesService.findAll(channelId);
  }
}