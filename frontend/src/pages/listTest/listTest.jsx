import React, { useState } from 'react';

const ListTest = ({ data }) => {
  const [query, setQuery] = useState('');

  const handleInputChange = event => {
    setQuery(event.target.value);
  };

  const filteredData = data.filter(item => {
    return item.name.toLowerCase().includes(query.toLowerCase());
  });

  return (
    <div>
      <input type="text" value={query} onChange={handleInputChange} />
      <ul>
        {filteredData.map(item => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default ListTest;