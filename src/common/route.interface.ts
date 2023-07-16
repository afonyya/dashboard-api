import { Request, Response, NextFunction, Router } from 'express';

export interface IControllerRoute {
  path: string;
  method: keyof Pick<Router, 'get' | 'post' | 'put' | 'patch' | 'delete'>;
  handler: (req: Request, res: Response, next: NextFunction) => void;
}

export type ExpressReturnType = Response<any, Record<string, any>>;
