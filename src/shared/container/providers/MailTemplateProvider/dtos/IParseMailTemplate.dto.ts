interface ITemplateVariables {
  // Can receive an indetermined number of properties
  [key: string]: string | number;
}

interface IParseMailTemplateDTO {
  template: string;
  variables: ITemplateVariables;
}

export default IParseMailTemplateDTO;
