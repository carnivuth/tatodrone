class Camera{

  constructor(program,position = [0, 0, 0], lookAt = [0, 0, -1], up = [0, 1, 0],fov=60) {

    this.position = position;
    this.fov=fov
    this.program=program
    this.forward = m4.normalize(m4.subtractVectors(lookAt, position));
    this.right = m4.normalize(m4.cross(this.forward, up));
    this.up = m4.normalize(m4.cross(this.right, this.forward));
    this.place()
  }

  place(){

    this.setProjectionMatrix()
    this.setViewMatrix()
  }



  // For creating the ProjectionMatrix - used to project the 3D scene viewed onto a 2D plane (Canvas)
  setProjectionMatrix() {

    // Calculate the perspective projection matrix
    const aspect = gl.canvas.clientWidth / gl.canvas.clientHeight;
    const zmin = 0.1;
    const fieldOfViewRadians = degToRad(this.fov);

    // Create the ProjectionMatrix
    const projectionMatrix = m4.perspective(fieldOfViewRadians, aspect, zmin, 200); // Creates a perspective projection matrix using field of view, aspect ratio, and clipping planes
    const projectionMatrixLocation = gl.getUniformLocation(this.program, "u_projection");
    gl.uniformMatrix4fv(projectionMatrixLocation, false, projectionMatrix);

    return projectionMatrix;
  }
  // To get the view matrix
  setViewMatrix() {

    const look = m4.addVectors(this.position, this.forward);
    const viewMatrix = m4.inverse(m4.lookAt(this.position, look, this.up));
    const viewMatrixLocation = gl.getUniformLocation(this.program, "u_view");
    gl.uniformMatrix4fv(viewMatrixLocation, false, viewMatrix);
    return viewMatrix;

  }

  //
  // Auxiliary functions
  //

  // To reset the camera's position
  reset() {
    //this.position = [0, 1, 0]; // Don't reset the position, only the tilt
    this.forward = [0, 0, -1];
    this.right = m4.normalize(m4.cross(this.forward, this.up));
    this.up = [0, 1, 0];
  }

}
