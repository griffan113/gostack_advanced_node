import FakeStorageProvider from '@shared/container/providers/StorageProvider/fakes/FakeStorageProvider';
import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';
import AppError from '@shared/errors/AppError';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import CreateUserService from './CreateUser.service';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let createUsersService: CreateUserService;
let storageProvider: IStorageProvider;

describe('CreateUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    storageProvider = new FakeStorageProvider();

    createUsersService = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
      storageProvider
    );
  });

  it('should be able to create a new user', async () => {
    const user = await createUsersService.execute({
      name: 'John Doe',
      email: 'johndoe@gmail.com',
      password: '123456',
      avatar_filename: 'avatar.jpg',
    });

    expect(user).toHaveProperty('id');
  });

  it('should not be able to create a new user with a repeated email', async () => {
    await createUsersService.execute({
      name: 'John Doe',
      email: 'johndoe@gmail.com',
      password: '123456',
      avatar_filename: 'avatar.jpg',
    });

    await expect(
      createUsersService.execute({
        name: 'John Doe',
        email: 'johndoe@gmail.com',
        password: '123456',
        avatar_filename: 'avatar.jpg',
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
