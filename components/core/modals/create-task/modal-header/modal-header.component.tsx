import classes from './modal-header.module.sass'
import { useModalStore } from '@/stores';

import Input from '@/components/core/input/input.component';
import { Pencil, X } from '@phosphor-icons/react/dist/ssr'

export default function ModalHeader() {
  const closeModal = useModalStore(state => state.close);

  return (
    <div className={classes.wrapper}>
      <div className={classes['icon-wrapper']}>
        <Pencil size={20} weight='fill' />
      </div>
      <Input
        name='task-name'
        className={classes.title}
        placeholder='Task name'
        type="text"
        validationHandler={(text) => !!text}
      />
      <button type='button' onClick={closeModal}><X size={18} /></button>
    </div>
  )
}