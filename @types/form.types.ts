export type IFormItem<T = string> = {
  name?: T;
  validationHandler?: (value: T) => boolean;
}