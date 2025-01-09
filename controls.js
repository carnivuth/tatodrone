//  wrapper around dat.GUI
class Controls{

  constructor(){
    this.gui = new dat.GUI({name: 'scene controls'});
    this.fov_ctrl=this.gui.add({fov: 30}, 'fov', 0, 90);
    this.camera_x_ctrl=this.gui.add({camera_x: 0}, 'camera_x', 0, 1000);
    this.camera_y_ctrl=this.gui.add({camera_y: 0}, 'camera_y', 0, 1000);
    this.camera_z_ctrl=this.gui.add({camera_z: 0}, 'camera_z', 0, 1000);
    this.drone_scale_ctrl=this.gui.add({drone_scale: 1}, 'drone_scale', 0, 20);
    this.drone_x_ctrl=this.gui.add({drone_x: 0}, 'drone_x', 0, 1000);
    this.drone_y_ctrl=this.gui.add({drone_y: 0}, 'drone_y', 0, 1000);
    this.drone_z_ctrl=this.gui.add({drone_z: 0}, 'drone_z', 0, 1000);
    this.gui.open()
  }
}
