import IParseMailTemplateDTO from '../../MailTemplateProvider/dtos/IParseMailTemplate.dto';

interface IMailContact {
  name: string;
  email: string;
}

interface ISendMailDTO {
  to: IMailContact;
  from?: IMailContact;
  subject: string;
  templateData: IParseMailTemplateDTO;
}

export default ISendMailDTO;
