class Drone extends Model{

  constructor(program,position,rotation,scale) {

    super(program,"assets/drone/drone.obj",position,rotation,scale);

    // assume the drone is paralel to the z axis for the sake of simplicity
    this.forwardPosition=[this.position[0],this.position[0],this.position[0]+1]
  }


  /////// translation in the X, Z plane
  moveForward(steps){
    this.move(steps)
  }

  moveBackward(steps){
    this.move(-steps)
  }

  move(steps){

    // compute step array given the forwardDirection
    var stepArray =[
        this.forwardDirection()[0]*steps,
        this.forwardDirection()[1]*steps,
        this.forwardDirection()[2]*steps
      ]

    // check if drone goes out of bounds
    if(! this.isOutOfBounds(
      [
        stepArray[0],
        0,
        stepArray[2]
      ],
      100)){

      // update drone position accordingly to the forward direction
      this.place(
        [
          this.position[0]+stepArray[0],
          this.position[1],
          this.position[2]+stepArray[2]
        ]
      );

      // update forward position accordingly to the forward direction
      this.forwardPosition =
        [
          this.forwardPosition[0]+stepArray[0],
          this.forwardPosition[1],
          this.forwardPosition[2]+stepArray[2]
        ]
    }
  }

  /////// translation along the Y axis
  flyUp(steps){
    this.fly(steps)
  }

  flyDown(steps){
    this.fly(-steps)
  }

  fly(steps){

    // compute step array given the forwardDirection
    var stepArray =[
        this.forwardDirection()[0]*steps,
        this.forwardDirection()[1]*steps,
        this.forwardDirection()[2]*steps
      ]

    // check if drone goes out of bounds
    if(! this.isOutOfBounds(
      [
        0,
        stepArray[1],
        0
      ],
      100)){

        // update position accordingly to the forward direction
        this.place(
          [
            this.position[0],
            this.position[1]+stepArray[1],
            this.position[2]
          ]
        );
        // update forward position accordingly to the forward direction
        this.forwardPosition =
          [
            this.forwardPosition[0],
            this.forwardPosition[1]+stepArray[1],
            this.forwardPosition[2]
          ]
    }
  }

  /////// rotation w.r.t. the Y axis
  turnLeft(degrees){
    this.turn(degrees)
  }

  turnRight(degrees){
    this.turn(-degrees)
  }

  turn(degrees){

    // update the rotation vector of the model
    this.rotateY(this.rotation[1]+degrees);

    // rotate the forward position point accordingly
    this.forwardPosition[0] = this.forwardPosition[0]*Math.cos(degToRad(degrees)) +this.forwardPosition[2]*Math.sin(degToRad(degrees))
    this.forwardPosition[1] = this.forwardPosition[1]
    this.forwardPosition[2] = -this.forwardPosition[0]*Math.sin(degToRad(degrees)) +this.forwardPosition[2]*Math.cos(degToRad(degrees))

  }


  // check is drone is out of bounds
  isOutOfBounds(steps,bound){
    bound=bound/2
    if(
      this.position[0]+steps[0] <bound &&
        this.position[0]+steps[0] >-bound &&
        this.position[1]+steps[1] <bound &&
        // to avoid moving under the floor
        this.position[1]+steps[1] >0 &&
        this.position[2]+steps[2] <bound &&
        this.position[2]+steps[2] >-bound
    ){
      return false;
    }else{
      return true;
    }
  }

  // compute the forward direction that the drone will follow when mooving forward or bakcward
  forwardDirection(){
    return m4.normalize(
      [
        this.forwardPosition[0] - this.position[0],
        this.forwardPosition[1] - this.position[1],
        this.forwardPosition[2] - this.position[2]
      ]
    );
  }
}
