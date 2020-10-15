import axios from 'axios'

const instance = axios.create({
	baseURL: 'https://social-network.samuraijs.com/api/1.1',
	withCredentials: true,
	headers: {
		'API-KEY': '449db723-8aa5-493f-9ee5-86de5ac1dae8',
	},
})

type TodolistType = {
	id: string
	title: string
	addedDate: string
	order: number
}

type ResponseType<T> = {
	data: T
	messages: string[]
	fieldsErrors: string[]
	resultCode: number
}

const todolistAPI = {
	GetTodo() {
		return instance.get<Array<TodolistType>>(`/todo-lists/`)
	},
	CreateTodo(title: string) {
		return instance.post<ResponseType<{ item: TodolistType }>>(`/todo-lists/`, { title })
	},

	DeleteTodo(todolistId: string) {
		return instance.delete<ResponseType<{}>>(`/todo-lists/${todolistId}`)
	},

	updateTodo(todolistId: string, title: string) {
		return instance.put<ResponseType<{ item: string }>>(`/todo-lists/${todolistId}`, { title })
	},
}

export default todolistAPI
