import { Segments, Joi, celebrate } from 'celebrate';
import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import AppointmentsController from '../controllers/Appointments.controller';
import ProviderAppointmentsController from '../controllers/ProviderAppointment.controller';

const appointmentsRouter = Router();
const appointmentsController = new AppointmentsController();
const providerAppointmentsController = new ProviderAppointmentsController();

appointmentsRouter.use(ensureAuthenticated);

/* day, month, year */

appointmentsRouter.get(
  '/me',
  celebrate({
    [Segments.QUERY]: {
      month: Joi.number().required(),
      year: Joi.number().required(),
      day: Joi.number().required(),
    },
  }),
  providerAppointmentsController.index
);

appointmentsRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      provider_id: Joi.string().uuid().required(),
      date: Joi.string().isoDate().required(),
    },
  }),
  appointmentsController.create
);

export default appointmentsRouter;
