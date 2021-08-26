import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentRepository';
import ListProviderDayAvailabilityService from './ListProviderDayAvailability.service';

describe('ListProviderDayAvailability', () => {
  let listProviderMonthAvailabilityService: ListProviderDayAvailabilityService;
  let fakeAppointmentRepository: FakeAppointmentsRepository;

  beforeEach(() => {
    fakeAppointmentRepository = new FakeAppointmentsRepository();

    listProviderMonthAvailabilityService =
      new ListProviderDayAvailabilityService(fakeAppointmentRepository);
  });

  it('should be able to return the available providers daily', async () => {
    /*     for (let hour = 8; hour <= 17; hour++) {
      await fakeAppointmentRepository.create({
        provider_id: 'provider_id',
        date: new Date(2020, 4, 20, hour, 0, 0),
      });
    } */

    await fakeAppointmentRepository.create({
      provider_id: 'provider_id',
      date: new Date(2020, 4, 20, 8, 0, 0),
    });

    await fakeAppointmentRepository.create({
      provider_id: 'provider_id',
      date: new Date(2020, 4, 20, 10, 0, 0),
    });

    const avaliability = await listProviderMonthAvailabilityService.execute({
      provider_id: 'provider_id',
      day: 20,
      month: 5,
      year: 2020,
    });

    expect(avaliability).toEqual(
      expect.arrayContaining([
        { hour: 8, avaliable: false },
        { hour: 9, avaliable: true },
        { hour: 10, avaliable: false },
        { hour: 11, avaliable: true },
      ])
    );
  });
});
