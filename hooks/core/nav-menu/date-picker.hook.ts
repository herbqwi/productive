import { Modal } from "@/@types/modal";
import { addMonths, format, startOfMonth, startOfWeek, subMonths, endOfMonth, endOfWeek, addDays, toDate, setYear } from "date-fns";
import { useModalContext } from "@/contexts/modal.context";
import { FormEvent, useEffect, useMemo, useRef, useState } from "react"

const MODAL = Modal.DATE_PICKER;

export default function useDatePicker() {
  const modalContext = useModalContext();
  const [input, setInput] = useState('');
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [monthDays, setMonthDays] = useState<Date[]>([]);
  const datePickerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const headerDays = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']

  const nextMonthHandler = () => (
    setCurrentDate(addMonths(currentDate, 1))
  )

  const prevMonthHandler = () => (
    setCurrentDate(subMonths(currentDate, 1))
  )

  const inputFormHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('test');
    let actualDate = toDate(input);
    console.log(actualDate.getFullYear());
    if (actualDate.getFullYear() === 2001) {
      actualDate = setYear(actualDate, (new Date).getFullYear());
    }
    updateSelectedDate(actualDate)
  }

  const updateSelectedDate = (date: Date) => {
    setSelectedDate(date)
    setCurrentDate(date)
  }

  const submitHandler = () => {
    if (selectedDate) {
      setInput(format(selectedDate, 'dd MMM yyyy'))
    }
    closeModal()
  }

  const cancelHandler = () => {
    closeModal()
    setSelectedDate(undefined)
  }

  const openModal = () => {
    modalContext.addModal(MODAL);
  }

  const closeModal = () => {
    modalContext.removeModalsAbove(MODAL)
  }

  const isModalOpen = useMemo(() => {
    return modalContext.isModalOpened(MODAL);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [modalContext, modalContext.modalsList])

  useEffect(() => {
    modalContext.addRefs(MODAL, datePickerRef)
    modalContext.addRefs(MODAL, inputRef)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (modalContext.isModalOpened(MODAL)) {
      setCurrentDate(selectedDate || new Date());
    }
  }, [modalContext, modalContext.modalsList, selectedDate, input]);

  useEffect(() => {
    let startingDate = startOfWeek(startOfMonth(currentDate));
    const endingDate = endOfWeek(endOfMonth(currentDate));
    const days = [];

    while (startingDate <= endingDate) {
      days.push(startingDate);
      startingDate = addDays(startingDate, 1);
    }

    setMonthDays(days);
  }, [currentDate])

  // useEffect(() => {
  //   const handleClickOutside = (event: MouseEvent) => {
  //     if ((datePickerRef.current && !datePickerRef.current.contains(event.target as Node))
  //       && inputRef.current && !inputRef.current.contains(event.target as Node)) {
  //       cancelHandler()
  //     }
  //   };

  //   const handleKeyDown = (event: KeyboardEvent) => {
  //     if (event.key === 'Escape') {
  //       cancelHandler()
  //       if (inputRef.current) {
  //         inputRef.current.blur();
  //       }
  //     }
  //   };

  //   document.addEventListener('mousedown', handleClickOutside);
  //   document.addEventListener('keydown', handleKeyDown);

  //   return () => {
  //     document.removeEventListener('mousedown', handleClickOutside);
  //     document.removeEventListener('keydown', handleKeyDown);
  //   };
  // }, [datePickerRef, inputRef]);

  return {
    modalContext,
    input: {
      value: input,
      set: setInput
    },
    currentDate: {
      value: currentDate,
      set: setCurrentDate
    },
    monthDays: {
      value: monthDays,
      set: setMonthDays
    },
    selectedDate: {
      value: selectedDate,
      set: setSelectedDate
    },
    datePickerRef,
    inputRef,
    nextMonthHandler,
    prevMonthHandler,
    inputFormHandler,
    updateSelectedDate,
    submitHandler,
    cancelHandler,
    openModal,
    isModalOpen,
    headerDays
  }
}