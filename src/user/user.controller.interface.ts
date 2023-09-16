import { Request, Response, NextFunction } from 'express';
import { UserLoginDto } from './dto/user-login.dto';
import { UserRegisterDto } from './dto/user-register.dto';

export interface IUserController {
  register: (
    { body }: Request<{}, {}, UserRegisterDto>,
    res: Response,
    next: NextFunction,
  ) => Promise<void>;
  login: (
    { body }: Request<{}, {}, UserLoginDto>,
    res: Response,
    next: NextFunction,
  ) => Promise<void>;
  info: (req: Request, res: Response) => void;
}
