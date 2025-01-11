class Model{

  constructor(program,file,position=[0,0,0],rotation=[0,0,0],scale=1){

    this.sourceMesh=file
    this.mesh = [];
    this.ambient;   //Ka
    this.diffuse;   //Kd
    this.specular;  //Ks
    this.emissive;  //Ke
    this.shininess; //Ns
    this.opacity;   //Ni

    this.place(position)
    this.rotation=rotation
    this.transform(scale)

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

    // GPU buffers for rendering the model
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

  transform(scale){
    if (scale != undefined){this.scale = scale}
  }
  place(position){
    if (position != undefined){this.position = position}
  }

  rotateX(value){
    if (value != undefined){this.rotate([value,this.rotation[1],this.rotation[2]])}
  }
  rotateY(value){
    if (value != undefined){this.rotate([this.rotation[0],value,this.rotation[2]])}
  }
  rotateZ(value){
    if (value != undefined){this.rotate([this.rotation[0],this.rotation[1],value])}
  }
  rotate(rotation){
    if (rotation != undefined){
      this.rotation[0]= rotation[0];
      this.rotation[1]= rotation[1];
      this.rotation[2]= rotation[2];
    }
  }

  // compute the model transformation matrix given position rotation and scale
  transformMatrix() {

    let translationMatrix = m4.translation(this.position[0], this.position[1], this.position[2]);
    let rotationXMatrix = m4.xRotation(degToRad(this.rotation[0]));
    let rotationYMatrix = m4.yRotation(degToRad(this.rotation[1]));
    let rotationZMatrix = m4.zRotation(degToRad(this.rotation[2]));

    // scale all coordinates togheter
    let scaleMatrix = m4.scaling(this.scale, this.scale, this.scale);

    let transformationMatrix = m4.multiply(translationMatrix, m4.multiply(rotationZMatrix, m4.multiply(rotationYMatrix, m4.multiply(rotationXMatrix, scaleMatrix))));

    return transformationMatrix;
}

  // create model buffers using WebGL API
  createBuffers() {

    // Get attribute locations in shaders
    this.positionLocation = gl.getAttribLocation(this.program, "a_position");
    debug(this.positionLocation)
    this.normalLocation = gl.getAttribLocation(this.program, "a_normal");
    debug(this.normalLocation)
    this.texcoordLocation = gl.getAttribLocation(this.program, "a_texcoord");
    debug(this.texcoordLocation)

    // Create the vertex position buffer and add data
    this.positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, this.positionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.positionsLoaded), gl.STATIC_DRAW);

    // Create the normal vectors buffer and add data
    this.normalBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, this.normalBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.normalsLoaded), gl.STATIC_DRAW);

    // Create the texture coordinates buffer and add data
    this.texcoordBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, this.texcoordBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.texcoordsLoaded), gl.STATIC_DRAW);
  }

  // render the model on the scene, this method calls the gl.drawArrays function
  render(){

    gl.uniform3fv(gl.getUniformLocation(this.program, "diffuse"), this.diffuse);
    gl.uniform3fv(gl.getUniformLocation(this.program, "ambient"), this.ambient);
    gl.uniform3fv(gl.getUniformLocation(this.program, "specular"), this.specular);
    gl.uniform3fv(gl.getUniformLocation(this.program, "emissive"), this.emissive);
    gl.uniform1f(gl.getUniformLocation(this.program, "shininess"), this.shininess);
    gl.uniform1f(gl.getUniformLocation(this.program, "opacity"), this.opacity);
    gl.uniformMatrix4fv(gl.getUniformLocation(this.program, "u_world"), false, this.transformMatrix());

    // Bind buffers to attributes in the shader program
    gl.bindBuffer(gl.ARRAY_BUFFER, this.positionBuffer);
    gl.enableVertexAttribArray(this.positionLocation);
    gl.vertexAttribPointer(this.positionLocation, 3, gl.FLOAT, false, 0, 0);

    gl.bindBuffer(gl.ARRAY_BUFFER, this.normalBuffer);
    gl.enableVertexAttribArray(this.normalLocation);
    gl.vertexAttribPointer(this.normalLocation, 3, gl.FLOAT, false, 0, 0);

    gl.bindBuffer(gl.ARRAY_BUFFER, this.texcoordBuffer);
    gl.enableVertexAttribArray(this.texcoordLocation);
    gl.vertexAttribPointer(this.texcoordLocation, 2, gl.FLOAT, false, 0, 0);

    // Bind texture
    gl.bindTexture(gl.TEXTURE_2D, this.textureLoaded);

    // Draw the model
    gl.drawArrays(gl.TRIANGLES, 0, this.numVerticesLoaded);
  }

}
