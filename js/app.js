// vexflow
// welcome screen
// euclid


var vm;

loadVM = function() {
	var data = {
		// love: "love you",
		// w: currentChord.linkedTo[0]
		w: '',
		a: '',
		s: '',
		d: '',
		integrity: 'diffuse',
		z: null,
		current: '',
		path: {}
	}

	vm = new Vue({
		el: '#app',
		data: data,
		methods: {
			setIntegrity: function() {
				//console.log(this.integrity)
				switch (this.integrity) {
					case 'rigid':
						desiredSeperation = 10 / 2;
						forceMult = 0.5;
						// var forceMult = 0.001;
						chargeStrength = 0.01;
						linkDistance = 50 / 2;
						linkStrength = 0.001;
						break;
					case 'moderate':
						desiredSeperation = 10;
						forceMult = 0.5;
						chargeStrength = 0.01;
						linkDistance = 15;
						linkStrength = 0.001;
						break;
					case 'diffuse':
						desiredSeperation = 50;
						forceMult = 0.5;
						// var forceMult = 0.001;
						chargeStrength = 0.01;
						linkDistance = 1;
						linkStrength = 0.001;
						break;
				}
			}
		}
		// computed: {
		// 	love: function() {
		// 		return currentChord.root;
		// 	}
		// }
	})
}


function setVMpath() {
	console.log(path)
	for (var i = 0; i < 5; i++) {
		if (path[i]) {
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