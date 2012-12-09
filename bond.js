Bond.prototype = new Container();

function Bond(type, startX, startY, endX, endY){
	Container.apply(this);
	var bond = new Shape();
	bondContainer.addChild(this);
	
	this.startX = startX;
	this.startY = startY;
	this.endX = endX;
	this.endY = endY;
	this.type = type;
	
	this.drawSingleBond = function(){
		var line = new Shape();
		line.graphics.beginStroke(Graphics.getRGB(0,0,0)).setStrokeStyle(1);
		line.graphics.moveTo(this.startX,this.startY).lineTo(this.endX,this.endY);
		this.addChild(line);
		update = true;
	}
	
	this.drawDoubleBond = function(){
		var line = new Shape();
		line.graphics.beginStroke(Graphics.getRGB(0,0,0)).setStrokeStyle(4);
		line.graphics.moveTo(this.startX,this.startY).lineTo(this.endX,this.endY);
		this.addChild(line);
		
		line = new Shape();
		line.graphics.beginStroke(Graphics.getRGB(255,255,255)).setStrokeStyle(2);
		line.graphics.moveTo(this.startX,this.startY).lineTo(this.endX,this.endY);
		this.addChild(line);
		
		update = true;
	}
	
	this.drawTripleBond = function(){
		var line = new Shape();
		line.graphics.beginStroke(Graphics.getRGB(0,0,0)).setStrokeStyle(7);
		line.graphics.moveTo(this.startX,this.startY).lineTo(this.endX,this.endY);
		this.addChild(line);
		
		line = new Shape();
		line.graphics.beginStroke(Graphics.getRGB(255,255,255)).setStrokeStyle(5);
		line.graphics.moveTo(this.startX,this.startY).lineTo(this.endX,this.endY);
		this.addChild(line);
		
		line = new Shape();
		line.graphics.beginStroke(Graphics.getRGB(0,0,0)).setStrokeStyle(1);
		line.graphics.moveTo(this.startX,this.startY).lineTo(this.endX,this.endY);
		this.addChild(line);
		
		update = true;
	}
	
	this.redraw = function(){
		if(this.type == "singleBond"){
			this.drawSingleBond();
		}
		else if(this.type == "doubleBond"){
			this.drawDoubleBond();
		}
		else if(this.type == "tripleBond"){
			this.drawTripleBond();
		}
	}
	this.redraw();
	
	this.moveBond = function(e, differenceX, differenceY, edge){
		if(edge == "start"){
			this.startX = e.stageX - differenceX + 10;
			this.startY = e.stageY - differenceY + 10;
		}
		else{
			this.endX = e.stageX - differenceX + 10;
			this.endY = e.stageY - differenceY + 10;
		}
		this.removeAllChildren();
		this.redraw();
	}
}

