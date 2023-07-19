import { injectable } from 'inversify';
import 'reflect-metadata';
import { UserLoginDto } from './dto/user-login.dto';
import { UserRegisterDto } from './dto/user-register.dto';
import { UserEntity } from './user.entity';
import { IUserService } from './user.service.interface';

@injectable()
export class UserService implements IUserService {
  async createUser({
    email,
    name,
    password,
  }: UserRegisterDto): Promise<UserEntity | null> {
    const user = new UserEntity(email, name);
    await user.setPassword(password);
    return null;
  }
  async validateUser(dto: UserLoginDto): Promise<boolean> {
    return true;
  }
}
