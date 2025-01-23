// class that models a controller interface, it implements the logic that updates the scene, it's extended by all controls classes wich solve HUD specific problems and run the handle input of this class (strategy pattern)
class Controls{

	constructor(drone,light,camera,droneSpeed=2){

		this.droneSpeed=droneSpeed
		this.drone=drone
		this.camera=camera
		this.light=light
	}

	// method that implements the scene update logic
	handleInput(event){

		debug(event)
		var key

		if(event.key){
			key=event.key
		}else if(event.data.key){
			key = event.data.key
		}else{
			key=event
		}

		switch (key) {
			case "w":
				drone.moveForward(droneSpeed)
				break;
			case "a":
				drone.turnLeft(10)
				break;
			case "s":
				drone.moveBackward(droneSpeed)
				break;
			case "d":
				drone.turnRight(10)
				break;
			case "j":
				drone.flyDown(droneSpeed)
				break;
			case "k":
				drone.flyUp(droneSpeed)
				break;
			default:
				return;
		}

		// place camera behind drone
		camera.place(
			[
				drone.position[0]-drone.forwardDirection()[0]*5,
				drone.position[1]+Math.sqrt(Math.pow(drone.forwardDirection()[0]*5,2) + Math.pow(drone.forwardDirection()[2]*5,2)),
				drone.position[2]-drone.forwardDirection()[2]*5
			]
		)

		// whatch in front of the drone
		camera.look(
			[
				drone.forwardPosition()[0],
				0.5+drone.forwardPosition()[1],
				drone.forwardPosition()[2]
			]
		)
	}
}
