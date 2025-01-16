//  wrapper around dat.GUI
class DebugView{

  constructor(drone,light,camera){

    this.camera=camera
    this.drone=drone
    this.light=light
    this.max=50
    this.maxRot=180
    this.maxScale=20
    this.maxFov=90

    // create gui and asign callbacks for every input
    this.gui = new dat.GUI({name: 'scene controls'});

    this.fov_ctrl=this.gui.add({fov: this.camera.fov}, 'fov', 0, this.maxFov);
    this.fov_ctrl.listen();
    this.fov_ctrl.onChange(()=>{this.camera.fov = this.fov_ctrl.getValue()})

    this.light_ctrl=this.gui.add({light: 1}, 'light', 0, 1);
    this.light_ctrl.listen();
    this.light_ctrl.onChange(()=>{this.light.setIntensity(this.light_ctrl.getValue())})

    this.light_x_ctrl=this.gui.add({light_x: 1}, 'light_x', -this.max, this.max);
    this.light_x_ctrl.listen();
    this.light_x_ctrl.onChange(()=>{this.light.place([this.light_x_ctrl.getValue(),this.light.position[1],this.light.position[2]])})

    this.light_y_ctrl=this.gui.add({light_y: 1}, 'light_y', -this.max, this.max);
    this.light_y_ctrl.listen();
    this.light_y_ctrl.onChange(()=>{this.light.place([this.light.position[0],this.light_y_ctrl.getValue(),this.light.position[2]])})

    this.light_z_ctrl=this.gui.add({light_z: 0}, 'light_z', -this.max, this.max);
    this.light_z_ctrl.listen();
    this.light_z_ctrl.onChange(()=>{this.light.place([this.light.position[0],this.light.position[1],this.light_x_ctrl.getValue()])})

    this.camera_x_ctrl=this.gui.add({camera_x: 1}, 'camera_x', -this.max, this.max);
    this.camera_x_ctrl.listen();
    this.camera_x_ctrl.onChange(()=>{this.camera.place([this.camera_x_ctrl.getValue(),this.camera.position[1],this.camera.position[2]])})

    this.camera_y_ctrl=this.gui.add({camera_y: 1}, 'camera_y', -this.max, this.max);
    this.camera_y_ctrl.listen();
    this.camera_y_ctrl.onChange(()=>{this.camera.place([this.camera.position[0],this.camera_y_ctrl.getValue(),this.camera.position[2]])})

    this.camera_z_ctrl=this.gui.add({camera_z: 0}, 'camera_z', -this.max, this.max);
    this.camera_z_ctrl.listen();
    this.camera_z_ctrl.onChange(()=>{this.camera.place([this.camera.position[0],this.camera.position[1],this.camera_x_ctrl.getValue()])})

    this.look_x_ctrl=this.gui.add({look_x: 0}, 'look_x', -this.max, this.max);
    this.look_x_ctrl.listen();
    this.look_x_ctrl.onChange(()=>{this.camera.look([this.look_x_ctrl.getValue(),this.camera.lookAt[1],this.camera.lookAt[2]])})

    this.look_y_ctrl=this.gui.add({look_y: 0}, 'look_y', -this.max, this.max);
    this.look_y_ctrl.listen();
    this.look_y_ctrl.onChange(()=>{this.camera.look([this.camera.lookAt[0],this.look_y_ctrl.getValue(),this.camera.lookAt[2]])})

    this.look_z_ctrl=this.gui.add({look_z: 0}, 'look_z', -this.max, this.max);
    this.look_z_ctrl.listen();
    this.look_z_ctrl.onChange(()=>{this.camera.look([this.camera.lookAt[0],this.camera.lookAt[1],this.look_x_ctrl.getValue()])})

    this.drone_scale_ctrl=this.gui.add({drone_scale: 1}, 'drone_scale', 0, this.maxScale);
    this.drone_scale_ctrl.listen();
    this.drone_scale_ctrl.onChange(()=>{this.drone.scale = this.drone_scale_ctrl.getValue()})

    this.drone_x_ctrl=this.gui.add({drone_x: 0}, 'drone_x', -this.max, this.max);
    this.drone_x_ctrl.listen()
    this.drone_x_ctrl.onChange(()=>{this.drone.place([this.drone_x_ctrl.getValue(),this.drone.position[1],this.drone.position[2]])})

    this.drone_y_ctrl=this.gui.add({drone_y: 0}, 'drone_y', -this.max, this.max);
    this.drone_y_ctrl.listen()
    this.drone_y_ctrl.onChange(()=>{this.drone.place([this.drone.position[0],this.drone_y_ctrl.getValue(),this.drone.position[2]])})

    this.drone_z_ctrl=this.gui.add({drone_z: 0}, 'drone_z', -this.max, this.max);
    this.drone_z_ctrl.listen()
    this.drone_z_ctrl.onChange(()=>{this.drone.place([this.drone.position[0],,this.drone.position[1],this.drone_z_ctrl.getValue()])})

    this.drone_rotx_ctrl=this.gui.add({drone_rot_x: this.drone.rotation[0]}, 'drone_rot_x', -this.maxRot, this.maxRot);
    this.drone_rotx_ctrl.listen()
    this.drone_rotx_ctrl.onChange(()=>{this.drone.rotateX(this.drone_rotx_ctrl.getValue())})

    this.drone_roty_ctrl=this.gui.add({drone_rot_y: this.drone.rotation[1]}, 'drone_rot_y', -this.maxRot, this.maxRot);
    this.drone_roty_ctrl.listen()
    this.drone_roty_ctrl.onChange(()=>{this.drone.rotateY(this.drone_roty_ctrl.getValue())})

    this.drone_rotz_ctrl=this.gui.add({drone_rot_z: this.drone.rotation[2]}, 'drone_rot_z', -this.maxRot, this.maxRot);
    this.drone_rotz_ctrl.listen()
    this.drone_rotz_ctrl.onChange(()=>{this.drone.rotateZ(this.drone_rotz_ctrl.getValue())})
    this.gui.open()
  }
}
// minifunction to log only when debug is active
function debug(obj){if (DEBUG){console.log(obj)}}
