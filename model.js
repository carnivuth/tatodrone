class Model(file, position=[0,0,0],rotation=[0,0,0],scale=[1,1,1]){

  constructor(){
    this.sourceMesh=file
    this.mesh = [];
    this.ambient;   //Ka
    this.diffuse;   //Kd
    this.specular;  //Ks
    this.emissive;  //Ke
    this.shininess; //Ns
    this.opacity;   //Ni

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

    init();
  }

  init(){
    LoadMesh(this);
    this.createBuffers();
}

// Model transformation matrix to apply properties of: position, rotation, scale
createModelTransformationMatrix() {

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
  this.positionLocation = gl.getAttribLocation(program, "a_position");
  this.normalLocation = gl.getAttribLocation(program, "a_normal");
  this.texcoordLocation = gl.getAttribLocation(program, "a_texcoord");

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
drawModel() {

  // Set material parameters read from loadMesh()
  gl.uniform3fv(gl.getUniformLocation(program, "diffuse"), this.diffuse);
  gl.uniform3fv(gl.getUniformLocation(program, "ambient"), this.ambient);
  gl.uniform3fv(gl.getUniformLocation(program, "specular"), this.specular);
  gl.uniform3fv(gl.getUniformLocation(program, "emissive"), this.emissive);
  gl.uniform1f(gl.getUniformLocation(program, "shininess"), this.shininess);
  gl.uniform1f(gl.getUniformLocation(program, "opacity"), this.opacity);

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
