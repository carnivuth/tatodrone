class Buttons extends Controls{

  constructor(drone,light,camera){

    super(drone,light,camera);

    window.addEventListener("keydown", this.handleInput,true);
    $( "#up" ).on("click",{key:"k"},this.handleInput )
    $( "#down" ).on("click",{key:"j"},this.handleInput )
    $( "#left" ).on("click",{key:"a"},this.handleInput )
    $( "#right" ).on("click",{key:"d"},this.handleInput )
    $( "#forward" ).on("click",{key:"w"},this.handleInput )
    $( "#backward" ).on("click",{key:"s"},this.handleInput )

  }

}
