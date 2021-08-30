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
      date: new Date(2020, 4, 20, 14, 0, 0),
    });

    await fakeAppointmentRepository.create({
      provider_id: 'provider_id',
      date: new Date(2020, 4, 20, 15, 0, 0),
    });

    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 20, 11).getTime();
    });

    const avaliability = await listProviderMonthAvailabilityService.execute({
      provider_id: 'provider_id',
      year: 2020,
      day: 20,
      month: 5,
    });

    expect(avaliability).toEqual(
      expect.arrayContaining([
        { hour: 8, avaliable: false },
        { hour: 9, avaliable: false },
        { hour: 10, avaliable: false },
        { hour: 13, avaliable: true },
        { hour: 14, avaliable: false },
        { hour: 15, avaliable: false },
        { hour: 16, avaliable: true },
      ])
    );
  });
});
