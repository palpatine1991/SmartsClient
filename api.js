var stage;
var bondContainer = new Container();
var atomContainer = new Container();
var update = false;
var action = "move"; //..,createAtom, createBond, delete
var activeAromaticType = [];
var activeAliphaticType = [];
var activeBondType;
var interimBond;
var shownAtom;

function init(){
	stage = new Stage(document.getElementById("canvas"));	
	stage.onMouseDown = stageOnMouseDownHandler;
	stage.onMouseMove = stageOnMouseMoveHandler;
	
	stage.addChild(bondContainer);
	stage.addChild(atomContainer);
	
	Ticker.addListener(window);
	
	interimBond = new Bond("singleBond", 0,0,0,0);
	changeAction("move");
}

function changeAction(actualAction){
	if(actualAction == "move"){
		deactivateButton();
		action = "move";
		document.getElementById("move").style.backgroundColor = "#6A85FF";
	}
}

function stageOnMouseMoveHandler(e){
	interimBond.removeAllChildren();
	if(lastActiveAtom && lastActiveAtom.newBond){
		interimBond.type = activeBondType;
		interimBond.startX = lastActiveAtom.x + 10;
		interimBond.startY = lastActiveAtom.y + 10;
		interimBond.endX = e.stageX;
		interimBond.endY = e.stageY;
		interimBond.redraw();
	}
	update = true;
}

function stageOnMouseDownHandler(e){
	//deaktivace atomu
	if(lastActiveAtom){
		lastActiveAtom.atom.graphics.beginStroke(Graphics.getRGB(0, 0, 0, 1));
		lastActiveAtom.atom.graphics.drawEllipse(0,0,atomDiameter,atomDiameter);
		document.getElementById("possibleAliphatic").innerHTML = [];
		document.getElementById("possibleAromatic").innerHTML = [];
		document.getElementById("possibleCharges").innerHTML = [];
		document.getElementById("possibleValences").innerHTML = [];
		if(lastActiveAtom.newBond){
			lastActiveAtom.newBond = false;
		}
		else if(lastActiveAtom.newBondCheck){
			lastActiveAtom.newBondCheck = false;
		}
		shownAtom = null;
		update = true;
	}
	
	if(action == "createAtom"){
		createAtom(e);
	}
}

function createAtom(e){
	if(isThereIntersect(e)){
		return;
	}
	var atom = new Atom(activeAromaticType, activeAliphaticType, e.stageX - 10, e.stageY - 10);
	update = true;
}

function isThereIntersect(e){
	for(var i=0; i < stage.children.length; i++){
		var container = stage.children[i];
		if(container.hitTest(e.stageX - 10 - container.x, e.stageY - container.y)){
			return true;
		}
		else if(container.hitTest(e.stageX + 10 - container.x, e.stageY - container.y)){
			return true;
		}
		else if(container.hitTest(e.stageX - container.x, e.stageY - 10 - container.y)){
			return true;
		}
		else if(container.hitTest(e.stageX - container.x, e.stageY + 10 - container.y)){
			return true;
		}
		else if(container.hitTest(e.stageX + 10 - container.x, e.stageY + 10 - container.y)){
			return true;
		}
		else if(container.hitTest(e.stageX + 10 - container.x, e.stageY - 10 - container.y)){
			return true;
		}
		else if(container.hitTest(e.stageX - 10 - container.x, e.stageY - 10 - container.y)){
			return true;
		}
		else if(container.hitTest(e.stageX - 10 - container.x, e.stageY + 10 - container.y)){
			return true;
		}
	}
	return false;
}

function tick(){
	if (update) {
		update = false;
		stage.update();
	}	
}

function changeAtomType(type){
	deactivateButton();
	action = "createAtom";
	
	activeAliphaticType = [type];
	activeAromaticType = [];
    var button = document.getElementById(type);
	button.style.backgroundColor = "#6A85FF";
	update = true;
}

function deactivateButton(){
	if(activeAliphaticType.length == 1 && activeAromaticType.length == 0){
		var button = document.getElementById(activeAliphaticType[0]);	
		if(button != null){
			button.style.backgroundColor = "#EFEFEF";
		}
	}
	var button = document.getElementById(activeBondType);	
	if(button != null){
		button.style.backgroundColor = "#EFEFEF";
		activeBondType = null;
	}
	if(lastActiveAtom && lastActiveAtom.newBond){
		lastActiveAtom.newBond = false;
	}
	var button = document.getElementById(action);
	if(button != null){
		button.style.backgroundColor = "#EFEFEF";
	}
}

function changeBondType(type){
	deactivateButton();
	action = "createBond";
	activeBondType = type;
	
	var button = document.getElementById(type);
	button.style.backgroundColor = "#6A85FF";
	update = true;
}

function openAtomChoice(atom){
	var popup = window.open("atomChoice.html",'atomChoice','height=380,width=620');
	popup.openAtom = atom;
}

function addCharge(){
	if(!shownAtom){return;}
	var number = document.getElementById("chargeAdder").valueAsNumber;
	if((number || number == 0) && shownAtom.possibleCharges.indexOf(number) == -1){
		shownAtom.possibleCharges.push(number);
		document.getElementById("possibleCharges").innerHTML = shownAtom.possibleCharges;
	}
}

function deleteCharge(){
	if(!shownAtom){return;}
	var number = document.getElementById("chargeAdder").valueAsNumber;
	if((number || number == 0) && shownAtom.possibleCharges.indexOf(number) != -1){
		var index = shownAtom.possibleCharges.indexOf(number);
		shownAtom.possibleCharges.splice(index,1);
		document.getElementById("possibleCharges").innerHTML = shownAtom.possibleCharges;
	}
}

function addValence(){
	if(!shownAtom){return;}
	var number = document.getElementById("valenceAdder").valueAsNumber;
	if((number || number == 0) && shownAtom.possibleValences.indexOf(number) == -1){
		shownAtom.possibleValences.push(number);
		document.getElementById("possibleValences").innerHTML = shownAtom.possibleValences;
	}
}

function deleteValence(){
	if(!shownAtom){return;}
	var number = document.getElementById("valenceAdder").valueAsNumber;
	if((number || number == 0) && shownAtom.possibleValences.indexOf(number) != -1){
		var index = shownAtom.possibleValences.indexOf(number);
		shownAtom.possibleValences.splice(index,1);
		document.getElementById("possibleValences").innerHTML = shownAtom.possibleValences;
	}
}

