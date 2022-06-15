import React, { useState, useEffect } from 'react';

export default function createInputUrl(parentState) {
  if(parentState == undefined || typeof parentState != "function") throw new Error("First argument to createInputUrl must be a function that can get and set the state!");

  return function InputUrl(props) {
    const name = props.name || props.id;
    if(name == undefined) throw new Error("InputUrl component must have a name or id attribute/property!");

    const defaultValue = parentState(name) || props.default || "";
    const [value, setValue] = useState(defaultValue);

  const [valid, setValid] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const labels = props.children
  
    useEffect(function updateParentState() {
      parentState(name, value)
    }, [value]);
    
  function change(ev) {
    const value = ev.target.value;

    // var lastState = state.valid;

    if(value.indexOf(".") == -1 && value.length) {
      setValid(false);
      setErrorMessage("Must contain at least one dot | Måste innehålla punk");
    } else {
      setValid(true);
      setErrorMessage("");
    }

    /* if(lastState == false && valid == true) {
      // Some sort of animation, show a green checkbox!?
    } */

    setState(value);

    // setState({value, valid, errorMessage});
  }

  const validationState = valid ? 'valid':'invalid';

  return <div className={"TextInput InputUrl " + validationState}>
    <label htmlFor={name}>{labels}</label> <span className="error">{errorMessage}</span><br />

      <input id={name} type="text" placeholder={props.placeholder} value={value} onChange={change} />
  </div>

}
}
