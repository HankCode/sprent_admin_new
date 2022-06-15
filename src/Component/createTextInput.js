import React, { useState, useEffect } from 'react';
import useParentState from '../hooks/useParentState.js';

export default function createTextInput(parentState) {
  if(parentState == undefined || typeof parentState != "function") throw new Error("First argument to createTextInput must be a function that can get and set the state!");
  
  return function TextInput(props) {

    console.log("calling TextInput!");

    const name = props.name || props.id;
    if(name == undefined) throw new Error("TextInput component must have a name or id attribute/property!");

    const defaultValue = parentState(name) || props.default || "";
    //const [value, setValue] = useState(defaultValue);

    //const [value, setValue] = useParentState(name, parentState);

    const valueAndOnChange = useParentState(name, parentState);

    const labels = props.children;
  
    //useEffect(function updateParentState() { parentState(name, value) }, [value]);
    
    //console.log("render TextInput name=" + name + " value=" + value);

    // <input id={name} type="text" placeholder={props.placeholder} value={value} onChange={ ev => setValue(ev.target.value) } />

    return <div className="TextInput">
      <label htmlFor={name}>{labels}</label><br />

      <input id={name} type="text" placeholder={props.placeholder} {...valueAndOnChange} />
    </div>

  }
}


