import { Request, Response, NextFunction } from 'express';
import { BaseController } from '../common/base.controller';
import { LoggerService } from '../logger/logger.service';

export class UsersController extends BaseController {
  constructor(logger: LoggerService) {
    super(logger);
    this.bindRoutes([
      { path: '/register', method: 'post', handler: this.register },
      { path: '/login', method: 'post', handler: this.login },
    ]);
  }

  register(req: Request, res: Response, next: NextFunction) {
    this.ok(res, 'register');
  }

  login(req: Request, res: Response, next: NextFunction) {
    this.ok(res, 'login');
  }
}
