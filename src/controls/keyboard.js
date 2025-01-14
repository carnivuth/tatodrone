
class Keyboard extends Controls{

  constructor(drone,light,camera){

    super(drone,light,camera);

    window.addEventListener("keydown", this.handleInput,true);

  }

}
