import React, { useState, useEffect } from 'react';
import useParentState from '../hooks/useParentState.js';

export default function createNumericInput(parentState) {
  if(parentState == undefined || typeof parentState != "function") throw new Error("First argument to createNumericInput must be a function that can get and set the state!");

  return function NumericInput(props) {
    const name = props.name || props.id;
    if(name == undefined) throw new Error("MultiTextInput component must have a name or id attribute/property!");

    const valueAndOnChange = useParentState(name, parentState);

    const labels = props.children

    useEffect(function test() {
      console.log("effect NumericInput valueAndOnChange.value=" + valueAndOnChange.value);
    }, [valueAndOnChange.value]);
    
    return <div className="TextInput NumericInput">
      <label htmlFor={name}>{labels}</label><br />

      <input id={name} type="number" placeholder={props.placeholder} {...valueAndOnChange} />
    </div>

  }
}
