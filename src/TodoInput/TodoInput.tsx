import { FormEvent, useState } from 'react'
import './TodoInput.css'

type Props = {
  addNewTodo: (text: string) => void
}

const TodoInput = (props: Props) => {
    const [text, setText] = useState('')
    const handleInput = (value: string) => {
      setText(value)
    }
    const submit = (e: FormEvent) => {
      e.preventDefault()
      if(text){
        props.addNewTodo(text)
        setText('')
      }
    }
    return (
      <form className='input-form' onSubmit={(e) => submit(e)}>
          <input className='text-input' placeholder='What do you need to do?' onChange={(e) => handleInput(e.target.value)} value={text} type='text' />
          <button className='submit-button' type='submit'>Go!</button> 
      </form>
    )
}

export default TodoInput