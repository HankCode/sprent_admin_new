/*

	images property needs to be an object literal with object key/id and {url}
	example: {"key": {url:"https://images/image.png"}}

*/

import React from 'react';
import {updateObject} from '../helperFunctions.js'


const boxStyle = {
	position: "relative",
	display: "inline-block"
}

const imgStyle = {
	position: "relative",
	width: "100px",
	height: "100px",
	zIndex: "1",
}

const checkboxStyle = {
	position: "absolute",
	bottom: "0px",
	right: "0px",
	width: "25%",
	height: "25%",
	zIndex: "2",
	backgroundColor: "transparent",
	border: "1px solid green"
}

export default function ImagePicker(props) {

	const checkedImages = Array.isArray(props.selectedImages) ? props.selectedImages : [];
	const onChange = props.onChange;

	if( typeof onChange != "function") throw new Error("ImagePicker needs to have an onChange function in props in order to pass state");

	function checkboxChange(ev) {
		const key = ev.target.value;

		const checked = ev.target.checked;

		//console.log(ev);
		//console.log("key=" + key + " checked=" + checked);

		//console.log( "checkedImages=" + JSON.stringify(checkedImages) );

		var newArr = checkedImages.slice();

		if(checked) {
			newArr.push(key);
			//console.log("Added key=" + key + " to newArr=" + JSON.stringify(newArr) );
		}
		else {
			var removed = newArr.splice(newArr.indexOf(key), 1);
			//console.log("Removed " + removed + " from newArr=" + JSON.stringify(newArr));
		}

		onChange(newArr);
	
		//console.log( "newArr=" + JSON.stringify(newArr) );

	}

	function isChecked(key) {
		if(Array.isArray(checkedImages) && checkedImages.indexOf(key) != -1) return true;
		return false;
	}

	function makeList(images) {
		const list = [];
		var style = {};
		for (var key in images) {

			list.push(<li key={key} style={boxStyle}>
				<img src={images[key].url} style={imgStyle} />
				<input type="checkbox" id="selectedImages" value={key} style={checkboxStyle} checked={isChecked(key)} onChange={checkboxChange} />
			</li>
			);
		}
		return <ul className="images">{list}</ul>;
	}

	return <div className="imagePicker">
		{makeList(props.images)}
	</div>

}



