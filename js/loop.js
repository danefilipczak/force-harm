
// moderate
// var desiredSeperation = 10;
// var forceMult = 0.5;
// var chargeStrength = 0.01;
// var linkDistance = 15;
// var linkStrength = 0.001;


// rigid
// var desiredSeperation = 10/2;
// var forceMult = 0.5;
// // var forceMult = 0.001;
// var chargeStrength = 0.01;
// var linkDistance = 50/2;
// var linkStrength = 0.001;



//loose
var desiredSeperation = 50;
var forceMult = 0.5;
// var forceMult = 0.001;
var chargeStrength = 0.01;
var linkDistance = 1;
var linkStrength = 0.001;


var overChord = null;
var framecount = 0;
var currentChord;
var lastChord;
var cursortick = 0;
var path = [];

currentNoise = 1;
lastNoise = 0;


function animationLoop() {

    sevenths.forEach(function(s) {
        s.forceLink();
    })
    staticCharge();
    sevenths.forEach(function(s) {
        s.applyForce();
        s.updateLines();
    })


    if (framecount % 10 == 0) {
        // console.log('hi')
        raycast();
    }

    framecount++;

    addNoise();


    animateCursor(100);

    followPath()
    setBoldLine(lastChord.sphere.position, currentChord.sphere.position);
    setCylinder(lastChord.sphere.position, currentChord.sphere.position);

    // sevenths[0].addForce(new THREE.Vector3(x, y, z))


}

function addNoise() {
    var scale = 50;
    var amount = 0.02;
    var x = noise.simplex3(1, 1, framecount / scale);
    currentChord.sphere.position.x += x * currentNoise * amount;

    var y = noise.simplex3(1, 1, framecount / scale);
    currentChord.sphere.position.y += y * currentNoise * amount;

    var z = noise.simplex3(1, 1, framecount / scale);
    currentChord.sphere.position.z += z * currentNoise * amount;



    var x = noise.simplex3(1, 1, framecount / scale);
    lastChord.sphere.position.x += x * lastNoise * amount;

    var y = noise.simplex3(1, 1, framecount / scale);
    lastChord.sphere.position.y += y * lastNoise * amount;

    var z = noise.simplex3(1, 1, framecount / scale);
    lastChord.sphere.position.z += z * lastNoise * amount;
}

function isCursorMoving() {
    if (cursor.position.equals(currentChord.sphere.position)) {
        return false;
    } else {
        return true;
    }
}

function followPath() {
    // if()
    // if(path.length>0){

    // }

    if (isCursorMoving()) {

    } else {
        if (path.length > 0) {
            lastChord = currentChord;
            currentChord = path.pop()
            vm.current = translateChordName(currentChord.root, currentChord.type);
            triggerCursor()
            setVMpath();
            // vm.path = path;
        }

    }

}

function sigmoid(t) {
    return 1 / (1 + Math.pow(Math.E, -t));
}

function triggerCursor() {
    cursortick = 0;
    // lastNoise=1;
    // currentNoise=0;
}

function animateCursor(duration) {
    if (moveCursor(cursortick, duration)) {
        //in motion
        // console.log('hey')

    } else {
        cursor.position.set(currentChord.sphere.position.x, currentChord.sphere.position.y, currentChord.sphere.position.z)
    }
    cursortick++;
}

function moveCursor(frame, duration) {

    if (frame >= duration) {
        return false;
    } else {
        var line = new THREE.Line3(lastChord.sphere.position, currentChord.sphere.position);
        var val = sigmoid(((frame / duration) * 12) - 6);
        var point = line.at(val);
        cursor.position.set(point.x, point.y, point.z)
        lastNoise = 1 - val;
        currentNoise = val;

        return true;
    }
}


function setCylinder(pointA, pointB) {


    /* edge from X to Y */
    var line = new THREE.Line3(pointA, pointB);
    var direction = new THREE.Vector3().subVectors(pointA, pointB);

    // var edgeGeometry = new THREE.BoxGeometry(0.5, 0.5, direction.length(), 8, 1);
    // console.log(edgeGeometry.vertices[0].z)
    // cylinder.geometry=edgeGeometry;

    var length = Math.abs(direction.length() / 2);
    // console.log(length)


    // for(var i = 0; i<cylinder.geometry.vertices.length; i++){
    //     var vertex = cylinder.geometry.vertices[i];
    //     if(vertex.z>=0){
    //         vertex.z = length;
    //     } else {
    //         vertex.z = length*-1;
    //     }
    // }
    cylinder.geometry.vertices.forEach(function(v) {
        if (v.z >= 0) {
            v.z = length;
        } else {
            // v.z = length*-2;
        }
    });


    cylinder.geometry.verticesNeedUpdate = true;


    cylinder.lookAt(pointB)
    cylinder.position.copy(line.at(0.5))

}


function setBoldLine(pointY, pointX) {
    //draw a bold line between two vector threes
    /* edge from X to Y */
    boldLine.geometry.vertices[0].copy(pointX)
    boldLine.geometry.vertices[1].copy(pointY)
    boldLine.geometry.verticesNeedUpdate = true;
}


function raycast() {
    raycaster.setFromCamera(mouse, camera);

    // calculate objects intersecting the picking ray
    var intersects = raycaster.intersectObjects(scene.children);

    if (overChord) {
        overChord.sphere.material.color.set('cyan')
        overChord = null;
    }
    var hits = intersects.filter(function(e) {
        return e.object.userData instanceof Seventh;
    });
    if (hits.length > 0) {
        // console.log('hit')
        overChord = hits[0].object.userData;
        overChord.sphere.material.color.set('white')
        showLabel();

    } else {
        hideLabel()
    }
}

function showLabel() {
    document.getElementById('label').style.display = 'inline'
    document.getElementById('label').style.left = mouseX + 20 + 'px'
    document.getElementById('label').style.top = mouseY - 20 + 'px'
    var ob = translateChordName(overChord.root, overChord.type);
    document.getElementById('label').innerHTML = ob.root + ob.sign + ob.stem + '<sup>' + ob.super + '</sup>';
}

function hideLabel() {
    document.getElementById('label').innerHTML = '';
    document.getElementById('label').style.display = 'none'
}

function staticCharge() {
    for (var i = 0; i < sevenths.length; i++) {
        for (var j = 0; j < sevenths.length; j++) {
            if (i != j) {
                var d = sevenths[i].sphere.position.distanceTo(sevenths[j].sphere.position);
                if (d < desiredSeperation) {
                    var diff = sevenths[i].sphere.position.clone();
                    diff = diff.sub(sevenths[j].sphere.position);
                    // var diff = THREE.Vector3.sub(this.position,vehicles[i].position);
                    diff.normalize();
                    diff.multiplyScalar(desiredSeperation - d)
                    diff.multiplyScalar(chargeStrength * forceMult)
                    sevenths[i].addForce(diff)
                }
            }
        }
    }
}