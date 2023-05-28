import React, { useState } from 'react';
import { FaPlus } from 'react-icons/fa';


import './listCheckList.css'

function ListCheckList() {
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

  return (
    <div className='listCheckContainer'>
    <div className='listCheckContainerInside'>
    <h2 className='listCheckTitle'>Check List</h2>
    <div className='listCheckButtonContainer'>
    <button className='listCheckAddButton' onClick={handleAddTodo}>
    <div className='listCheckAddIcon'><FaPlus /> </div>
     <div className='listCheckAddText'>Add</div>
    </button>
    </div>
    <div className='listCheckToDoContainer'>
      <ul>
        {todos.map((todo, index) => (
          <li key={index} className='listCheckToDo'>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={(event) => handleCheckboxChange(event, index)}
              style={{
                marginRight: '0.5rem'
              }}
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
      </div>
    </div>
  );
}

export default ListCheckList;