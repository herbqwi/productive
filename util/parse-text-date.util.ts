import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

dayjs.extend(customParseFormat);

export default function parseTextDate(text: string) {
  const dateText = text.toUpperCase();
  const formats = [
    'MM DD, YYYY',
    'MMM DD, YYYY',
    'MMMM DD, YYYY',
    'YYYY-MM-DD',
    'MM-DD-YYYY',
    'DD-MM-YYYY',
    'YYYY/MM/DD',
    'MM/DD/YYYY',
    'DD/MM/YYYY',
    'MMMM D, YYYY',
    'MMM D, YYYY',
    'MMMM DD, YYYY',
    'D MMMM YYYY',
    'D MMM YYYY',
    'MMMM D',
    'MMM D',
    'D MMMM',
    'D MMM',
    'YYYY MMM D',
    'YYYY MMMM D',
    'D MMMM, YYYY',
    'D MMM, YYYY',
    'MMMM Do, YYYY',
    'MMM Do, YYYY',
    'Do MMMM YYYY',
    'Do MMM YYYY',
    'YYYY.MM.DD',
    'MM.DD.YYYY',
    'DD.MM.YYYY',
    'YYYY MM DD',
    'MM DD YYYY',
    'DD MM YYYY',
    'YYYY',
    'MMMM YYYY',
    'MMM YYYY',
    'MMM DD',
    'MMMM DD',
    'Do MMM',
    'Do MMMM',
    'MMMM D, YYYY',
    'MMM D, YYYY',
    'MMMM D',
    'MMM D',
    'D MMMM, YYYY',
    'D MMM, YYYY',
    'MMMM YYYY',
    'MMM YYYY',
    'D MMMM',
    'D MMM',
    'MMMM',
    'MMM',
    'MM',
    'D'
  ];

  for (const format of formats) {
    const parsed = dayjs(dateText, format, false);
    if (parsed.isValid()) {
      return parsed;
    }
  }

  return null;
}
