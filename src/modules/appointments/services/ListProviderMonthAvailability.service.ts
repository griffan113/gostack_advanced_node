import { inject, injectable } from 'tsyringe';

import IAppointmentsRepository from '../repositories/IAppointmentsRepository';

interface IRequest {
  provider_id: string;
  month: number;
  year: number;
}

type IResponse = Array<{
  day: number;
  avaliable: boolean;
}>;

@injectable()
class ListProviderMonthAvailabilityService {
  constructor(
    @inject('AppointmentsRepostory')
    private readonly appointmentsRepostory: IAppointmentsRepository
  ) {}

  public async execute({
    provider_id,
    month,
    year,
  }: IRequest): Promise<IResponse> {
    const appointmentsInMonth =
      await this.appointmentsRepostory.findAllInMonthFromProvider({
        provider_id,
        month,
        year,
      });

    console.log(appointmentsInMonth);

    return [{ avaliable: false, day: 10 }];
  }
}

export default ListProviderMonthAvailabilityService;
