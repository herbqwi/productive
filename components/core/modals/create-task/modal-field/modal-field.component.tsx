import classes from './modal-field.module.sass'

interface IProps {
  label: React.ReactNode;
  children?: React.ReactNode;
}

export default function ModalField(props: IProps) {
  return (
    <div className={classes.field}>
      {props.label}
      {props.children}
    </div>
  )
}