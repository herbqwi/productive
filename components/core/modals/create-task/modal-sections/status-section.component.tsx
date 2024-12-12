import { TaskStatus } from "@/@types/tasks";

import { BoxingGlove, CheckCircle, HourglassSimple } from "@phosphor-icons/react/dist/ssr";
import OptionSelector from "../option-selector/option-selector.component";
import ModalField from "../../modal-field/modal-field.component";

export default function StatusSection() {
  return (
    <ModalField
      label={<p>Status</p>}
    >
      <OptionSelector<TaskStatus>
        name="status"
        defaultValue={TaskStatus.TO_DO}
        options={[
          { label: 'To-Do', value: TaskStatus.TO_DO, icon: <HourglassSimple size={15} weight='fill' /> },
          { label: 'In Progress', value: TaskStatus.IN_PROGRESS, icon: <BoxingGlove size={15} weight='fill' color='#f87b5f' /> },
          { label: 'Completed', value: TaskStatus.COMPLETED, icon: <CheckCircle size={15} weight='fill' color='#6a994e' /> },
        ]}
      />
    </ModalField>
  )
}