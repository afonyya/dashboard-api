import { inject, injectable } from 'inversify';
import 'reflect-metadata';
import { UserModel } from '@prisma/client';
import { UserLoginDto } from './dto/user-login.dto';
import { UserRegisterDto } from './dto/user-register.dto';
import { UserEntity } from './user.entity';
import { IUserService } from './user.service.interface';
import { IConfigService } from '../config/config.service.interface';
import { TYPES } from '../types';
import { IUserRepository } from './user.repository.interface';

@injectable()
export class UserService implements IUserService {
  constructor(
    @inject(TYPES.IConfigService) private configService: IConfigService,
    @inject(TYPES.IUserRepository) private userRepository: IUserRepository,
  ) {}

  async createUser({
    email,
    name,
    password,
  }: UserRegisterDto): Promise<UserModel | null> {
    const user = new UserEntity(email, name);
    const salt = Number(this.configService.get('SALT'));
    await user.setPassword(password, salt);
    const existedUser = await this.userRepository.find(email);
    if (existedUser) {
      return null;
    }
    return await this.userRepository.create(user);
  }

  async validateUser(dto: UserLoginDto): Promise<boolean> {
    return true;
  }
}
