import { Injectable } from '@nestjs/common';
import * as crypto from 'crypto';

import { PrismaService } from '../../prisma/prisma.service';
import { CreateServerDto } from './dto/create-server.dto';

@Injectable()
export class ServersService {
  constructor(private readonly prisma: PrismaService) {}

  async create(userId: string, createServerDto: CreateServerDto) {
    return this.prisma.$transaction(async (tx) => {
      const server = await tx.server.create({
        data: {
          name: createServerDto.name,
          description: createServerDto.description,
          inviteCode: crypto.randomUUID(),
          ownerId: userId,
        },
      });

      await tx.channel.createMany({
  data: [
    {
      name: 'announcements',
      type: 'TEXT',
      serverId: server.id,
    },
    {
      name: 'general',
      type: 'TEXT',
      serverId: server.id,
    },
    {
      name: 'General Voice',
      type: 'VOICE',
      serverId: server.id,
    },
  ],
});

      return server;
    });
  }

  async findAll(userId: string) {
    const memberships = await this.prisma.membership.findMany({
      where: {
        userId,
      },
      include: {
        server: true,
      },
    });

    return memberships.map((membership) => membership.server);
  }
}