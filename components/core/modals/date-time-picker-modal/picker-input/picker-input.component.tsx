import classes from './picker-input.module.sass'
import { useEffect, useRef } from 'react';
import { Dayjs } from 'dayjs';
import { ModalType } from '@/@types/modal.types';
import { ModalUtils } from '@/util';
import { useDateTimePickerStore } from '@/stores';
import { useForm } from '@/contexts/form.context';

interface IProps {
  name: string;
}

export default function DateTimePicker(props: IProps) {
  const updateOnPickerInputChange = useDateTimePickerStore(state => state.updateOnPickerInputChange);
  const form = useForm();
  const value = form.getFieldValue(props.name);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    form.registerField<Dayjs>({ name: props.name });
    updateOnPickerInputChange((dateProps: { date?: Dayjs, time?: Dayjs | null }) => {
      form.updateField(props.name, dateProps)
    })
  }, []);

  return (
    <div className={classes.wrapper}>
      <button
        ref={buttonRef}
        className={classes['date-output-btn']}
        onClick={() => (
          ModalUtils.open({
            type: ModalType.DATE_PICKER,
            initialState: value || undefined,
            location: {
              top: (buttonRef.current?.getBoundingClientRect().bottom || 0) + 5,
              left: buttonRef.current?.getBoundingClientRect().left || 0
            }
          })
        )}
        type='button'
      >
        <p>
          {value
            ? `${value?.date ? value.date.format('MMM DD, YYYY') : ''} ${value?.time ? value.time.format('HH:mm') : ''}`
            : 'Select a date'}
        </p>
      </button>
    </div>
  )
}