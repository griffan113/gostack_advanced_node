import { getDate, getDaysInMonth } from 'date-fns';
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

    const numberOfDaysInMonth = getDaysInMonth(new Date(year, month, -1));

    const eachDayArray = Array.from(
      { length: numberOfDaysInMonth },
      (_, index) => index + 1
    );

    const avaliability = eachDayArray.map((day) => {
      const appointmentsInDay = appointmentsInMonth.filter((appointment) => {
        return getDate(appointment.date) === day;
      });

      return {
        day,
        avaliable: appointmentsInDay.length < 10,
      };
    });

    return avaliability;
  }
}

export default ListProviderMonthAvailabilityService;
