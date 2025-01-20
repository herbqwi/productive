'use client'

import classes from './create-task-modal.module.sass'
import { Form } from '@/contexts';

import ModalHeader from './modal-header/modal-header.component';
import ModalContent from './modal-content/modal-content.component';
import ModalFooter from './modal-footer/modal-footer.component';
import { IFormField } from '@/contexts/form.context';
import { FormEvent } from 'react';
import { TaskDeadline, TaskPriority, TaskStatus } from '@/@types/tasks';
import { Dayjs } from 'dayjs';
import useGlobalStore from '@/stores/global.store';
import { useModalStore } from '@/stores';

export default function CreateTaskModal() {
  const addTask = useGlobalStore(store => store.addTask);
  const closeModal = useModalStore(state => state.close);

  const submitHandler = (fields: Map<string, IFormField<any>>) => {
    const title: string = fields.get('task-name')?.value
    const description: string = fields.get('task-description')?.value
    const dateTime: { date: Dayjs, time: Dayjs } = fields.get('date-time')?.value
    const priority: TaskPriority = fields.get('priority')?.value
    const status: TaskStatus = fields.get('status')?.value
    const deadline: TaskDeadline = fields.get('deadline')?.value

    addTask({
      title,
      description,
      priority,
      status,
      deadline,
      intervals: {
        startDate: dateTime.date,
        endDate: dateTime.date,
      }
    });
    closeModal();
  }

  return (
    <Form className={classes.modal} onFinish={submitHandler}>
      <ModalHeader />
      <ModalContent />
      <ModalFooter />
    </Form>
  )
}