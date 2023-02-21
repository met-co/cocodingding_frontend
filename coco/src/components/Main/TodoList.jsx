import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  toggleTodo,
  deleteTodo,
  addTodo,
  editTodo,
} from '../../redux/modules/todoSlice';

const TodoList = () => {
  const todos = useSelector((state) => state.todos);
  const dispatch = useDispatch();
  const [newTodo, setNewTodo] = useState('');

  const handleToggleTodo = (id) => {
    dispatch(toggleTodo(id));
  };

  const handleDeleteTodo = (id) => {
    dispatch(deleteTodo(id));
  };

  const handleAddTodo = () => {
    if (newTodo.trim()) {
      dispatch(
        addTodo({
          id: Date.now(),
          text: newTodo,
          completed: false,
        })
      );
      setNewTodo('');
    }
  };

  const handleEditTodo = (id, newText) => {
    if (newText.trim()) {
      dispatch(
        editTodo({
          id,
          text: newText,
        })
      );
    }
  };

  return (
    <div>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <input
              type='checkbox'
              checked={todo.completed}
              onChange={() => handleToggleTodo(todo.id)}
            />
            <span
              style={{
                textDecoration: todo.completed ? 'line-through' : 'none',
              }}
            >
              {todo.text}
            </span>
            <button onClick={() => handleDeleteTodo(todo.id)}>Delete</button>
            <button
              onClick={() =>
                handleEditTodo(
                  todo.id,
                  prompt('Enter new todo text', todo.text)
                )
              }
            >
              Edit
            </button>
          </li>
        ))}
      </ul>
      <div>
        <input
          type='text'
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
        />
        <button onClick={handleAddTodo}>Add Todo</button>
      </div>
    </div>
  );
};

export default TodoList;
