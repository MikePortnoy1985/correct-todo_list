import React, { useEffect, useState } from 'react'
import todolistAPI from '../api/todolist-api'

export default {
	title: 'API',
}

export const GetTodolists = () => {
	const [state, setState] = useState<any>(null)
	useEffect(() => {
		todolistAPI.GetTodo().then((res) => setState(res))
	}, [])

	return <div> {JSON.stringify(state)}</div>
}

export const CreateTodolist = () => {
	const [state, setState] = useState<any>(null)

	useEffect(() => {
		const title = 'Initiale Title'
		todolistAPI.CreateTodo(title).then((res) => setState(res))
	}, [])
	return <div> {JSON.stringify(state)}</div>
}

export const DeleteTodolist = () => {
	const [state, setState] = useState<any>(null)
	useEffect(() => {
		const todolistId = '41bbac5c-e948-4edc-a5f6-d1f1896550da'
		todolistAPI.DeleteTodo(todolistId).then((res) => setState(res))
	}, [])

	return <div> {JSON.stringify(state)}</div>
}

export const UpdateTodolistTitle = () => {
	const [state, setState] = useState<any>(null)
	useEffect(() => {
		const title = 'Updated Title2'
		const todolistId = '1e3e2898-2518-4003-8652-86a8e379a9ae'
		todolistAPI.updateTodo(todolistId, title).then((res) => {
			setState(res.data)
		})
	}, [])

	return <div> {JSON.stringify(state)}</div>
}
