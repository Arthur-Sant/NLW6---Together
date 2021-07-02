import { Router } from "express";
import { AuthenticateUsersController } from "./controllers/AuthenticateUsersController";
import { CreateComplimentsController } from "./controllers/CreateComplimentsController";
import { CreateTagsController } from "./controllers/CreateTagsController";
import { CreateUsersController } from "./controllers/CreateUsersController";
import { ListTagsController } from "./controllers/ListTagsController";
import { ListUsersController } from "./controllers/ListUsersController";
import { ListUsersReceiverComplimentsController } from "./controllers/ListUsersReceiverComplimentsController";
import { ListUsersSenderComplimentsController } from "./controllers/ListUsersSenderComplimentsController";
import { ensureAdmin } from "./middlewares/ensureAdmin";
import { ensureAuthenticated } from "./middlewares/ensureAuthenticated";

const router = Router();

const createUserController = new CreateUsersController();
const createTagController = new CreateTagsController();
const authenticateUsersController = new AuthenticateUsersController();
const createComplimentsController = new CreateComplimentsController();
const listUsersSenderComplimentsController = new ListUsersSenderComplimentsController();
const listUsersReceiveComplimentsController = new ListUsersReceiverComplimentsController();
const listTagsController = new ListTagsController();
const listUsersController = new ListUsersController();

// router.use(ensureAdmin);// -> caso de error na verificação, não entrara em nenhuma 
//das rotas abaixo

router.post('/users', createUserController.handle);
router.post('/login', authenticateUsersController.handle);

router.use(ensureAuthenticated);
router.post('/compliments', createComplimentsController.handle);
router.post('/tags' , ensureAdmin, createTagController.handle);
router.get('/users/compliments/send', listUsersSenderComplimentsController.handle);
router.get('/users/compliments/receive', listUsersReceiveComplimentsController.handle);
router.get('/tags', listTagsController.handle);
router.get('/users', listUsersController.handle);

export { router }