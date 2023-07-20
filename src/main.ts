import { Container, ContainerModule, interfaces } from 'inversify';
import { App } from './app';
import { LoggerService } from './logger/logger.service';
import { ExeptionFilter } from './errors/exeption.filter';
import { UserController } from './user/user.controller';
import { TYPES } from './types';
import { ILogger } from './logger/logger.interface';
import { IExeptionFilter } from './errors/exeption.filter.interface';
import { IUserController } from './user/user.controller.interface';
import { IUserService } from './user/user.service.interface';
import { UserService } from './user/user.service';
import { IConfigService } from './config/config.service.interface';
import { ConfigService } from './config/config.service';
import { PrismaService } from './database/prisma.service';
import { IPrismaService } from './database/prisma.service.interface';

export interface IBootstrapReturn {
  appContainer: Container;
  app: App;
}

export const appBindings = new ContainerModule((bind: interfaces.Bind) => {
  bind<ILogger>(TYPES.ILogger).to(LoggerService).inSingletonScope();
  bind<IExeptionFilter>(TYPES.IExeptionFilter).to(ExeptionFilter);
  bind<IUserController>(TYPES.IUserController).to(UserController);
  bind<IUserService>(TYPES.IUserService).to(UserService);
  bind<IConfigService>(TYPES.IConfigService)
    .to(ConfigService)
    .inSingletonScope();
  bind<IPrismaService>(TYPES.IPrismaService)
    .to(PrismaService)
    .inSingletonScope();
  bind<App>(TYPES.Application).to(App);
});

function bootstrap(): IBootstrapReturn {
  const appContainer = new Container();
  appContainer.load(appBindings);
  const app = appContainer.get<App>(TYPES.Application);
  app.init();
  return { appContainer, app };
}

export const { app, appContainer } = bootstrap();
