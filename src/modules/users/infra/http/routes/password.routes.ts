import { Router } from 'express';
import ForgotPasswordController from '../controllers/ForgotPassword.controller';
import ResetPasswordController from '../controllers/ResetPassword.controller';

const passwordRouter = Router();

const forgotPasswordController = new ForgotPasswordController();
const resetPasswordController = new ResetPasswordController();

passwordRouter.post('/forgot', forgotPasswordController.create);
passwordRouter.post('/reset', resetPasswordController.create);

export default passwordRouter;
