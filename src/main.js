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
var transparency = false;

// framerate limit constants
const FRAMES_PER_SECOND = 60; // Valid values are 60,30,20,15,10...
// set the mim time to render the next frame
const FRAME_MIN_TIME = (1000/60) * (60 / FRAMES_PER_SECOND) - (1000/60) * 0.5;
// keeps track of time of rendering of last frame and actual frame to render
var lastFrameTime = 0;

function main(){

  try{

    gl = initWebGL(canvasId);
    program = initProgram();

    // set drone at the origin with a default rotation to match drone and world axis
    drone = new Drone(program, [ 0,10,0 ], [-90,0,0],1,[0,0,1],false,false);

    // room walls
    floor = new Model(program,"assets/floor/floor.obj", [0,0,0],[0,0,0],1,false,false)
    leftWall = new Model(program,"assets/wall/wall.obj", [-bound,bound,0],[0,0,-90],1)
    frontWall = new Model(program,"assets/wall/wall.obj", [0,bound,bound],[90,0,0],1)
    backWall = new Model(program,"assets/wall/wall.obj", [0,bound,-bound],[-90,0,0],1)
    rightWall = new Model(program,"assets/wall/wall.obj", [bound,bound,0],[0,0,90],1)

    //coins
    coins = bulkCreate("assets/coin/coin.obj",coinNumber,false,true)

    // create light over the drone
    light = new Light(program,[10,10,10],[0,0,0],[1,1,1]);

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
    mouse= new Mouse(drone,light,camera,document.getElementById(canvasId),droneSpeed)
    buttons= new Buttons(drone,light,camera,droneSpeed)
    gestures= new Gestures(drone,light,camera,document.getElementById(canvasId),droneSpeed)

    // creates debugView
    if(DEBUG){debugView = new DebugView(drone,light,camera);}

    // RENDERLOOP
    function renderLoop(time){

      debug(time)
      if(time-lastFrameTime < FRAME_MIN_TIME){
        window.requestAnimationFrame(renderLoop);
        time++
        return;
      }
      lastFrameTime = time; // remember the time of the rendered frame
      time++
      gl.clear(gl.DEPTH_BUFFER_BIT | gl.COLOR_BUFFER_BIT);
      gl.enable(gl.DEPTH_TEST);
      gl.enable(gl.BLEND);
      gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

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

      // if all coins are taken regenerate coins
      if(coins.length == 0 ){coins = bulkCreate("assets/coin/coin.obj",coinNumber,false,true)}

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

function bulkCreate(type,n,hasReflections=false,isTransparent=false){
  objects = []
  for (var i =0; i<n;i++){
    xPosition=Math.floor(Math.random() * bound-bound/2) ;

    zPosition=Math.floor(Math.random() * bound-bound/2);
    objects.push(new Model(program,type, [xPosition,1,zPosition],[0,0,0],2,hasReflections,isTransparent))
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
