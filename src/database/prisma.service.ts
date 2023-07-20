import { PrismaClient, UserModel } from '@prisma/client';
import { inject, injectable } from 'inversify';
import { IPrismaService } from './prisma.service.interface';
import { TYPES } from '../types';
import { ILogger } from '../logger/logger.interface';

@injectable()
export class PrismaService implements IPrismaService {
  client: PrismaClient;

  constructor(@inject(TYPES.ILogger) private logger: ILogger) {
    this.client = new PrismaClient();
  }

  async connect(): Promise<void> {
    try {
      await this.client.$connect();
      this.logger.log('[PrismaService] successfully connected');
    } catch (error) {
      if (error instanceof Error) {
        this.logger.error(`[PrismaService] сonnection error ${error.message}`);
      }
    }
  }

  async disconnect(): Promise<void> {
    await this.client.$disconnect();
  }
}
