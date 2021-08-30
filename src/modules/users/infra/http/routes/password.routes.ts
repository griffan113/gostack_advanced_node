import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';
import ForgotPasswordController from '../controllers/ForgotPassword.controller';
import ResetPasswordController from '../controllers/ResetPassword.controller';

const passwordRouter = Router();

const forgotPasswordController = new ForgotPasswordController();
const resetPasswordController = new ResetPasswordController();

passwordRouter.post(
  '/forgot',
  celebrate({ [Segments.BODY]: { email: Joi.string().required() } }),
  forgotPasswordController.create
);
passwordRouter.post('/reset', resetPasswordController.create);

export default passwordRouter;
