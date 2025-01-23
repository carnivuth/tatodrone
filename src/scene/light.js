class Light{

	constructor(program,position=[10,10,10],direction=[0,0,0],color=[1,1,1]){
		this.program = program
		this.color = color
		this.direction = direction
		this.place(position)
	}

	setIntensity(value){
		if (value != undefined && value >=0 && value <=1){this.color=[value,value,value]}
	}
	place(position){
		if (position != undefined){this.position=position}
	}

	render(){

		gl.uniform3fv(gl.getUniformLocation(this.program, "light_position" ),  this.position);
		gl.uniform3fv(gl.getUniformLocation(this.program, "light_color" ), this.color );

	}

}
