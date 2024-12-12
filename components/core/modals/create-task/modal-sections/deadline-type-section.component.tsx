import { TaskDeadline } from "@/@types/tasks";

import { Alarm, Calendar, Clock } from "@phosphor-icons/react/dist/ssr";
import OptionSelector from "../option-selector/option-selector.component";
import ModalField from "../../modal-field/modal-field.component";

export default function DeadlineTypeSection() {
  return (
    <ModalField
      label={<p>Deadline type</p>}
    >
      <OptionSelector<TaskDeadline>
        name="deadline"
        defaultValue={TaskDeadline.SOFT_DEADLINE}
        options={[
          { label: 'Hard deadline', value: TaskDeadline.HARD_DEADLINE, icon: <Alarm size={15} weight='fill' /> },
          { label: 'Soft deadline', value: TaskDeadline.SOFT_DEADLINE, icon: <Clock size={15} weight='fill' /> },
          { label: 'No deadline', value: TaskDeadline.NO_DEADLINE, icon: <Calendar size={15} weight='fill' /> },
        ]}
      />
    </ModalField>
  )
}