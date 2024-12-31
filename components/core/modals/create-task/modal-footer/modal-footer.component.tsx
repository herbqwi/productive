import classes from './modal-footer.module.sass'
import { useForm } from '@/contexts/form.context'

import { Button } from '@/components/shared'

export default function ModalFooter() {
  const form = useForm();

  return (
    <div className={classes.wrapper}>
      <Button
        variant='main'
        shortcut={{
          buttons: ['Enter']
        }}
        type='submit'
      >
        Create task
      </Button>
      {!form.isValid && (
        <p>Please fill the &apos;Task name&apos; field</p>
      )}
    </div>
  )
}