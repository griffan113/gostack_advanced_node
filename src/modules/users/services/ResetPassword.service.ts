import { inject, injectable } from 'tsyringe';
import { addHours, isAfter } from 'date-fns';

import AppError from '@shared/errors/AppError';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';
import IUsersRepository from '../repositories/IUsersRepository';
import IUserTokensRepository from '../repositories/IUserTokensRepository';

interface IRequest {
  password: string;
  token: string;
}

@injectable()
class ResetPasswordService {
  constructor(
    @inject('UsersRepository')
    private readonly usersRepository: IUsersRepository,

    @inject('UserTokensRepository')
    private readonly userTokenRepository: IUserTokensRepository,

    @inject('HashProvider')
    private readonly hashProvider: IHashProvider
  ) {}

  public async execute({ password, token }: IRequest): Promise<void> {
    const userToken = await this.userTokenRepository.findByToken(token);

    if (!userToken) throw new AppError('User token not found');

    const user = await this.usersRepository.findById(userToken.user_id);

    if (!user) throw new AppError('User not found');

    const tokenCreatedAt = userToken.created_at;
    const advancedTokenDate = addHours(tokenCreatedAt, 2);

    if (isAfter(Date.now(), advancedTokenDate))
      throw new AppError('Token expired');

    const hashedPassword = await this.hashProvider.generateHash(password);

    user.password = hashedPassword;

    await this.usersRepository.save(user);
  }
}

export default ResetPasswordService;
