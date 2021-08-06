import { EntityRepository, Repository } from 'typeorm';

import Appointment from '../entities/Appointment';

@EntityRepository(Appointment)
class AppointmentsRepository extends Repository<Appointment> {
  public async findByDate(date: Date): Promise<Appointment | null> {
    const findAppointment = await this.findOne({ date });

    return findAppointment ? findAppointment : null;
  }
}

export default AppointmentsRepository;
