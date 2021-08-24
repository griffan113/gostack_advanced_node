import IParseMailTemplateDTO from '../dtos/IParseMailTemplate.dto';

interface IMailTemplateProvider {
  parse(data: IParseMailTemplateDTO): Promise<string>;
}

export default IMailTemplateProvider;
