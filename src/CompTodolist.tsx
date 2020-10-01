import React, { useCallback } from 'react'
import { FilterValueType, TaskType } from './AppWithRedux'
import AddItemForm from './AddItemForm'
import EditableSpan from './EditableSpan'
import { Button, IconButton } from '@material-ui/core'
import { Delete } from '@material-ui/icons'
import Task from './Task'

type PropsType = {
	id: string
	title: string
	tasks: Array<TaskType>
	removeTask: (taskId: string, todolistId: string) => void
	changeFilter: (value: FilterValueType, todolistId: string) => void
	addTask: (title: string, todolistId: string) => void
	changeTaskStatus: (id: string, isDone: boolean, todolistId: string) => void
	removeTodolist: (id: string) => void
	changeTodolistTitle: (id: string, newTitle: string) => void
	filter: FilterValueType
	changeTaskTitle: (taskId: string, newTitle: string, todolistId: string) => void
}

export const CompTodolist = React.memo((props: PropsType) => {
	const addTask = useCallback(
		(title: string) => {
			props.addTask(title, props.id)
		},
		[props.addTask, props.id],
	)

	const removeTodolist = useCallback(() => {
		props.removeTodolist(props.id)
	}, [props.removeTodolist, props.id])

	const changeTodolistTitle = useCallback(
		(title: string) => {
			props.changeTodolistTitle(props.id, title)
		},
		[props.changeTodolistTitle, props.id],
	)

	let tasksForTodolist = props.tasks
	if (props.filter === 'active') {
		tasksForTodolist = props.tasks.filter((t) => !t.isDone)
	}
	if (props.filter === 'completed') {
		tasksForTodolist = props.tasks.filter((t) => t.isDone)
	}

	const onAllClickHandler = useCallback(() => props.changeFilter('all', props.id), [props.changeFilter, props.id])
	const onActiveClickHandler = useCallback(() => props.changeFilter('active', props.id), [
		props.changeFilter,
		props.id,
	])
	const onCompletedClickHandler = useCallback(() => props.changeFilter('completed', props.id), [
		props.changeFilter,
		props.id,
	])

	return (
		<div>
			<h3>
				<EditableSpan value={props.title} onChange={changeTodolistTitle} />
				<IconButton onClick={removeTodolist}>
					<Delete />
				</IconButton>
			</h3>
			<AddItemForm addItem={addTask} />
			<div>
				{tasksForTodolist.map((t) => (
					<Task
						key={t.id}
						t={t}
						todolistId={props.id}
						removeTask={props.removeTask}
						changeTaskStatus={props.changeTaskStatus}
						changeTaskTitle={props.changeTaskTitle}
					/>
				))}
			</div>
			<div style={{ paddingTop: '10px' }}>
				<Button
					variant={props.filter === 'all' ? 'outlined' : 'text'}
					onClick={onAllClickHandler}
					color={'default'}>
					All
				</Button>
				<Button
					variant={props.filter === 'active' ? 'outlined' : 'text'}
					onClick={onActiveClickHandler}
					color={'primary'}>
					Active
				</Button>
				<Button
					variant={props.filter === 'completed' ? 'outlined' : 'text'}
					onClick={onCompletedClickHandler}
					color={'secondary'}>
					Completed
				</Button>
			</div>
		</div>
	)
})

export default CompTodolist
