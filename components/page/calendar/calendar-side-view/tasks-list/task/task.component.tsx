import { ITask } from '@/@types/tasks';
import classes from './task.module.sass';
import Checkbox from '@/components/shared/checkbox/checkbox.component';
import dayjs, { Dayjs } from 'dayjs';
import { Button } from '@/components/shared';
import { ModalUtils } from '@/util';
import { ModalType } from '@/@types/modal.types';
import { useRef } from 'react';

interface IProps {
  task: ITask;
}

export default function Task(props: IProps) {
  const title = props.task.title;
  const startDate = props.task.intervals?.startDate;
  const endDate = props.task.intervals?.endDate;

  const formatTime = (time: Dayjs) => (
    time.format('hh:MM A')
  )

  return (
    <div className={classes.wrapper}>
      <Checkbox />
      <div className={classes.content}>
        <p>{title}</p>
        <Button variant='icon'>
          <>
            {startDate ? formatTime(startDate) : ''}
            &nbsp;-&nbsp;
            {endDate ? formatTime(endDate) : ''}
          </>
        </Button>
      </div>
    </div>
  )
}