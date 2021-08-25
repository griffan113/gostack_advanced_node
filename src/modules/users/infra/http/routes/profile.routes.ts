import { Router } from 'express';
import ProfileController from '../controllers/Profile.controller';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const profileRouter = Router();
const profileController = new ProfileController();

profileRouter.use(ensureAuthenticated);

profileRouter.put('/update', profileController.update);
profileRouter.get('/show', profileController.show);

export default profileRouter;
