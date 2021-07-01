import { Router } from "express";
import { CreateTagsController } from "./controllers/CreateTagsController";
import { CreateUsersController } from "./controllers/CreateUsersController";
import { ensureAdmin } from "./middlewares/ensureAdmin";

const router = Router();

const createUserController = new CreateUsersController();
const createTagController = new CreateTagsController();

// router.use(ensureAdmin); -> caso de error na verificação, não entrara em nenhuma das 
//rotas abaixo

router.post('/users',ensureAdmin, createUserController.handle);

router.post('/tags', createTagController.handle);

export { router }