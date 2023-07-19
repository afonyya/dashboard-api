import { inject, injectable } from 'inversify';
import 'reflect-metadata';
import { UserLoginDto } from './dto/user-login.dto';
import { UserRegisterDto } from './dto/user-register.dto';
import { UserEntity } from './user.entity';
import { IUserService } from './user.service.interface';
import { IConfigService } from '../config/config.service.interface';
import { TYPES } from '../types';

@injectable()
export class UserService implements IUserService {
  constructor(
    @inject(TYPES.IConfigService) private configService: IConfigService,
  ) {}

  async createUser({
    email,
    name,
    password,
  }: UserRegisterDto): Promise<UserEntity | null> {
    const user = new UserEntity(email, name);
    const salt = Number(this.configService.get('SALT'));
    await user.setPassword(password, salt);
    return null;
  }

  async validateUser(dto: UserLoginDto): Promise<boolean> {
    return true;
  }
}
