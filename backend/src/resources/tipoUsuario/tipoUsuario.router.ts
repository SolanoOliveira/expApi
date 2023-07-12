import { Router } from 'express';
import tipoUsuarioController from './tipoUsuario.controller';

const router = Router();
// usuario controller
router.get('/', tipoUsuarioController.index);
router.post('/', tipoUsuarioController.create);
router.get('/:id', tipoUsuarioController.read);
router.put('/:id', tipoUsuarioController.update);
router.delete('/:id', tipoUsuarioController.remove);                                                                                                                                                                                                                                                                                                                                                                                                

export default router;
