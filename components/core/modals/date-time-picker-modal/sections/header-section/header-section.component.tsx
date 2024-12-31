import classes from './header-section.module.sass';
import { useDateTimePickerStore } from '@/stores';

import { CaretLeft, CaretRight } from '@phosphor-icons/react/dist/ssr';
import StartDateInputSection from './start-date-section/start-date-input-section.component copy';
import EndDateInputSection from './start-date-section/end-date-input-section.component';

export default function HeaderSection() {
  const viewport = useDateTimePickerStore(state => state.viewport);
  const nextViewport = useDateTimePickerStore(state => state.nextViewport);
  const previousViewport = useDateTimePickerStore(state => state.previousViewport);

  return (
    <div className={classes.wrapper}>
      <StartDateInputSection />
      <EndDateInputSection />
      <div className={classes['month-info']}>
        <p>{viewport.format('MMMM YYYY')}</p>
        <div className={classes.actions}>
          <button aria-label='Previous month' title='Previous month' onClick={previousViewport}><CaretLeft size={17} weight='bold' /></button>
          <button aria-label='Next month' title='Next month' onClick={nextViewport}><CaretRight size={17} weight='bold' /></button>
        </div>
      </div>
    </div>
  )
}