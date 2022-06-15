import React from "react";
import Lng from "./Lng.js";

export default function Eng(props) {
	return <Lng lang="en" prefix={props.prefix}>{props.children}</Lng>;
}
