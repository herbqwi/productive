'use client'

import classes from './page.module.sass';
import { NSCalendar } from '@/@types/calendar.type';
import useCalendar from '@/hooks/page/calendar/calendar.hook';

import { Button } from '@/components/shared';
import CalendarSideView from '@/components/page/calendar/calendar-side-view/calendar-side-view.component';

export default function Calendar() {
  const calendar = useCalendar();
  const views = Object.values(NSCalendar.View);

  return (<>
    <div className={classes['main-wrapper']}>
      <div className={classes['nav-wrapper']}>
        {views.map(view => (
          <Button
            key={view}
            variant='outstanding'
            selected={calendar.view === view}
            onClick={() => calendar.setView(view)}
          >
            {view}
          </Button>
        ))}
      </div>
      <div className={classes['content-wrapper']}>
        <p>test1</p>
      </div>
    </div>
    <div className={classes['side-wrapper']}>
      <CalendarSideView />
    </div>
  </>);
}
