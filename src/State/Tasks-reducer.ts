import { TaskStateType } from '../App'
import { v1 } from 'uuid'
import { AddTodolistActionType, RemoveTodolistActionType } from './Todolist-reducer'

type ActionType =
	| RemoveTaskActionType
	| AddTaskActionType
	| ChangeTaskStatusActionType
	| ChangeTaskTitleActionType
	| AddTodolistActionType
	| RemoveTodolistActionType

export type RemoveTaskActionType = {
	type: 'REMOVE-TASK'
	taskID: string
	todoListId: string
}

export type AddTaskActionType = {
	type: 'ADD-TASK'
	title: string
	todoListId: string
}

export type ChangeTaskStatusActionType = {
	type: 'CHANGE-TASK-STATUS'
	id: string
	isDone: boolean
	todoListId: string
}

export type ChangeTaskTitleActionType = {
	type: 'CHANGE-TASK-TITLE'
	id: string
	title: string
	todoListId: string
}

export const tasksReducer = (state: TaskStateType, action: ActionType) => {
	switch (action.type) {
		case 'REMOVE-TASK': {
			let copyState = { ...state }
			let todolistTasks = copyState[action.todoListId]
			copyState[action.todoListId] = todolistTasks.filter((task) => task.id !== action.taskID)
			return copyState
		}
		case 'ADD-TASK': {
			let copyState = { ...state }
			let todolistTasks = [...copyState[action.todoListId]]
			let task = {
				id: v1(),
				title: action.title,
				isDone: false,
			}
			todolistTasks = [task, ...todolistTasks]
			return { ...copyState, [action.todoListId]: todolistTasks }
		}
		case 'CHANGE-TASK-STATUS': {
			let copyState = { ...state }
			let todolistTasks = [...copyState[action.todoListId]].map((task) => {
				if (task.id !== action.id) {
					return task
				} else {
					return { ...task, isDone: action.isDone }
				}
			})
			return { ...copyState, [action.todoListId]: todolistTasks }
		}
		case 'CHANGE-TASK-TITLE': {
			return {
				...state,
				[action.todoListId]: state[action.todoListId].map((task) => {
					if (task.id !== action.id) {
						return task
					} else {
						return { ...task, title: action.title }
					}
				}),
			}
		}
		case 'ADD-TODOLIST': {
			return { ...state, [action.todolistId]: [] }
		}
		case 'REMOVE-TODOLIST': {
			let copyState = { ...state }
			delete copyState[action.id]
			return copyState
		}
		default:
			throw new Error("I don't understand this action type")
	}
}

export const RemoveTaskAC = (taskID: string, todoListId: string): RemoveTaskActionType => {
	return { type: 'REMOVE-TASK', taskID, todoListId }
}

export const AddTaskAC = (title: string, todoListId: string): AddTaskActionType => {
	return { type: 'ADD-TASK', title, todoListId }
}

export const ChangeTaskStatusAC = (id: string, isDone: boolean, todoListId: string): ChangeTaskStatusActionType => {
	return { type: 'CHANGE-TASK-STATUS', id, isDone, todoListId }
}

export const ChangeTaskTitleAC = (id: string, title: string, todoListId: string): ChangeTaskTitleActionType => {
	return { type: 'CHANGE-TASK-TITLE', id, title, todoListId }
}
