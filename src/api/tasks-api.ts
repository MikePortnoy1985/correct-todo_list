import axios from 'axios'

const instance = axios.create({
	baseURL: 'https://social-network.samuraijs.com/api/1.1/todo-lists/',
	withCredentials: true,
	headers: {
		'API-KEY': '449db723-8aa5-493f-9ee5-86de5ac1dae8',
	},
})

const tasksApi = {
	GetTask(todolistId: string) {
		return instance.get(`${todolistId}/tasks`)
	},
	CreateTask(todolistId: string, title: string) {
		return instance.post(`${todolistId}/tasks`, { title })
	},

	DeleteTask(todolistId: string, taskId: string) {
		return instance.delete(`${todolistId}/tasks/${taskId}`)
	},

	updateTask(todolistId: string, taskId: string, title: string) {
		return instance.put(`${todolistId}/tasks/${taskId}`, { title })
	},
}

export default tasksApi
