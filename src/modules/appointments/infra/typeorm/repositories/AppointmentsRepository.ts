import { getRepository, Raw, Repository } from 'typeorm';

import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import Appointment from '../entities/Appointment';
import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointment.dto';
import IFindAllInMonthFromProviderDTO from '@modules/appointments/dtos/IFindAllInMonthFromProvider.dto';
import IFindAllInDayFromProviderDTO from '@modules/appointments/dtos/IFindAllInDayFromProvider.dto';

class AppointmentsRepository implements IAppointmentsRepository {
  private ormRepository: Repository<Appointment>;

  constructor() {
    this.ormRepository = getRepository(Appointment);
  }

  public async findByDate(date: Date): Promise<Appointment | undefined> {
    const findAppointment = await this.ormRepository.findOne({ date });

    return findAppointment;
  }

  public async findAllInMonthFromProvider({
    month,
    year,
    provider_id,
  }: IFindAllInMonthFromProviderDTO): Promise<Appointment[]> {
    const parsedMonth = String(month).padStart(2, '0');

    const findAppointments = await this.ormRepository.find({
      where: {
        provider_id,
        date: Raw(
          (dateFieldName) =>
            `to_char(${dateFieldName},  'MM-YYYY') = '${parsedMonth}-${year}'`
        ),
      },
    });

    return findAppointments;
  }

  public async findAllInDayFromProvider({
    month,
    day,
    year,
    provider_id,
  }: IFindAllInDayFromProviderDTO): Promise<Appointment[]> {
    const parsedMonth = String(month).padStart(2, '0');
    const parsedDay = String(day).padStart(2, '0');

    // Raw: https://orkhan.gitbook.io/typeorm/docs/find-options#advanced-options

    const findAppointments = await this.ormRepository.find({
      where: {
        provider_id,
        date: Raw(
          (dateFieldName) =>
            `to_char(${dateFieldName},  'DD-MM-YYYY') = '${parsedDay}-${parsedMonth}-${year}'`
        ),
      },
    });

    return findAppointments;
  }

  public async create({
    date,
    provider_id,
  }: ICreateAppointmentDTO): Promise<Appointment> {
    const appointment = this.ormRepository.create({ provider_id, date });

    await this.ormRepository.save(appointment);

    return appointment;
  }
}

export default AppointmentsRepository;
