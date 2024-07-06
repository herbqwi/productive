import { useMap, useSet } from "@uidotdev/usehooks";
import React, { Dispatch, FormEvent, FormHTMLAttributes, RefObject, SetStateAction, useContext, useEffect } from "react";

type FormProps = FormHTMLAttributes<HTMLFormElement>;
type IProps = FormProps;

interface IFormContext {
  setValidationHandler: (ref: RefObject<HTMLElement>, validationHandler: () => boolean, setIsValid: Dispatch<SetStateAction<boolean>>) => void
}

const FormContext = React.createContext<IFormContext>({ setValidationHandler: () => { } });

export const useForm = () => {
  const formContext = useContext(FormContext);

  return formContext;
}

export default function Form(props: IProps) {
  const validationItems = useMap<RefObject<HTMLElement>, { validationHandler: () => boolean, setIsValid: Dispatch<SetStateAction<boolean>> }>();

  const setValidationHandler = (ref: RefObject<HTMLElement>, validationHandler: () => boolean, setIsValid: Dispatch<SetStateAction<boolean>>) => {
    validationItems.set(ref, { validationHandler, setIsValid });
  }

  const validateAllFields = () => {
    let isAllFieldsValid = true;
    Array.from(validationItems.values()).forEach((validationItem) => {
      const isValid = validationItem.validationHandler();

      if (!isValid) {
        isAllFieldsValid = false;
      }
      validationItem.setIsValid(isValid);
    })

    return isAllFieldsValid;
  }

  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!props.onSubmit) {
      return;
    }

    const isAllFieldsValid = validateAllFields();

    if (isAllFieldsValid) {
      props.onSubmit(e);
    }
  }

  return <FormContext.Provider value={{ setValidationHandler }}>
    <form {...props} onSubmit={submitHandler}>
      {props.children}
    </form>
  </FormContext.Provider>
}