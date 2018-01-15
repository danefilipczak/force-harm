var sevenths = [];
window.onload = function(){
	for(var i = 0; i<12; i++){
		var m7 = new Seventh(i, 'm7')
		var dom = new Seventh(i, 'dom')
		var fr = new Seventh(i, 'fr')
		var hd = new Seventh(i, 'hd')
		sevenths.push(m7, dom, fr, hd)
	}
	for(var i = 0; i<sevenths.length; i++){
		for(var j = 0; j<sevenths.length; j++){
			if(sevenths[i].checkParsimony(sevenths[j])==3){
				sevenths[i].linkedTo.push(sevenths[j]);
			}
		}
	}
}