class Camera{

  constructor(program,position = [0, 0, 0], lookAt = [0, 0, 0], up = [0, 1, 0],fov=30) {
    this.position = position;
    this.fov=fov;
    this.program=program;
    this.lookAt=lookAt;
    this.up = up;
    this.place()
  }

  place(){
    this.setProjectionMatrix()
    this.setViewMatrix()
  }

  // creates the projection matrix and links the matrix to the shader program https://carnivuth.github.io/computer_graphics/pages/TRASFORMAZIONI_VISTA#dallosservatore-alla-window
  setProjectionMatrix() {

    const aspect = gl.canvas.clientWidth / gl.canvas.clientHeight;
    const zmin = 0.1;
    const zmax = 200;

    const projectionMatrix = m4.perspective(degToRad(this.fov), aspect, zmin, zmax);
    const projectionMatrixLocation = gl.getUniformLocation(this.program, "u_projection");
    gl.uniformMatrix4fv(projectionMatrixLocation, false, projectionMatrix);

    return projectionMatrix;
  }

  // creates the view matrix and links the matrix to the shader program https://carnivuth.github.io/computer_graphics/pages/TRASFORMAZIONI_VISTA#dal-mondo-allosservatore
  setViewMatrix() {

    const viewMatrix = m4.inverse(m4.lookAt(this.position, this.lookAt, this.up));
    const viewMatrixLocation = gl.getUniformLocation(this.program, "u_view");
    gl.uniformMatrix4fv(viewMatrixLocation, false, viewMatrix);
    return viewMatrix;

  }

}
