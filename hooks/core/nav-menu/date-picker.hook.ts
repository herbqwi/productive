import { Modal } from "@/@types/modal";
import { addMonths, format, startOfMonth, startOfWeek, subMonths, endOfMonth, endOfWeek, addDays, toDate, setYear, isDate, isValid, formatDate } from "date-fns";
import { FormEvent, useEffect, useMemo, useRef, useState } from "react"
import { setTimeToDate, convertDateToString, parseTimeString } from "@/util/global.utils";
import { ITime } from "@/components/core/input/time-input/time-input.component";
import { useForm } from "@/components/core/form/form.context";
import { IDatePickerProps } from "@/components/core/modals/create-task/date-picker/date-picker.component";
import useWatch from "@/hooks/common/watch.hook";
import { useModalContext } from "@/contexts/modal/modal.context";

const THIS_MODAL = Modal.DATE_PICKER;

export default function useDatePicker(props: IDatePickerProps) {
  const form = useForm();
  const modalContext = useModalContext();
  const [dateInputValue, setDateInputValue] = useState('');
  const [timeInputValue, setTimeInputValue] = useState('');
  const [finalDateTime, setFinalDateTime] = useState<Date>();
  const [currentDate, setCurrentDate] = useState<Date>();
  const [currentTime, setCurrentTime] = useState<ITime>();
  const [viewportDate, setViewportDate] = useState<Date>(new Date());
  const [monthDays, setMonthDays] = useState<Date[]>([]);
  const [isShowTime, setIsShowTime] = useState(true);
  const datePickerRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const autoFocusRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const headerDays = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']

  const dateWatcher = useWatch('date');

  useEffect(() => {
    console.log({ dateWatcher });
  }, [dateWatcher])

  const nextMonthHandler = () => (
    setViewportDate(addMonths(viewportDate, 1))
  )

  const prevMonthHandler = () => (
    setViewportDate(subMonths(viewportDate, 1))
  )

  const toggleIsShowTime = () => (
    setIsShowTime((prev) => !prev)
  )

  // Fix this
  const inputFormHandler = () => {
    if (timeInputValue) {
      const time = parseTimeString(timeInputValue);
      setCurrentTime(time);
      setTimeInputValue(format(setTimeToDate({ time }), 'h:mm a'))
    } else {
      setCurrentTime(undefined);
    }

    if (dateInputValue) {
      let actualDate = toDate(dateInputValue);

      /**
       * Bug (LOW-PRIORITY):
       * The toDate method in date-fns library returns 2001 as the year of the new date in case if inputValue property is an invalid date format.
       * and this in case (returning 2001 as a date) we consider it to be an invalid date, and immediately turned it into the date of today.
       * That should be fixed and toDate method should directly return the date of today instead of all this.
       */
      if (actualDate.getFullYear() === 2001) {
        actualDate = setYear(actualDate, (new Date).getFullYear());
      }
      selectedDateChangeHandler(actualDate);

      const actualDateStringValue = convertDateToString(actualDate);

      setDateInputValue(actualDateStringValue);
      setCurrentDate(actualDate)
    } else {
      selectedDateChangeHandler();
    }
  }

  const selectedDateChangeHandler = (date?: Date) => {
    setCurrentDate(date);
    setDateInputValue(convertDateToString(date));
    setViewportDate(date || new Date());
  }

  const dateInputValidator = (text: string) => (
    isValid(toDate(text)) || !text
  );

  const cancelHandler = () => {
    closeModal()
    setCurrentDate(undefined)
  }

  const openModal = () => {
    modalContext.addModal(THIS_MODAL);
  }

  const closeModal = () => {
    modalContext.removeModalsAbove(THIS_MODAL)
  }

  var isModalOpen = useMemo(() => {
    return modalContext.isModalOpen(THIS_MODAL);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [modalContext, modalContext.modalsList])

  useEffect(() => {
    form.updateFormItem({ ref: formRef, name: props.name });
  }, [finalDateTime]);

  useEffect(() => {
    modalContext.addRefs(THIS_MODAL, datePickerRef, 'modal')
    modalContext.addRefs(THIS_MODAL, buttonRef, 'button')
    modalContext.addRefs(THIS_MODAL, autoFocusRef, 'auto-focus')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  //**Every time the user reopens the modal, it should always send him back to the current date port view */
  useEffect(() => {
    if (isModalOpen) {
      setViewportDate(currentDate || new Date());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [modalContext, modalContext.modalsList]);

  useEffect(() => {
    setFinalDateTime(currentDate && setTimeToDate({ date: currentDate, time: currentTime || { hours: 1, minutes: 1 } }));
  }, [currentDate, currentTime])

  useEffect(() => {
    let startingDate = startOfWeek(startOfMonth(viewportDate));
    const endingDate = endOfWeek(endOfMonth(viewportDate));
    const days = [];

    while (startingDate <= endingDate) {
      days.push(startingDate);
      startingDate = addDays(startingDate, 1);
    }

    setMonthDays(days);
  }, [viewportDate])

  useEffect(() => {
    setCurrentTime(undefined);
    setTimeInputValue('');
  }, [isShowTime])

  return {
    modalContext,
    dateInputValue: {
      value: dateInputValue,
      set: setDateInputValue
    },
    timeInputValue: {
      value: timeInputValue,
      set: setTimeInputValue
    },
    viewportDate: {
      value: viewportDate,
      set: setViewportDate
    },
    finalDateTime: {
      value: finalDateTime,
      set: setFinalDateTime
    },
    monthDays: {
      value: monthDays,
      set: setMonthDays
    },
    currentDate: {
      value: currentDate,
      set: setCurrentDate
    },
    currentTime: {
      value: currentTime,
      set: setCurrentTime
    },
    isShowTime: {
      value: isShowTime,
      set: setIsShowTime,
      toggle: toggleIsShowTime
    },
    datePickerRef,
    buttonRef,
    autoFocusRef,
    formRef,
    nextMonthHandler,
    prevMonthHandler,
    inputFormHandler,
    selectedDateChangeHandler,
    dateInputValidator,
    cancelHandler,
    openModal,
    isModalOpen,
    headerDays
  }
}