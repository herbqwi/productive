import classes from './tasks-list.module.sass';
import useGlobalStore from '@/stores/global.store';

import Task from './task/task.component';
import { ITask } from '@/@types/tasks';

interface IProps {
  tasks: ITask[];
}

export default function TasksList(props: IProps) {
  return (
    <div className={classes.wrapper}>
      {props.tasks.map(task => (
        <Task key={task.id} task={task} />
      ))}
    </div>
  )
}