import { Router } from 'express';
import userController from '../controllers/userController';
import validUser from '../middlewares/validUser';

const router = new Router();

router.get('/user/recordstats', validUser, userController.fetchStats);

export default router;