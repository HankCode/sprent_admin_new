/*

  First parameter: name of input field


*/

import { useState, useEffect } from 'react';

export default function useParentState(name, parentState) {
  console.log("calling useParentState!");

  const defaultValue = parentState(name);
  const [value, setValue] = useState(defaultValue);

  console.log("useParentState: name=" + name + " defaultValue=" + defaultValue + " value=" + value + " ");

  useEffect(function updateParentState() { parentState(name, value) }, [value]);

  const valueAndOnChange = {
    value: value,
    onChange: function changeValue(ev) {
      setValue(ev.target.value);
    }
  }

  //return [value, setValue, valueAndOnChange];

  return valueAndOnChange;
}