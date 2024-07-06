import { Modal } from "@/@types/modal";
import { addMonths, format, startOfMonth, startOfWeek, subMonths, endOfMonth, endOfWeek, addDays, toDate, setYear, isDate, isValid } from "date-fns";
import { useModalContext } from "@/contexts/modal.context";
import { FormEvent, useEffect, useMemo, useRef, useState } from "react"
import { convertDateToString } from "@/util/global.utils";
import useValueDelay from "@/hooks/common/delay.hook";

const THIS_MODAL = Modal.DATE_PICKER;

export default function useDatePicker() {
  const modalContext = useModalContext();
  const [dateInputValue, setDateInputValue] = useState(convertDateToString(new Date()));
  const [timeInputValue, setTimeInputValue] = useState('');
  const [dateValue, setDateValue] = useState<Date>();
  const [viewportDate, setViewportDate] = useState<Date>(new Date());
  const [monthDays, setMonthDays] = useState<Date[]>([]);
  const datePickerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const headerDays = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']

  const nextMonthHandler = () => (
    setViewportDate(addMonths(viewportDate, 1))
  )

  const prevMonthHandler = () => (
    setViewportDate(subMonths(viewportDate, 1))
  )

  const inputFormHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // if (!dateInputValue && !timeInputValue) {
    //   selectedDateChangeHandler();
    //   return;
    // }
    console.log('selected');

    let actualDate = toDate(dateInputValue);
    console.log('selected');
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
    setDateValue(actualDate)
  }

  const selectedDateChangeHandler = (date?: Date) => {
    setDateValue(date);
    setDateInputValue(convertDateToString(date));
    // setTimeInputValue(convertDateToString(date, 'hh:mm a'));
    setViewportDate(date || new Date());
  }

  const dateInputValidator = (text: string) => (
    isValid(toDate(text)) || !text
  );

  const cancelHandler = () => {
    closeModal()
    setDateValue(undefined)
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
    modalContext.addRefs(THIS_MODAL, datePickerRef)
    modalContext.addRefs(THIS_MODAL, inputRef)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  //**Every time the user reopens the modal, it should always send him back to the current date port view */
  useEffect(() => {
    if (isModalOpen) {
      setViewportDate(dateValue || new Date());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [modalContext, modalContext.modalsList]);

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
    monthDays: {
      value: monthDays,
      set: setMonthDays
    },
    dateValue: {
      value: dateValue,
      set: setDateValue
    },
    datePickerRef,
    inputRef,
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