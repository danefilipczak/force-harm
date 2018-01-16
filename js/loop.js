var desiredSeperation = 10;
var forceMult = 0.3;
var chargeStrength = 0.01;
var linkDistance = 15;
var linkStrength = 0.001;

function animationLoop(){

    sevenths.forEach(function(s){
        s.forceLink();
    })
    staticCharge();
    sevenths.forEach(function(s){
        s.applyForce();
        s.updateLines();
    })

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