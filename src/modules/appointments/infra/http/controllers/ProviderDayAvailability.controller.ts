import { classToClass } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListProviderDayAvailabilityService from '@modules/appointments/services/ListProviderDayAvailability.service';

class ProviderDayAvailabilityController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { provider_id, month, year, day } = request.body;

    const listProviderDayAvailability = container.resolve(
      ListProviderDayAvailabilityService
    );

    const avaliability = await listProviderDayAvailability.execute({
      provider_id,
      month,
      year,
      day,
    });

    return response.json(classToClass(avaliability));
  }
}

export default ProviderDayAvailabilityController;
