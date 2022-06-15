import React, { useEffect, useState } from "react";

const projectStorage = firebase.storage();

export default function ImageUpload(props) {
	
	const [images, setImages] = useState([]);
	const progress = uploadAll(images, props.dir); // upload images and return progress state
	
	console.log("render ImageUpload! images=" + JSON.stringify(images) + " progress=" + JSON.stringify(progress));
	
	function loadImages(ev) {
		
		const files = ev.target.files;
		console.log("loadImages: files=", files);
		
		const imageFiles = images.slice(); // new Array will be the new images state (we want to keep the old ones)
		
		// files is a FileList psuedo-array, so we can not use Array.prototype methods on it!
		for (var i=0; i<files.length; i++) {
			imageFiles.push(  { blob: files[i], url: URL.createObjectURL(files[i]) }  );
		}
		
		//theImage.src = URL.createObjectURL(files[0]); // set src to blob url
		
		setImages(imageFiles);
		
	}
	
	const loadedImages = images.map( (img,i) => <ImgProgress key={i} url={img.url} progress={progress[i]} /> );
	
	return <div>
		
		{props.children}

		<div className="images">
			{loadedImages}
		</div>
		
		<input type="file" multiple onChange={loadImages} />
		
	</div>
	
}

function uploadAll(images, dataDir) {
	"use strict";
	
	if(dataDir == undefined) dataDir = "images/";

	const startCondition = new Array(images.length).fill(-1);
	
	const [progress, setProgress] = useState(startCondition);
	
	console.log("hook uploadAll: images=", images, " progress=" + JSON.stringify(progress) + " startCondition=" + JSON.stringify(startCondition));
	
	useEffect(function effect() {
		console.log("uploadAll: effect: images=", images);
		
		if(images.length == progress.length) {
			console.log("uploadAll:effect: No new images added!");
			return;
		}
		
		const nextProgress = progress.slice();
		
		for (var i=progress.length; i<images.length; i++) {
			
			console.log("uploadAll:effect: Handle new image:" + images[i].blob.name);
			
			nextProgress.push(0);
			
			uploadFile(images[i].blob, i);
		}
		
		setProgress(nextProgress);
		
		console.log("uploadAll:effect: nextProgress=" + JSON.stringify(nextProgress));
		
	}, [images]); // Only upload if images change
	
	return progress;
	
	function uploadFile(file, progressIndex) {
		const storageRef = projectStorage.ref(dataDir + file.name);
		
		console.log("uploadFile: progressIndex=" + progressIndex + " file.name=" + file.name);
		
		const fileUpload = storageRef.put(file);
		
		fileUpload.on("state_changed", updateProgress);
		
		function updateProgress(upload) {
			const percentage = Math.round( (upload.bytesTransferred / upload.totalBytes) * 100 );
			
			console.log("uploadFile:upgradeProgress progressIndex=" + progressIndex + " file.name=" + file.name + " percentage=" + percentage);
			
			const nextProgress = progress.slice();
			
			nextProgress[progressIndex] = percentage;
			
			setProgress(nextProgress);
		}
	}
}

function ImgProgress(props) {
	
	console.log("render ImgProgress: props=" + JSON.stringify(props));
	
	return <div className="ImgProgress">
		<img src={props.url} width="400" /><br />
		<progress id="file" value={props.progress} max="100"> {props.progress}% </progress>
	</div>
}
