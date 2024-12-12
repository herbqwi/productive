import { InputHTMLAttributes, KeyboardEvent } from 'react';
import { convertDateToString } from '@/util/global.utils';
import { useDateTimePickerStore } from '@/stores';
import useLiveClock from '@/hooks/common/live-clock.hook';

import Input from '../input.component';
import clsx from 'clsx';

export interface ITime {
  hours: number;
  minutes: number;
}

type HTMLInputProps = InputHTMLAttributes<HTMLInputElement>;

interface IProps extends HTMLInputProps {
  value: string;
}

export default function TimeInput(props: IProps) {
  const liveClock = useLiveClock();
  const timeText = useDateTimePickerStore(state => state.time.text);
  const timeInvalid = useDateTimePickerStore(state => state.time.invalid)
  const setTime = useDateTimePickerStore(state => state.setTimeText);
  const submitTime = useDateTimePickerStore(state => state.submitTime)

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      submitTime();
    }
  };

  return (
    <Input
      {...props}
      type='text'
      onChange={e => setTime(e.target.value)}
      value={timeText}
      onKeyDown={handleKeyDown}
      placeholder={convertDateToString(liveClock, 'hh:mm a')}
      className={clsx({ invalid: timeInvalid })}
      defaultStyles
    />
  )
}