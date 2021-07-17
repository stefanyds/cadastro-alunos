import { Router } from 'express';
import UserController from '../controller/UserController';

const router = new Router();
router.post('/', UserController.create);

export default router;

/*
index - lista todos os registros - GET
store/create - cria um novo registro - POST
delete - apaga um resgistro - DELETE
show - exibir um registro - GET
update - atualiza um registro - PATCH/PUT
*/
