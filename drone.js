class Drone extends Model{

  constructor(program,position,rotation,scale) {

    super(program,"assets/drone/drone.obj",position,rotation,scale);

    // assume the drone is paralel to the z axis for the sake of simplicity
    this.forwardDirection=[this.position[0],this.position[0],this.position[0]+1]
  }
  moveForward(steps){

    // check if drone goes out of bounds
    if(! this.isOutOfBounds(
      [
        this.forwardDirection[0]*steps,
        this.forwardDirection[1]*steps,
        this.forwardDirection[2]*steps
      ],
      45)){

      // update position accordingly to the forward direction
      this.place(
        [
          this.position[0]+this.forwardDirection[0]*steps,
          this.position[1]+this.forwardDirection[1]*steps,
          this.position[2]+this.forwardDirection[2]*steps
        ]
      );
    }

  }
  moveBackward(steps){
    // check if drone goes out of bounds
    if(! this.isOutOfBounds(
      [
        -this.forwardDirection[0]*steps,
        -this.forwardDirection[1]*steps,
        -this.forwardDirection[2]*steps
      ],
      45)){
      // update position accordingly to the forward direction
      this.place(
        [
          this.position[0]-this.forwardDirection[0]*steps,
          this.position[1]-this.forwardDirection[1]*steps,
          this.position[2]-this.forwardDirection[2]*steps
        ]
      );
    }
  }

  flyUp(steps){
    // update position accordingly to the forward direction
    this.place(
      [
        this.position[0],
        this.position[1]+steps,
        this.position[2]
      ]
    );
    this.forwardDirection[1]+=steps;
  }

  flyDown(steps){
    // update position accordingly to the forward direction
    this.place(
      [
        this.position[0],
        this.position[1]-steps,
        this.position[2]
      ]
    );
    this.forwardDirection[1]-=steps;
  }

  turnLeft(degrees){

    // rotate the forward direction according to the rotation
    this.forwardDirection[0] = this.forwardDirection[0]*Math.cos(degToRad(degrees)) +this.forwardDirection[2]*Math.sin(degToRad(degrees))
    this.forwardDirection[1] = this.forwardDirection[1]
    this.forwardDirection[2] = -this.forwardDirection[0]*Math.sin(degToRad(degrees)) +this.forwardDirection[2]*Math.cos(degToRad(degrees))

    //compute vector module
    var module=Math.sqrt(
      this.forwardDirection[0] * this.forwardDirection[0]+
        this.forwardDirection[1] * this.forwardDirection[1]+
        this.forwardDirection[2] * this.forwardDirection[2]
    )

    // normalize vector
    this.forwardDirection[0] = this.forwardDirection[0]/module
    this.forwardDirection[1] = this.forwardDirection[1]/module
    this.forwardDirection[2] = this.forwardDirection[2]/module

    this.rotateY(this.rotation[1]+degrees);

  }

  turnRight(degrees){
    // rotate the forward direction according to the rotation
    this.forwardDirection[0] = this.forwardDirection[0]*Math.cos(-degToRad(degrees)) +this.forwardDirection[2]*Math.sin(-degToRad(degrees))
    this.forwardDirection[1] = this.forwardDirection[1]
    this.forwardDirection[2] = -this.forwardDirection[0]*Math.sin(-degToRad(degrees)) +this.forwardDirection[2]*Math.cos(-degToRad(degrees))

    // compute vector module
    var module=Math.sqrt(
      this.forwardDirection[0] * this.forwardDirection[0]+
        this.forwardDirection[1] * this.forwardDirection[1]+
        this.forwardDirection[2] * this.forwardDirection[2]
    )

    //normalize vector
    this.forwardDirection[0] = this.forwardDirection[0]/module
    this.forwardDirection[1] = this.forwardDirection[1]/module
    this.forwardDirection[2] = this.forwardDirection[2]/module

    this.rotateY(this.rotation[1]-degrees);

  }
  isOutOfBounds(steps,bound){

    if(
      this.position[0]+steps[0] <=bound &&
        this.position[0]+steps[0] >=-bound &&
        this.position[1]+steps[1] <=bound &&
        this.position[1]+steps[1] >=-bound &&
        this.position[2]+steps[2] <=bound &&
        this.position[2]+steps[2] >=-bound
    ){
      return false;
    }else{
      return true;
    }

  }
}
