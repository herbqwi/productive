import React, { createContext, useContext, useState, useEffect, useCallback, RefObject } from "react";
import clsx from "clsx";

type FormProps = React.HTMLAttributes<HTMLFormElement> & {
  onSubmit?: () => void;
};

interface IRegisterField<T = any> {
  name: string;
  validationHandler?: (value: T) => boolean;
  defaultValue?: T;
}

interface IField<T = any> {
  value: T;
  validationHandler?: (value: T) => boolean;
  ref?: RefObject<HTMLInputElement>;
}

type Subscriber<T = any> = (value: T) => void;

interface IFormContext {
  isValid: boolean;
  registerField: <T = any>(field: IRegisterField<T>) => void;
  updateField: <T = any>(name: string, value: T) => void;
  getFieldValue: <T = any>(name: string) => T | undefined;
  validateAllFields: () => boolean;
  subscribeToField: <T = any>(name: string, listener: Subscriber<T>) => void;
  unsubscribeFromField: <T = any>(name: string, listener: Subscriber<T>) => void;
}

const DEFAULT_CONTEXT: IFormContext = {
  isValid: true,
  registerField: () => { },
  updateField: () => { },
  getFieldValue: () => undefined,
  validateAllFields: () => true,
  subscribeToField: () => { },
  unsubscribeFromField: () => { },
}

const FormContext = createContext<IFormContext>(DEFAULT_CONTEXT);

export const useForm = () => {
  const context = useContext(FormContext);
  if (!context) {
    return DEFAULT_CONTEXT
  }
  return context;
};

export default function Form(props: FormProps) {
  const [fields, setFields] = useState<Map<string, IField>>(new Map());
  const [subscribers, setSubscribers] = useState<Map<string, Set<Subscriber>>>(new Map());
  const [isValid, setValid] = useState(true);

  const registerField = <T,>({ name, validationHandler, defaultValue }: IRegisterField<T>) => {
    setFields((prev) => {
      const updated = new Map(prev);
      updated.set(name, { value: defaultValue || "", validationHandler });
      return updated;
    });
  };

  const updateField = <T,>(name: string, value: T) => {
    setFields((prev) => {
      const updated = new Map(prev);
      const currentField = updated.get(name);

      if (currentField) {
        updated.set(name, { ...currentField, value });
      }

      return updated;
    });

    const fieldSubscribers = subscribers.get(name);
    if (fieldSubscribers) {
      fieldSubscribers.forEach((listener) => listener(value));
    }
  };

  const getFieldValue = <T,>(name: string): T | undefined => {
    const field = fields.get(name);
    return field?.value as T | undefined;
  };

  const validateAllFields = () => {
    const isValid = !fields.values().find(field => field?.validationHandler && !field.validationHandler(field.value));
    setValid(isValid)

    return isValid;
  };

  const subscribeToField = <T,>(name: string, listener: Subscriber<T>) => {
    setSubscribers((prev) => {
      const updated = new Map(prev);
      if (!updated.has(name)) {
        updated.set(name, new Set());
      }
      updated.get(name)?.add(listener);
      return updated;
    });
  };

  const unsubscribeFromField = <T,>(name: string, listener: Subscriber<T>) => {
    setSubscribers((prev) => {
      const updated = new Map(prev);
      updated.get(name)?.delete(listener);
      return updated;
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateAllFields() && props.onSubmit) {
      props.onSubmit();
    }
  };

  return (
    <FormContext.Provider
      value={{
        isValid,
        registerField,
        updateField,
        getFieldValue,
        validateAllFields,
        subscribeToField,
        unsubscribeFromField,
      }}
    >
      <form {...props} onSubmit={handleSubmit} className={clsx(props.className)}>
        {props.children}
      </form>
    </FormContext.Provider>
  );
}