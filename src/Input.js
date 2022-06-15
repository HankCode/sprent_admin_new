import React, { useState, useEffect } from "react";

import useInput from './hooks/useInput';
import Select, { Numbers } from './HRStatus';

const Checkbox = ({ set, input, label, className }) => {
  const initChecked = input === true;
  const [checked, setChecked] = useState(initChecked);
  const toggleChange = () => setChecked(!checked === true);

  useEffect(() => {
    if (checked !== initChecked) {
      set(checked);
    }
  }, [checked]);

  return (
    <div className={className}>
      <label className="input-label">
        <input
          className="mr-2"
          type="checkbox"
          value
          onChange={toggleChange}
          checked={checked}
        />
        {label}
      </label>
    </div>
  );
}

const Radio = ({ set, input, label, placeholder, helper, className }) => {
  const initComment = input.comment || '';
  const [comment, a, b, bindComment] = useInput(initComment);

  const initChecked = input.checked === true;
  const [checked, setChecked] = useState(initChecked);
  const toggleChange = () => setChecked(!checked === true);

  const help = () => alert(helper || placeholder);

  useEffect(() => {
    if (checked !== initChecked || comment !== initComment) {
      set({ comment,
        checked,
      });
    }
  }, [checked, comment]);

  return (
    <div className={className}>
      <div className="justify-between flex">
        <label className="input-label">
          <input
            className="mr-2"
            type="checkbox"
            value
            onChange={toggleChange}
            checked={checked}
          />
          {label}
        </label>
        {
          (helper || placeholder)
          && (
            <span title={helper || placeholder} className="text-xs helper" onClick={help}>?</span>
          )
        }
      </div>
      {
        (
          true || // skippa true i denna om man endast får fylla i kommentar om checkboxen är i fylld
          checked
        ) && (
          <label className="input-label">
            Kommentar
            <br />
            <br />
            <input
              className="input"
              placeholder={placeholder}
              {...bindComment}
            />
          </label>
        )
      }
      <br />
    </div>
  );
}


export default ({ label, initialValue, set, id, placeholder, type = 'text', min, max, suffix, className, helper, options }) => {
  const [item, setItem, a, bindItem] = useInput(initialValue);

  const setNumbers = ({ currentTarget: { value }}) => setItem(value);
  const setCheckbox = (data) => {
    console.log('set from checkbox', data);
    setItem(data);
  };

  useEffect(() => {
    set(id, item);
  }, [item]);

  if (type === 'spacer') {
    return (<div />);
  }

  if (type === 'checkbox') {
    return (
      <Checkbox
        label={label}
        set={setCheckbox}
        input={item}
        className={className}
      />
    );
  }

  if (type === 'radio') {
    return (
      <Radio
        label={label}
        set={setCheckbox}
        input={item}
        placeholder={placeholder}
        helper={helper}
        className={className}
      />
    );
  }

  if (type === 'number') {
    return (
      <div className={`bg-gray-100 p-2 ${className}`}>
        <Numbers
          label={label}
          currentState={item}
          onChange={setNumbers}
          suffix={suffix}
          min={min}
          max={max}
          block
        />
      </div>
    );
  }

  if (type === 'select') {
    return (
      <div className={`bg-gray-100 p-2 ${className}`}>
        <Select
          label={label}
          currentState={item}
          onChange={setNumbers}
          states={options}
          block
          empty={false}
        />
      </div>
    );
  }

  return (
    <div className={className || ''}>
      <label className="input-label">
        {label}
        <br />
        <br />
        {
          type === 'textarea'
            ? (
              <textarea className="input" {...bindItem} />
            ) : (
              <input
                className="input"
                placeholder={placeholder || label}
                {...bindItem}
              />
            )
        }
      </label>
    </div>
  )
}
