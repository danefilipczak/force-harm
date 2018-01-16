var desiredSeperation = 10;
var forceMult = 0.5;
var chargeStrength = 0.01;
var linkDistance = 15;
var linkStrength = 0.001;
var overChord = null;
var framecount = 0;


function animationLoop(){

    sevenths.forEach(function(s){
        s.forceLink();
    })
    staticCharge();
    sevenths.forEach(function(s){
        s.applyForce();
        s.updateLines();
    })


    if(framecount%10==0){
        // console.log('hi')
        raycast();
    }

    framecount++;

    var x = noise.simplex3(1, 1, framecount/100);
    sevenths[0].sphere.position.x=x*10

    var y = noise.simplex3(1, 1, framecount/100);
    sevenths[0].sphere.position.z=y*10

    var z = noise.simplex3(1, 1, framecount/100);
    sevenths[0].sphere.position.z=z*10

    // sevenths[0].addForce(new THREE.Vector3(x, y, z))


}

function raycast(){
    raycaster.setFromCamera( mouse, camera );

    // calculate objects intersecting the picking ray
    var intersects = raycaster.intersectObjects( scene.children );

    if(overChord){
        overChord.sphere.material.color.set('cyan')
        overChord = null;
    }
    var hits = intersects.filter(function(e) { return e.object.userData instanceof Seventh; });
    if (hits.length > 0) {
        // console.log('hit')
        overChord=hits[0].object.userData;
        overChord.sphere.material.color.set('red')
 
    }
}

function staticCharge(){
    for(var i=0;i<sevenths.length;i++){
        for(var j = 0; j<sevenths.length; j++){
            if(i!=j){
                var d = sevenths[i].sphere.position.distanceTo(sevenths[j].sphere.position);
                if(d<desiredSeperation){
                    var diff = sevenths[i].sphere.position.clone();
                    diff = diff.sub(sevenths[j].sphere.position);
                    // var diff = THREE.Vector3.sub(this.position,vehicles[i].position);
                    diff.normalize();
                    diff.multiplyScalar(desiredSeperation-d)
                    diff.multiplyScalar(chargeStrength * forceMult)
                    sevenths[i].addForce(diff)
                }
            }
        }
    }
}