class Light{

  constructor(program,position=[10,10,10],direction=[0,0,0],color=[1,1,1]){
    this.program = program
    this.position = position
    this.color = color
    this.direction = direction
    this.place()
  }

  place(){

    gl.uniform3fv(gl.getUniformLocation(this.program, "u_lightDirection" ),  this.direction);
    gl.uniform3fv(gl.getUniformLocation(this.program, "u_ambientLight" ), this.position );
    gl.uniform3fv(gl.getUniformLocation(this.program, "u_colorLight" ), this.color );

  }

}
