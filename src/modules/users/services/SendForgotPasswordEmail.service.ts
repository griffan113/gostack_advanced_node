import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';

import IUsersRepository from '../repositories/IUsersRepository';
import IUserTokensRepository from '../repositories/IUserTokensRepository';

interface IRequest {
  email: string;
}

@injectable()
class SendForgotPasswordEmailService {
  constructor(
    @inject('UsersRepository')
    private readonly usersRepository: IUsersRepository,

    @inject('MailProvider')
    private readonly mailProvider: IMailProvider,

    @inject('UserTokensRepository')
    private readonly userTokenRepository: IUserTokensRepository
  ) {}

  public async execute({ email }: IRequest): Promise<void> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) throw new AppError('User does not exists.');

    const { token } = await this.userTokenRepository.generate(user.id);

    await this.mailProvider.sendMail(
      email,
      `Pedido de recuperação de senha recebido, seu token: ${token}`
    );
  }
}

export default SendForgotPasswordEmailService;
