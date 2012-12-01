var stage;
var update = false;
var action = "move"; //..,create,delete
var activeAromaticType = [];
var activeAliphaticType = [];

function init(){
	stage = new Stage(document.getElementById("canvas"));	
	stage.onMouseDown = stageOnMouseDownHandler;
	
	Ticker.addListener(window);
}

function stageOnMouseDownHandler(e){
	if(action == "create"){
		createAtom(e);
	}
}

function createAtom(e){
	if(isThereIntersect(e)){
		return;
	}
	var atom = new Atom(activeAromaticType, activeAliphaticType);
	atom.x = e.stageX - 10;
	atom.y = e.stageY - 10;
	stage.addChild(atom);
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
	action = "create";
	if(activeAliphaticType.length == 1 && activeAromaticType.length == 0){
		var button = document.getElementById(activeAliphaticType[0]);	
		if(button != null){
			button.style.backgroundColor = "#EFEFEF";
		}
	}
	activeAliphaticType = [type];
    var button = document.getElementById(type);
	button.style.backgroundColor = "#6A85FF";
	update = true;
}

function openAtomChoice(){
	window.open("atomChoice.html",'atomChoice','height=380,width=620');
}

