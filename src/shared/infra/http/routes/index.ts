import { Router } from 'express';

import appointmentsRouter from '@modules/appointments/infra/http/appointments.routes';
import sessionsRouter from '@modules/users/infra/http/sessions.routes';
import usersRouter from '@modules/users/infra/http/users.routes';

const routes = Router();

routes.use('/appointments', appointmentsRouter);
routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);

export default routes;
