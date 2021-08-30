import { getHours } from 'date-fns';
import { isAfter } from 'date-fns';
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

    const currentDate = new Date(Date.now());

    const avaliability = eachHourArray.map((hour) => {
      const hasAppointmentInHour = appointments.find(
        (appointment) => getHours(appointment.date) === hour
      );

      const compareDate = new Date(year, month - 1, day, hour);

      return {
        hour,
        avaliable: !hasAppointmentInHour && isAfter(compareDate, currentDate),
      };
    });

    return avaliability;
  }
}

export default ListProviderDayAvailabilityService;
