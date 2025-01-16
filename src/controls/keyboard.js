
class Keyboard extends Controls{

  constructor(drone,light,camera,droneSpeed=2){

    super(drone,light,camera,droneSpeed);

    window.addEventListener("keydown", this.handleInput,true);

  }

}
