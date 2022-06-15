import { useState } from "react";

export default initialValue => {
  const [value, setValue] = useState(initialValue || '');

  return [
    value,
    setValue,
    () => setValue(""),
    {
      value,
      onChange: event => {
        setValue(event.target.value);
      }
    }
  ];
};
