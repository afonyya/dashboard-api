import { Request, Response, NextFunction } from 'express';
import { JwtPayload, verify } from 'jsonwebtoken';
import { IMiddleware } from './middleware.interface';

export class AuthMiddleware implements IMiddleware {
  constructor(private secret: string) {}

  async execute(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    if (req.headers.authorization) {
      verify(
        req.headers.authorization.split(' ')[1],
        this.secret,
        (error, payload) => {
          if (error) {
            next();
          } else if (payload) {
            req.user = (payload as JwtPayload).email;
            next();
          }
        },
      );
    }
    next();
  }
}
