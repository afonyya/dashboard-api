import { inject, injectable } from 'inversify';
import express, { Express } from 'express';
import { Server } from 'http';
import 'reflect-metadata';
import { json } from 'body-parser';
import { UserController } from './user/user.controller';
import { ILogger } from './logger/logger.interface';
import { TYPES } from './types';
import { IConfigService } from './config/config.service.interface';
import { IExeptionFilter } from './errors/exeption.filter.interface';

@injectable()
export class App {
  app: Express;
  server: Server;
  port: number;

  constructor(
    @inject(TYPES.ILogger) private logger: ILogger,
    @inject(TYPES.IUserController) private userController: UserController,
    @inject(TYPES.IExeptionFilter) private exeptionFilter: IExeptionFilter,
    @inject(TYPES.IConfigService) private configService: IConfigService,
  ) {
    this.app = express();
    this.port = 3000;
  }

  useMiddleware(): void {
    this.app.use(json());
  }

  useRoutes(): void {
    this.app.use('/user', this.userController.router);
  }

  useExeptionFilters(): void {
    this.app.use(this.exeptionFilter.catch.bind(this.exeptionFilter));
  }

  public init(): void {
    this.useMiddleware();
    this.useRoutes();
    this.useExeptionFilters();
    this.server = this.app.listen(this.port);
    this.logger.log(`Server is running on http://localhost:${this.port}`);
  }
}
