import { Injectable } from '@nestjs/common';

import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class ChannelsService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(serverId: string) {
    return this.prisma.channel.findMany({
      where: {
        serverId,
      },
      orderBy: {
        createdAt: 'asc',
      },
    });
  }
}