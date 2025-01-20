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
    start: {
      value: Dayjs;
      text: string;
      invalid: boolean;
    };
    end: {
      value: Dayjs | null;
      text: string;
      enabled: boolean;
      invalid: boolean;
    }
  };
  time: {
    value?: Dayjs | null;
    text: string;
    enabled: boolean;
    invalid: boolean;
  }
  viewport: Dayjs;
  onPickerInputChange?: (props: { date?: Dayjs, time?: Dayjs | null }) => void;
}

interface IActions {
  updateState: (newState: DeepPartial<IState>) => void;
  toggleTimeEnabled: () => void;
  toggleEndDateEnabled: () => void;
  isDateSelected: (date: Dayjs) => boolean;
  isOutOfThisMonth: (date: Dayjs) => boolean;
  setStartingDate: (date: Dayjs) => void;
  setStartDateText: (text: string) => void;
  setEndDate: (date: Dayjs) => void;
  setEndDateText: (text: string) => void;
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
      start: {
        value: dayjs(),
        text: dayjs().format("MMM DD, YYYY"),
        invalid: false
      },
      end: {
        value: null,
        text: '',
        enabled: false,
        invalid: false
      }
    },
    time: {
      value: null,
      text: dayjs().hour(0).minute(0).second(0).format('h:mm A'),
      enabled: true,
      invalid: false
    },
    viewport: dayjs()
  })
}

const useDateTimePickerStore = create<IDateTimePickerStore>((set, get) => ({
  ...generateDefaults(),
  updateState(newState) {
    set(prev => {
      const updatedState = merge(prev, newState);

      return { ...updatedState }
    })
  },
  toggleTimeEnabled() {
    const isTimeEnabled = !get().time.enabled;
    get().updateState({ time: { enabled: isTimeEnabled, value: isTimeEnabled ? get().time.value : null, text: isTimeEnabled ? get().time.text : '' } })
    get().triggerUpdate();
  },
  toggleEndDateEnabled() {
    const isEndDateEnabled = !get().date.end.enabled;
    get().updateState({
      date: {
        end: {
          enabled: isEndDateEnabled,
          value: isEndDateEnabled ? get().date.end.value : null,
          text: isEndDateEnabled ? get().date.end.text : ''
        }
      }
    })
    get().triggerUpdate();
  },
  isDateSelected(date) {
    return get().date.start.value.isSame(date, 'day');
  },
  isOutOfThisMonth(date) {
    return !date.isSame(get().viewport, 'month');
  },
  setStartingDate(date) {
    get().updateState({ date: { start: { value: date, text: date.format("MMM DD, YYYY") } } })
    get().triggerUpdate();
  },
  setStartDateText(text) {
    get().updateState({ date: { start: { text } } })
  },
  setEndDate(date) {
    get().updateState({ date: { end: { value: date, text: date.format("MMM DD, YYYY") } } })
    get().triggerUpdate();
  },
  setEndDateText(text) {
    get().updateState({ date: { end: { text } } })
  },
  submitDate() {
    const state = get();
    const parsedDateText = parseTextDate(state.date.start.text);
    const { value: currentDate } = state.date.start;

    if (parsedDateText) {
      const year = parsedDateText.year() === 2001 ? dayjs().year() : parsedDateText.year();

      const updatedDate = currentDate
        .set("year", year)
        .set("month", parsedDateText.month())
        .set("date", parsedDateText.date());

      get().updateState({
        date: {
          start: {
            value: updatedDate,
            text: updatedDate.format("MMM DD, YYYY"),
            invalid: false,
          }
        },
      });
      get().triggerUpdate();
    } else {
      get().updateState({
        date: {
          start: {
            invalid: true,
          }
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
        start: {
          value: initialState.date,
          text: initialState.date.format("MMM DD, YYYY"),
          invalid: false
        }
      },
      time: {
        value: initialState?.time || null,
        text: initialState?.time.format('h:mm A') || '',
        enabled: true,
        invalid: false
      },
      viewport: initialState.date
    })
  },
  updateOnPickerInputChange(callback) {
    set(prev => ({ ...prev, onPickerInputChange: callback }))
  },
  triggerUpdate() {
    const state = get();
    get().onPickerInputChange?.({ date: state.date.start.value, time: state.time?.value });
  }
}))

export default useDateTimePickerStore;