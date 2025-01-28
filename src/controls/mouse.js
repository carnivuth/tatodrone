
class Mouse extends Controls{

	constructor(drone,light,camera,canvas,droneSpeed=2){

		super(drone,light,camera,droneSpeed);

    this.canvas=canvas

    // keep track of mouse button status
    this.mouseClicked = false;
    this.mouseStartPosition={}
    this.mousePosition={}
    this.mouseHandler= {}

    this.mouseStartContact=this.mouseStartContact.bind(this)
    window.addEventListener("mousedown",this.mouseStartContact)

    this.mouseEndContact=this.mouseEndContact.bind(this)
    window.addEventListener("mouseup",this.mouseEndContact);

    this.handleMouse=this.handleMouse.bind(this)
		this.canvas.addEventListener("mousemove", this.handleMouse);

	}

  // strart mouse interaction
  mouseStartContact(event){
      debug(event)
      this.mouseClicked=true;
      this.mouseStartPosition.x = event.clientX - this.canvas.getBoundingClientRect().x;
      this.mouseStartPosition.y = event.clientY - this.canvas.getBoundingClientRect().y;
  }

  // end mouse interaction
  mouseEndContact(event){
      this.mouseClicked=false;
      this.mouseStartPosition= {};
  }

  handleMouse(event){
    if (this.mouseClicked === true){
      this.mousePosition.x = event.clientX - this.canvas.getBoundingClientRect().x;
      this.mousePosition.y = event.clientY - this.canvas.getBoundingClientRect().y;
      if(this.mousePosition.x>this.mouseStartPosition.x){
        this.handleInput({key:"a"})
      }
      if(this.mousePosition.x<this.mouseStartPosition.x){
        this.handleInput({key:"d"})
      }
      this.mouseStartPosition.x = this.mousePosition.x
      this.mouseStartPosition.y = this.mousePosition.y
    }
  }



}
