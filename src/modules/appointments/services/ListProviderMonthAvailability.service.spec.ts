import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentRepository';
import ListProviderMonthAvailabilityService from './ListProviderMonthAvailability.service';

describe('ListProviderMonthAvailability', () => {
  let listProviderMonthAvailabilityService: ListProviderMonthAvailabilityService;
  let fakeAppointmentRepository: FakeAppointmentsRepository;

  beforeEach(() => {
    fakeAppointmentRepository = new FakeAppointmentsRepository();

    listProviderMonthAvailabilityService =
      new ListProviderMonthAvailabilityService(fakeAppointmentRepository);
  });

  it('should be able to return the available providers monthly', async () => {
    await fakeAppointmentRepository.create({
      provider_id: 'provider_id',
      date: new Date(2020, 4, 20, 8, 0, 0),
    });

    await fakeAppointmentRepository.create({
      provider_id: 'provider_id',
      date: new Date(2020, 4, 20, 10, 0, 0),
    });

    await fakeAppointmentRepository.create({
      provider_id: 'provider_id',
      date: new Date(2020, 4, 2, 8, 0, 0),
    });

    const avaliability = await listProviderMonthAvailabilityService.execute({
      provider_id: 'provider_id',
      month: 5,
      year: 2020,
    });

    expect(avaliability).toEqual(
      expect.arrayContaining([
        { day: 19, avaliable: false },
        { day: 20, avaliable: false },
        { day: 21, avaliable: false },
        { day: 22, avaliable: true },
      ])
    );
  });
});
