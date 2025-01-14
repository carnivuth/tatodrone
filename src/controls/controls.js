class Controls{

  constructor(drone,light,camera){

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
        drone.moveForward(5)
        break;
      case "a":
        drone.turnLeft(10)
        break;
      case "s":
        drone.moveBackward(5)
        break;
      case "d":
        drone.turnRight(10)
        break;
      case "j":
        drone.flyDown(0.5)
        break;
      case "k":
        drone.flyUp(0.5)
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
