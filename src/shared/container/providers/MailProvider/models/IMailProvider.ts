import ISendMailDTO from '../dtos/ISendMail.dto';

interface IMailProvider {
  sendMail(data: ISendMailDTO): Promise<void>;
}

export default IMailProvider;
