import { useState, useEffect } from 'react'
import Todo from '../Todo/Todo'
import { TodoItemType } from '../App'
import './TodosList.css'

type Props = {
    todos: TodoItemType[]
    deleteTodo: (id: number) => void
    editTodo: (item: TodoItemType) => void
}

const TodosList = (props: Props) => {
    const [filteredTodos, setFilteredTodos] = useState([] as TodoItemType[])
    const [filterText, setFilterText] = useState('')
    const [filterStatus, setFilterStatus] = useState('all')
    const [showFilters, setShowFilters] = useState(false)
    const handleSearch = (value: string) => {
      setFilterText(value)
    }
    const handleFilterSelect = (value: string) => {
        console.log(value)
        setFilterStatus(value)
    }
    const applyFilter = (searchText: string, todos: TodoItemType[]) => {
        return todos.filter(todo => {
            return (todo.text.toLowerCase().indexOf(searchText.toLowerCase()) !== -1 
            && ((filterStatus === 'done' && todo.done)
                || (filterStatus === 'notDone' && !todo.done)
                || (filterStatus === 'all'))
            )
        })
    }
    const toggleShowFilters = () => {
        setShowFilters(!showFilters)
    }
    useEffect(() => {
        setFilteredTodos(applyFilter(filterText, props.todos))
      }, [props.todos, filterText, filterStatus])
    return (
        <div>
            <div className='filter-wrapper'>
                <div className='filter-toggle-container'>
                    <button className='filter-toggle' onClick={()=>toggleShowFilters()}>Filters {showFilters ? '▲' : '▼'}</button>
                </div>
                <div className={`filter-options ${showFilters ? '' : 'hidden'}`}>
                    <input 
                        className='text-input small'
                        type='text'
                        placeholder='Search entries...'
                        onChange={(e) => handleSearch(e.target.value)}
                        value={filterText}
                    />
                    <select className='filter-dropdown' onChange={(e) => handleFilterSelect(e.target.value)} value={filterStatus}>
                        <option value='all'>Show all</option>
                        <option value='done'>Show finished</option>
                        <option value='notDone'>Show unfinished</option>
                    </select>
                </div>
            </div>
            {filteredTodos.map(item => {
                return <Todo item={item} key={item.id} deleteTodo={props.deleteTodo} editTodo={props.editTodo} />
            })}
        </div>
    )
}

export default TodosList