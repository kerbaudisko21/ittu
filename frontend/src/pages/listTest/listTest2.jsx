import React, { useState } from 'react';

function ListTest2() {
  const [todos, setTodos] = useState([]);

  const handleAddTodo = () => {
    setTodos([...todos, { text: '', completed: false }]);
  };

  const handleTodoChange = (event, index) => {
    const newTodos = [...todos];
    newTodos[index].text = event.target.value;
    setTodos(newTodos);
  };

  const handleCheckboxChange = (event, index) => {
    const newTodos = [...todos];
    newTodos[index].completed = event.target.checked;
    setTodos(newTodos);
  };

  const handleTodoBlur = (event, index) => {
    const newTodos = [...todos];
    if (event.target.value === '') {
      newTodos.splice(index, 1);
      setTodos(newTodos);
    }
  };

  console.log(todos)
  return (
    <div>
      <button onClick={handleAddTodo}>Add Todo</button>
      <ul>
        {todos.map((todo, index) => (
          <li key={index} style={{ listStyleType: 'none' }}>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={(event) => handleCheckboxChange(event, index)}
            />
            <input
              type="text"
              value={todo.text}
              onChange={(event) => handleTodoChange(event, index)}
              onBlur={(event) => handleTodoBlur(event, index)}
              style={{
                border: 'none',
                textDecoration: todo.completed ? 'line-through' : 'none',

              }}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ListTest2;