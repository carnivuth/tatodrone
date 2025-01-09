//drone simulator
//idea: move a drone in the screen using realistic controls
// traslation in the normal direction of the drone plane
// rotation around the x and z axis
const DEBUG=true
function initWebGL(canvas_id){

  //get canvas DOM element
  var canvas = document.getElementById(canvas_id);

  // get webgl context
  if(DEBUG){
    var gl = WebGLDebugUtils.makeDebugContext(canvas.getContext("webgl"));
  }else{
    var gl = canvas.getContext("webgl");
  }

  if (!gl) {
    throw new Error('No webGL context available with canvas_id: '+ canvas_id);
  }
  gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
  return gl
}

function initProgram(){
  program = webglUtils.createProgramFromScripts(gl, ["3d-vertex-shader", "3d-fragment-shader"]);
  gl.useProgram(program);
  return program
}

function main(){

  try{
    gl = initWebGL("canvas");
    program = initProgram();
    controls = new Controls();

    if(DEBUG){
      modelfile="assets/cube.obj"
    }else{
      modelfile="assets/drone.obj"
    }
    drone = new Model(program,modelfile,
      [
        controls.drone_x_ctrl.getValue(),
        controls.drone_y_ctrl.getValue(),
        controls.drone_z_ctrl.getValue()

    ],
      [0,0,0],1);
    //light = new Light(program);

    // create camera watching towards the drone
    camera = new Camera(program,
      // camera positions
      [
        controls.camera_x_ctrl.getValue(),
        controls.camera_y_ctrl.getValue(),
        controls.camera_z_ctrl.getValue()
      ],
      [
        controls.drone_x_ctrl.getValue(),
        controls.drone_y_ctrl.getValue(),
        controls.drone_z_ctrl.getValue()

    ],
      [0,1,0],controls.fov_ctrl.getValue());

    // render next frame function
    function renderLoop(){
      gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
      gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

      // place objects in the scene, which in this context means updating the webgl parameters, buffers and attributes
      // by getting parameters from dat.GUI controls
      //light.place()
      camera.place(
        [
          controls.camera_x_ctrl.getValue(),
          controls.camera_y_ctrl.getValue(),
          controls.camera_z_ctrl.getValue()
        ],
        [
          controls.drone_x_ctrl.getValue(),
          controls.drone_y_ctrl.getValue(),
          controls.drone_z_ctrl.getValue()
        ],
        controls.fov_ctrl.getValue());

      drone.place(
        [
          controls.drone_x_ctrl.getValue(),
          controls.drone_y_ctrl.getValue(),
          controls.drone_z_ctrl.getValue()
        ]);

      drone.render()
      requestAnimationFrame(renderLoop);
}

  requestAnimationFrame(renderLoop);


  }catch(e){
    console.log(e)
  }

}

main()


//function main() {
//
//  mesh.sourceMesh='data/cube/cube.obj';
//  LoadMesh(gl,mesh);
//
//  // look up where the vertex data needs to go.
//  var positionLocation = gl.getAttribLocation(program, "a_position");
//  var normalLocation = gl.getAttribLocation(program, "a_normal");
//  var texcoordLocation = gl.getAttribLocation(program, "a_texcoord");
//
//  // Create a buffer for positions
//  var positionBuffer = gl.createBuffer();
//  // Bind it to ARRAY_BUFFER (think of it as ARRAY_BUFFER = positionBuffer)
//  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
//  // Put the positions in the buffer
//  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);
//
//  // Create a buffer for normals
//  var normalsBuffer = gl.createBuffer();
//  // Bind it to ARRAY_BUFFER (think of it as ARRAY_BUFFER mormalsBuffer)
//  gl.bindBuffer(gl.ARRAY_BUFFER, normalsBuffer);
//  // Put the normals in the buffer
//  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(normals), gl.STATIC_DRAW);
//
//  // provide texture coordinates
//  var texcoordBuffer = gl.createBuffer();
//  gl.bindBuffer(gl.ARRAY_BUFFER, texcoordBuffer);
//  // Set Texcoords
//  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(texcoords), gl.STATIC_DRAW);
//
//  var ambientLight=[0.2,0.2,0.2];
//  var colorLight=[1.0,1.0,1.0];
//
//  gl.uniform3fv(gl.getUniformLocation(program, "diffuse" ), diffuse );
//  gl.uniform3fv(gl.getUniformLocation(program, "ambient" ), ambient);
//  gl.uniform3fv(gl.getUniformLocation(program, "specular"), specular );
//  gl.uniform3fv(gl.getUniformLocation(program, "emissive"), emissive );
//  //gl.uniform3fv(gl.getUniformLocation(program, "u_lightDirection" ), xxx );
//  gl.uniform3fv(gl.getUniformLocation(program, "u_ambientLight" ), ambientLight );
//  gl.uniform3fv(gl.getUniformLocation(program, "u_colorLight" ), colorLight );
//
//  gl.uniform1f(gl.getUniformLocation(program, "shininess"), shininess);
//  gl.uniform1f(gl.getUniformLocation(program, "opacity"), opacity);
//
//  // Turn on the position attribute
//  gl.enableVertexAttribArray(positionLocation);
//  // Bind the position buffer.
//  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
//  // Tell the position attribute how to get data out of positionBuffer (ARRAY_BUFFER)
//  var size = 3;          // 3 components per iteration
//  var type = gl.FLOAT;   // the data is 32bit floats
//  var normalize = false; // don't normalize the data
//  var stride = 0;        // 0 = move forward size * sizeof(type) each iteration to get the next position
//  var offset = 0;        // start at the beginning of the buffer
//  gl.vertexAttribPointer(positionLocation, size, type, normalize, stride, offset);
//
//  // Turn on the normal attribute
//  gl.enableVertexAttribArray(normalLocation);
//  // Bind the normal buffer.
//  gl.bindBuffer(gl.ARRAY_BUFFER, normalsBuffer);
//  gl.vertexAttribPointer(normalLocation, size, type, normalize, stride, offset);
//
//  // Turn on the texcord attribute
//  gl.enableVertexAttribArray(texcoordLocation);
//  // Bind the position buffer.
//  gl.bindBuffer(gl.ARRAY_BUFFER, texcoordBuffer);
//  // Tell the position attribute how to get data out of positionBuffer (ARRAY_BUFFER)
//  size = 2;          // 2 components per iteration
//  gl.vertexAttribPointer(texcoordLocation, size, type, normalize, stride, offset);
//
//  var fieldOfViewRadians = degToRad(30);
//  var modelXRotationRadians = degToRad(0);
//  var modelYRotationRadians = degToRad(0);
//
//  // Compute the projection matrix
//  var aspect = gl.canvas.clientWidth / gl.canvas.clientHeight;
//  //  zmin=0.125;
//  var zmin=0.1;
//  var projectionMatrix = m4.perspective(fieldOfViewRadians, aspect, zmin, 200);
//
//  var cameraPosition = [4.5, 4.5, 2];
//  var up = [0, 0, 1];
//  var target = [0, 0, 0];
//
//  // Compute the camera's matrix using look at.
//  var cameraMatrix = m4.lookAt(cameraPosition, target, up);
//
//  // Make a view matrix from the camera matrix.
//  var viewMatrix = m4.inverse(cameraMatrix);
//
//  var matrixLocation = gl.getUniformLocation(program, "u_world");
//  var textureLocation = gl.getUniformLocation(program, "diffuseMap");
//  var viewMatrixLocation = gl.getUniformLocation(program, "u_view");
//  var projectionMatrixLocation = gl.getUniformLocation(program, "u_projection");
//  var lightWorldDirectionLocation = gl.getUniformLocation(program, "u_lightDirection");
//  var viewWorldPositionLocation = gl.getUniformLocation(program, "u_viewWorldPosition");
//
//  gl.uniformMatrix4fv(viewMatrixLocation, false, viewMatrix);
//  gl.uniformMatrix4fv(projectionMatrixLocation, false, projectionMatrix);
//
//  // set the light position
//  gl.uniform3fv(lightWorldDirectionLocation, m4.normalize([-1, 3, 5]));
//
//  // set the camera/view position
//  gl.uniform3fv(viewWorldPositionLocation, cameraPosition);
//
//  // Tell the shader to use texture unit 0 for diffuseMap
//  gl.uniform1i(textureLocation, 0);
//
//
//    // Tell WebGL how to convert from clip space to pixels
//    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
//
//    //gl.enable(gl.CULL_FACE);
//    gl.enable(gl.DEPTH_TEST);
//
//    // Animate the rotation
//    modelYRotationRadians += -0.7 * deltaTime;
//    modelXRotationRadians += -0.4 * deltaTime;
//
//    // Clear the canvas AND the depth buffer.
//    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
//
//    var matrix = m4.identity();
//    matrix = m4.xRotate(matrix, modelXRotationRadians);
//    matrix = m4.yRotate(matrix, modelYRotationRadians);
//
//    // Set the matrix.
//    gl.uniformMatrix4fv(matrixLocation, false, matrix);
//
//    // Draw the geometry.
//    gl.drawArrays(gl.TRIANGLES, 0, numVertices);
//
//    requestAnimationFrame(drawScene);
//  }
//}
//
//main();
