import React, { useState, useEffect } from 'react';

export default function createMultiTextInput(parentState) {
  if(parentState == undefined || typeof parentState != "function") throw new Error("First argument to createMultiTextInput must be a function that can get and set the state!");

  return function MultiTextInput(props) {
    const name = props.name || props.id;
    if(name == undefined) throw new Error("MultiTextInput component must have a name or id attribute/property!");

    const defaultValue = parentState(name) || props.default || "";
    const [value, setValue] = useState(defaultValue);

    const labels = props.children
  
    useEffect(function updateParentState() {
      parentState(name, value)
    }, [value]);
    
    return <div className="TextInput MultiTextInput">
      <label htmlFor={name}>{labels}</label><br />

      <textarea id={name} placeholder={props.placeholder} value={value} onChange={ ev => setValue(ev.target.value) }></textarea>
  
    </div>

  }
}
