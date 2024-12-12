import { DateAndTimePickerSection, DeadlineTypeSection, PrioritySection, StatusSection, TaskDescriptionSection } from "../modal-sections";

export default function ModalContent() {
  return (
    <>
      <TaskDescriptionSection />
      <DateAndTimePickerSection />
      <PrioritySection />
      <StatusSection />
      <DeadlineTypeSection />
    </>
  )
}