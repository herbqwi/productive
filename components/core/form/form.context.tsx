import React, { Dispatch, HTMLAttributes, RefObject, SetStateAction, useContext, useRef } from "react";
import { IMap, useMap } from "@/hooks/common/map.hook";
import clsx from "clsx";

type FormProps = HTMLAttributes<HTMLFormElement>;
type IProps = FormProps & {
  onSubmit?: () => void;
  submitOnEnter?: boolean;
};

interface IFormContext {
  updateFormItem: ({ ref, validationHandler, setIsValid }: { ref: RefObject<HTMLElement>; } & IFormItemProps) => void;
  resetAllFields: () => void;
  subscribeToListener: (name: string, listenerHandler: (name?: string) => void) => void
  getValue: (ref: RefObject<HTMLElement>) => string | undefined;
  setValue: (ref: RefObject<HTMLElement>, value: any) => void;
  formItems: IMap<RefObject<HTMLElement>, IFormItemProps>;
  submitHandler: () => void;
}

interface IFormItemProps {
  validationHandler?: () => boolean;
  setIsValid?: Dispatch<SetStateAction<boolean>>;
  resetHandler?: () => void;
  subscriberHandlers?: ((newValue: string) => void)[];
  name?: string;
  value?: string;
}

export interface IFormProps {
  name?: string;
}

type IUseForm<T> = T extends RefObject<HTMLElement>
  ? Omit<IFormContext, 'getValue' | 'setValue'> & { getValue: () => string | undefined; setValue: (value: any) => void }
  : IFormContext;

const FormContext = React.createContext<IFormContext>({ updateFormItem: () => { }, resetAllFields: () => { }, getValue: () => undefined, setValue: () => { }, subscribeToListener: () => { }, formItems: {} as any, submitHandler: () => { } });

export const useForm = <T extends RefObject<HTMLElement> | undefined>(ref?: T): IUseForm<T> => {
  const formContext = useContext(FormContext);

  if (ref) {
    return {
      ...formContext,
      getValue: () => formContext.getValue(ref),
      setValue: (value: any) => formContext.setValue(ref, value),
    } as IUseForm<T>;
  }

  return formContext as IUseForm<T>;
};

export default function Form(props: IProps) {
  const formItems = useMap<RefObject<HTMLElement>, IFormItemProps>();
  const formRef = useRef<HTMLFormElement>(null)

  const updateFormItem = ({ ref, validationHandler, setIsValid, resetHandler, subscriberHandlers, name, value }: { ref: RefObject<HTMLElement> } & IFormItemProps) => {
    const prevValues = formItems.get(ref) || {};

    formItems.set(ref, {
      validationHandler: validationHandler !== undefined ? validationHandler : prevValues.validationHandler,
      setIsValid: setIsValid !== undefined ? setIsValid : prevValues.setIsValid,
      resetHandler: resetHandler !== undefined ? resetHandler : prevValues.resetHandler,
      subscriberHandlers: subscriberHandlers !== undefined ? subscriberHandlers : prevValues.subscriberHandlers,
      name: name !== undefined ? name : prevValues.name,
      value: value !== undefined ? value : prevValues.value,
    });
  }

  const getItemFromName = (name: string) => (
    Array.from(formItems.map.entries()).find(([key, value]) => {
      if (value.name === name) {
        return key;
      }
    })?.[0]
  )

  const subscribeToListener = (name: string, listenerHandler: (name?: string) => void) => {
    const ref = getItemFromName(name);

    if (!ref) {
      return;
    }

    formItems.listen(ref, ({ name }) => listenerHandler(name))
  }

  const validateAllFields = () => {
    let isAllFieldsValid = true;
    Array.from(formItems.map.values()).forEach((formItem) => {
      const isValid = formItem.validationHandler?.() || false;

      if (!isValid) {
        isAllFieldsValid = false;
      }
      formItem.setIsValid?.(isValid);
    })

    return isAllFieldsValid;
  }

  const resetAllFields = () => {
    Array.from(formItems.map.values()).forEach((formItem) => (
      formItem.resetHandler?.()
    ))
  }

  const getValue = (ref: RefObject<HTMLElement>) => (
    formItems.get(ref)?.value
  )

  const setValue = (ref: RefObject<HTMLElement>, value: any) => (
    updateFormItem({ ref, value })
  )

  const submitHandler = () => {
    if (!props.onSubmit) {
      return;
    }

    const isAllFieldsValid = validateAllFields();

    if (isAllFieldsValid) {
      console.log('all fields are valid!')
      props.onSubmit();
    } else {
      console.log('Some fields are not valid')
    }
  }

  return <FormContext.Provider value={{ updateFormItem, resetAllFields, subscribeToListener, getValue, setValue, formItems, submitHandler }}>
    <form ref={formRef} onSubmit={submitHandler} {...props} className={clsx(props.className, 'form')}>
      {props.children}
    </form>
  </FormContext.Provider>
}