import {
	todoListReducer,
	RemoveTodoListAC,
	ChangeTodoListTitleAC,
	ChangeTodoListFilterAC,
	AddTodoListAC,
} from './Todolist-reducer'
import { v1 } from 'uuid'
import { TodoListType, FilterValueType } from '../App'
import { tasksReducer } from './Tasks-reducer'

test('correct todolist should be removed', () => {
	let todolistId1 = v1()
	let todolistId2 = v1()

	const startState: Array<TodoListType> = [
		{ id: todolistId1, title: 'What to learn', filter: 'all' },
		{ id: todolistId2, title: 'What to buy', filter: 'all' },
	]

	const endState = todoListReducer(startState, RemoveTodoListAC(todolistId1))

	expect(endState.length).toBe(1)
	expect(endState[0].id).toBe(todolistId2)
})

test('property with todolistId should be deleted', () => {
	let todolistId1 = v1()
	let todolistId2 = v1()

	const startState: Array<TodoListType> = [
		{ id: todolistId1, title: 'What to learn', filter: 'all' },
		{ id: todolistId2, title: 'What to buy', filter: 'all' },
	]

	const startStateTasks = {
		[todolistId1]: [],
		[todolistId2]: [],
	}

	const action = RemoveTodoListAC(todolistId1)
	const endStateTodolists = todoListReducer(startState, action)
	const endStateTasks = tasksReducer(startStateTasks, action)
	const tasksId = Object.keys(endStateTasks)

	expect(endStateTodolists.length).toBe(1)
	expect(endStateTodolists[0].id).toBe(todolistId2)
	expect(tasksId.length).toBe(1)
})

test('correct taskList should be added', () => {
	let todolistId1 = v1()
	let todolistId2 = v1()

	let newTodolistTitle = 'New Todolist'

	const startStateTodolist: Array<TodoListType> = [
		{ id: todolistId1, title: 'What to learn', filter: 'all' },
		{ id: todolistId2, title: 'What to buy', filter: 'all' },
	]

	const startStateTasks = {
		[todolistId1]: [],
		[todolistId2]: [],
	}

	const action = AddTodoListAC(newTodolistTitle)

	const endStateTodolists = todoListReducer(startStateTodolist, action)
	const endStateTasks = tasksReducer(startStateTasks, action)

	const todolistId = endStateTodolists[2].id
	const tasksId = Object.keys(endStateTasks)

	expect(endStateTodolists.length).toBe(3)
	expect(endStateTodolists[2].title).toBe(newTodolistTitle)
	expect(endStateTodolists[2].filter).toBe('all')
	expect(todolistId).toBeDefined()
	expect(todolistId).toBe(tasksId[2])
})

test('correct todolist should be added', () => {
	let todolistId1 = v1()
	let todolistId2 = v1()

	let newTodolistTitle = 'New Todolist'

	const startState: Array<TodoListType> = [
		{ id: todolistId1, title: 'What to learn', filter: 'all' },
		{ id: todolistId2, title: 'What to buy', filter: 'all' },
	]

	const endState = todoListReducer(startState, AddTodoListAC(newTodolistTitle))

	expect(endState.length).toBe(3)
	expect(endState[2].title).toBe(newTodolistTitle)
})

test('correct todolist should change its name', () => {
	let todolistId1 = v1()
	let todolistId2 = v1()

	let newTodolistTitle = 'New Todolist'

	const startState: Array<TodoListType> = [
		{ id: todolistId1, title: 'What to learn', filter: 'all' },
		{ id: todolistId2, title: 'What to buy', filter: 'all' },
	]

	const endState = todoListReducer(startState, ChangeTodoListTitleAC(todolistId2, newTodolistTitle))

	expect(endState[0].title).toBe('What to learn')
	expect(endState[1].title).toBe(newTodolistTitle)
})

test('correct filter of todolist should be changed', () => {
	let todolistId1 = v1()
	let todolistId2 = v1()

	let newFilter: FilterValueType = 'completed'

	const startState: Array<TodoListType> = [
		{ id: todolistId1, title: 'What to learn', filter: 'all' },
		{ id: todolistId2, title: 'What to buy', filter: 'all' },
	]

	const endState = todoListReducer(startState, ChangeTodoListFilterAC(todolistId2, newFilter))

	expect(endState[0].filter).toBe('all')
	expect(endState[1].filter).toBe(newFilter)
})
