import { TodoItemType } from '../App'
import './Todo.css'

type Props = {
    item: TodoItemType
    key: number
    deleteTodo: (id: number) => void
    editTodo: (item: TodoItemType) => void
}

const Item = (props: Props) => {
    const handleCheckbox = () => {
        const newItem: TodoItemType = props.item
        newItem.done = !newItem.done
        props.editTodo(newItem)
    }
    return (
        <div className={`todo-row ${props.item.done ? 'done' : ''}`}>
            <div className='todo-text'>
                {props.item.text}
            </div>
            <div className='todo-options'>
                <label className='form-control'>
                    <input className='checkbox' type='checkbox' onChange={(e) => handleCheckbox()} checked={props.item.done} />
                </label>
                <button className='delete-button' onClick={(e) => props.deleteTodo(props.item.id)}></button>
            </div>
        </div>
    )
}

export default Item