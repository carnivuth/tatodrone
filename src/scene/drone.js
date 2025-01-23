class Drone extends Model{

  constructor(program,position,rotation,scale,forwardVector=[0,0,1],hasReflections=false,isTransparent=false) {

    super(program,"assets/drone/drone.obj",position,rotation,scale,hasReflections,isTransparent);

    // the drone movements are done following the direction (forwardDirection)
    // given by a point in front of the drone (forwardPosition) that is transformed following the drone matrixes
    //
    // ^
    // |
    // |
    // |    ^    *--> forwardPosition (aka trasformed forwardVector)
    // |   /
    // |  /    *--> drone
    // | /
    // |/
    // ---------------------->
    //
    // for the sake of simplicity the drone is assumed to be parallel to the z axis so the forward vector can be computed statically
    // when the object is created the forwardVector is rotated to match the default drone orientation, in case the model and world axis are not alligned
    let rotationXMatrix = m4.xRotation(degToRad(this.rotation[0]));
    let rotationYMatrix = m4.yRotation(degToRad(this.rotation[1]));
    let rotationZMatrix = m4.zRotation(degToRad(this.rotation[2]));
    this.forwardVector = m4.transformPoint(rotationZMatrix, m4.transformPoint(rotationYMatrix, m4.transformPoint(rotationXMatrix,forwardVector)));
  }

  forwardPosition(){
    return m4.transformPoint(this.transformMatrix(),this.forwardVector)
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

    // check if drone goes out of bounds
    if(! this.isOutOfBounds(
      [
        0,
        steps,
        0
      ],
      100)){

      // update position accordingly to the forward direction
      this.place(
        [
          this.position[0],
          this.position[1]+steps,
          this.position[2]
        ]
      );
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
    return m4.normalize(m4.subtractVectors(this.forwardPosition(),this.position));
  }
}
