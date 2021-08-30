import ICreateAppointmentDTO from '../dtos/ICreateAppointment.dto';
import IFindAllInDayFromProviderDTO from '../dtos/IFindAllInDayFromProvider.dto';
import IFindAllInMonthFromProviderDTO from '../dtos/IFindAllInMonthFromProvider.dto';
import Appointment from '../infra/typeorm/entities/Appointment';

interface IAppointmentsRepository {
  create(data: ICreateAppointmentDTO): Promise<Appointment>;
  findByDate: (date: Date) => Promise<Appointment | undefined>;
  findAllInMonthFromProvider: (
    data: IFindAllInMonthFromProviderDTO
  ) => Promise<Appointment[]>;
  findAllInDayFromProvider: (
    data: IFindAllInDayFromProviderDTO
  ) => Promise<Appointment[]>;
}

export default IAppointmentsRepository;
