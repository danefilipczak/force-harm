function Seventh(root_, type_){
	this.root = root_;
	this.type = type_;
	this.chroma = []
	this.linkedTo=[];
	this.initialize()
}

Seventh.prototype.initialize = function(){
	this.chroma.push( //everyone gets a root and a minor seventh
		this.root,
		(this.root+10)%12
		)
	switch(this.type){
		case 'm7':
			this.chroma.push(
				(this.root+3)%12,
				(this.root+7)%12
				);
			break;
		case 'hd':
			this.chroma.push(
				(this.root+3)%12,
				(this.root+6)%12
				);
			break;
		case 'fr':
			this.chroma.push(
				(this.root+4)%12,
				(this.root+6)%12
				);
			break;
		case 'dom':
			this.chroma.push(
				(this.root+4)%12,
				(this.root+7)%12
				);
			break;
	}
}

Seventh.prototype.checkParsimony = function(otherSeventh){ 
	//how many chroma do we have in common?
	var intersection = otherSeventh.chroma.filter((c) => this.chroma.includes(c))
	return intersection.length
}