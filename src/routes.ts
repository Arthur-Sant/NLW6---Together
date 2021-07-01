import { Router } from "express";
import { AuthenticateUsersController } from "./controllers/AuthenticateUsersController";
import { CreateComplimentsController } from "./controllers/CreateComplimentsController";
import { CreateTagsController } from "./controllers/CreateTagsController";
import { CreateUsersController } from "./controllers/CreateUsersController";
import { ensureAdmin } from "./middlewares/ensureAdmin";

const router = Router();

const createUserController = new CreateUsersController();
const createTagController = new CreateTagsController();
const authenticateUsersController = new AuthenticateUsersController();
const createComplimentsController = new CreateComplimentsController();

// router.use(ensureAdmin);// -> caso de error na verificação, não entrara em nenhuma 
//das rotas abaixo

router.post('/users', ensureAdmin, createUserController.handle);
router.post('/tags', createTagController.handle);
router.post('/login', authenticateUsersController.handle);
router.post('/compliments', createComplimentsController.handle);


export { router }