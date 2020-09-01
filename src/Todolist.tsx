import React, { ChangeEvent } from 'react'
import { FilterValueType, TaskType } from './App'
import AddItemForm from './AddItemForm'
import EditableSpan from './EditableSpan'
import { IconButton, Button, Checkbox } from '@material-ui/core'
import { Delete } from '@material-ui/icons'

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
				<IconButton
					onClick={() => {
						props.removeToDoList(props.id)
					}}>
					<Delete />
				</IconButton>
			</h3>
			<AddItemForm addItem={addTask} />
			<ul style={{listStyle: 'none', paddingLeft: '0'}}>
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
							<Checkbox color={'primary'} checked={task.isDone} onChange={changeStatus} />
							<EditableSpan value={task.title} changeValue={changeTaskTitle} />
							<Button onClick={removeTask}>
								<Delete />
							</Button>
						</li>
					)
				})}
			</ul>
			<div>
				<Button
					variant={props.filter === 'all' ? 'contained' : 'outlined'}
					color={props.filter === 'all' ? 'secondary' : 'primary'}
					onClick={onAllClickHandler}>
					All
				</Button>
				<Button
					variant={props.filter === 'active' ? 'contained' : 'outlined'}
					color={props.filter === 'active' ? 'secondary' : 'primary'}
					onClick={onActiveClickHandler}>
					Active
				</Button>
				<Button
					variant={props.filter === 'completed' ? 'contained' : 'outlined'}
					color={props.filter === 'completed' ? 'secondary' : 'primary'}
					onClick={onCompletedClickHandler}>
					Completed
				</Button>
			</div>
		</div>
	)
}

export default Todolist
