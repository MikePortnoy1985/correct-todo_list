import React from 'react'
import Todolist from './Todolist'
import AddItemForm from './AddItemForm'
import {
	AddTodoListAC,
} from './State/Todolist-reducer'
import { AppRootStateType } from './State/Store'
import { useDispatch, useSelector } from 'react-redux'
import { Toolbar, IconButton, Typography, Button, AppBar, Container, Grid, Paper } from '@material-ui/core'
import { Menu } from '@material-ui/icons'

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
	let todoLists = useSelector<AppRootStateType, TodoListType[]>((state) => state.todoLists)
	let tasks = useSelector<AppRootStateType, TaskStateType>((state) => state.tasks)
	let dispatch = useDispatch()

	function addTodoList(title: string) {
		const action = AddTodoListAC(title)
		dispatch(action)
	}

	return (
		<div className="App">
			<AppBar position={'static'}>
				<Toolbar>
					<IconButton edge={'start'} color={'inherit'} aria-label={'menu'}>
						<Menu />
					</IconButton>
					<Typography variant={'h6'}>News</Typography>
					<Button color={'inherit'}>Login</Button>
				</Toolbar>
			</AppBar>
			<Container fixed style={{ marginLeft: '60px' }}>
				<Grid container style={{ padding: '20px' }}>
					<AddItemForm addItem={addTodoList} />
				</Grid>
				<Grid container spacing={5}>
					{todoLists.map((list) => {
						let tasksForTodoList = tasks[list.id]
						if (list.filter === 'active') tasksForTodoList = tasks[list.id].filter((t) => !t.isDone)
						if (list.filter === 'completed') tasksForTodoList = tasks[list.id].filter((t) => t.isDone)
						return (
							<Grid item key={list.id}>
								<Paper style={{ padding: '10px' }} elevation={3}>
									<Todolist key={list.id} id={list.id} tasks={tasksForTodoList} />
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
