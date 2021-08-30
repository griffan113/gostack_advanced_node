import { Router } from 'express';
import { Segments, Joi, celebrate } from 'celebrate';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import ProvidersController from '../controllers/Providers.controller';
import ProviderDayAvailabilityController from '../controllers/ProviderDayAvailability.controller';
import ProviderMonthAvailabilityController from '../controllers/ProviderMonthAvailability.controller';

const providersRouter = Router();
const providersController = new ProvidersController();

const providerMonthAvailabilityController =
  new ProviderMonthAvailabilityController();

const providerDayAvailabilityController =
  new ProviderDayAvailabilityController();

providersRouter.use(ensureAuthenticated);

providersRouter.get('/', providersController.index);
providersRouter.get(
  '/:provider_id/month-availability',
  celebrate({
    [Segments.BODY]: {
      month: Joi.number().required(),
      year: Joi.number().required(),
    },
  }),
  providerMonthAvailabilityController.index
);
providersRouter.get(
  '/:provider_id/day-availability',
  celebrate({
    [Segments.BODY]: {
      provider_id: Joi.string().uuid().required(),
      month: Joi.number().required(),
      year: Joi.number().required(),
      day: Joi.number().required(),
    },
  }),
  providerDayAvailabilityController.index
);

export default providersRouter;
