import { injectable, inject } from 'inversify';
import { Request, Response, NextFunction } from 'express';
import 'reflect-metadata';
import { BaseController } from '../common/base.controller';
import { HTTPError } from '../errors/http-error';
import { TYPES } from '../types';
import { ILogger } from '../logger/logger.interface';
import { IUserController } from './user.controller.interface';
import { UserLoginDto } from './dto/user-login.dto';
import { UserRegisterDto } from './dto/user-register.dto';
import { UserEntity } from './user.entity';

@injectable()
export class UserController extends BaseController implements IUserController {
  constructor(@inject(TYPES.ILogger) private loggerService: ILogger) {
    super(loggerService);
    this.bindRoutes([
      { path: '/register', method: 'post', handler: this.register },
      { path: '/login', method: 'post', handler: this.login },
    ]);
  }

  async register(
    { body }: Request<{}, {}, UserRegisterDto>,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    const user = new UserEntity(body.email, body.name);
    await user.setPassword(body.password);
    this.ok(res, user);
  }

  login(
    req: Request<{}, {}, UserLoginDto>,
    res: Response,
    next: NextFunction,
  ): void {
    next(new HTTPError(401, 'auth error', 'login'));
  }
}
