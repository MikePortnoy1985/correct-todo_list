import React, { ChangeEvent } from 'react'
import { FilterValueType, TaskType } from './App'
import './App.css'
import AddItemForm from './AddItemForm'
import EditableSpan from './EditableSpan'

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
	changeTaskTitle: (id: string, title: string, todoListID: string) => void
	changeTodoListTitle: (toDoListID: string, newTitle: string) => void
}

function Todolist(props: PropsType) {

	const addTask = (title: string) => {
		props.addTask(title, props.id)
	}

	const changeTodoListTitle = (title: string) => {
		props.changeTodoListTitle(props.id, title)
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
			<h3>
				<EditableSpan value={props.title} changeValue={changeTodoListTitle} />
				<button
					onClick={() => {
						props.removeToDoList(props.id)
					}}>
					delete
				</button>
			</h3>
			<AddItemForm addItem={addTask} />
			<ul>
				{props.tasks.map((task) => {
					const removeTask = () => props.removeTask(task.id, props.id)

					const changeStatus = (e: ChangeEvent<HTMLInputElement>) => {
						props.changeStatus(task.id, e.currentTarget.checked, props.id)
					}

					const changeTaskTitle = (title: string) => {
						props.changeTaskTitle(task.id, title, props.id)
					}

					return (
						<li key={task.id} className={task.isDone ? 'is-done' : ''}>
							<input
								type='checkbox'
								checked={task.isDone}
								onChange={changeStatus}
							/>
							<EditableSpan
								value={task.title}
								changeValue={changeTaskTitle}
							/>
							<button onClick={removeTask}>x</button>
						</li>
					)
				})}
			</ul>
			<div>
				<button
					onClick={onAllClickHandler}
					className={props.filter === 'all' ? 'active-filter' : ''}>
					All
				</button>
				<button
					onClick={onActiveClickHandler}
					className={props.filter === 'active' ? 'active-filter' : ''}>
					Active
				</button>
				<button
					onClick={onCompletedClickHandler}
					className={props.filter === 'completed' ? 'active-filter' : ''}>
					Completed
				</button>
			</div>
		</div>
	)
}

export default Todolist
