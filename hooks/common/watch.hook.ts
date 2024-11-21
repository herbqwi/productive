import { useEffect, useState } from "react";
import { useForm } from "@/components/core/form/form.context";

export default function useWatch(name: string) {
  const form = useForm();
  const [value, setValue] = useState<string>();

  const subscribeHandler = (newValue: string | undefined) => {
    console.log('Handler');
    setValue(newValue);
  }

  useEffect(() => {
    form.subscribeToListener(name, subscribeHandler);
  }, [form.formItems.map])

  return value;
}