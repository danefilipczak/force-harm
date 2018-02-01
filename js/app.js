// var vm = new Vue({
//   el: '#app',
//   data: {
//   	love: "love you"
//   }
// })


var vm;

loadVM = function() {
	var data = {
		// love: "love you",
		// w: currentChord.linkedTo[0]
		w: '',
		a: '',
		s: '',
		d: '',
		z: null,
		current: '',
		path: {}
	}

	vm = new Vue({
		el: '#app',
		data: data,
		// computed: {
		// 	love: function() {
		// 		return currentChord.root;
		// 	}
		// }
	})
}


function setVMpath(){
	console.log(path)
	for(var i = 0; i < 5; i++){
		if(path[i]){
			vm.path[i] = translateChordName(path[i].root, path[i].type)
		} else {
			vm.path[i] = null;
		}
		
	}
}


function triggerNavigate(key) {
	console.log(key)
	lastChord = currentChord;
	var indices = {
		'w': 0,
		'a': 1,
		's': 2,
		'd': 3,
		'z': 4
	};
	var index = indices[key];
	if (key == 'z' && !vm.z) {
		return
	}
	currentChord = lastChord.linkedTo[index];
	setVMFromCurrentChord();
	triggerCursor();
}