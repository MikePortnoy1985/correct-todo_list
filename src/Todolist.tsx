import React, { ChangeEvent } from 'react'
import { TaskType, TodoListType } from './AppWithRedux'
import AddItemForm from './AddItemForm'
import EditableSpan from './EditableSpan'
import { useDispatch, useSelector } from 'react-redux'
import { AppRootStateType } from './State/Store'
import {AddTaskAC, ChangeTaskStatusAC, ChangeTaskTitleAC, RemoveTaskAC} from './State/Tasks-reducer'
import {ChangeTodoListFilterAC, ChangeTodoListTitleAC, RemoveTodoListAC} from './State/Todolist-reducer'
import { IconButton, Button, Checkbox } from '@material-ui/core'
import { Delete } from '@material-ui/icons'

type PropsType = {
	key: string
	id: string
	tasks: Array<TaskType>
}

function Todolist(props: PropsType) {
	let todo = useSelector<AppRootStateType, TodoListType | undefined>((state) =>
		state.todoLists.find((todo) => {
			return todo && todo.id === props.id
		}),
	)
	let dispatch = useDispatch()

	const addTask = (title: string) => {
		dispatch(AddTaskAC(title, todo ? todo.id : ''))
	}

	const changeTodoListTitle = (title: string) => {
		dispatch(ChangeTodoListTitleAC(todo ? todo.id : '', title))
	}

	const onAllClickHandler = () => {
		dispatch(ChangeTodoListFilterAC(todo ? todo.id : '', 'all'))
	}

	const onActiveClickHandler = () => {
		dispatch(ChangeTodoListFilterAC(todo ? todo.id : '', 'active'))
	}

	const onCompletedClickHandler = () => {
		dispatch(ChangeTodoListFilterAC(todo ? todo.id : '', 'completed'))
	}

	return (
		<div>
			<h3>
				<EditableSpan value={todo ? todo.title : ''} changeValue={changeTodoListTitle} />
				<IconButton
					onClick={() => {
						dispatch(RemoveTodoListAC(todo ? todo.id : ''))
					}}>
					<Delete />
				</IconButton>
			</h3>
			<AddItemForm addItem={addTask} />
			<ul style={{ listStyle: 'none', paddingLeft: '0' }}>
				{props.tasks.map((task) => {
					const removeTask = () => dispatch(RemoveTaskAC(task.id, todo ? todo.id : ''))

					const changeStatus = (e: ChangeEvent<HTMLInputElement>) => {
						dispatch(ChangeTaskStatusAC(task.id, e.currentTarget.checked, props.id))
					}

					const changeTaskTitle = (title: string) => {
						dispatch(ChangeTaskTitleAC(task.id, title, todo ? todo.id : ''))
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
					variant={todo && todo.filter === 'all' ? 'contained' : 'outlined'}
					color={todo && todo.filter === 'all' ? 'secondary' : 'primary'}
					onClick={onAllClickHandler}>
					All
				</Button>
				<Button
					variant={todo && todo.filter === 'active' ? 'contained' : 'outlined'}
					color={todo && todo.filter === 'active' ? 'secondary' : 'primary'}
					onClick={onActiveClickHandler}>
					Active
				</Button>
				<Button
					variant={todo && todo.filter === 'completed' ? 'contained' : 'outlined'}
					color={todo && todo.filter === 'completed' ? 'secondary' : 'primary'}
					onClick={onCompletedClickHandler}>
					Completed
				</Button>
			</div>
		</div>
	)
}

export default Todolist
