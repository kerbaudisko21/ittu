import React, { useState } from 'react';
import { FaPlus } from 'react-icons/fa';


import './listCheckList.css'

function ListCheckList({checklist,setChecklist}) {
  
  console.log(checklist)

  const handleAddTodo = () => {
    setChecklist([...checklist, { text: '', completed: false }]);
  };

  const handleTodoChange = (event, index) => {
    const newChecklist = [...checklist];
    newChecklist[index].text = event.target.value;
    setChecklist(newChecklist);
  };

  const handleCheckboxChange = (event, index) => {
    const newChecklist = [...checklist];
    newChecklist[index].completed = event.target.checked;
    setChecklist(newChecklist);
  };

  const handleTodoBlur = (event, index) => {
    const newChecklist = [...checklist];
    if (event.target.value === '') {
      newChecklist.splice(index, 1);
      setChecklist(newChecklist);
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
        {checklist.map((todo, index) => (
          <li key={index} className='listCheckToDo'>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={(event) => handleCheckboxChange(event, index)}
              style={{
                marginRight: '0.5rem',
                accentColor:'white'
              }}
            />
            <input
              type="text"
              value={todo.text}
              onChange={(event) => handleTodoChange(event, index)}
              onBlur={(event) => handleTodoBlur(event, index)}
              style={{
                outline: 'none',
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