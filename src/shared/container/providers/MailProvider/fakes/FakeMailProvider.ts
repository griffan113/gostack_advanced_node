import ISendMailDTO from '../dtos/ISendMail.dto';
import IMailProvider from '../models/IMailProvider';

interface Message {
  to: string;
  body: string;
}

class FakeMailProvider implements IMailProvider {
  private messages: ISendMailDTO[] = [];

  public async sendMail(message: ISendMailDTO): Promise<void> {
    this.messages.push(message);
  }
}

export default FakeMailProvider;