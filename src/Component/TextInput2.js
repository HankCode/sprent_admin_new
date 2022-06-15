import React, { useState, useEffect } from 'react';

export default function TextInput(props) {

	return <div className="TextInput">
		<label htmlFor={props.name}>{props.children}</label><br />

		<input id={props.name} type="text" placeholder={props.placeholder || ""} value={props.value} onChange={props.onChange} />
	</div>

}


