import React from 'react'
import Task from '../Task'
import { action } from '@storybook/addon-actions'

export default {
	title: 'Task',
	component: Task,
}

const changeTaskTitle = action('Title Changed')
const removeTask = action('Task Removed')
const changeTaskStatus = action('Status Changed')

export const TaskBaseExample = (props: any) => {
	return (
		<>
			<Task
				t={{ id: '1', isDone: true, title: 'CSS' }}
				removeTask={removeTask}
				changeTaskStatus={changeTaskStatus}
				changeTaskTitle={changeTaskTitle}
				todolistId={'todolistId1'}
			/>
			<Task
				t={{ id: '2', isDone: false, title: 'JS' }}
				removeTask={removeTask}
				changeTaskStatus={changeTaskStatus}
				changeTaskTitle={changeTaskTitle}
				todolistId={'todolistId2'}
			/>
		</>
	)
}
