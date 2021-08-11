import { Router } from 'express';

import AuthenticateUserService from '@modules/users/services/AuthenticateUser.service';
import { container } from 'tsyringe';
import SessionsController from './controllers/Sessions.controller';

const sessionsRouter = Router();
const sessionsController = new SessionsController();

sessionsRouter.post('/', sessionsController.create);

export default sessionsRouter;
