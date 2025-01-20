import classes from './calendar-side-view.module.sass';
import { v4 as uuid } from 'uuid';
import { ModalType } from '@/@types/modal.types';
import { ModalUtils } from '@/util';

import { Accordions, Button } from '@/components/shared';
import { Plus } from '@phosphor-icons/react/dist/ssr';
import TasksList from './tasks-list/tasks-list.componnet';
import useGlobalStore from '@/stores/global.store';
import groupTasksByDay from '@/util/group-tasks-by-day.util';
import dayjs from 'dayjs';
import { IAccordionGroup } from '@/components/shared/accordions/accordions.component';
import { useEffect } from 'react';

function getLabelForDate(date: dayjs.Dayjs) {
  const today = dayjs();
  if (date.isSame(today, 'day')) {
    return 'Today';
  } else if (date.isSame(today.add(1, 'day'), 'day')) {
    return 'Tomorrow';
  } else {
    return 'Later';
  }
}

export default function CalendarSideView() {
  const allTasks = useGlobalStore(state => state.tasks);
  const groupedTasks = groupTasksByDay(allTasks);

  useEffect(() => {
    console.log('allTasks: ', allTasks);
  }, [allTasks])

  console.log('groupedTasks: ', groupedTasks);

  const accordionsGroups: IAccordionGroup[] = groupedTasks.map(tasks => {
    const startDate = dayjs(tasks[0]?.intervals?.startDate || dayjs());
    const label = getLabelForDate(startDate);

    return {
      id: uuid(),
      summary: (
        <div className={classes['accordion-summary']}>
          <p>{label}</p>
          <p>{startDate.format('ddd, D MMM')}</p>
        </div>
      ),
      children: <TasksList tasks={tasks} />
    }
  })


  const handleOpenCreateNewTaskModal = () => (
    ModalUtils.open({ type: ModalType.NEW_TASK })
  )

  return (
    <div className={classes.wrapper}>
      <Button
        variant='outstanding'
        selected
        prefixIcon={<Plus size={18} weight='bold' />}
        onClick={handleOpenCreateNewTaskModal}
      >
        Create a new task
      </Button>
      <Accordions
        groups={accordionsGroups}
      />
    </div>
  )
}