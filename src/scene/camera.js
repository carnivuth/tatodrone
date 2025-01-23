class Camera{

  // creates object and set default value for gui customizable parameters
  constructor(program,position = [0, 0, 0], lookAt = [0, 0, 0], up = [0, 1, 0],fov=30) {
    this.program=program;
    this.up = up;
    this.place(position,fov)
    this.look(lookAt)
  }
  // updates parameters and recomputes the view and projection matrix
  place(position,fov){
    if (fov != undefined){this.fov = fov}
    if (position != undefined){this.position = position}
  }

  look(lookAt){
    if (lookAt != undefined){this.lookAt = lookAt}
  }

  render(){
    this.setProjectionMatrix()
    this.setViewMatrix()
    this.setCameraPosition()
  }


  setCameraPosition() {

    const cameraPositionLocation = gl.getUniformLocation(this.program, "camera_position");
    gl.uniform3fv(cameraPositionLocation, this.position);
  }

  // creates the projection matrix and links the matrix to the shader program https://carnivuth.github.io/computer_graphics/pages/TRASFORMAZIONI_VISTA#dallosservatore-alla-window
  setProjectionMatrix() {

    const aspect = gl.canvas.clientWidth / gl.canvas.clientHeight;
    const zmin = 0.1;
    const zmax = 200;

    const projectionMatrix = m4.perspective(degToRad(this.fov), aspect, zmin, zmax);
    const projectionMatrixLocation = gl.getUniformLocation(this.program, "projection");
    gl.uniformMatrix4fv(projectionMatrixLocation, false, projectionMatrix);
    return projectionMatrix;
  }

  // creates the view matrix and links the matrix to the shader program https://carnivuth.github.io/computer_graphics/pages/TRASFORMAZIONI_VISTA#dal-mondo-allosservatore
  setViewMatrix() {

    const viewMatrix = m4.inverse(m4.lookAt(this.position, this.lookAt, this.up));
    const viewMatrixLocation = gl.getUniformLocation(this.program, "view");
    gl.uniformMatrix4fv(viewMatrixLocation, false, viewMatrix);
    return viewMatrix;

  }

}
