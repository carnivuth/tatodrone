// DEBUG PARAMETER!!!!!!!!
// this parameter controls debug via browser:
// - spector to debug webgl calls
// - dat.GUI for parameter manipulation
// - log calls
//
const DEBUG=false
// DEBUG PARAMETER!!!!!!!!

const bound = 100;
const droneSpeed = 1;
const coinNumber = 5;
const canvasId = "display";
const minDistanceFromCoin = 3;

function main(){

  try{

    gl = initWebGL(canvasId);
    program = initProgram();

    // set drone at the origin with a default rotation to match drone and world axis
    drone = new Drone(program, [ 0,10,0 ], [-90,0,0],1);

    // room walls
    floor = new Model(program,"assets/floor/floor.obj", [0,0,0],[0,0,0],1)
    leftWall = new Model(program,"assets/wall/wall.obj", [-bound,bound,0],[0,0,-90],1)
    frontWall = new Model(program,"assets/wall/wall.obj", [0,bound,bound],[90,0,0],1)
    backWall = new Model(program,"assets/wall/wall.obj", [0,bound,-bound],[-90,0,0],1)
    rightWall = new Model(program,"assets/wall/wall.obj", [bound,bound,0],[0,0,90],1)

    //coins
    coins = bulkCreate("assets/coin/coin.obj",coinNumber)

    // create light over the drone
    light = new Light(program,[10,50,10],[0,0,0],[1,1,1]);

    // create camera watching towards the drone
    camera = new Camera(program,
      [
        drone.position[0],
        drone.position[1] + 5,
        drone.position[2] - 5
      ],
      drone.position,
      [0,1,0],90);

    //setup controls
    keyboard= new Keyboard(drone,light,camera,droneSpeed)
    buttons= new Buttons(drone,light,camera,droneSpeed)
    gestures= new Gestures(drone,light,camera,document.getElementById(canvasId),droneSpeed)

    // creates debugView
    if(DEBUG){debugView = new DebugView(drone,light,camera);}

    // RENDERLOOP
    function renderLoop(){

      gl.clear(gl.DEPTH_BUFFER_BIT | gl.COLOR_BUFFER_BIT);
      gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
      gl.enable(gl.DEPTH_TEST);

      // if drone touches a coin remove it from the scene
      coins.forEach((coin)=>{
        if (
          Math.abs(coin.position[0] - drone.position[0]) < minDistanceFromCoin &&
          Math.abs(coin.position[1] - drone.position[1]) < minDistanceFromCoin &&
          Math.abs(coin.position[2] - drone.position[2]) < minDistanceFromCoin
        ){
          index = coins.indexOf(coin)
          coins.splice(index,1)
        }
      });
      // animate coins with a rotation
      coins.forEach((coin)=>{coin.rotateY(coin.rotation[1]+1)});

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
    xPosition=Math.floor(Math.random() * bound-bound/2) ;

    zPosition=Math.floor(Math.random() * bound-bound/2);
    objects.push(new Model(program,type, [xPosition,1,zPosition],[0,0,0],2))
  }
  return objects;
}

function initWebGL(canvas_id){

  //get canvas DOM element
  var canvas = document.getElementById(canvas_id);

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
