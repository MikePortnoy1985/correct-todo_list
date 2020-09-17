import { AddTaskAC, ChangeTaskStatusAC, ChangeTaskTitleAC, RemoveTaskAC, tasksReducer } from './Tasks-reducer'
import { TaskStateType } from '../App'

test('correct task should be deleted from correct array', () => {
	const startState: TaskStateType = {
		todolistId1: [
			{ id: '1', title: 'CSS', isDone: false },
			{ id: '2', title: 'JS', isDone: true },
			{ id: '3', title: 'React', isDone: false },
		],
		todolistId2: [
			{ id: '1', title: 'bread', isDone: false },
			{ id: '2', title: 'milk', isDone: true },
			{ id: '3', title: 'tea', isDone: false },
		],
	}

	const action = RemoveTaskAC('2', 'todolistId2')

	const endState = tasksReducer(startState, action)

	expect(endState['todolistId1'].length).toBe(3)
	expect(endState['todolistId2'].length).toBe(2)
	expect(endState['todolistId2'].every((t) => t.id != '2')).toBeTruthy()
})

test('correct task should be added to correct array', () => {
	const startState: TaskStateType = {
		todolistId1: [
			{ id: '1', title: 'CSS', isDone: false },
			{ id: '2', title: 'JS', isDone: true },
			{ id: '3', title: 'React', isDone: false },
		],
		todolistId2: [
			{ id: '1', title: 'bread', isDone: false },
			{ id: '2', title: 'milk', isDone: true },
			{ id: '3', title: 'tea', isDone: false },
		],
	}

	const action = AddTaskAC('juice', 'todolistId2')

	const endState = tasksReducer(startState, action)

	expect(endState['todolistId1'].length).toBe(3)
	expect(endState['todolistId2'].length).toBe(4)
	expect(endState['todolistId2'][0].id).toBeDefined()
	expect(endState['todolistId2'][0].title).toBe('juice')
	expect(endState['todolistId2'][0].isDone).toBe(false)
})

test('status of specified task should be changed', () => {
	const startState: TaskStateType = {
		todolistId1: [
			{ id: '1', title: 'CSS', isDone: false },
			{ id: '2', title: 'JS', isDone: true },
			{ id: '3', title: 'React', isDone: false },
		],
		todolistId2: [
			{ id: '1', title: 'bread', isDone: false },
			{ id: '2', title: 'milk', isDone: true },
			{ id: '3', title: 'tea', isDone: false },
		],
	}

	const action = ChangeTaskStatusAC('2', false, 'todolistId2')

	const endState = tasksReducer(startState, action)

	expect(endState['todolistId1'].length).toBe(3)
	expect(endState['todolistId2'].length).toBe(3)
	expect(endState['todolistId2'][1].isDone).toBe(false)
	expect(endState['todolistId1'][1].isDone).toBe(true)
})

test('correct task should change title', () => {
	const startState: TaskStateType = {
		todolistId1: [
			{ id: '1', title: 'CSS', isDone: false },
			{ id: '2', title: 'JS', isDone: true },
			{ id: '3', title: 'React', isDone: false },
		],
		todolistId2: [
			{ id: '1', title: 'bread', isDone: false },
			{ id: '2', title: 'milk', isDone: true },
			{ id: '3', title: 'tea', isDone: false },
		],
	}

	const action = ChangeTaskTitleAC('2', 'beer', 'todolistId2')

	const endState = tasksReducer(startState, action)

	expect(endState['todolistId1'].length).toBe(3)
	expect(endState['todolistId2'].length).toBe(3)
	expect(endState['todolistId2'][1].title).toBe('beer')
	expect(endState['todolistId1'][1].title).toBe('JS')
})