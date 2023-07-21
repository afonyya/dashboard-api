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
import { IUserService } from './user.service.interface';
import { ValidateMiddleware } from '../common/validate.middleware';
import { sign } from 'jsonwebtoken';
import { IConfigService } from '../config/config.service.interface';

@injectable()
export class UserController extends BaseController implements IUserController {
  constructor(
    @inject(TYPES.ILogger) private loggerService: ILogger,
    @inject(TYPES.IUserService) private userService: IUserService,
    @inject(TYPES.IConfigService) private configService: IConfigService,
  ) {
    super(loggerService);
    this.bindRoutes([
      {
        path: '/register',
        method: 'post',
        middlewares: [new ValidateMiddleware(UserRegisterDto)],
        handler: this.register,
      },
      {
        path: '/login',
        method: 'post',
        middlewares: [new ValidateMiddleware(UserLoginDto)],
        handler: this.login,
      },
    ]);
  }

  async register(
    { body }: Request<{}, {}, UserRegisterDto>,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    const result = await this.userService.createUser(body);
    if (!result) {
      next(new HTTPError(422, this.configService.get('SECRET')));
    } else {
      this.ok(res, { email: result.email, id: result.id });
    }
  }

  async login(
    { body }: Request<{}, {}, UserLoginDto>,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    const result = await this.userService.validateUser(body);
    if (!result) {
      next(new HTTPError(401, 'auth error', 'login'));
    } else {
      const token = await this.signToken(body.email, 'secret');
      this.ok(res, { token });
    }
  }

  signToken(email: string, secret: string): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      sign(
        { email, iat: Math.floor(Date.now() / 1000) },
        secret,
        { algorithm: 'HS256' },
        (err, token) => {
          if (err) {
            reject(err);
          }
          resolve(token as string);
        },
      );
    });
  }
}
