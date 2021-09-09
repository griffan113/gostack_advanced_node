import { classToClass } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListProviderDayAvailabilityService from '@modules/appointments/services/ListProviderDayAvailability.service';

type RequestQueryParams = {
  month: number;
  year: number;
  day: number;
};
class ProviderDayAvailabilityController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { provider_id } = request.params;
    //@ts-ignore
    const { month, year, day } = request.query as RequestQueryParams;

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
