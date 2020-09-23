import { tasksReducer } from './Tasks-reducer'
import { todoListReducer } from './Todolist-reducer'
import { combineReducers, createStore } from 'redux'

const rootReducer = combineReducers({
	tasks: tasksReducer,
	todoLists: todoListReducer,
})

export const store = createStore(rootReducer)

export type AppRootStateType = ReturnType<typeof rootReducer>

//@ts-ignore
window.store = store
