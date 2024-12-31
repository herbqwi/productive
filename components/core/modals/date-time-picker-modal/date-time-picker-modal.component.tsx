import classes from './date-time-picker-modal.module.sass';

import { ControlsSection, HeaderSection, CalendarSection } from './sections';


export default function DateTimePickerModal() {
  return (
    <div className={classes.wrapper}>
      <ControlsSection />
      <HeaderSection />
      <CalendarSection />
    </div>
  )
}