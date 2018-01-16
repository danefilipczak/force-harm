var desiredSeperation = 10;
var forceMult = 0.5;
var chargeStrength = 0.01;
var linkDistance = 15;
var linkStrength = 0.001;
var overChord = null;
var framecount = 0;
var currentChord;
var lastChord;
var cursortick=0;

currentNoise=1;
lastNoise=0;


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
    currentChord.sphere.position.x+=x*currentNoise;

    var y = noise.simplex3(1, 1, framecount/100);
    currentChord.sphere.position.y+=y*currentNoise;

    var z = noise.simplex3(1, 1, framecount/100);
    currentChord.sphere.position.z+=z*currentNoise;



    var x = noise.simplex3(1, 1, framecount/100);
    lastChord.sphere.position.x+=x*lastNoise;

    var y = noise.simplex3(1, 1, framecount/100);
    lastChord.sphere.position.y+=y*lastNoise;

    var z = noise.simplex3(1, 1, framecount/100);
    lastChord.sphere.position.z+=z*lastNoise;

    
    animateCursor(100);


    // sevenths[0].addForce(new THREE.Vector3(x, y, z))


}


function sigmoid(t) {
    return 1/(1+Math.pow(Math.E, -t));
}

function triggerCursor(){
    cursortick=0;
    // lastNoise=1;
    // currentNoise=0;
}

function animateCursor(duration){
    if(moveCursor(cursortick, duration)){
        console.log('hey')
    } else {
        cursor.position.set(currentChord.sphere.position.x, currentChord.sphere.position.y, currentChord.sphere.position.z)
    }
    cursortick++;
}

function moveCursor(frame, duration){
    
    if(frame>=duration){
        return false;
    } else {
        var line = new THREE.Line3(lastChord.sphere.position, currentChord.sphere.position);
        var val = sigmoid(((frame/duration)*12)-6);
        var point = line.at(val);
        cursor.position.set(point.x, point.y, point.z)
        lastNoise=1-val;
        currentNoise=val;
        return true;
    }
    
    
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