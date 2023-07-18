import { injectable, inject } from 'inversify';
import { Request, Response, NextFunction } from 'express';
import 'reflect-metadata';
import { BaseController } from '../common/base.controller';
import { HTTPError } from '../errors/http-error';
import { TYPES } from '../types';
import { ILogger } from '../logger/logger.interface';
import { IUsersController } from './users.controller.interface';
import { UsersLoginDto } from './dto/users-login.dto';
import { UsersRegisterDto } from './dto/users-register.dto';

@injectable()
export class UsersController
  extends BaseController
  implements IUsersController
{
  constructor(@inject(TYPES.ILogger) private loggerService: ILogger) {
    super(loggerService);
    this.bindRoutes([
      { path: '/register', method: 'post', handler: this.register },
      { path: '/login', method: 'post', handler: this.login },
    ]);
  }

  register(
    req: Request<{}, {}, UsersRegisterDto>,
    res: Response,
    next: NextFunction,
  ): void {
    this.ok(res, 'register');
  }

  login(
    req: Request<{}, {}, UsersLoginDto>,
    res: Response,
    next: NextFunction,
  ): void {
    next(new HTTPError(401, 'auth error', 'login'));
  }
}
