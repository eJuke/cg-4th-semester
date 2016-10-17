function lab1 (id) {
	this.rootId = id;
	this.webgl = null;
	this.canvas = null;
	this.VSHADER_SOURCE = this.FSHADER_SOURCE = null;
	this.VSHADER = this.FSHADER = null;
}

/*Чтение шейдеров*/
lab1.prototype.readShader = function(filePath){
	var shaderType = null;
	var thisObject = this;
	if (filePath.search('.frag') != -1) shaderType = 'fragment';
	if (filePath.search('.vert') != -1) shaderType = 'vertex';
	var request = new XMLHttpRequest();
	request.onreadystatechange = function(){
		if (request.readyState === 4 && request.status !== 404) { 
			thisObject.onReadShader(request.responseText, shaderType);
		}
	}
	request.open('GET', filePath, true);
	request.send();
}

/*Инициализация шейдеров после чтения*/
lab1.prototype.onReadShader = function(fileString, shaderType){
	if (shaderType == 'vertex'){
		this.VSHADER_SOURCE = fileString;
		this.VSHADER = this.compileShaders(this.webgl, this.VSHADER_SOURCE, this.webgl.VERTEX_SHADER);
	}
	else if (shaderType == 'fragment'){
		this.FSHADER_SOURCE = fileString;
		this.FSHADER = this.compileShaders(this.webgl, this.FSHADER_SOURCE, this.webgl.FRAGMENT_SHADER);
	}
	if (this.VSHADER_SOURCE && this.FSHADER_SOURCE) {
		console.info('Shaders loaded');
		this.execute();
	}
}

/*Компиляция шейдеров*/
lab1.prototype.compileShaders = function(gl, shaderSrc, shaderType){
	var shader = gl.createShader(shaderType);
	gl.shaderSource(shader, shaderSrc);
	gl.compileShader(shader);

	if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
		console.error("An error occurred compiling the shaders: " + gl.getShaderInfoLog(shader));
		return null;
	}
	else console.info('Shader compiled successful.');
	return shader;
}

/*Подготовка документа к исполнению кода*/
lab1.prototype.prepare = function(){
	var rootEl = document.getElementById(this.rootId);
	rootEl.innerHTML = '<canvas id="lab1" width="600px" height="600px"></canvas>';
	this.canvas = document.getElementById('lab1');
	var names = ["webgl", "experimental-webgl", "webkit-3d", "moz-webgl"];
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

/*Собственно, отрисовка контекста*/
lab1.prototype.execute = function(){
	if (this.webgl) console.info('WebGL init successful');
	else {
		console.error('WebGL not initialized');
		return false;
	}

	// установить в качестве цвета очистки буфера цвета черный, полная непрозрачность
	this.webgl.clearColor(0.0, 0.0, 0.0, 1.0);
	// включает использование буфера глубины
	this.webgl.enable(this.webgl.DEPTH_TEST);
	// определяет работу буфера глубины: более ближние объекты перекрывают дальние
	this.webgl.depthFunc(this.webgl.LEQUAL);
	this.webgl.clear(this.webgl.COLOR_BUFFER_BIT|this.webgl.DEPTH_BUFFER_BIT);  

	this.shaderProgram = this.webgl.createProgram();
	this.webgl.attachShader(this.shaderProgram, this.VSHADER);
	this.webgl.attachShader(this.shaderProgram, this.FSHADER);
	this.webgl.linkProgram(this.shaderProgram);

	if(!this.webgl.getProgramParameter(this.shaderProgram, this.webgl.LINK_STATUS)){
		console.error('Unable to initialize the shader program.');
	}

	this.webgl.useProgram(this.shaderProgram);

	this.vertexPositionAttribute = this.webgl.getAttribLocation(this.shaderProgram, "aVertexPosition");
	this.webgl.enableVertexAttribArray(this.vertexPositionAttribute);


}



/*Экспорт модуля*/
module.exports = lab1;