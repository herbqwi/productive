import dayjs, { Dayjs } from "dayjs";
import { create } from "zustand";
import { DeepPartial } from "@/@types/utils.types";
import { merge } from "lodash";
import parseTextTime from "@/util/parse-text-time.util";
import parseTextDate from "@/util/parse-text-date.util";

export interface IDateTimePickerInit {
  date: Dayjs;
  time: Dayjs;
}

interface IState {
  date: {
    value: Dayjs;
    text: string;
    invalid: boolean;
  };
  time: {
    value?: Dayjs | null;
    text: string;
    enabled: boolean;
    invalid: boolean;
  }
  viewport: Dayjs;
  isToday: boolean;
  isTomorrow: boolean;
  onPickerInputChange?: (props: { date?: Dayjs, time?: Dayjs | null }) => void;
}

interface IActions {
  updateState: (newState: DeepPartial<IState>) => void;
  setToday: () => void;
  setTomorrow: () => void;
  toggleTimeEnabled: () => void;
  isDateSelected: (date: Dayjs) => boolean;
  isOutOfThisMonth: (date: Dayjs) => boolean;
  setDate: (date: Dayjs) => void;
  setDateText: (text: string) => void;
  submitDate: () => void;
  submitTime: () => void;
  setTimeText: (text: string) => void;
  previousViewport: () => void;
  nextViewport: () => void;
  resetFields: () => void;
  init: (initialState: IDateTimePickerInit) => void;
  updateOnPickerInputChange: (callback: (props: { date?: Dayjs, time?: Dayjs | null }) => void) => void;
  triggerUpdate: () => void;
}

export type IDateTimePickerStore = IState & IActions;

const generateDefaults = (): IState => {
  return ({
    date: {
      value: dayjs(),
      text: '',
      invalid: false
    },
    time: {
      value: null,
      text: '',
      enabled: true,
      invalid: false
    },
    viewport: dayjs(),
    isToday: true,
    isTomorrow: false,
  })
}


const useDateTimePickerStore = create<IDateTimePickerStore>((set, get) => ({
  ...generateDefaults(),
  updateState(newState) {
    set(prev => {
      const updatedState = merge(prev, newState);

      return {
        ...updatedState,
        isToday: dayjs().isSame(updatedState.date.value, 'day'),
        isTomorrow: dayjs().add(1, 'day').isSame(updatedState.date.value, 'day'),
      }
    })
  },
  setToday() {
    get().setDate(dayjs())
  },
  setTomorrow() {
    get().setDate(dayjs().add(1, 'days'))
  },
  toggleTimeEnabled() {
    const isTimeEnabled = !get().time.enabled;
    get().updateState({ time: { enabled: isTimeEnabled, value: isTimeEnabled ? get().time.value : null, text: isTimeEnabled ? get().time.text : '' } })
    get().triggerUpdate();
  },
  isDateSelected(date) {
    return get().date.value.isSame(date, 'day');
  },
  isOutOfThisMonth(date) {
    return !date.isSame(get().viewport, 'month');
  },
  setDate(date) {
    get().updateState({ date: { value: date, text: date.format("MMM DD, YYYY") } })
    get().triggerUpdate();
  },
  setDateText(text) {
    get().updateState({ date: { text } })
  },
  submitDate() {
    const state = get();
    const parsedDateText = parseTextDate(state.date.text);
    const { value: currentDate } = state.date;

    if (parsedDateText) {
      const year = parsedDateText.year() === 2001 ? dayjs().year() : parsedDateText.year();

      const updatedDate = currentDate
        .set("year", year)
        .set("month", parsedDateText.month())
        .set("date", parsedDateText.date());

      get().updateState({
        date: {
          value: updatedDate,
          text: updatedDate.format("MMM DD, YYYY"),
          invalid: false,
        },
      });
      get().triggerUpdate();
    } else {
      get().updateState({
        date: {
          invalid: true,
        },
      });
    }
  },
  submitTime() {
    const state = get();
    const time = parseTextTime(state.time.text);

    if (time) {
      const hour = time.get('hour');
      const minute = time.get('minute');
      const updatedTime = (state.time.value || dayjs()).set('hour', hour).set('minute', minute);

      get().updateState({
        time: {
          value: updatedTime,
          text: updatedTime.format('h:mm A'),
          invalid: false
        }
      });
      get().triggerUpdate();
    } else {
      get().updateState({
        time: {
          invalid: true,
        },
      });
    }
  },
  setTimeText(text) {
    get().updateState({ time: { text } })
  },
  previousViewport() {
    const viewport = get().viewport;
    get().updateState({ viewport: viewport.subtract(1, 'M') })
  },
  nextViewport() {
    const viewport = get().viewport;
    get().updateState({ viewport: viewport.add(1, 'M') })
  },
  resetFields() {
    set(prev => ({ ...prev, ...generateDefaults() }));
  },
  init(initialState) {
    const state = get();
    state.updateState({
      date: {
        value: initialState.date,
        text: initialState.date.format("MMM DD, YYYY"),
        invalid: false
      },
      time: {
        value: initialState?.time || null,
        text: initialState?.time.format('h:mm A') || '',
        enabled: true,
        invalid: false
      },
      isToday: dayjs().isSame(initialState.date, 'day'),
      isTomorrow: dayjs().add(1, 'day').isSame(initialState.date, 'day'),
      viewport: initialState.date
    })
  },
  updateOnPickerInputChange(callback) {
    set(prev => ({ ...prev, onPickerInputChange: callback }))
  },
  triggerUpdate() {
    const state = get();
    get().onPickerInputChange?.({ date: state.date.value, time: state.time?.value });
  }
}))

export default useDateTimePickerStore;