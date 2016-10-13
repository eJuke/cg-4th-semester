function lab1 (id) {
	this.rootId = id;
}

lab1.prototype.prepare = function(){
	var rootEl = document.getElementById(this.rootId);
	rootEl.innerHTML = '<canvas id="lab1" width="600px" height="600px"></canvas>';
	this.canvas = document.getElementById('lab1');
	var names = ["webgl", "experimental-webgl", "webkit-3d", "moz-webgl"];
	this.webgl = null;
	for (var ii = 0; ii < names.length; ++ii) {
		try {
			this.webgl = this.canvas.getContext(names[ii]);
		} catch(e) {}
		if (this.webgl) {
			break;
		}
	}
	
	var inputX = document.createElement('input');
	var inputY = document.createElement('input');
	var inputZ = document.createElement('input');
	var labelX = document.createElement('label');
	var labelY = document.createElement('label');
	var labelZ = document.createElement('label');

	inputX.type = "number";
	inputY.type = "number";
	inputZ.type = "number";
	inputX.id = "angleX";
	inputY.id = "angleY";
	inputZ.id = "angleZ";
	inputX.className = "angle-input";
	inputY.className = "angle-input";
	inputZ.className = "angle-input";

	labelX.innerHTML = "<br><br>угол по оси X:  ";
	labelY.innerHTML = "<br><br>угол по оси Y:  ";
	labelZ.innerHTML = "<br><br>угол по оси Z:  ";

	rootEl.appendChild(labelX);
	rootEl.appendChild(inputX);
	rootEl.appendChild(labelY);
	rootEl.appendChild(inputY);
	rootEl.appendChild(labelZ);
	rootEl.appendChild(inputZ);
}

lab1.prototype.execute = function(){
	if (this.webgl){
		console.info('WebGL init successful');
		// установить в качестве цвета очистки буфера цвета черный, полная непрозрачность
		this.webgl.clearColor(0.0, 0.0, 0.0, 1.0);
		// включает использование буфера глубины
		this.webgl.enable(this.webgl.DEPTH_TEST);
		// определяет работу буфера глубины: более ближние объекты перекрывают дальние
		this.webgl.depthFunc(this.webgl.LEQUAL);
		this.webgl.clear(this.webgl.COLOR_BUFFER_BIT|this.webgl.DEPTH_BUFFER_BIT);  
	}
	else console.error('WebGL not initialized');
}

module.exports = lab1;