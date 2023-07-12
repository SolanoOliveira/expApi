import { Request, Response, NextFunction } from 'express';

const checkAuth = (req: Request, res: Response, next: NextFunction) => {
  if (req.session.uid) next();
  else res.status(401).json({
    msg: 'O usuario n eh autorizado'
  })
};

export default checkAuth;
 