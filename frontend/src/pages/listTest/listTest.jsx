import { useState } from "react";

function ListTest() {
  const [data, setData] = useState([
    { id: 1, name: "John", hobbies: ["reading", "swimming"] },
    { id: 2, name: "Jane", hobbies: ["running", "hiking"] },
  ]);

  const addHobby = (id, hobby) => {
    setData((prevData) =>
      prevData.map((person) =>
        person.id === id
          ? { ...person, hobbies: [...person.hobbies, hobby] }
          : person
      )
    );
  };

  console.log(data);
  return (
    <div>
      <ul>
        {data.map((person) => (
          <li key={person.id}>
            {person.name}
            <ul>
              {person.hobbies.map((hobby) => (
                <li key={hobby}>{hobby}</li>
              ))}
            </ul>
            <button onClick={() => addHobby(person.id, "new hobby")}>
              Add Hobby
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ListTest;