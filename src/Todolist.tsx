import React, {ChangeEvent, KeyboardEvent, useState} from 'react'
import {FilterValueType, TaskType} from './App'
import './App.css'

type PropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    filter: FilterValueType
    removeTask: (taskID: string, todoListID: string) => void
    changeFilter: (value: FilterValueType, todoListID: string) => void
    addTask: (title: string, todoListID: string) => void
    changeStatus: (id: string, isDone: boolean, todoListID: string) => void
    removeToDoList: (todoListID: string) => void
}

export function Todolist(props: PropsType) {

    let [title, setTitle] = useState<string>('')
    let [error, setError] = useState<string | null>(null)

    const addTask = () => {
        if (title.trim()) {
            props.addTask(title.trim(), props.id)
            setTitle('')
        } else {
            setError('Title is required!!!')
        }
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setError(null)
        setTitle(e.currentTarget.value)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (e.charCode === 13) {
            addTask()
        }
    }

    const onAllClickHandler = () => {
        props.changeFilter('all', props.id)
    }

    const onActiveClickHandler = () => {
        props.changeFilter('active', props.id)
    }

    const onCompletedClickHandler = () => {
        props.changeFilter('completed', props.id)
    }

    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input
                    value={title}
                    onChange={onChangeHandler}
                    onKeyPress={onKeyPressHandler}
                    className={error ? 'error' : ''}
                />
                <button onClick={addTask}>add</button>
                {error && <div className={'error-message'}>{error}</div>}
                <button onClick={() => {props.removeToDoList(props.id)}}>delete</button>
            </div>
            <ul>{props.tasks.map(task => {

                const removeTask = () => props.removeTask(task.id, props.id)

                const changeStatus = (e: ChangeEvent<HTMLInputElement>) => {
                    props.changeStatus(task.id, e.currentTarget.checked, props.id)
                }

                return (
                    <li key={task.id} className={task.isDone ? 'is-done' : ''}>
                        <input type='checkbox' checked={task.isDone} onChange={changeStatus}/>
                        <span>{task.title}</span>
                        <button onClick={removeTask}>x</button>
                    </li>
                )
            })
            }
            </ul>
            <div>
                <button onClick={onAllClickHandler} className={props.filter === 'all' ? 'active-filter' : ''}>All
                </button>
                <button onClick={onActiveClickHandler}
                        className={props.filter === 'active' ? 'active-filter' : ''}>Active
                </button>
                <button onClick={onCompletedClickHandler}
                        className={props.filter === 'completed' ? 'active-filter' : ''}>Completed
                </button>
            </div>
        </div>
    )
}

