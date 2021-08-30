import { Router } from 'express';

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
  providerMonthAvailabilityController.index
);
providersRouter.get(
  '/:provider_id/day-availability',
  providerDayAvailabilityController.index
);

export default providersRouter;
