import { classToClass } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListProviderMonthAvailabilityService from '@modules/appointments/services/ListProviderMonthAvailability.service';

type RequestQueryParams = {
  month: number;
  year: number;
};

class ProviderMonthAvailabilityController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { provider_id } = request.params;
    //@ts-ignore
    const { month, year } = request.query as RequestQueryParams;

    const listProviderMonthAvailability = container.resolve(
      ListProviderMonthAvailabilityService
    );

    const avaliability = await listProviderMonthAvailability.execute({
      provider_id,
      month,
      year,
    });

    return response.json(classToClass(avaliability));
  }
}

export default ProviderMonthAvailabilityController;
