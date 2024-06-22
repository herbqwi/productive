import { addMonths, format, startOfMonth, startOfWeek, subMonths, getDayOfYear, getDaysInMonth, endOfMonth, endOfWeek, addDays, toDate, setYear } from "date-fns";
import { FormEvent, useEffect, useRef, useState } from "react"


export default function useDatePicker() {
  const [input, setInput] = useState('');
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [monthDays, setMonthDays] = useState<Date[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const datePickerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const headerDays = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']

  const nextMonthHandler = () => (
    setCurrentDate(addMonths(currentDate, 1))
  )

  const prevMonthHandler = () => (
    setCurrentDate(subMonths(currentDate, 1))
  )

  useEffect(() => {
    console.log('selectedDate: ', selectedDate);
  }, [selectedDate])

  const inputFormHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
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
    setIsOpen(false)
  }

  const cancelHandler = () => {
    setIsOpen(false)
    setSelectedDate(undefined)
  }

  useEffect(() => {
    if (isOpen) {
      setCurrentDate(selectedDate || new Date());
    }
  }, [isOpen, selectedDate, input]);

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

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if ((datePickerRef.current && !datePickerRef.current.contains(event.target as Node))
        && inputRef.current && !inputRef.current.contains(event.target as Node)) {
        cancelHandler()
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        cancelHandler()
        if (inputRef.current) {
          inputRef.current.blur();
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [datePickerRef, inputRef]);

  return {
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
    isOpen: {
      value: isOpen,
      set: setIsOpen
    },
    datePickerRef,
    inputRef,
    nextMonthHandler,
    prevMonthHandler,
    inputFormHandler,
    updateSelectedDate,
    submitHandler,
    cancelHandler,
    headerDays
  }
}