var linkDistance = 20;

function Seventh(root_, type_) {
	this.root = root_;
	this.type = type_;
	this.chroma = []
	this.linkedTo = [];
	this.initialize()
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
	scene.add(this.sphere);
	var splay=100;
	this.sphere.position.x+=(Math.random()*splay)-splay/2;
	this.sphere.position.y+=(Math.random()*splay)-splay/2;
	this.sphere.position.z+=(Math.random()*splay)-splay/2;

	this.velocity = new THREE.Vector3();
}

Seventh.prototype.addForce = function(force){
	// We could add mass here if we want A = F / M
    this.velocity.add(force);
}

Seventh.prototype.applyForce = function(){
	this.sphere.position.add(this.velocity);
	this.velocity.multiplyScalar(0);
}

Seventh.prototype.forceLink = function(){
	// The link force pushes linked nodes together or apart according to the desired link distance. 
	// The strength of the force is proportional to the difference between the linked nodes’ distance 
	// and the target distance, similar to a spring force.
	var self = this;
	this.linkedTo.forEach(function(link){
		var distance = self.sphere.position.distanceTo(link.sphere.position);
		//calculate desired positio
		var diff = linkDistance-distance;
		var desired = self.sphere.position.clone();
        desired = desired.sub(link.sphere.position);
		desired.divideScalar(diff); 
		// desired.multiplyScalar(0.1)
		// desired.normalize()
		self.addForce(desired);
	})
}

Seventh.prototype.initialize = function() {
	this.chroma.push( //everyone gets a root and a minor seventh
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

Seventh.prototype.checkParsimony = function(otherSeventh) {
	//how many chroma do we have in common?
	var intersection = otherSeventh.chroma.filter((c) => this.chroma.includes(c))
	return intersection.length
}