import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

dayjs.extend(customParseFormat);

export default function parseTextTime(text: string) {
  const timeText = text.toUpperCase();
  const formats = [
    "h:mm A",
    "h:mmA",
    "h A",
    "hA",
    "HH:mm",
    "H:mm",
    "HH",
    "h",
    "HHmm",
    "Hmm",
    "hmm A",
    "hmmA",
    "h:mm:ss A",
    "h:mm:ssA",
    "HH:mm:ss",
    "H:mm:ss"
  ];

  for (const format of formats) {
    const parsed = dayjs(timeText, format, true);
    if (parsed.isValid()) {
      return parsed;
    }
  }

  return null;
}