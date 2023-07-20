import { UserModel } from '@prisma/client';
import { inject, injectable } from 'inversify';
import { IUserRepository } from './user.repository.interface';
import { TYPES } from '../types';
import { IPrismaService } from '../database/prisma.service.interface';
import { UserEntity } from './user.entity';

@injectable()
export class UserRepository implements IUserRepository {
  constructor(
    @inject(TYPES.IPrismaService) private prismaService: IPrismaService,
  ) {}

  async create({ email, password, name }: UserEntity): Promise<UserModel> {
    return this.prismaService.client.userModel.create({
      data: { email, password, name },
    });
  }

  async find(email: string): Promise<UserModel | null> {
    return this.prismaService.client.userModel.findFirst({
      where: { email },
    });
  }
}
