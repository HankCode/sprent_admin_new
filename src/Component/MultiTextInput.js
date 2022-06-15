import React from 'react';

export default function TextInput(props) {

	return <div className="TextInput MultiTextInput">
		<label htmlFor={props.name}>{props.children}</label><br />

		<textarea id={props.name} type="text" placeholder={props.placeholder || ""} value={props.value} onChange={props.onChange} />
	</div>

}


