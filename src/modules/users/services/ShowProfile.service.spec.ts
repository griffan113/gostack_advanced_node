import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import ShowProfileService from './ShowProfile.service';

describe('ShowProfile', () => {
  let fakeUsersRepository: FakeUsersRepository;
  let showProfileService: ShowProfileService;

  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    showProfileService = new ShowProfileService(fakeUsersRepository);
  });

  it('should return the profile', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@gmail.com',
      password: '123456',
      avatar: 'avatar.jpg',
    });

    const userProfile = await showProfileService.execute({ user_id: user.id });

    expect(userProfile.name).toBe('John Doe');
  });

  it('should not return the profile if not found', async () => {
    await expect(
      showProfileService.execute({ user_id: 'not-existing-user_id' })
    ).rejects.toBeInstanceOf(AppError);
  });
});
