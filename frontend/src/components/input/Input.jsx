import React from "react";

function Input(props) {
  return (
    <div className="in">
      <label for="user" class="label">
        {props.label}
      </label>
      <input type={props.type} placeholder={props.placeholder} />
    </div>
  );
}

export default Input;
