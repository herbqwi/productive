import classes from './create-task-modal.module.sass'
import clsx from 'clsx';
import { ITask, TaskDeadline, TaskPriority, TaskStatus } from '@/@types/tasks';
import { useEffect, useState } from 'react';
import { useModalContext } from '@/contexts/modal.context'
import { Modals } from '@/@types/modal';

import { Alarm, BoxingGlove, Calendar, CheckCircle, Clock, ExclamationMark, Flag, FlagPennant, HourglassSimple, Pencil, X } from '@phosphor-icons/react/dist/ssr';
import ModalField from './modal-field/modal-field.component';
import OptionSelector from './option-selector/option-selector.component';
import DatePicker from './date-picker/date-picker.component';

const initTask: ITask = { title: '', description: '', priority: TaskPriority.MID, status: TaskStatus.TO_DO, deadlineType: TaskDeadline.SOFT_DEADLINE, intervals: [], isRecurring: false, labels: [] }

export default function CreateTaskModal() {
  const { currentModal } = useModalContext();
  const [task, setTask] = useState<ITask>(initTask);

  const updateTask = (newTask: Partial<ITask>) => (
    setTask(prevTask => ({ ...prevTask, ...newTask }))
  )

  useEffect(() => {
    setTimeout(() => {
      updateTask(initTask);
    }, 300);
  }, [currentModal.value])

  return (
    <div className={clsx(classes.wrapper, { [classes.open]: currentModal.value === Modals.NEW_TASK })}>
      <div className={classes.modal}>
        <div className={classes.header}>
          <div className={classes['icon-wrapper']}>
            <Pencil size={20} weight='fill' />
          </div>
          <input
            className={classes.title}
            value={task.title}
            onChange={(e) => { updateTask({ title: e.target.value }) }}
            autoFocus
            placeholder='Task name'
            type="text"
          />
          <button onClick={(() => { currentModal.set(undefined) })}><X size={18} /></button>
        </div>
        <textarea className={classes.description} value={task.description} onChange={(e) => { updateTask({ description: e.target.value }) }} placeholder='Task Description'></textarea>
        <ModalField
          label={<p>Date</p>}
        >
          <DatePicker />
        </ModalField>
        <ModalField
          label={<p>Importance</p>}
        >
          <OptionSelector<TaskPriority>
            options={[
              { label: 'ASAP', value: TaskPriority.ASAP, icon: <ExclamationMark size={15} weight='fill' color='#ff545c' /> },
              { label: 'High', value: TaskPriority.HIGH, icon: <Flag size={15} weight='fill' color='#f87b5f' /> },
              { label: 'Medium', value: TaskPriority.MID, icon: <Flag size={15} weight='fill' color='#ffbb63' /> },
              { label: 'Low', value: TaskPriority.LOW, icon: <FlagPennant size={15} weight='fill' /> }
            ]}
            selectHandler={(priority: TaskPriority) => {
              updateTask({ priority })
            }}
            selectedValue={task.priority}
          />
        </ModalField>
        <ModalField
          label={<p>Status</p>}
        >
          <OptionSelector<TaskStatus>
            options={[
              { label: 'To-Do', value: TaskStatus.TO_DO, icon: <HourglassSimple size={15} weight='fill' /> },
              { label: 'In Progress', value: TaskStatus.IN_PROGRESS, icon: <BoxingGlove size={15} weight='fill' color='#f87b5f' /> },
              { label: 'Completed', value: TaskStatus.COMPLETED, icon: <CheckCircle size={15} weight='fill' color='#6a994e' /> },
            ]}
            selectHandler={(status: TaskStatus) => {
              updateTask({ status })
            }}
            selectedValue={task.status}
          />
        </ModalField>
        <ModalField
          label={<p>Deadline type</p>}
        >
          <OptionSelector<TaskDeadline>
            options={[
              { label: 'Hard deadline', value: TaskDeadline.HARD_DEADLINE, icon: <Alarm size={15} weight='fill' /> },
              { label: 'Soft deadline', value: TaskDeadline.SOFT_DEADLINE, icon: <Clock size={15} weight='fill' /> },
              { label: 'No deadline', value: TaskDeadline.NO_DEADLINE, icon: <Calendar size={15} weight='fill' /> },
            ]}
            selectHandler={(deadlineType: TaskDeadline) => {
              updateTask({ deadlineType })
            }}
            selectedValue={task.deadlineType}
          />
        </ModalField>
      </div>
    </div>
  )
}