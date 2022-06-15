import React from "react";

export default function Steps(props) {

	var totalSteps = props.total || 1;
	var currentStep = props.current || 1;
	var completedSteps = props.completed;
	var clickFun = props.change || alert;

	console.log("render Steps totalSteps=" + totalSteps + " completedSteps: " + JSON.stringify(completedSteps));
	
	if(completedSteps == undefined) {
		completedSteps = [];
		for (var i = 0; i < totalSteps-1; i++) {
			completedSteps.push(false);
		}
	}


	function svgImage(current, total) {

		console.log("svgImage: current=" + current + " currentStep=" + currentStep + " total=" + total);

		var lineLen = 100;
		var circleR = 20;
		var strokeWidth = 1.5;

		function circle(x, step) {

			var stroke = step==currentStep ? "#1C6DB8" : "#D6D6D6";
			var fill = completedSteps[step-1] ? "#1C6DB8" : "#F8F8F8";

			function click() {
				clickFun(step);
			}

			return <circle 
			style={{cursor: "pointer"}}
			key={"circle"+x} 
			cx={x+circleR+strokeWidth} 
			cy={circleR+strokeWidth} 
			r={circleR} 
			fill={fill} 
			stroke={stroke} 
			strokeWidth={strokeWidth} 
			onClick={click}/>
		}

		function line(start, len) {
			return <line key={"line"+start} x1={start} y1={circleR} x2={start + len} y2={circleR} stroke="#D6D6D6"/>
		}

		function text(x, y, str, step) {

			var fill = "#909090";
			var className = "";

			if(step==currentStep) {
				fill = "#1C6DB8";
				className = "current";
			}
			if(completedSteps[step-1]) {
				fill = "#FFFFFF";
				className = className + " completed";
			}

			function click() {
				clickFun(step);
			}

			return <text 
			style={{cursor: "pointer"}}
			onClick={click} 
			className={className} 
			key={text + str} x={x} y={y} 
			dominantBaseline="middle" 
			textAnchor="middle" 
			fill={fill}>{str}
			</text>
		}

		var figures = [];

		for (var i=0; i<total; i++) {
			figures.push(  circle( i*(lineLen+circleR*2+strokeWidth*2), i+1 )  );
			figures.push(  text(  i*(lineLen+circleR*2+strokeWidth*2) + circleR+strokeWidth, circleR+strokeWidth, i+1, i+1)  );

			figures.push(  line( i*(lineLen + circleR*2 + strokeWidth*2) + circleR*2 + strokeWidth*2, lineLen )  );
		}
		figures.pop(); // Remove last line
		
		console.log("current=" + current);

		var width = total*(lineLen+circleR*2) + strokeWidth*2;
		var height = circleR*2 + strokeWidth*2;

		return <svg width="auto" height={height} viewBox={"0 0 " + width + " " + height} fill="none" xmlns="http://www.w3.org/2000/svg">
			{figures}
		</svg>


	}


	return (
    <figure className="steps-figure">
      {svgImage(currentStep, totalSteps)}
    </figure>
  );
}
