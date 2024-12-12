import { TaskPriority } from "@/@types/tasks";

import { ExclamationMark, Flag, FlagPennant } from "@phosphor-icons/react/dist/ssr";
import OptionSelector from "../option-selector/option-selector.component";
import ModalField from "../../modal-field/modal-field.component";

export default function PrioritySection() {

  return (
    <ModalField label={<p>Importance</p>}>
      <OptionSelector<TaskPriority>
        name="priority"
        defaultValue={TaskPriority.MID}
        options={[
          { label: 'ASAP', value: TaskPriority.ASAP, icon: <ExclamationMark size={15} weight='fill' color='#ff545c' /> },
          { label: 'High', value: TaskPriority.HIGH, icon: <Flag size={15} weight='fill' color='#f87b5f' /> },
          { label: 'Medium', value: TaskPriority.MID, icon: <Flag size={15} weight='fill' color='#ffbb63' /> },
          { label: 'Low', value: TaskPriority.LOW, icon: <FlagPennant size={15} weight='fill' /> }
        ]}
      />
    </ModalField>
  )
}