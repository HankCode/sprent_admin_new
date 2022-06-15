import React, { useState, useEffect } from 'react';

export default function createDateInput(parentState) {
  if(parentState == undefined || typeof parentState != "function") throw new Error("First argument to createDateInput must be a function that can get and set the state!");

  return function DateInput(props) {
    const name = props.name || props.id;
    if(name == undefined) throw new Error("DateInput component must have a name or id attribute/property!");

    const defaultValue = parentState(name) || props.default || "";
    const [value, setValue] = useState(defaultValue);

    const labels = props.children;
    
    useEffect(function updateParentState() {
      parentState(name, value)
    }, [value]);
    
    return <div className="TextInput DateInput">
      <label htmlFor={name}>{labels}</label><br />

      <input id={name} type="date" placeholder={props.placeholder} value={value} onChange={ ev => setValue(ev.target.value) } />
    </div>

  }
}
