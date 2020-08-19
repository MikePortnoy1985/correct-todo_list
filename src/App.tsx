import React, {useState} from 'react'
import './App.css'
import {Todolist} from './Todolist'
import {v1} from 'uuid'

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
        {id: todoListID1, title: 'What to learn', filter: 'all'},
        {id: todoListID2, title: 'What to buy', filter: 'active'}
    ])

    let [tasks, setTasks] = useState<TaskStateType>({
        [todoListID1]: [
            {id: v1(), title: 'JS', isDone: false},
            {id: v1(), title: 'CSS', isDone: true},
            {id: v1(), title: 'React', isDone: false},
            {id: v1(), title: 'Redux', isDone: false}
        ],
        [todoListID2]: [
            {id: v1(), title: 'Dog', isDone: false},
            {id: v1(), title: 'Cat', isDone: true},
            {id: v1(), title: 'Pig', isDone: false},
            {id: v1(), title: 'Horse', isDone: false}
        ]
    })

    function changeFilter(value: FilterValueType, todolistID: string) {
        let todoList = todoLists.find(tl => tl.id === todolistID)
        if (todoList) {
            todoList.filter = value
            setTodoLists([...todoLists])
        }
    }

    function removeTask(taskID: string, todoListID: string) {
        let todolist = tasks[todoListID]
        todolist.filter(task => task.id !== taskID)
        setTasks({...tasks})
    }

    function addTask(title: string, todolistID: string) {
        let newTask = {id: v1(), title: title, isDone: false}
        let todoList = tasks[todolistID]
        tasks[todolistID] = [newTask, ...todoList]
        setTasks({...tasks})
    }

    function changeStatus(id: string, isDone: boolean, todoListID: string) {
        let todoList = tasks[todoListID]
        let task = todoList.find((t) => t.id === id)
        if (task) {
            task.isDone = isDone
            setTasks({...tasks})
        }
    }

    function removeToDoList(toDoListID: string) {
        let newToDoLists = todoLists.filter((t) => t.id !== toDoListID)
        setTodoLists(newToDoLists)
        delete tasks[toDoListID]
        setTasks({...tasks})
    }

    return (
        <div className='App'>

            {todoLists.map((list) => {
                let tasksForTodoList = tasks[list.id]
                if (list.filter === 'active') tasksForTodoList = tasks[list.id].filter(t => !t.isDone)
                if (list.filter === 'completed') tasksForTodoList = tasks[list.id].filter(t => t.isDone)
                return (
                    <Todolist
                        key={list.id} // для key типизация не нужна. ts не следит за key
                        id={list.id}
                        title={list.title}
                        tasks={tasksForTodoList}
                        removeTask={removeTask}
                        changeFilter={changeFilter}
                        addTask={addTask}
                        changeStatus={changeStatus}
                        filter={list.filter}
                        removeToDoList={removeToDoList}
                    />
                )
            })
            }
        </div>
    )
}

export default App
