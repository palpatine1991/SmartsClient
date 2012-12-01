activeAliphaticType = [];
activeAromaticType = [];
activeType = "aliphatic"; //..,aromatic,both

function init(){
	document.getElementById("aliphatic").style.backgroundColor = "#F00";
}

function selectAtomType(dom){
	if(activeType == "aliphatic"){
		if(dom.style.borderWidth == "4px"){  //if button is selected
			if(dom.style.borderColor == "rgb(255, 0, 0)"){ //button is aliphatic
				var index = activeAliphaticType.indexOf(dom.innerHTML);
				activeAliphaticType.splice(index,1);
				
				dom.style.borderColor = "#000";
				dom.style.borderWidth = "1px";
			}
			else if(dom.style.borderColor == "rgb(0, 255, 255)"){  //button is aromatic
				var index = activeAromaticType.indexOf(dom.innerHTML);
				activeAromaticType.splice(index,1);
				activeAliphaticType.push(dom.innerHTML);
				
				dom.style.borderColor = "#F00";
				dom.style.borderWidth = "4px";
			}
			else{ //button is both aliphatic and aromatic
				var index = activeAromaticType.indexOf(dom.innerHTML);
				activeAromaticType.splice(index,1);
				
				dom.style.borderColor = "#F00";
				dom.style.borderWidth = "4px";
			}
		}
		else{ //button is not selected
			activeAliphaticType.push(dom.innerHTML);
			dom.style.borderColor = "#F00";
			dom.style.borderWidth = "4px";
		}
	}
	else if(activeType == "aromatic"){
		if(dom.style.borderWidth == "4px"){  //if button is selected
			if(dom.style.borderColor == "rgb(0, 255, 255)"){ //button is aromatic
				var index = activeAromaticType.indexOf(dom.innerHTML);
				activeAromaticType.splice(index,1);
				
				dom.style.borderColor = "#000";
				dom.style.borderWidth = "1px";
			}
			else if(dom.style.borderColor == "rgb(255, 0, 0)"){  //button is aliphatic
				var index = activeAliphaticType.indexOf(dom.innerHTML);
				activeAliphaticType.splice(index,1);
				activeAromaticType.push(dom.innerHTML);
				
				dom.style.borderColor = "#0FF";
				dom.style.borderWidth = "4px";
			}
			else{ //button is both aliphatic and aromatic
				var index = activeAliphaticType.indexOf(dom.innerHTML);
				activeAliphaticType.splice(index,1);
				
				dom.style.borderColor = "#0FF";
				dom.style.borderWidth = "4px";
			}
		}
		else{ //button is not selected
			activeAromaticType.push(dom.innerHTML);
			dom.style.borderColor = "#0FF";
			dom.style.borderWidth = "4px";
		}
	}
	else{
		if(dom.style.borderWidth == "4px"){  //if button is selected
			if(dom.style.borderColor == "rgb(204, 0, 255)"){ //button is both
				var index = activeAromaticType.indexOf(dom.innerHTML);
				activeAromaticType.splice(index,1);
				index = activeAliphaticType.indexOf(dom.innerHTML);
				activeAliphaticType.splice(index,1);
				
				dom.style.borderColor = "#000";
				dom.style.borderWidth = "1px";
			}
			else if(dom.style.borderColor == "rgb(255, 0, 0)"){  //button is aliphatic
				activeAromaticType.push(dom.innerHTML);
				
				dom.style.borderColor = "#C0F";
				dom.style.borderWidth = "4px";
			}
			else{ //button is aromatic
				activeAliphaticType.push(dom.innerHTML);
				
				dom.style.borderColor = "#C0F";
				dom.style.borderWidth = "4px";
			}
		}
		else{ //button is not selected
			activeAromaticType.push(dom.innerHTML);
			activeAliphaticType.push(dom.innerHTML);
			
			dom.style.borderColor = "#C0F";
			dom.style.borderWidth = "4px";
		}
	}
}

function changeType(type){
	document.getElementById("aromatic").style.backgroundColor = "#D4D4D4";
	document.getElementById("aliphatic").style.backgroundColor = "#D4D4D4";
	document.getElementById("both").style.backgroundColor = "#D4D4D4";
	
	activeType = type;
	if(type == "aliphatic"){
		document.getElementById("aliphatic").style.backgroundColor = "#F00";
	}
	else if(type == "aromatic"){
		document.getElementById("aromatic").style.backgroundColor = "#0FF";
	}
	else{
		document.getElementById("both").style.backgroundColor = "#C0F";
	}
}

function ok(){
	if(activeAromaticType.length + activeAliphaticType.length == 0){
		window.opener.action = "move";
	}
	else{
		window.opener.action = "create";
	}
	var button = window.opener.document.getElementById(window.opener.activeAliphaticType[0]);
	if(button != null){
		button.style.backgroundColor = "#EFEFEF";
	}	
	window.opener.activeAromaticType = activeAromaticType;
	window.opener.activeAliphaticType = activeAliphaticType;
	window.close();
}

function cancel(){
	window.close();
}