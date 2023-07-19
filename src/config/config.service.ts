import { config, DotenvConfigOutput, DotenvParseOutput } from 'dotenv';
import { inject, injectable } from 'inversify';
import { IConfigService } from './config.service.interface';
import { ILogger } from '../logger/logger.interface';
import { TYPES } from '../types';

@injectable()
export class ConfigService implements IConfigService {
  private config: DotenvParseOutput;

  constructor(@inject(TYPES.ILogger) private logger: ILogger) {
    const result: DotenvConfigOutput = config();
    if (result.error) {
      this.logger.error(
        '[ConfigServise] .env file could not be read or is missing',
      );
    } else if (result.parsed) {
      this.logger.log('[ConfigServise] .env config loaded');
      this.config = result.parsed;
    } else {
      this.logger.error('[ConfigServise] something went wrong');
    }
  }

  get(key: string): string {
    return this.config[key];
  }
}
