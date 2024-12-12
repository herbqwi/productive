import classes from './date-time-picker-modal.module.sass';

import { SuggestionsSection, HeaderSection, CalendarSection } from './sections';


export default function DateTimePickerModal() {

  return (
    <div className={classes.wrapper}>
      <SuggestionsSection />
      <HeaderSection />
      <CalendarSection />
    </div>
  )
}