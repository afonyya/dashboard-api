import express, { Express } from 'express';
import { Server } from 'http';
import { LoggerService } from './logger/logger.service';
import { UsersController } from './users/users.controller';
import { ExeptionFilter } from './errors/exeption.filter';

export class App {
  app: Express;
  server: Server;
  port: number;
  logger: LoggerService;
  exeptionFilter: ExeptionFilter;
  userController: UsersController;

  constructor(
    logger: LoggerService,
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
