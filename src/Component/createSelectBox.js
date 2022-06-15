import React, { useState, useEffect } from 'react';

export default function createSelectBox(parentState) {
	if(parentState == undefined || typeof parentState != "function") throw new Error("First argument to createSelectBox must be a function that can get and set the state!");

	return function SelectBox(props) {

		const name = props.name || props.id;
		if(name == undefined) throw new Error("TextInput component must have a name or id attribute/property!");

		var options = props.options;
		if(!options || options.length == 0) throw new Error("SelectBox needs an options property! (Array of String's)");
		options = options.map( function optionMap(opt) {
			return <option key={opt}>{opt}</option>
		});

		const defaultValue = parentState(name) || props.default || "";
		const [value, setValue] = useState(defaultValue);

		const labels = props.children
	
		useEffect(function updateParentState() {
			parentState(name, value)
		}, [value]);

		function changeOption(ev) {
			var el = ev.target;
			var value = el.options[el.selectedIndex].text;
			setValue(value);
		}

		return <div className="SelectBox">
			<label htmlFor={name}>{labels}</label><br />

			<select onChange={changeOption} defaultValue={value} value={value}>{options}</select>

		</div>

	}
}
