import React from "react";

export default function Lng(props) {

	var prefixMap = {
		en: "ENG",
		sv: "SWE"
	};

	if(props.prefix && props.prefix != "false") {
		return <div className="LngWithPrefix">
			<span className="prefix">{prefixMap[props.lang]}</span><span className="Lngtext" lang={props.lang}>{props.children}</span>
		</div>
	}

	return <span className="Lngtext" lang={props.lang}>{props.children}</span>
	

}


