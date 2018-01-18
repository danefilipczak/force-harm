var sevenths = [];
var scene;
var camera;
var mouse = new THREE.Vector2();
var raycaster = new THREE.Raycaster();
var cursor;
var mouseX;
var mouseY;


function onMouseMove( event ) {

	// calculate mouse position in normalized device coordinates
	// (-1 to +1) for both components
	mouseX = event.clientX;
	mouseY = event.clientY;
	mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
	mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;


}



window.addEventListener( 'mousemove', onMouseMove, false );


function onMousePress(event){

	console.log('press')
	lastChord=currentChord;
	currentChord=lastChord.linkedTo[Math.floor(Math.random()*lastChord.linkedTo.length)];


	triggerCursor();

}

window.addEventListener( 'click', onMousePress, false );

window.onload = function() {

	noise.seed(Math.random());
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

	sevenths.forEach(function(s){
		s.initLines();
	})


	var geometry = new THREE.SphereGeometry(1.1, 32, 32);
	// this.material = new THREE.MeshPhongMaterial( {color: 'yellow'} );


	// var shader = THREE.FresnelShader;
	// var uniforms = THREE.UniformsUtils.clone(shader.uniforms);
	// uniforms["tCube"].value = textureCube;
	// this.material = new THREE.ShaderMaterial({
	// 	uniforms: uniforms,
	// 	vertexShader: shader.vertexShader,
	// 	fragmentShader: shader.fragmentShader
	// });
	var material = new THREE.MeshPhongMaterial({
        color: 'black'
    });
    // material.transparent=true;
    // material.opacity=0.5

	cursor = new THREE.Mesh(geometry, material);
	scene.add(cursor);
	
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
	currentChord = sevenths[0];
	lastChord = sevenths[1];

	render();
	loadVM();
}