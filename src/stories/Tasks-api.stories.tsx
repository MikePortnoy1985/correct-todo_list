import React, { useEffect, useState } from 'react'
import tasksApi from '../api/tasks-api'

export default {
	title: 'Tasks API',
}

export const GetTask = () => {
	const [state, setState] = useState<any>(null)
	useEffect(() => {
		const todolistId = '1e3e2898-2518-4003-8652-86a8e379a9ae'
		tasksApi.GetTask(todolistId).then((res) => setState(res))
	}, [])

	return <div> {JSON.stringify(state)}</div>
}

export const CreateTask = () => {
	const [state, setState] = useState<any>(null)

	useEffect(() => {
		const todolistId = '1e3e2898-2518-4003-8652-86a8e379a9ae'
		const title = 'Initial Task Title'
		tasksApi.CreateTask(todolistId, title).then((res) => setState(res))
	}, [])
	return <div> {JSON.stringify(state)}</div>
}

export const DeleteTask = () => {
	const [state, setState] = useState<any>(null)
	useEffect(() => {
		const todolistId = '1e3e2898-2518-4003-8652-86a8e379a9ae'
		const taskId = '121e0da7-b6b9-415f-b8f6-e87e9659cac8'
		tasksApi.DeleteTask(todolistId, taskId).then((res) => setState(res))
	}, [])

	return <div> {JSON.stringify(state)}</div>
}

export const UpdateTodolistTitle = () => {
	const [state, setState] = useState<any>(null)
	useEffect(() => {
		const title = 'Updated Title2'
		const todolistId = '1e3e2898-2518-4003-8652-86a8e379a9ae'
		const taskId = '94f299bb-bdb0-4af8-ae17-f34a1132a241'
		tasksApi.updateTask(todolistId, taskId, title).then((res) => {
			setState(res.data)
		})
	}, [])

	return <div> {JSON.stringify(state)}</div>
}
