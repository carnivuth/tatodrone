//  wrapper around dat.GUI
class DebugView{

  constructor(drone,light,camera){

    this.camera=camera
    this.drone=drone
    this.light=light

    // create gui and asign callbacks for every input
    this.gui = new dat.GUI({name: 'scene controls'});

    this.fov_ctrl=this.gui.add({fov: 30}, 'fov', 0, 90);
    this.fov_ctrl.listen();
    this.fov_ctrl.onChange(()=>{this.camera.fov = this.fov_ctrl.getValue()})

    this.camera_x_ctrl=this.gui.add({camera_x: 1}, 'camera_x', -50, 50);
    this.camera_x_ctrl.listen();
    this.camera_x_ctrl.onChange(()=>{this.camera.place([this.camera_x_ctrl.getValue(),this.camera.position[1],this.camera.position[2]])})

    this.camera_y_ctrl=this.gui.add({camera_y: 1}, 'camera_y', -50, 50);
    this.camera_y_ctrl.listen();
    this.camera_y_ctrl.onChange(()=>{this.camera.place([this.camera.position[0],this.camera_y_ctrl.getValue(),this.camera.position[2]])})

    this.camera_z_ctrl=this.gui.add({camera_z: 30}, 'camera_z', -50, 50);
    this.camera_z_ctrl.listen();
    this.camera_z_ctrl.onChange(()=>{this.camera.place([this.camera.position[0],this.camera.position[1],this.camera_x_ctrl.getValue()])})

    this.look_x_ctrl=this.gui.add({look_x: 0}, 'look_x', -50, 50);
    this.look_x_ctrl.listen();
    this.look_x_ctrl.onChange(()=>{this.camera.look([this.look_x_ctrl.getValue(),this.camera.lookAt[1],this.camera.lookAt[2]])})

    this.look_y_ctrl=this.gui.add({look_y: 0}, 'look_y', -50, 50);
    this.look_y_ctrl.listen();
    this.look_y_ctrl.onChange(()=>{this.camera.look([this.camera.lookAt[0],this.look_y_ctrl.getValue(),this.camera.lookAt[2]])})

    this.look_z_ctrl=this.gui.add({look_z: 0}, 'look_z', -50, 50);
    this.look_z_ctrl.listen();
    this.look_z_ctrl.onChange(()=>{this.camera.look([this.camera.lookAt[0],this.camera.lookAt[1],this.look_x_ctrl.getValue()])})

    this.drone_scale_ctrl=this.gui.add({drone_scale: 1}, 'drone_scale', 0, 20);
    this.fov_ctrl.onChange(()=>{this.camera.fov = this.fov_ctrl.getValue()})
    this.drone_x_ctrl=this.gui.add({drone_x: 0}, 'drone_x', -50, 50);
    this.fov_ctrl.onChange(()=>{this.camera.fov = this.fov_ctrl.getValue()})
    this.drone_y_ctrl=this.gui.add({drone_y: 0}, 'drone_y', -50, 50);
    this.fov_ctrl.onChange(()=>{this.camera.fov = this.fov_ctrl.getValue()})
    this.drone_z_ctrl=this.gui.add({drone_z: 0}, 'drone_z', -50, 50);
    this.fov_ctrl.onChange(()=>{this.camera.fov = this.fov_ctrl.getValue()})
    this.drone_rotx_ctrl=this.gui.add({drone_rot_x: 4.5}, 'drone_rot_x', 0, 180);
    this.fov_ctrl.onChange(()=>{this.camera.fov = this.fov_ctrl.getValue()})
    this.drone_roty_ctrl=this.gui.add({drone_rot_y: 3.25}, 'drone_rot_y', 0, 180);
    this.fov_ctrl.onChange(()=>{this.camera.fov = this.fov_ctrl.getValue()})
    this.drone_rotz_ctrl=this.gui.add({drone_rot_z: 0}, 'drone_rot_z', 0, 180);
    this.fov_ctrl.onChange(()=>{this.camera.fov = this.fov_ctrl.getValue()})
    this.gui.open()
  }
}
// minifunction to log only when debug is active
function debug(obj){if (DEBUG){console.log(obj)}}
