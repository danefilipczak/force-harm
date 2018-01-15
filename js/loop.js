
function animationLoop(){

    sevenths.forEach(function(s){
        s.forceLink();
    })
    for(var i=0;i<sevenths.length;i++){
        for(var j = 0; j<sevenths.length; j++){
            if(i!=j){
                var d = sevenths[i].sphere.position.distanceTo(sevenths[j].sphere.position);
                if(d<25){
                    var diff = sevenths[i].sphere.position.clone();
                    diff = diff.sub(sevenths[j].sphere.position);
                    // var diff = THREE.Vector3.sub(this.position,vehicles[i].position);
                    diff.normalize();
                    diff.multiplyScalar(0.1)
                    sevenths[i].addForce(diff)
                }
            }
        }
    }
    sevenths.forEach(function(s){
        s.applyForce();
    })

}