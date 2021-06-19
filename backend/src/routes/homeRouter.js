import { Router } from 'express';
import homeController from '../controller/homeController';

const router = new Router();

router.get('/', homeController.index);

export default router;
