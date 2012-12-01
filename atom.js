Atom.prototype = new Container();
var atomDiameter = 20;

function Atom(aromatic, aliphatic){
	Container.apply(this);
	var atom = new Shape();
	atom.graphics.beginStroke(Graphics.getRGB(0, 0, 0, 1));
	atom.graphics.setStrokeStyle(1);
	atom.graphics.beginFill(Graphics.getRGB(255, 96, 96, 1));
	atom.graphics.drawEllipse(0,0,atomDiameter,atomDiameter);
	this.addChild(atom);
	
	if(aromatic.length  + aliphatic.length > 1){
		var text = new Text("*", "11px Arial", "#000000");
	}
	else if(aromatic.length == 1){
		var text = new Text(aromatic[0], "11px Arial", "#000000");
	}
	else if(aliphatic.length == 1){
		var text = new Text(aliphatic[0], "11px Arial", "#000000");
	}
	text.y = 10;
	text.x = 10;
	text.textAlign = "center";
	text.textBaseline = "middle";
	this.addChild(text);
	
	var possibleAliphatic = aliphatic;
	var posibleAromatic = aromatic;
	
	this.onPress = atomPressHandler;

}

function atomPressHandler(e){
	var differenceX = e.stageX - e.target.x;
	var differenceY = e.stageY - e.target.y;
	e.onMouseMove = function(ev) {
		e.target.x = ev.stageX - differenceX;
		e.target.y = ev.stageY - differenceY;
		update = true;
	}
}