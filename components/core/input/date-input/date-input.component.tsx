import { InputHTMLAttributes, KeyboardEvent } from "react";
import dayjs from "dayjs";
import { useDateTimePickerStore } from "@/stores";

import Input from "../input.component";
import clsx from "clsx";

type HTMLInputProps = InputHTMLAttributes<HTMLInputElement>;

interface IProps extends HTMLInputProps {
  value: string;
}

export default function DateInput(props: IProps) {
  const submitDate = useDateTimePickerStore((state) => state.submitDate);
  const dateInvalid = useDateTimePickerStore((state) => state.date.invalid);

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      submitDate();
    }
  };

  return (
    <Input
      {...props}
      type="text"
      placeholder={dayjs().format('MMM DD, YYYY')}
      onKeyDown={handleKeyDown}
      className={clsx({ invalid: dateInvalid })}
      defaultStyles
    />
  );
}
