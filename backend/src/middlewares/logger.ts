import { Request, Response, NextFunction } from 'express';
import { Tipo } from './loggerTypes';

function logger(tipo: Tipo) {
  // const logPath = `${process.cwd()}/log`;

  return (req: Request, res: Response, next: NextFunction) => {
    if (tipo === 'completo') {
      console.log(`${new Date().toISOString()} ${req.method} ${req.url}`);
    } else {
      console.log(`${new Date().toISOString()} ${req.url}`);
    }
    next();
  };
}

export default logger;
