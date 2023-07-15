import { App } from './app';
import { LoggerService } from './logger/logger.service';
import { ExeptionFilter } from './errors/exeption.filter';
import { UsersController } from './users/users.controller';

async function bootstrap() {
  const logger = new LoggerService();
  const exeptionFilter = new ExeptionFilter(logger);
  const userController = new UsersController(logger);
  const app = new App(logger, exeptionFilter, userController);
  app.init();
}

bootstrap();
