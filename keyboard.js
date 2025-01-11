class Keyboard{

  constructor(drone,light,camera){

    this.drone=drone
    this.camera=camera
    this.light=light

    window.addEventListener("keydown", this.handleInput,true);

  }
  handleInput(event){

    debug(event)
    switch (event.key) {
      case "w":
        drone.moveForward(0.25)
        break;
      case "a":
        drone.turnLeft(0.25)
        break;
      case "s":
        drone.moveBackward(0.25)
        break;
      case "d":
        drone.turnRight(0.25)
        break;
      default:
        return;
    }
    // place camera behind drone
    camera.place(
      [
        drone.position[0]-drone.forwardDirection[0]*5,
        5+drone.position[1]-drone.forwardDirection[1]*5,
        drone.position[2]-drone.forwardDirection[2]*5
      ]
    )

    //whatch in front of the drone
    camera.look(
      [
        drone.position[0]+drone.forwardDirection[0]*5,
        0.5+drone.position[1]+drone.forwardDirection[1]*5,
        drone.position[2]+drone.forwardDirection[2]*5
      ]
    )

    event.preventDefault();

  }

}
