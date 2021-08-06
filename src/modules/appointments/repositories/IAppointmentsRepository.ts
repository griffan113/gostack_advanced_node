import ICreateAppointmentDTO from '../dtos/ICreateAppointment.dto';
import Appointment from '../infra/typeorm/entities/Appointment';

interface IAppointmentsRepository {
  create(data: ICreateAppointmentDTO): Promise<Appointment>;
  findByDate: (date: Date) => Promise<Appointment | undefined>;
}

export default IAppointmentsRepository;
