function translateChordName(root, type) {
	// var name = '';
	var roots = {
		0: 'C',
		1: 'C',
		2: 'D',
		3: 'D',
		4: 'E',
		5: 'F',
		6: 'F',
		7: 'G',
		8: 'G',
		9: 'A',
		10: 'A',
		11: 'B',

	}
	var signs = {
		0: '',
		1: '&#9839;',
		2: '',
		3: '&#9839;',
		4: '',
		5: '',
		6: '&#9839;',
		7: '',
		8: '&#9839;',
		9: '',
		10: '&#9839;',
		11: '',

	}
	

	var signsjs = {
		0: '',
		1: '\u266F',
		2: '',
		3: '\u266F',
		4: '',
		5: '',
		6: '\u266F',
		7: '',
		8: '\u266F',
		9: '',
		10: '\u266F',
		11: '',

	}

	var stems = {
		'fr': '7',
		'dom': '7',
		'hd': '-7',
		'm7': '-7',
		'dim': 'dim7'
	}
	var supers = {
		'fr': 'b5',
		'dom': '',
		'hd': 'b5',
		'm7': '',
		'dim': ''
	}
	return {
		'root': roots[root],
		'sign': signs[root],
		'signjs': signsjs[root],
		'stem': stems[type],
		'super': supers[type]
	}
}

function Seventh(root_, type_) {
	this.root = root_;
	this.type = type_;
	this.chroma = []
	this.linkedTo = [];
	this.initialize()
	this.lines = [];

	//for BFS
	this.visited = false;
	this.parent = null;

	this.geometry = new THREE.SphereGeometry(this.r, 32, 32);
	// this.material = new THREE.MeshPhongMaterial( {color: 'yellow'} );


	// var shader = THREE.FresnelShader;
	// var uniforms = THREE.UniformsUtils.clone(shader.uniforms);
	// uniforms["tCube"].value = textureCube;
	// this.material = new THREE.ShaderMaterial({
	// 	uniforms: uniforms,
	// 	vertexShader: shader.vertexShader,
	// 	fragmentShader: shader.fragmentShader
	// });
	this.material = new THREE.MeshPhongMaterial({
		color: 'cyan'
	});

	this.sphere = new THREE.Mesh(this.geometry, this.material);
	this.sphere.userData = this;
	scene.add(this.sphere);

	var splay = 100;
	this.sphere.position.x += (Math.random() * splay) - splay / 2;
	this.sphere.position.y += (Math.random() * splay) - splay / 2;
	this.sphere.position.z += (Math.random() * splay) - splay / 2;

	this.velocity = new THREE.Vector3();
}

Seventh.prototype.addForce = function(force) {
	// We could add mass here if we want A = F / M
	this.velocity.add(force);
}

Seventh.prototype.updateLines = function() {
	for (var i = 0; i < this.linkedTo.length; i++) {
		this.lines[i].geometry.vertices[0].x = this.sphere.position.x;
		this.lines[i].geometry.vertices[0].y = this.sphere.position.y;
		this.lines[i].geometry.vertices[0].z = this.sphere.position.z;


		this.lines[i].geometry.vertices[1].x = this.linkedTo[i].sphere.position.x;
		this.lines[i].geometry.vertices[1].y = this.linkedTo[i].sphere.position.y;
		this.lines[i].geometry.vertices[1].z = this.linkedTo[i].sphere.position.z;


		this.lines[i].geometry.verticesNeedUpdate = true;
	}
}

Seventh.prototype.applyForce = function() {
	this.sphere.position.add(this.velocity);
	this.velocity.multiplyScalar(0);
}

Seventh.prototype.initLines = function() {
	var self = this;

	this.linkedTo.forEach(function(link) {
		var geometry = new THREE.Geometry();
		geometry.vertices.push(self.sphere.position.clone());
		geometry.vertices.push(link.sphere.position.clone());
		var line = new THREE.Line(geometry, new THREE.LineBasicMaterial({
			color: 'lightgrey'
		}));
		scene.add(line)
		self.lines.push(line);

	})
}

Seventh.prototype.forceLink = function() {
	// The link force pushes linked nodes together or apart according to the desired link distance. 
	// The strength of the force is proportional to the difference between the linked nodes’ distance 
	// and the target distance, similar to a spring force.
	var self = this;
	this.linkedTo.forEach(function(link) {

		// var line = new THREE.Line3(self.sphere.position, link.sphere.position);
		// var distance = line.distance();
		// var diff = linkDistance-distance;
		// if(diff>0){
		// 	//need to get further apart
		// 	var target = line.at(1-(distance/linkDistance))

		// } else {
		// 	//need to get closer together
		// 	var target = line.at((distance/linkDistance)-1);

		// }
		var distance = self.sphere.position.distanceTo(link.sphere.position)
		var target = self.sphere.position.clone()
		target.lerp(link.sphere.position, linkDistance / distance)
		target.multiplyScalar(-distance - linkDistance)
		// target.normalize()
		target.multiplyScalar(linkStrength * forceMult)
		self.addForce(target)

	})
}

Seventh.prototype.initialize = function() {
	if(this.type=='dim'){
		this.chroma.push(
			this.root,
			(this.root + 3)%12,
			(this.root + 6)%12,
			(this.root + 9)%12
			)
	} else {
		this.chroma.push( //everyone else gets a root and a minor seventh
			this.root,
			(this.root + 10) % 12
		)
		switch (this.type) {
			case 'm7':
				this.chroma.push(
					(this.root + 3) % 12,
					(this.root + 7) % 12
				);
				break;
			case 'hd':
				this.chroma.push(
					(this.root + 3) % 12,
					(this.root + 6) % 12
				);
				break;
			case 'fr':
				this.chroma.push(
					(this.root + 4) % 12,
					(this.root + 6) % 12
				);
				break;
			case 'dom':
				this.chroma.push(
					(this.root + 4) % 12,
					(this.root + 7) % 12
				);
				break;
		}
	}
}

Seventh.prototype.checkParsimony = function(otherSeventh) {
	//how many chroma do we have in common?
	var intersection = otherSeventh.chroma.filter((c) => this.chroma.includes(c))
	return intersection.length
}