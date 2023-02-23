import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
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
    <StTodoList>
      <StTodoListContainer>
        {todos.map((todo) => (
          <div key={todo.id}>
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
          </div>
        ))}
      </StTodoListContainer>
      <div>
        <input
          type='text'
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
        />
        <button onClick={handleAddTodo}>Add Todo</button>
      </div>
    </StTodoList>
  );
};

export default TodoList;

const StTodoList = styled.div`
  width: 100%;
  height: 160px;
  margin: 2rem auto;
  border: 1px solid #e0e0e0;
  border-radius: 5px;
`;
const StTodoListContainer = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid #e0e0e0;
`;
