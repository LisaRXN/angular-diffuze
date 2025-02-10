export enum FormType {
  NEW = 1,
  MODIFY = 2,
  RENEW = 3,
}

export type FormConfig = {
  allowedSteps: number[];
  forbiddenFields: string[];
  title: string;
};