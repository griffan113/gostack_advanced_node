import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import CreateUserService from './CreateUser.service';

describe('CreateUser', () => {
  it('should be able to create a new user', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const createUsersService = new CreateUserService(fakeUsersRepository);

    const user = await createUsersService.execute({
      name: 'John Doe',
      email: 'johndoe@gmail.com',
      password: '123456',
    });

    expect(user).toHaveProperty('id');
  });

  it('should not be able to create a new user with a repeated email', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const createUsersService = new CreateUserService(fakeUsersRepository);

    await createUsersService.execute({
      name: 'John Doe',
      email: 'johndoe@gmail.com',
      password: '123456',
    });

    expect(
      createUsersService.execute({
        name: 'John Doe',
        email: 'johndoe@gmail.com',
        password: '123456',
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
