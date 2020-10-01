import { Checkbox, IconButton } from '@material-ui/core'
import EditableSpan from './EditableSpan'
import { Delete } from '@material-ui/icons'
import React, { ChangeEvent, useCallback } from 'react'
import { TaskType } from './AppWithRedux'

export type PropsType = {
	t: TaskType
	todolistId: string
	removeTask: (taskId: string, todolistId: string) => void
	changeTaskStatus: (id: string, isDone: boolean, todolistId: string) => void
	changeTaskTitle: (taskId: string, newTitle: string, todolistId: string) => void
}

const Task = React.memo((props: PropsType) => {
	const onClickHandler = () => props.removeTask(props.t.id, props.todolistId)

	const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
		let newIsDoneValue = e.currentTarget.checked
		props.changeTaskStatus(props.t.id, newIsDoneValue, props.todolistId)
	}

	const onTitleChangeHandler = useCallback(
		(newValue: string) => {
			props.changeTaskTitle(props.t.id, newValue, props.todolistId)
		},
		[props.changeTaskTitle, props.t.id, props.todolistId],
	)

	return (
		<div key={props.t.id} className={props.t.isDone ? 'is-done' : ''}>
			<Checkbox checked={props.t.isDone} color="primary" onChange={onChangeHandler} />

			<EditableSpan value={props.t.title} onChange={onTitleChangeHandler} />
			<IconButton onClick={onClickHandler}>
				<Delete />
			</IconButton>
		</div>
	)
})
export default Task
