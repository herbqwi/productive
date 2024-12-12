import ModalField from "../../modal-field/modal-field.component";
import DateTimePicker from "../../date-time-picker-modal/picker-input/picker-input.component";

export default function DateTimePickerSection() {
  return (
    <ModalField label={<p>Date and Time</p>}>
      <DateTimePicker name="date-time" />
    </ModalField>
  )
}