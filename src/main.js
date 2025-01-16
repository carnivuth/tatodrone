// DEBUG PARAMETER!!!!!!!!
// this parameter will enable debug of the program:
// - spector to debug webgl calls
// - dat.GUI for parameter manipolation
// - log calls
//
const DEBUG=true
// DEBUG PARAMETER!!!!!!!!

const bound = 100;
const droneSpeed = 1;
const coinNumber = 5;

function main(){

  try{
    gl = initWebGL("display");
    program = initProgram();

    // set drone at the origin with a default rotation to match drone and world axis
    drone = new Drone(program, [ 0,10,0 ], [-90,0,0],1);
    floor = new Model(program,"assets/floor/floor.obj", [0,0,0],[0,0,0],1)
    leftWall = new Model(program,"assets/wall/wall.obj", [-bound,bound,0],[0,0,-90],1)
    frontWall = new Model(program,"assets/wall/wall.obj", [0,bound,bound],[90,0,0],1)
    backWall = new Model(program,"assets/wall/wall.obj", [0,bound,-bound],[-90,0,0],1)
    rightWall = new Model(program,"assets/wall/wall.obj", [bound,bound,0],[0,0,90],1)
    coins = bulkCreate("assets/coin/coin.obj",coinNumber)

    // create light over the drone
    light = new Light(program,[10,50,10],[0,0,0],[1,1,1]);

    // create camera watching towards the drone
    camera = new Camera(program,
      // camera positions
      [
        drone.position[0],
        drone.position[1]+ 5,
        drone.position[2] - 5
      ],
      drone.position,
      [0,1,0],90);

    //setup controls
    keyboard= new Keyboard(drone,light,camera,droneSpeed)
    buttons= new Buttons(drone,light,camera,droneSpeed)

    // creates debugView
    if(DEBUG){debugView = new DebugView(drone,light,camera);}

    // render next frame function
    function renderLoop(){

      gl.clear(gl.DEPTH_BUFFER_BIT | gl.COLOR_BUFFER_BIT);
      gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
      gl.enable(gl.DEPTH_TEST);

      // animate coins with a rotation
      coins.forEach((coin)=>{coin.rotateY(coin.rotation[1]+1)})

      //set light and camera on the scene
      camera.render()
      light.render()

      // render models
      floor.render()
      frontWall.render()
      backWall.render()
      leftWall.render()
      rightWall.render()
      coins.forEach((coin)=>{coin.render()})
      drone.render()

      requestAnimationFrame(renderLoop);
    }

    requestAnimationFrame(renderLoop);


  }catch(e){
    console.log(e)
  }

}

function bulkCreate(type,n){
  objects = []
  for (var i =0; i<n;i++){
    xPosition=Math.floor(Math.random() * 80-40) ;
    zPosition=Math.floor(Math.random() * 80-40);
    objects.push(new Model(program,type, [xPosition,1,zPosition],[0,0,0],3))
  }
  return objects;
}

function initWebGL(canvas_id){

  //get canvas DOM element
  var canvas = document.getElementById(canvas_id);
  //canvas.setSize(window.innerWidth, window.innerHeight);

  // get webgl context
  if(DEBUG){

    var gl = WebGLDebugUtils.makeDebugContext(canvas.getContext("webgl"));
    var spector = new SPECTOR.Spector();
    spector.displayUI();

  }else{

    var gl = canvas.getContext("webgl");
  }

  if (!gl) {
    throw new Error('No webGL context available with canvas_id: '+ canvas_id);
  }
  resizeCanvasToDisplaySize(canvas)
  gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
  return gl
}

function initProgram(){
  program = webglUtils.createProgramFromScripts(gl, ["3d-vertex-shader", "3d-fragment-shader"]);
  gl.useProgram(program);
  return program
}

main()
