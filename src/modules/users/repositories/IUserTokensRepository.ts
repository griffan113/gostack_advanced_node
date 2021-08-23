import UserToken from '../infra/typeorm/entities/UserToken';

interface IUserTokensRepository {
  generate(user_id: string): Promise<UserToken>;
}

export default IUserTokensRepository;
