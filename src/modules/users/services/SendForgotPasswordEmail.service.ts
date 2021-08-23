import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider';
import { inject, injectable } from 'tsyringe';

import IUsersRepository from '../repositories/IUsersRepository';

interface IRequest {
  email: string;
}

@injectable()
class SendForgotPasswordEmailService {
  constructor(
    @inject('UsersRepository')
    private readonly usersRepository: IUsersRepository,

    @inject('MailProvider')
    private readonly mainProvider: IMailProvider
  ) {}

  public async execute({ email }: IRequest): Promise<void> {
    this.mainProvider.sendMail(email, 'Pedido de recuperação de senha');
  }
}

export default SendForgotPasswordEmailService;
