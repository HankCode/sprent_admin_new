import React from "react";

export default ({ label = 'Status', currentState, onChange, states, block = false }) => {
  return (
    <label>
      <span>{label}</span>
      {
        block && (<><br /><br /></>)
      }
      <select value={currentState} onChange={onChange}>
        {
          states
          && states.length > 0
          && states.map(({ key, label }) => (
            <option key={key} value={key}>{label}</option>
          ))
        }
      </select>
    </label>
  );
};

export const Numbers = ({ label, currentState, onChange, suffix = 'st', min = 0, max = 100, block = false }) => {
  const states = [];

  for (let i = min; i < max; i++) {
    states.push({
      key: i,
      label: `${i} ${suffix}`,
    });
  }

  return (
    <label>
      <span>{label}</span>
      {
        block && (<><br /><br /></>)
      }
      <select value={currentState} onChange={onChange}>
        <option value="">[ Välj antal ]</option>
        {
          states
          && states.length > 0
          && states.map(({ key, label }) => (
            <option key={key} value={key}>{label}</option>
          ))
        }
      </select>
    </label>
  );
};
