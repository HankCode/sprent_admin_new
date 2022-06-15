import React from "react";
import Lng from "./Lng.js";

export default function Swe(props) {
	return <Lng lang="sv" prefix={props.prefix}>{props.children}</Lng>;
}

