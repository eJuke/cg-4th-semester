/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "https://ejuke.github.io/cg-7th-semester/";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	__webpack_require__(1);

	//js

	// import '../node_modules/react/dist/react.min.js';
	// import '../node_modules/react-dom/dist/react-dom.min.js';

	var rootElementId = 'root',
	    Lab1 = __webpack_require__(2),
	    lab1 = new Lab1(rootElementId); //styles


	var cpath = window.location.toString() == 'https://ejuke.github.io/cg-7th-semester/' ? window.location.toString() : '/';

	document.body.onload = function (e) {
		lab1.prepare();

		lab1.readShader(cpath + 'app/shaders/lab1.frag');
		lab1.readShader(cpath + 'app/shaders/lab1.vert');
		};

/***/ },
/* 1 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 2 */
/***/ function(module, exports) {

	'use strict';

	function lab1(id) {
		//init components
		this.rootId = id;
		this.webgl = null;
		this.canvas = null;
		this.VSHADER_SOURCE = this.FSHADER_SOURCE = null;
		this.VSHADER = this.FSHADER = null;

		//data
		this.pMatrix = mat4.create(), this.mvMatrix = mat4.create();
		this.cubeXRotation = 0.0, this.cubeYRotation = 0.0, this.cubeZRotation = 0.0;
	}

	/*Чтение шейдеров*/
	lab1.prototype.readShader = function (filePath) {
		var shaderType = null;
		var thisObject = this;
		if (filePath.search('.frag') != -1) shaderType = 'fragment';
		if (filePath.search('.vert') != -1) shaderType = 'vertex';
		var request = new XMLHttpRequest();
		request.onreadystatechange = function () {
			if (request.readyState === 4 && request.status !== 404) {
				thisObject.onReadShader(request.responseText, shaderType);
			}
		};
		request.open('GET', filePath, true);
		request.send();
	};

	/*Инициализация шейдеров после чтения*/
	lab1.prototype.onReadShader = function (fileString, shaderType) {
		if (shaderType == 'vertex') {
			this.VSHADER_SOURCE = fileString;
			this.VSHADER = this.compileShaders(this.webgl, this.VSHADER_SOURCE, this.webgl.VERTEX_SHADER);
		} else if (shaderType == 'fragment') {
			this.FSHADER_SOURCE = fileString;
			this.FSHADER = this.compileShaders(this.webgl, this.FSHADER_SOURCE, this.webgl.FRAGMENT_SHADER);
		} else return null;
		if (this.VSHADER_SOURCE && this.FSHADER_SOURCE) {
			console.info('Shaders loaded');
			this.execute();
		}
	};

	/*Компиляция шейдеров*/
	lab1.prototype.compileShaders = function (gl, shaderSrc, shaderType) {
		var shader = gl.createShader(shaderType);
		gl.shaderSource(shader, shaderSrc);
		gl.compileShader(shader);

		if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
			console.error("An error occurred compiling the shaders: " + gl.getShaderInfoLog(shader));
			return null;
		} else console.info('Shader compiled successful.');
		return shader;
	};

	/*Подготовка документа к исполнению кода*/
	lab1.prototype.prepare = function () {
		var rootEl = document.getElementById(this.rootId);
		rootEl.innerHTML = '<canvas id="lab1" width="600px" height="600px"></canvas>';
		this.canvas = document.getElementById('lab1');
		var names = ["webgl", "experimental-webgl", "webkit-3d", "moz-webgl"];
		for (var ii = 0; ii < names.length; ++ii) {
			try {
				this.webgl = this.canvas.getContext(names[ii]);
			} catch (e) {}
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
		inputX.value = "0.0";
		inputY.value = "0.0";
		inputZ.value = "0.0";
		var thisClass = this;
		inputX.onchange = function () {
			thisClass.cubeXRotation = thisClass.rotate(this.value);
			thisClass.drawScene(thisClass.webgl);
		};
		inputY.onchange = function () {
			thisClass.cubeYRotation = thisClass.rotate(this.value);
			thisClass.drawScene(thisClass.webgl);
		};
		inputZ.onchange = function () {
			thisClass.cubeZRotation = thisClass.rotate(this.value);
			thisClass.drawScene(thisClass.webgl);
		};
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
	};

	lab1.prototype.rotate = function (angle) {
		return angle * Math.PI / 180.0;
	};

	/*Инициализация шейдеров*/
	lab1.prototype.initShaders = function (gl) {
		this.shaderProgram = gl.createProgram();
		gl.attachShader(this.shaderProgram, this.VSHADER);
		gl.attachShader(this.shaderProgram, this.FSHADER);
		gl.linkProgram(this.shaderProgram);

		if (!gl.getProgramParameter(this.shaderProgram, gl.LINK_STATUS)) {
			console.error('Unable to initialize the shader program.');
		}

		gl.useProgram(this.shaderProgram);

		this.shaderProgram.vertexPositionAttribute = gl.getAttribLocation(this.shaderProgram, "aVertexPosition");
		gl.enableVertexAttribArray(this.shaderProgram.vertexPositionAttribute);

		this.shaderProgram.pMatrixUniform = gl.getUniformLocation(this.shaderProgram, "uPMatrix");
		this.shaderProgram.mvMatrixUniform = gl.getUniformLocation(this.shaderProgram, "uMVMatrix");
		this.shaderProgram.vertexColorAttribute = gl.getAttribLocation(this.shaderProgram, "aVertexColor");
		gl.enableVertexAttribArray(this.shaderProgram.vertexColorAttribute);
	};

	/*Собственно, отрисовка контекста*/
	lab1.prototype.execute = function () {
		if (this.webgl) console.info('WebGL init successful');else {
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
		this.webgl.clear(this.webgl.COLOR_BUFFER_BIT | this.webgl.DEPTH_BUFFER_BIT);

		this.initShaders(this.webgl);

		this.horizAspect = this.webgl.viewportHeight / this.webgl.viewportWidth;
		this.initBuffers(this.webgl);
		this.drawScene(this.webgl);
	};

	/*Инициализация буфера*/
	lab1.prototype.initBuffers = function (gl) {

		this.cubeVerticesBuffer = gl.createBuffer();
		gl.bindBuffer(gl.ARRAY_BUFFER, this.cubeVerticesBuffer);
		this.vertices = [
		// Передняя грань
		-1.0, -1.0, 1.0, 1.0, -1.0, 1.0, 1.0, 1.0, 1.0, -1.0, 1.0, 1.0,

		// Задняя грань
		-1.0, -1.0, -1.0, -1.0, 1.0, -1.0, 1.0, 1.0, -1.0, 1.0, -1.0, -1.0,

		// Верхняя грань
		-1.0, 1.0, -1.0, -1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, -1.0,

		// Нижняя грань
		-1.0, -1.0, -1.0, 1.0, -1.0, -1.0, 1.0, -1.0, 1.0, -1.0, -1.0, 1.0,

		// Правая грань
		1.0, -1.0, -1.0, 1.0, 1.0, -1.0, 1.0, 1.0, 1.0, 1.0, -1.0, 1.0,

		// Левая грань
		-1.0, -1.0, -1.0, -1.0, -1.0, 1.0, -1.0, 1.0, 1.0, -1.0, 1.0, -1.0];

		gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.vertices), gl.STATIC_DRAW);

		this.colors = [[1.0, 1.0, 1.0, 1.0], // Front face: white
		[1.0, 0.0, 0.0, 1.0], // Back face: red
		[0.0, 1.0, 0.0, 1.0], // Top face: green
		[0.0, 0.0, 1.0, 1.0], // Bottom face: blue
		[1.0, 1.0, 0.0, 1.0], // Right face: yellow
		[1.0, 0.0, 1.0, 1.0] // Left face: purple
		];

		this.generatedColors = [];

		for (var j = 0; j < 6; j++) {
			var c = this.colors[j];

			for (var i = 0; i < 4; i++) {
				this.generatedColors = this.generatedColors.concat(c);
			}
		}

		this.cubeVerticesColorBuffer = gl.createBuffer();
		gl.bindBuffer(gl.ARRAY_BUFFER, this.cubeVerticesColorBuffer);
		gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.generatedColors), gl.STATIC_DRAW);

		this.cubeVerticesIndexBuffer = gl.createBuffer();
		gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.cubeVerticesIndexBuffer);

		// Этот массив определяет каждую грань как два треугольника,
		// используя индексы в массиве вершин, чтобы определить позицию
		// каждого треугольника.

		this.cubeVertexIndices = [0, 1, 2, 0, 2, 3, // front
		4, 5, 6, 4, 6, 7, // back
		8, 9, 10, 8, 10, 11, // top
		12, 13, 14, 12, 14, 15, // bottom
		16, 17, 18, 16, 18, 19, // right
		20, 21, 22, 20, 22, 23 // left
		];

		// Теперь отправим массив элементов в GL

		gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(this.cubeVertexIndices), gl.STATIC_DRAW);
	};

	/*Отрисовка сцены*/
	lab1.prototype.drawScene = function (gl) {
		console.log(this.cubeXRotation, this.cubeYRotation, this.cubeZRotation);
		//очистка canvas
		gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
		//установка viewport
		gl.viewport(0, 0, gl.viewportWidth, gl.viewportHeight);

		mat4.perspective(45, this.horizAspect, 0.1, 100.0, this.pMatrix);
		//создаем матрицу текущего состояния (изначально - единичная) model-view matrix
		mat4.identity(this.mvMatrix);
		mat4.translate(this.mvMatrix, [0.0, 0.0, -10.0]);
		mat4.rotate(this.mvMatrix, this.cubeXRotation, [1, 0, 0]);
		mat4.rotate(this.mvMatrix, this.cubeYRotation, [0, 1, 0]);
		mat4.rotate(this.mvMatrix, this.cubeZRotation, [0, 0, 1]);

		gl.bindBuffer(gl.ARRAY_BUFFER, this.cubeVerticesBuffer);
		gl.vertexAttribPointer(this.shaderProgram.vertexPositionAttribute, 3, gl.FLOAT, false, 0, 0);

		gl.bindBuffer(gl.ARRAY_BUFFER, this.cubeVerticesColorBuffer);
		gl.vertexAttribPointer(this.shaderProgram.vertexColorAttribute, 4, gl.FLOAT, false, 0, 0);

		gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.cubeVerticesIndexBuffer);

		this.setMatrixUniforms(gl);
		gl.drawElements(gl.TRIANGLES, 36, gl.UNSIGNED_SHORT, 0);
	};

	/*Перенос изменений матриц в видеокарту*/
	lab1.prototype.setMatrixUniforms = function (gl) {
		gl.uniformMatrix4fv(this.shaderProgram.pMatrixUniform, false, this.pMatrix);
		gl.uniformMatrix4fv(this.shaderProgram.mvMatrixUniform, false, this.mvMatrix);
	};

	/*Экспорт модуля*/
	module.exports = lab1;

/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map