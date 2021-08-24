import { inject, injectable } from 'tsyringe';
import nodemailer, { Transporter } from 'nodemailer';

import IMailProvider from '../models/IMailProvider';
import ISendMailDTO from '../dtos/ISendMail.dto';
import IMailTemplateProvider from '../../MailTemplateProvider/models/IMailTemplateProvider';

interface Message {
  to: string;
  body: string;
}

@injectable()
class EtherealMailProvider implements IMailProvider {
  private client: Transporter;

  constructor(
    @inject('MailTemplateProvider')
    private readonly mailTemplateProvider: IMailTemplateProvider
  ) {
    nodemailer.createTestAccount().then((account) => {
      const transporter = nodemailer.createTransport({
        host: account.smtp.host,
        port: account.smtp.port,
        secure: account.smtp.secure, // true for 465, false for other ports
        auth: {
          user: account.user, // generated ethereal user
          pass: account.pass, // generated ethereal password
        },
      });

      this.client = transporter;
    });
  }

  public async sendMail({
    subject,
    to,
    from,
    templateData,
  }: ISendMailDTO): Promise<void> {
    const message = await this.client.sendMail({
      from: {
        name: from?.name || 'Equipe GoBarber',
        address: from?.email || 'equipe@gobarber.com.br',
      },
      to: {
        name: to.name,
        address: to.email,
      },
      subject: 'Recuperação de Senha',
      html: await this.mailTemplateProvider.parse(templateData),
    });

    console.log('Email sent', message.messageId);
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(message));
  }
}

export default EtherealMailProvider;
