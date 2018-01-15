var sevenths = [];
var scene;
var camera;

window.onload = function() {


	scene = new THREE.Scene();
	//scene.add(group);
	scene.background = new THREE.Color('olive');
	camera = new THREE.PerspectiveCamera(75, window.innerWidth / (window.innerHeight), 0.1, 2500);
	camera.position.z = 30;
	// camera.position.y = 20;

	// camera.far=10

	

	renderer = new THREE.WebGLRenderer();
	renderer.setSize(window.innerWidth, window.innerHeight);
	document.body.appendChild(renderer.domElement);
	renderer.domElement.style = "position:fixed; top:0px; left:0px"

	orbit = new THREE.OrbitControls(camera, renderer.domElement)

	ambient = new THREE.HemisphereLight(0x404040); // soft white light
	ambient.position.y = -10
	ambient.position.z = 5
	scene.add(ambient);

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

	
	// var materialArray = [];
	// for (var i = 0; i < 6; i++)
	// 	materialArray.push(new THREE.MeshBasicMaterial({
	// 		map: loader.load(imagePrefix + directions[i] + imageSuffix),
	// 		side: THREE.BackSide
	// 	}));
	// var skyMaterial = new THREE.MultiMaterial(materialArray);
	// // var skyMaterial = new THREE.MeshPhongMaterial( {color:'black'} );
	// // skyMaterial.side = THREE.BackSide;
	// skyBox = new THREE.Mesh(skyGeometry, skyMaterial);
	// skyBox.position.setComponent(1, 1000)
	// skyBox.rotation.y=15
	// scene.add(skyBox)



	//

	render();
}