import React, { useState } from 'react'
import Todolist from './Todolist'
import { v1 } from 'uuid'
import AddItemForm from './AddItemForm'
import { Toolbar, IconButton, Typography, Button, AppBar, Container, Grid, Paper } from '@material-ui/core'
import { Menu } from '@material-ui/icons'

export type TaskType = {
	id: string
	title: string
	isDone: boolean
}

export type FilterValueType = 'all' | 'active' | 'completed'

type TodoListType = {
	id: string
	title: string
	filter: FilterValueType
}

type TaskStateType = {
	[key: string]: Array<TaskType>
}

function App() {
	let todoListID1 = v1()
	let todoListID2 = v1()

	let [todoLists, setTodoLists] = useState<Array<TodoListType>>([
		{ id: todoListID1, title: 'What to learn', filter: 'all' },
		{ id: todoListID2, title: 'What to buy', filter: 'active' },
	])

	let [tasks, setTasks] = useState<TaskStateType>({
		[todoListID1]: [
			{ id: v1(), title: 'JS', isDone: false },
			{ id: v1(), title: 'CSS', isDone: false },
			{ id: v1(), title: 'React', isDone: false },
			{ id: v1(), title: 'Redux', isDone: false },
		],
		[todoListID2]: [
			{ id: v1(), title: 'Dog', isDone: false },
			{ id: v1(), title: 'Cat', isDone: false },
			{ id: v1(), title: 'Pig', isDone: false },
			{ id: v1(), title: 'Horse', isDone: false },
		],
	})

	function changeFilter(value: FilterValueType, todolistID: string) {
		let todoList = todoLists.find((tl) => tl.id === todolistID)
		if (todoList) {
			todoList.filter = value
			setTodoLists([...todoLists])
		}
	}

	function removeTask(taskID: string, todoListID: string) {
		let todolist = tasks[todoListID]
		tasks[todoListID] = todolist.filter((task) => task.id !== taskID)
		setTasks({ ...tasks })
	}

	function addTask(title: string, todolistID: string) {
		let newTask = { id: v1(), title: title, isDone: false }
		let todoList = tasks[todolistID]
		tasks[todolistID] = [newTask, ...todoList]
		setTasks({ ...tasks })
	}

	function changeStatus(id: string, isDone: boolean, todoListID: string) {
		let todoList = tasks[todoListID]
		let task = todoList.find((t) => t.id === id)
		if (task) {
			task.isDone = isDone
			setTasks({ ...tasks })
		}
	}

	function changeTaskTitle(id: string, title: string, todoListID: string) {
		let todoList = tasks[todoListID]
		let task = todoList.find((t) => t.id === id)
		if (task) {
			task.title = title
			setTasks({ ...tasks })
		}
	}

	function addTodoList(title: string) {
		let newTodoListID = v1()
		let newTodoList: TodoListType = {
			id: newTodoListID,
			title: title,
			filter: 'all',
		}
		setTodoLists([...todoLists, newTodoList])
		setTasks({
			...tasks,
			[newTodoListID]: [],
		})
	}

	function removeToDoList(toDoListID: string) {
		let newToDoLists = todoLists.filter((t) => t.id !== toDoListID)
		setTodoLists(newToDoLists)
		delete tasks[toDoListID]
		setTasks({ ...tasks })
	}

	function changeTodoListTitle(toDoListID: string, newTitle: string) {
		let todoList = todoLists.find((t: TodoListType) => t.id === toDoListID)
		if (todoList) {
			todoList.title = newTitle
			setTodoLists([...todoLists])
		}
	}

	return (
		<div className='App'>
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
									<Todolist
										key={list.id}
										id={list.id}
										title={list.title}
										tasks={tasksForTodoList}
										removeTask={removeTask}
										changeFilter={changeFilter}
										addTask={addTask}
										changeStatus={changeStatus}
										filter={list.filter}
										removeToDoList={removeToDoList}
										changeTaskTitle={changeTaskTitle}
										changeTodoListTitle={changeTodoListTitle}
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

export default App
