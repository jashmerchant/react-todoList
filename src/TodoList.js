import React, { Component } from 'react';
import NewTodoForm from './NewTodoForm';
import Todo from './Todo';
import { v4 as uuidv4 } from 'uuid';
import './TodoList.css'

class TodoList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            todos: [
                { id: uuidv4(), task: "Visit Hagrid", completed: false },
                { id: uuidv4(), task: "Buy new wand", completed: false },
                { id: uuidv4(), task: "Study Potions", completed: false },
            ]
        }
        this.generateTodo = this.generateTodo.bind(this);
        this.removeTodo = this.removeTodo.bind(this);
        this.updateTodo = this.updateTodo.bind(this);
        this.toggleComplete = this.toggleComplete.bind(this);
    }
    // Function to add a new todo to the todos array
    generateTodo(newTodo) {
        let modifiedTodo = { ...newTodo, id: uuidv4() };
        this.setState({
            todos: [...this.state.todos, modifiedTodo]
        })
    }
    // Funtion to remove a todo from the todos array
    removeTodo(id) {
        this.setState({
            todos: this.state.todos.filter(todo => todo.id !== id)
        })
    }
    // Funtion to update a todo in the todos array
    updateTodo(id, updatedTask) {
        const updatedTodos = this.state.todos.map(todo => {
            if (todo.id === id) {
                return { ...todo, task: updatedTask }
            }
            return todo;
        });
        this.setState({
            todos: updatedTodos
        });
    }
    // Function to toggle todo
    toggleComplete(id) {
        const updatedTodos = this.state.todos.map(todo => {
            if (todo.id === id) {
                return { ...todo, completed: !todo.completed }
            }
            return todo;
        });
        this.setState({
            todos: updatedTodos
        });
    }
    render() {
        return (
            <div className="TodoList">
                <h1>Todo List! <span>A Simple React Todo List App.</span></h1>
                <ul>
                    {this.state.todos.map(todo => (
                        <Todo
                            key={todo.id}
                            id={todo.id}
                            task={todo.task}
                            completed={todo.completed}
                            removeTodo={() => this.removeTodo(todo.id)}
                            updateTodo={this.updateTodo}
                            toggleComplete={this.toggleComplete}
                        />
                    ))}
                </ul>
                <NewTodoForm generateTodo={this.generateTodo} />
            </div>
        )
    }
}

export default TodoList;