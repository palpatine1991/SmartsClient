function Serializer(){
	
}

Serializer.serialize = function(){
	Serializer.bracket = 1;
	Serializer.resultArray = [];
	Serializer.resultArrayIndex = 0;
	$("#serialization").text("");
	Serializer.dfs(atomContainer.getChildAt(0), null);
	for(var i=0; i < Serializer.resultArray.length; i++){
		$("#serialization").append(Serializer.resultArray[i]);
	}
	for(var i=0; i < atomContainer.children.length;i++){
		atomContainer.children[i].visited = false;
	}
	for(var i=0; i < bondContainer.children.length;i++){
		bondContainer.children[i].visited = false;
	}
}

Serializer.dfs = function(atom,bond){
	atom.visited = true;
	
	Serializer.addString("(");
	//pridani vazby
	if(bond){
		var bondString = Serializer.serializeBond(bond);
		Serializer.addString(bondString);
	}
	
	var atomString = "[";
	//pridani alifatickych moznosti
	for(var i=0; i < atom.possibleAliphatic.length; i++){
		atomString += atom.possibleAliphatic[i];
		atomString += "&A";
		
		if(i < atom.possibleAliphatic.length - 1){
			atomString += ",";
		}
	}
	
	if(atom.possibleAliphatic.length > 0 && atom.possibleAromatic.length > 0){
		atomString += ",";
	}
	//pridani aromatickych moznosti
	for(var i=0; i < atom.possibleAromatic.length; i++){
		atomString += atom.possibleAromatic[i];
		atomString += "&a";
		
		if(i < atom.possibleAromatic.length - 1){
			atomString += ",";
		}
	}
	//pridani moznych naboju
	if(atom.possibleCharges.length > 0){
		atomString += ";";
	}
	
	for(var i=0; i < atom.possibleCharges.length; i++){
		if(atom.possibleCharges[i] >= 0){
			atomString += "+";
		}
		atomString += atom.possibleCharges[i];
		
		if(i < atom.possibleCharges.length - 1){
			atomString += ",";
		}
	}
	//pridani moznych stupnu
	if(atom.possibleValences.length > 0){
		atomString += ";";
	}
	
	for(var i=0; i < atom.possibleValences.length; i++){
		atomString+= "D";
		atomString += atom.possibleValences[i];
		
		if(i < atom.possibleValences.length - 1){
			atomString += ",";
		}
	}
	
	atomString += "]";
	atom.stringIndex = Serializer.resultArrayIndex;
	Serializer.addString(atomString);
	
	//zpracovani prislusnych vazeb a rekurzivni zavolani na spojene atomy
	for(var i=0; i < atom.bonds.length; i++){
		var otherAtom;
		if(atom.bonds[i].startAtom == atom){
			otherAtom = atom.bonds[i].endAtom;
		}
		else{
			otherAtom = atom.bonds[i].startAtom;
		}
		
		if(otherAtom.visited){
			if(atom.bonds[i].visited){
				continue;
			}
			else{
				atom.bonds[i].visited = true;
				var bondString = Serializer.serializeBond(atom.bonds[i]);
				bondString += "%";
				//var number = Serializer.bracket.toString();
				bondString += Serializer.bracket;
				Serializer.bracket++;
				Serializer.resultArray[atom.stringIndex] += bondString;
				Serializer.resultArray[otherAtom.stringIndex] += bondString;
			}
		}
		else{
			atom.bonds[i].visited = true;
			Serializer.dfs(otherAtom, atom.bonds[i]);
		}
	}
	
	Serializer.addString(")");
	
}

Serializer.serializeBond = function(bond){
	var bondString = "";
	for (var i=0; i < bond.type.length; i++) {
		if(bond.type[i] == "singleBond"){
			bondString += "-";
		}
		else if(bond.type[i] == "doubleBond"){
			bondString += "=";
		}
		else if(bond.type[i] == "tripleBond"){
			bondString += "#";
		}
		else if(bond.type[i] == "aromaticBond"){
			bondString += ":";
		}
		if(i < bond.type.length - 1){
			bondString += ",";
		}
	}
	return bondString;
}

Serializer.addString = function(string){
	Serializer.resultArray.push(string);
	Serializer.resultArrayIndex++;
}
