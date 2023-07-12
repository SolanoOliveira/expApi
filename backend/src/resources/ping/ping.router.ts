import { Router } from 'express';
import pingController from './ping.controller';

const router = Router();

router.use('/', pingController.ping);

export default router;
