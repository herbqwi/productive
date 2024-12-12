import { Button } from '@/components/shared'
import classes from './modal-footer.module.sass'
import { useForm } from '@/contexts/form.context'

export default function ModalFooter() {
  const form = useForm();

  return (
    <div className={classes.wrapper}>
      <Button
        text='Create task'
        variant='main'
        shortcut={{
          buttons: ['Enter']
        }}
        type='submit'
      />
      {!form.isValid && (
        <p>Please fill the 'Task name' field</p>
      )}
    </div>
  )
}