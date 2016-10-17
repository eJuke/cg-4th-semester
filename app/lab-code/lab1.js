function lab1 (id) {
	//init components
	this.rootId = id;
	this.webgl = null;
	this.canvas = null;
	this.VSHADER_SOURCE = this.FSHADER_SOURCE = null;
	this.VSHADER = this.FSHADER = null;

	//data
	this.pMatrix = mat4.create(), this.mvMatrix = mat4.create();
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
	else return null;
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

/*Инициализация шейдеров*/
lab1.prototype.initShaders = function(gl){
	this.shaderProgram = gl.createProgram();
	gl.attachShader(this.shaderProgram, this.VSHADER);
	gl.attachShader(this.shaderProgram, this.FSHADER);
	gl.linkProgram(this.shaderProgram);

	if(!gl.getProgramParameter(this.shaderProgram, gl.LINK_STATUS)){
		console.error('Unable to initialize the shader program.');
	}

	gl.useProgram(this.shaderProgram);

	this.shaderProgram.vertexPositionAttribute = gl.getAttribLocation(this.shaderProgram, "aVertexPosition");
	gl.enableVertexAttribArray(this.shaderProgram.vertexPositionAttribute);

	this.shaderProgram.pMatrixUniform = gl.getUniformLocation(this.shaderProgram, "uPMatrix");
	this.shaderProgram.mvMatrixUniform = gl.getUniformLocation(this.shaderProgram, "uMVMatrix");
}

/*Собственно, отрисовка контекста*/
lab1.prototype.execute = function(){
	if (this.webgl) console.info('WebGL init successful');
	else {
		console.error('WebGL not initialized');
		return false;
	}

	this.webgl.viewportWidth = this.canvas.width;
	this.webgl.viewportHeight = this.canvas.height;
	// установить в качестве цвета очистки буфера цвета черный, полная непрозрачность
	this.webgl.clearColor(0.0, 0.0, 0.0, 1.0);
	// включает использование буфера глубины
	this.webgl.enable(this.webgl.DEPTH_TEST);
	// определяет работу буфера глубины: более ближние объекты перекрывают дальние
	this.webgl.depthFunc(this.webgl.LEQUAL);
	this.webgl.clear(this.webgl.COLOR_BUFFER_BIT|this.webgl.DEPTH_BUFFER_BIT);  

	this.initShaders(this.webgl);

	this.horizAspect = this.webgl.viewportHeight / this.webgl.viewportWidth;
	this.initBuffers(this.webgl);
	this.drawScene(this.webgl);
}

/*Инициализация буфера*/
lab1.prototype.initBuffers = function(gl){
	this.squareVerticlesBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, this.squareVerticlesBuffer);
	this.verticles = [
		 1.0,  1.0,  0.0,
		-1.0,  1.0,  0.0,
		 1.0, -1.0,  0.0,
		-1.0, -1.0,  0.0
	];
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.verticles), gl.STATIC_DRAW);
	this.squareVerticlesBuffer.itemSize = 3;
	this.squareVerticlesBuffer.numItems = 4;
}

/*Отрисовка сцены*/
lab1.prototype.drawScene = function(gl){
	gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
	gl.viewport(0, 0, gl.viewportWidth, gl.viewportHeight);

	mat4.perspective(45, this.horizAspect, 0.1, 100.0, this.pMatrix);
	//создаем матрицу текущего состояния (изначально - единичная) model-view matrix
	mat4.identity(this.mvMatrix);
	mat4.translate(this.mvMatrix, [0.0, 0.0, -7.0]);
	gl.bindBuffer(gl.ARRAY_BUFFER, this.squareVerticlesBuffer);
	gl.vertexAttribPointer(this.shaderProgram.vertexPositionAttribute, this.squareVerticlesBuffer.itemSize, gl.FLOAT, false, 0, 0);

	this.setMatrixUniforms(this.webgl);
	this.webgl.drawArrays(this.webgl.TRIANGLE_STRIP, 0, this.squareVerticlesBuffer.numItems);
}

/*Перенос изменений матриц в видеокарту*/
lab1.prototype.setMatrixUniforms = function(gl) {
	gl.uniformMatrix4fv(this.shaderProgram.pMatrixUniform, false, this.pMatrix);
	gl.uniformMatrix4fv(this.shaderProgram.mvMatrixUniform, false, this.mvMatrix);
}

/*Экспорт модуля*/
module.exports = lab1;