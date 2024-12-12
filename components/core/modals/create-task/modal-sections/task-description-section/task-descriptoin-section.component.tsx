import TextArea from '@/components/core/textarea/textarea.component';

export default function TaskDescriptionSection() {

  return (
    <TextArea
      name='task-description'
      placeholder='Task Description'
      defaultStyles
    />
  )
}