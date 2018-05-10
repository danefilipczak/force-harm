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
		checkedChords: ["dom", "dim", "fr", "hd", "m7"],
		integrity: 'diffuse',
		z: null,
		current: '',
		path: {}
	}

	vm = new Vue({
		el: '#app',
		data: data,
		methods: {
			reset: function() {

				sevenths.forEach(function(s) {
					s.kill()
				})
				sevenths = [];
				console.log(this.checkedChords)

				if (this.checkedChords.includes('dim')) {
					for (var i = 0; i < 3; i++) {
						var dim = new Seventh(i, 'dim')
						sevenths.push(dim)
					}
				}

				if (this.checkedChords.includes('fr')) {
					for (var i = 0; i < 6; i++) {
						var fr = new Seventh(i, 'fr')
						sevenths.push(fr)
					}
				}


				if (this.checkedChords.includes('m7')) {
					for (var i = 0; i < 12; i++) {
						var m7 = new Seventh(i, 'm7')
						sevenths.push(m7)
					}

				}

				if (this.checkedChords.includes('dom')) {
					for (var i = 0; i < 12; i++) {
						var dom = new Seventh(i, 'dom')
						sevenths.push(dom)
					}

				}

				if (this.checkedChords.includes('hd')) {
					for (var i = 0; i < 12; i++) {
						var hd = new Seventh(i, 'hd')
						sevenths.push(hd)
					}

				}


				// for (var i = 0; i < 12; i++) {
				// 	var m7 = new Seventh(i, 'm7')
				// 	var dom = new Seventh(i, 'dom')
				// 	//var fr = new Seventh(i, 'fr')
				// 	var hd = new Seventh(i, 'hd')
				// 	sevenths.push(m7, dom, hd)
				// }



				for (var i = 0; i < sevenths.length; i++) {
					for (var j = 0; j < sevenths.length; j++) {
						if (sevenths[i].checkParsimony(sevenths[j]) == 3) {
							sevenths[i].linkedTo.push(sevenths[j]);
						}
					}
				}

				sevenths.forEach(function(s) {
					s.initLines();
				})


				currentChord = sevenths[0];
				lastChord = sevenths[1];
			},
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
	//console.log(path)
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