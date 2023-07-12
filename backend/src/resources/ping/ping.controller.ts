import { Request, Response } from 'express';

const ping = (req: Request, res: Response) => {
  res.status(200).json({ msg: 'pong' });
};

export default { ping };
