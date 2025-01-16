class Controls{

  constructor(drone,light,camera,droneSpeed=2){

    this.droneSpeed=droneSpeed
    this.drone=drone
    this.camera=camera
    this.light=light
  }

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
        this.drone.moveForward(droneSpeed)
        break;
      case "a":
        this.drone.turnLeft(10)
        break;
      case "s":
        this.drone.moveBackward(droneSpeed)
        break;
      case "d":
        this.drone.turnRight(10)
        break;
      case "j":
        this.drone.flyDown(droneSpeed)
        break;
      case "k":
        this.drone.flyUp(droneSpeed)
        break;
      default:
        return;
    }

    // place camera behind drone
    camera.place(
      [
        this.drone.position[0]-this.drone.forwardDirection()[0]*5,
        this.drone.position[1]+Math.sqrt(Math.pow(this.drone.forwardDirection()[0]*5,2) + Math.pow(this.drone.forwardDirection()[2]*5,2)),
        this.drone.position[2]-this.drone.forwardDirection()[2]*5
      ]
    )

    // whatch in front of the drone
    camera.look(
      [
        this.drone.forwardPosition()[0],
        0.5+this.drone.forwardPosition()[1],
        this.drone.forwardPosition()[2]
      ]
    )
  }
}
