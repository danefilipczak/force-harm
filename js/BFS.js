function BFS(start, end){
	//return an array of chords that represents the shortest path between two chords.
	var queue = [];
	start.visited = true;
	queue.push(start)
	while(queue.length>0){
		var current = queue.shift()
		if(current == end){
			//found it
			break;
		}
		var linkedTo = current.linkedTo;
		for(var i = 0; i< linkedTo.length; i++){
			var neighbor = linkedTo[i];
			if(!neighbor.visited){
				neighbor.visited = true;
				neighbor.parent = current;
				queue.push(neighbor)

			}
		}
	}
	var path = []
	path.push(end)
	var next = end.parent;
	while(next != null){
		path.push(next);
		next = next.parent;
	}

	sevenths.forEach(function(c){
		c.parent = null;
		c.visited = false;
	})

	//null out all the parents and next
	return path
}