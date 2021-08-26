import { getHours } from 'date-fns';
import { inject, injectable } from 'tsyringe';

import IAppointmentsRepository from '../repositories/IAppointmentsRepository';

interface IRequest {
  provider_id: string;
  month: number;
  year: number;
  day: number;
}

type IResponse = Array<{
  hour: number;
  avaliable: boolean;
}>;

@injectable()
class ListProviderDayAvailabilityService {
  constructor(
    @inject('AppointmentsRepostory')
    private readonly appointmentsRepository: IAppointmentsRepository
  ) {}

  public async execute({
    provider_id,
    month,
    year,
    day,
  }: IRequest): Promise<IResponse> {
    const appointments =
      await this.appointmentsRepository.findAllInDayFromProvider({
        provider_id,
        month,
        year,
        day,
      });

    const hourStart = 8;
    const eachHourArray = Array.from(
      { length: 10 },
      (_, index) => index + hourStart
    );

    const avaliability = eachHourArray.map((hour) => {
      const hasAppointmentInHour = appointments.find(
        (appointment) => getHours(appointment.date) === hour
      );

      return {
        hour,
        avaliable: !hasAppointmentInHour,
      };
    });

    return avaliability;
  }
}

export default ListProviderDayAvailabilityService;
