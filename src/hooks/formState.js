import { useState, useEffect } from 'react';

export function useFormData(defaultValues) {
  
  const [formData, setFormData] = useState(defaultValues);

  return [
    formData,
    setFormData,
    function formState(name, value) {
      // Function for updating the form data from a child component
      console.log("formState: name=" + name + " value=" + value);
      // Used both for getting and setting form state
      if(value !== undefined) {
        formData[name] = value;
        setFormData(formData);
      }
      return formData[name];
    }
  ];

}

export function useFormtState(name, parentState) {
  console.log("calling useFormtState!");

  const defaultValue = parentState(name);
  const [value, setValue] = useState(defaultValue);

  console.log("useFormtState: name=" + name + " defaultValue=" + defaultValue + " value=" + value + " ");

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
