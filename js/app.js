// var vm = new Vue({
//   el: '#app',
//   data: {
//   	love: "love you"
//   }
// })


var vm;

loadVM = function() {
	var data = {
		love: "love you",
		// w: currentChord.linkedTo[0]
		w: '',
		a:'',
		s:'',
		d:'',
		z:null,
		current:''
	}
	vm = new Vue({
		el: '#app',
		data: data
	})
}


function triggerNavigate(key) {
	console.log(key)
	lastChord=currentChord;
	var indices = {'w':0, 'a':1, 's':2, 'd':3, 'z':4};
	var index = indices[key];
	if(key=='z' && !vm.z){
		return
	}
	currentChord=lastChord.linkedTo[index];
	setVMFromCurrentChord();
	triggerCursor();
}