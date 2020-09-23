import { TodoListType, FilterValueType } from '../AppWithRedux'
import { v1 } from 'uuid'

type ActionType =
	| RemoveTodolistActionType
	| AddTodolistActionType
	| ChangeTodoListTitleActionType
	| ChangeTodolistFilterActionType

export type RemoveTodolistActionType = {
	type: 'REMOVE-TODOLIST'
	id: string
}

export type AddTodolistActionType = {
	type: 'ADD-TODOLIST'
	title: string
	todolistId: string
}

export type ChangeTodoListTitleActionType = {
	type: 'CHANGE-TODOLIST-TITLE'
	title: string
	id: string
}

export type ChangeTodolistFilterActionType = {
	type: 'CHANGE-TODOLIST-FILTER'
	filter: FilterValueType
	id: string
}

let initialState: TodoListType[] = []


export const todoListReducer = (state: TodoListType[] = initialState, action: ActionType) => {
	switch (action.type) {
		case 'REMOVE-TODOLIST':
			return state.filter((t) => t.id !== action.id)
		case 'ADD-TODOLIST':
			let newTodoList: TodoListType = {
				id: action.todolistId,
				title: action.title,
				filter: 'all',
			}
			return [...state, newTodoList]
		case 'CHANGE-TODOLIST-TITLE':
			const todoList1 = state.find((t) => t.id === action.id)
			if (todoList1) {
				todoList1.title = action.title
				return [...state]
			}
			return state
		case 'CHANGE-TODOLIST-FILTER':
			const todolist = state.find((t) => t.id === action.id)
			if (todolist) {
				todolist.filter = action.filter
				return [...state]
			}
			return state
		default:
			return state
	}
}

export const RemoveTodoListAC = (todoListID: string): RemoveTodolistActionType => {
	return { type: 'REMOVE-TODOLIST', id: todoListID }
}

export const AddTodoListAC = (title: string): AddTodolistActionType => {
	return { type: 'ADD-TODOLIST', title: title, todolistId: v1() }
}

export const ChangeTodoListTitleAC = (todoListID: string, title: string): ChangeTodoListTitleActionType => {
	return { type: 'CHANGE-TODOLIST-TITLE', id: todoListID, title: title }
}

export const ChangeTodoListFilterAC = (todoListID: string, filter: FilterValueType): ChangeTodolistFilterActionType => {
	return { type: 'CHANGE-TODOLIST-FILTER', id: todoListID, filter: filter }
}
