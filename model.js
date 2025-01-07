class Model{

  constructor(file, program,position=[0,0,0],rotation=[0,0,0],scale=[1,1,1]){

    this.sourceMesh=file
    this.mesh = [];
    this.ambient;   //Ka
    this.diffuse;   //Kd
    this.specular;  //Ks
    this.emissive;  //Ke
    this.shininess; //Ns
    this.opacity;   //Ni

    // parameters for transformation matrix (decide the model position rotation and scale)
    this.position=position
    this.rotation=rotation
    this.scale=scale

    // model vertices and textures informations
    this.positionsLoaded = [];
    this.normalsLoaded = [];
    this.texcoordsLoaded = [];
    this.textureLoaded = null;
    this.numVerticesLoaded = 0;

    // Attribute locators in shader program
    this.positionLocation = null;
    this.normalLocation = null;
    this.texcoordLocation = null;

    // Model buffers
    this.positionBuffer = null;
    this.normalBuffer = null;
    this.texcoordBuffer = null;
    this.program = program

    this.init();
  }

  init(){
    loadMesh(this);
    this.createBuffers();
  }
  rotateX(angle) {
        this.rotation = m4.xRotate(this.rotation,degToRad(angle));
  }

  transformMatrix() {

    let translationMatrix = m4.translation(this.position[0], this.position[1], this.position[2]); // Moves the model in 3D space
    let rotationXMatrix = m4.xRotation(this.rotation[0]);                                           // Rotation around the X axis
    let rotationYMatrix = m4.yRotation(this.rotation[1]);                                           // Rotation around the Y axis
    let rotationZMatrix = m4.zRotation(this.rotation[2]);                                           // Rotation around the Z axis
    let scaleMatrix = m4.scaling(this.scale[0], this.scale[1], this.scale[2]);                    // Scale the model

    // Multiply matrices in the order: scale, rotation, translation
    let transformationMatrix = m4.multiply(translationMatrix, m4.multiply(rotationZMatrix, m4.multiply(rotationYMatrix, m4.multiply(rotationXMatrix, scaleMatrix))));

    return transformationMatrix;
}

  // Function to create model buffers
  createBuffers() {

    // Get attribute locations in shaders
    this.positionLocation = gl.getAttribLocation(this.program, "a_position");
    this.normalLocation = gl.getAttribLocation(this.program, "a_normal");
    this.texcoordLocation = gl.getAttribLocation(this.program, "a_texcoord");

    // Create and configure the position buffer
    this.positionBuffer = gl.createBuffer();                                                   // Create buffer
    gl.bindBuffer(gl.ARRAY_BUFFER, this.positionBuffer);                                       // Specify which buffer to operate on
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.positions), gl.STATIC_DRAW);    // Fill the buffer with data

    // Create and configure the normal buffer
    this.normalBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, this.normalBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.normals), gl.STATIC_DRAW);

    // Create and configure the texture coordinates buffer
    this.texcoordBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, this.texcoordBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.texcoords), gl.STATIC_DRAW);
  }

  // Sets material parameters and binds buffers
  render(){

    // Set material parameters read from loadMesh()
    gl.uniform3fv(gl.getUniformLocation(this.program, "diffuse"), this.diffuse);
    gl.uniform3fv(gl.getUniformLocation(this.program, "ambient"), this.ambient);
    gl.uniform3fv(gl.getUniformLocation(this.program, "specular"), this.specular);
    gl.uniform3fv(gl.getUniformLocation(this.program, "emissive"), this.emissive);
    gl.uniform1f(gl.getUniformLocation(this.program, "shininess"), this.shininess);
    gl.uniform1f(gl.getUniformLocation(this.program, "opacity"), this.opacity);
    gl.uniformMatrix4fv(gl.getUniformLocation(this.program, "u_world"), false, this.transformMatrix());

    // Bind position buffer
    gl.bindBuffer(gl.ARRAY_BUFFER, this.positionBuffer);                       // Specify which buffer to work on for subsequent operations
    gl.enableVertexAttribArray(this.positionLocation);                         // The "a_position" attribute in the shader is active and can receive data from the buffer
    gl.vertexAttribPointer(this.positionLocation, 3, gl.FLOAT, false, 0, 0);   // Indicates how to interpret buffer data for the vertex attribute

    // Bind normal buffer
    gl.bindBuffer(gl.ARRAY_BUFFER, this.normalBuffer);
    gl.enableVertexAttribArray(this.normalLocation);
    gl.vertexAttribPointer(this.normalLocation, 3, gl.FLOAT, false, 0, 0);

    // Bind texcoord buffer
    gl.bindBuffer(gl.ARRAY_BUFFER, this.texcoordBuffer);
    gl.enableVertexAttribArray(this.texcoordLocation);
    gl.vertexAttribPointer(this.texcoordLocation, 2, gl.FLOAT, false, 0, 0);

    // Bind texture
    gl.bindTexture(gl.TEXTURE_2D, this.textureLoaded);                         // Set the texture that will be used for all subsequent operations

    // Draw the model
    gl.drawArrays(gl.TRIANGLES, 0, this.numVerticesLoaded);
  }

}
