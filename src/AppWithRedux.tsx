import React, { useCallback } from 'react'
import AddItemForm from './AddItemForm'
import {
	AddTodoListAC,
	ChangeTodoListFilterAC,
	ChangeTodoListTitleAC,
	RemoveTodoListAC,
} from './State/Todolist-reducer'
import { AppRootStateType } from './State/Store'
import { useDispatch, useSelector } from 'react-redux'
import { AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography } from '@material-ui/core'
import { Menu } from '@material-ui/icons'
import { AddTaskAC, ChangeTaskStatusAC, ChangeTaskTitleAC, RemoveTaskAC } from './State/Tasks-reducer'
import CompTodolist from './CompTodolist'

export type TaskType = {
	id: string
	title: string
	isDone: boolean
}

export type FilterValueType = 'all' | 'active' | 'completed'

export type TodoListType = {
	id: string
	title: string
	filter: FilterValueType
}

export type TaskStateType = {
	[key: string]: Array<TaskType>
}

function AppWithRedux() {
	const todolists = useSelector<AppRootStateType, Array<TodoListType>>((state) => state.todoLists)
	const tasks = useSelector<AppRootStateType, TaskStateType>((state) => state.tasks)
	const dispatch = useDispatch()

	const removeTask = useCallback(
		(id: string, todolistId: string) => {
			const action = RemoveTaskAC(id, todolistId)
			dispatch(action)
		},
		[dispatch],
	)

	const addTask = useCallback(
		(title: string, todolistId: string) => {
			const action = AddTaskAC(title, todolistId)
			dispatch(action)
		},
		[dispatch],
	)

	const changeStatus = useCallback(
		(id: string, isDone: boolean, todolistId: string) => {
			const action = ChangeTaskStatusAC(id, isDone, todolistId)
			dispatch(action)
		},
		[dispatch],
	)

	const changeTaskTitle = useCallback(
		(id: string, newTitle: string, todolistId: string) => {
			const action = ChangeTaskTitleAC(id, newTitle, todolistId)
			dispatch(action)
		},
		[dispatch],
	)

	const changeFilter = useCallback(
		(value: FilterValueType, todolistId: string) => {
			const action = ChangeTodoListFilterAC(todolistId, value)
			dispatch(action)
		},
		[dispatch],
	)

	const removeTodolist = useCallback(
		(id: string) => {
			const action = RemoveTodoListAC(id)
			dispatch(action)
		},
		[dispatch],
	)

	const changeTodolistTitle = useCallback(
		(id: string, title: string) => {
			const action = ChangeTodoListTitleAC(id, title)
			dispatch(action)
		},
		[dispatch],
	)

	const addTodolist = useCallback(
		(title: string) => {
			const action = AddTodoListAC(title)
			dispatch(action)
		},
		[dispatch],
	)

	return (
		<div className="App">
			<AppBar position="static">
				<Toolbar>
					<IconButton edge="start" color="inherit" aria-label="menu">
						<Menu />
					</IconButton>
					<Typography variant="h6">Menu</Typography>
					<Button color="inherit">Login</Button>
				</Toolbar>
			</AppBar>
			<Container fixed>
				<Grid key={1} container style={{ padding: '20px' }}>
					<AddItemForm addItem={addTodolist} />
				</Grid>
				<Grid container key={2} spacing={3}>
					{todolists.map((tl) => {
						let tasksForTodolist = tasks[tl.id]
						return (
							<Grid item key={tl.id}>
								<Paper style={{ padding: '10px' }}>
									<CompTodolist
										id={tl.id}
										title={tl.title}
										tasks={tasksForTodolist}
										removeTask={removeTask}
										changeFilter={changeFilter}
										addTask={addTask}
										changeTaskStatus={changeStatus}
										filter={tl.filter}
										removeTodolist={removeTodolist}
										changeTaskTitle={changeTaskTitle}
										changeTodolistTitle={changeTodolistTitle}
									/>
								</Paper>
							</Grid>
						)
					})}
				</Grid>
			</Container>
		</div>
	)
}

export default AppWithRedux
