import express, { Express } from 'express';
import { Server } from 'http';
import { UsersController } from './users/users.controller';
import { ExeptionFilter } from './errors/exeption.filter';
import { ILogger } from './logger/logger.interface';

export class App {
  app: Express;
  server: Server;
  port: number;
  logger: ILogger;
  exeptionFilter: ExeptionFilter;
  userController: UsersController;

  constructor(
    logger: ILogger,
    exeptionFilter: ExeptionFilter,
    userController: UsersController,
  ) {
    this.app = express();
    this.port = 3000;
    this.logger = logger;
    this.exeptionFilter = exeptionFilter;
    this.userController = userController;
  }

  useRoutes() {
    this.app.use('/users', this.userController.router);
  }

  useExeptionFilters() {
    this.app.use(this.exeptionFilter.catch.bind(this.exeptionFilter));
  }

  public init() {
    this.useRoutes();
    this.useExeptionFilters();
    this.server = this.app.listen(this.port);
    this.logger.log(`Server is running on http://localhost:${this.port}`);
  }
}
