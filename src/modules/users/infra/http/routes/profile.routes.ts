import { Joi, Segments, celebrate } from 'celebrate';
import { Router } from 'express';

import ProfileController from '../controllers/Profile.controller';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const profileRouter = Router();
const profileController = new ProfileController();

profileRouter.use(ensureAuthenticated);

profileRouter.put(
  '/update',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().required(),
      password: Joi.string().required(),
      old_password: Joi.string().required(),
    },
  }),
  profileController.update
);
profileRouter.get('/show', profileController.show);

export default profileRouter;
