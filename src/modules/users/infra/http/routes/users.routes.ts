import { Router } from 'express';
import multer from 'multer';

import uploadConfig from '@config/upload';
import UsersController from '../controllers/Users.controller';
import UserAvatarController from '../controllers/UserAvatar.controller';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import { celebrate, Joi, Segments } from 'celebrate';

const usersRouter = Router();
const usersController = new UsersController();
const userAvatarController = new UserAvatarController();

const upload = multer(uploadConfig);

usersRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().required(),
      password: Joi.string().required(),
    },
  }),
  usersController.create
);

usersRouter.patch(
  '/avatar',
  ensureAuthenticated,
  upload.single('avatar'),
  userAvatarController.update
);

export default usersRouter;
