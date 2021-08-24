import AppError from '@shared/errors/AppError';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import AuthenticateUserService from './AuthenticateUser.service';
import CreateUserService from './CreateUser.service';

describe('AuthenticateUser', () => {
  it('should be able to authenticate', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();

    const createUserService = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider
    );

    const user = await createUserService.execute({
      name: 'John Doe',
      email: 'johndoe@gmail.com',
      password: '123456',
    });

    const authenticateUserService = new AuthenticateUserService(
      fakeUsersRepository,
      fakeHashProvider
    );

    const response = await authenticateUserService.execute({
      email: 'johndoe@gmail.com',
      password: '123456',
    });

    expect(response).toHaveProperty('token');
    expect(response.user).toEqual(user);
  });

  it('should not be able to authenticate a non existing user', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();

    const authenticateUserService = new AuthenticateUserService(
      fakeUsersRepository,
      fakeHashProvider
    );

    expect(
      authenticateUserService.execute({
        email: 'johndoe@gmail.com',
        password: '123456',
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to authenticate a user with incorrect credentials', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();
    const createUserService = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider
    );

    await createUserService.execute({
      name: 'John Doe',
      email: 'johndoe@gmail.com',
      password: '123456',
    });

    const authenticateUserService = new AuthenticateUserService(
      fakeUsersRepository,
      fakeHashProvider
    );

    expect(
      authenticateUserService.execute({
        email: 'johndoe@gmail.com',
        password: '123457',
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});