import { Router } from 'express';
import UserController from '../controller/UserController';
import loginRequired from '../middleware/loginRequired';

const router = new Router();
// router.get('/', loginRequired, UserController.index);

router.post('/', UserController.create);
router.get('/', loginRequired, UserController.show);
router.put('/', loginRequired, UserController.update);

// router.delete('/:id', UserController.delete);

export default router;

/*
index - lista todos os registros - GET
store/create - cria um novo registro - POST
delete - apaga um resgistro - DELETE
show - exibir um registro - GET
update - atualiza um registro - PATCH/PUT
*/
