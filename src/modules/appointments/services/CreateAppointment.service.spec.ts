import AppError from '@shared/errors/AppError';
import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentRepository';
import CreateAppointmentsService from './CreateAppointment.service';

let fakeAppointmentRepository: FakeAppointmentsRepository;
let createAppointmentService: CreateAppointmentsService;

describe('CreateAppointments', () => {
  beforeEach(() => {
    fakeAppointmentRepository = new FakeAppointmentsRepository();
    createAppointmentService = new CreateAppointmentsService(
      fakeAppointmentRepository
    );
  });

  it('should be able to create a new appointment', async () => {
    const appointment = await createAppointmentService.execute({
      date: new Date(),
      provider_id: '123123123123',
      user_id: '123123123123',
    });

    expect(appointment).toHaveProperty('id');
  });

  it('should not be able to create to a new appointments on the same date', async () => {
    const appointmentDate = new Date(2020, 4, 10, 11);

    await createAppointmentService.execute({
      date: appointmentDate,
      provider_id: '123123123123',
      user_id: '123123123123',
    });

    await expect(
      createAppointmentService.execute({
        date: appointmentDate,
        provider_id: '123123123123',
        user_id: '123123123123',
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
