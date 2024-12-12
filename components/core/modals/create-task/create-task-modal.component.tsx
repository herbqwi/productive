'use client'

import classes from './create-task-modal.module.sass'
import { Form } from '@/contexts';

import ModalHeader from './modal-header/modal-header.component';
import ModalContent from './modal-content/modal-content.component';
import ModalFooter from './modal-footer/modal-footer.component';

export default function CreateTaskModal() {

  return (
    <Form className={classes.modal} onSubmit={() => { console.log('Submitted') }}>
      <ModalHeader />
      <ModalContent />
      <ModalFooter />
    </Form>
  )
}