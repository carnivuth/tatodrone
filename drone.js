class Drone extends Model{

  constructor(program,position,rotation,scale) {

    super(program,"assets/drone/drone.obj",position,rotation,scale);
    this.forwardDirection=[0,0,1]
  }
  moveForward(steps){

    // update position accordingly to the forward direction
    this.place(
      [
        this.position[0]+this.forwardDirection[0]*steps,
        this.position[1]+this.forwardDirection[1]*steps,
        this.position[2]+this.forwardDirection[2]*steps
      ]
    );

  }
  moveBackward(steps){
    // update position accordingly to the forward direction
    this.place(
      [
        this.position[0]-this.forwardDirection[0]*steps,
        this.position[1]-this.forwardDirection[1]*steps,
        this.position[2]-this.forwardDirection[2]*steps
      ]
    );

  }

  turnLeft(degrees){
    //| cos θ    0   sin θ| |x|   | x cos θ + z sin θ|   |x'|
    //|   0      1       0| |y| = |         y        | = |y'|
    //|−sin θ    0   cos θ| |z|   |−x sin θ + z cos θ|   |z'|

    // rotate the forward direction according to the rotation
    this.forwardDirection[0] = this.forwardDirection[0]*Math.cos(degrees) +this.forwardDirection[2]*Math.sin(degrees)
    this.forwardDirection[1] = this.forwardDirection[1]
    this.forwardDirection[2] = -this.forwardDirection[0]*Math.sin(degrees) +this.forwardDirection[2]*Math.cos(degrees)

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
    this.forwardDirection[0] = this.forwardDirection[0]*Math.cos(-degrees) +this.forwardDirection[2]*Math.sin(-degrees)
    this.forwardDirection[1] = this.forwardDirection[1]
    this.forwardDirection[2] = -this.forwardDirection[0]*Math.sin(-degrees) +this.forwardDirection[2]*Math.cos(-degrees)

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
}
