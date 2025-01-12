class Light{

  constructor(program,position=[10,10,10],direction=[0,0,0],color=[1,1,1]){
    this.program = program
    this.color = color
    this.direction = direction
    this.place(position)
  }

  place(position){
    if (position != undefined){this.position=position}
  }

  render(){

    gl.uniform3fv(gl.getUniformLocation(this.program, "u_lightDirection" ),  this.direction);
    gl.uniform3fv(gl.getUniformLocation(this.program, "u_lightPosition" ), this.position );
    gl.uniform3fv(gl.getUniformLocation(this.program, "u_lightColor" ), this.color );

  }

}
