
// class for manage touch controls
// the idea is to rotate the drone with horizontal swaps and move forward/backward  with vertical swaps
// to manage this the following events are captured
// - touchstart, the touch is registered and an interval function is scheduled
// - touchmove, the new finger position is registered and the direction is computed to find if it is a vertical or horizontal swipe
// - touchend,touchcancel the interval function is canceled and variables are cleaned up
//
// The interval function encapsulate the logic that distinguish between vertical and horizontal swipes, touch data are retrieved trough object attributes witch acts as a shared object between event fired function witch updates the values and the interval function wich reads them
//
// event_functions ---updates---> object attributes <---reads--- interval function
class Gestures extends Controls{

  constructor(drone,light,camera,canvas,droneSpeed=2){

    //instatiate controls
    super(drone,light,camera,droneSpeed);

    // variables for touch control
    this.canvas = canvas

    // beginning point of contact with finger
    this.startPoint = {}

    // actual point of contact with finger
    this.nextPoint = {}

    // boolean to check if screen is touched
    this.isTouching = false

    // bias for control
    this.bias= 0.1

    // ref to the interval function
    this.movementHandler={}

    // binds the object to the callback functions instead of the html element
    this.handleStart = this.handleStart.bind(this);
    this.handleEnd = this.handleEnd.bind(this);
    this.handleMove = this.handleMove.bind(this);
    this.updatePosition = this.updatePosition.bind(this);

    //add listeners
    this.canvas.addEventListener("touchstart", this.handleStart);
    this.canvas.addEventListener("touchend", this.handleEnd);
    this.canvas.addEventListener("touchcancel", this.handleEnd);
    this.canvas.addEventListener("touchmove", this.handleMove);

  }

  // set start point and run the movement loop
  handleStart(event){

    // manage only one finger at a time for simplicity
    this.startPoint=event.changedTouches[0]
    this.nextPoint=event.changedTouches[0]

    this.isTouching=true

    debug("touch start")

    // schedule the interval function
    this.movementHandler=window.setInterval(this.updatePosition,6)
  }

  handleEnd(event){

    debug("touch end")
    this.nextPoint={}
    this.startPoint={}
    this.isTouching= false

    // remove the interval function from scheduling
    clearInterval(this.movementHandler);

  }

  // update the nextPoint variable
  handleMove(event){
    this.nextPoint = event.changedTouches[0]
  }

  // interval function
  updatePosition(){

    if(this.isTouching){
      debug("touch move")
      debug("page x " + this.nextPoint.pageX + " page y " + this.nextPoint.pageY)
      debug("x uppper limit " + (this.startPoint.pageX + this.startPoint.pageX * this.bias) + " y upper limit " + (this.startPoint.pageY - this.startPoint.pageY * this.bias))
      debug("x lower limit " + (this.startPoint.pageX - this.startPoint.pageX * this.bias) + " y lower limit " + (this.startPoint.pageY + this.startPoint.pageY * this.bias))

      // check if finger is slide horizontally
      if(this.nextPoint.pageX > this.startPoint.pageX + this.startPoint.pageX * this.bias){
        this.handleInput({key:"d"})
      }
      if(this.nextPoint.pageX < this.startPoint.pageX - this.startPoint.pageX * this.bias){
        this.handleInput({key:"a"})
      }

      // check if finger is slide vertically
      if(this.nextPoint.pageY < this.startPoint.pageY - this.startPoint.pageY * this.bias){
        this.handleInput({key:"w"})
      }
      if(this.nextPoint.pageY > this.startPoint.pageY + this.startPoint.pageY * this.bias){
        this.handleInput({key:"s"})
      }
    }
    debug("page y " + this.startPoint.pageY + "page x " + this.startPoint.pageX)
  }

}
