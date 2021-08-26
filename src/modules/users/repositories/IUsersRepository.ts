import IFindAllProvidersDTO from '@modules/appointments/dtos/IFindAllProviders.dto';
import ICreateUserDTO from '../dtos/ICreateUser.dto';
import User from '../infra/typeorm/entities/User';

interface IUsersRepository {
  findById: (id: string) => Promise<User | undefined>;
  findByEmail: (email: string) => Promise<User | undefined>;
  findAllProviders: (data: IFindAllProvidersDTO) => Promise<User[]>;
  create: (data: ICreateUserDTO) => Promise<User>;
  save: (user: User) => Promise<User>;
}

export default IUsersRepository;
