/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "https://ejuke.github.io/cg-7th-semester/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__style_main_css__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__style_main_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__style_main_css__);
//styles

//js

// import '../node_modules/react/dist/react.min.js';
// import '../node_modules/react-dom/dist/react-dom.min.js';

var canvasID = 'canvas',
		controlsID = 'controls',
		Lab1 = __webpack_require__ (2),
		Lab2 = __webpack_require__ (3),
		Lab4 = __webpack_require__ (4),
		lab = new Lab1(canvasID, controlsID);

var cpath = (window.location.toString() == 'https://ejuke.github.io/cg-7th-semester/') ? window.location.toString() : '/';

document.body.onload = function(e){
	lab.prepare();
	lab.readShader(cpath+'app/shaders/lab1.frag');
	lab.readShader(cpath+'app/shaders/lab1.vert');

}

document.getElementById('change-lab-1').onclick = function(){changeLab(1);};
document.getElementById('change-lab-2').onclick = function(){changeLab(2);};
document.getElementById('change-lab-4').onclick = function(){changeLab(4);};

function clearRoot(){
	if (lab.destroy) lab.destroy();
	lab = null;
	document.getElementById('root').innerHTML = '<div class="canvas-container" id="canvas"></div><div class="controls-container" id="controls"></div>';
}

function changeLab(number){
	clearRoot();
	switch(number){
		case 1: 
			lab = new Lab1(canvasID, controlsID);
			lab.prepare();
			lab.readShader(cpath+'app/shaders/lab1.frag');
			lab.readShader(cpath+'app/shaders/lab1.vert');
			break;
		case 2:
			lab = new Lab2(canvasID, controlsID);
			lab.prepare();
			break;
		case 4:
			lab = new Lab4(canvasID, controlsID);
			lab.prepare();
			break;
	}
}

/***/ }),
/* 1 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 2 */
/***/ (function(module, exports) {

function lab1 (id, id2) {
	//init components
	this.canvasId = id;
	this.controlsId = id2;
	this.webgl = null;
	this.canvas = null;
	this.VSHADER_SOURCE = this.FSHADER_SOURCE = null;
	this.VSHADER = this.FSHADER = null;

	//data
	this.pMatrix = mat4.create(), this.mvMatrix = mat4.create();
	this.cubeXRotation = 30 * Math.PI / 180, this.cubeYRotation = 30 * Math.PI / 180, this.cubeZRotation = 0.0;
}

/*Подготовка документа к исполнению кода*/
lab1.prototype.prepare = function(){
	var canvasC = document.getElementById(this.canvasId);
	var controlsC = document.getElementById(this.controlsId);
	canvasC.innerHTML = '<canvas id="lab1" width="600px" height="600px"></canvas>';
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
	inputX.value = "30";
	inputY.value = "30";
	inputZ.value = "0";
	var thisClass = this;
	inputX.onchange = inputX.onkeyup = inputX.onmouseup
	 = function(){
		thisClass.cubeXRotation = thisClass.rotate(this.value);
		thisClass.drawScene(thisClass.webgl);
	};
	inputY.onchange = inputY.onkeyup = inputY.onmouseup
	 = function(){
		thisClass.cubeYRotation = thisClass.rotate(this.value);
		thisClass.drawScene(thisClass.webgl);
	};
	inputZ.onchange = inputZ.onkeyup = inputZ.onmouseup
	 = function(){
		thisClass.cubeZRotation = thisClass.rotate(this.value);
		thisClass.drawScene(thisClass.webgl);
	};
	inputX.id = "angleX";
	inputY.id = "angleY";
	inputZ.id = "angleZ";
	inputX.className = "angle-input";
	inputY.className = "angle-input";
	inputZ.className = "angle-input";

	labelX.innerHTML = "угол по оси X:  ";
	labelY.innerHTML = "угол по оси Y:  ";
	labelZ.innerHTML = "угол по оси Z:  ";

	controlsC.appendChild(labelX);
	controlsC.appendChild(inputX);
	controlsC.appendChild(labelY);
	controlsC.appendChild(inputY);
	controlsC.appendChild(labelZ);
	controlsC.appendChild(inputZ);
}

/* Деструктор */
lab1.prototype.destroy = function(){
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

lab1.prototype.rotate = function(angle){
	return angle * Math.PI / 180.0;
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
	this.shaderProgram.vertexColorAttribute = gl.getAttribLocation(this.shaderProgram, "aVertexColor");
	gl.enableVertexAttribArray(this.shaderProgram.vertexColorAttribute);
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

	this.cubeVerticesBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, this.cubeVerticesBuffer);
	this.vertices = [
		// Передняя грань
		-1.0, -1.0,  1.0,
		 1.0, -1.0,  1.0,
		 1.0,  1.0,  1.0,
		-1.0,  1.0,  1.0,

		// Задняя грань
		-1.0, -1.0, -1.0,
		-1.0,  1.0, -1.0,
		 1.0,  1.0, -1.0,
		 1.0, -1.0, -1.0,

		// Верхняя грань
		-1.0,  1.0, -1.0,
		-1.0,  1.0,  1.0,
		 1.0,  1.0,  1.0,
		 1.0,  1.0, -1.0,

		// Нижняя грань
		-1.0, -1.0, -1.0,
		 1.0, -1.0, -1.0,
		 1.0, -1.0,  1.0,
		-1.0, -1.0,  1.0,

		// Правая грань
		 1.0, -1.0, -1.0,
		 1.0,  1.0, -1.0,
		 1.0,  1.0,  1.0,
		 1.0, -1.0,  1.0,

		// Левая грань
		-1.0, -1.0, -1.0,
		-1.0, -1.0,  1.0,
		-1.0,  1.0,  1.0,
		-1.0,  1.0, -1.0
	];

	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.vertices), gl.STATIC_DRAW);

	this.angles = [
		0.0, -20.0, 0.0,
		0.0, 20.0, 0.0,
		-20.0, 0.0, 0.0,
		20.0, 0.0, 0.0,
		0.0, 0.0, -20.0,
		0.0, 0.0, 20.0
	];

	this.anglesBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, this.anglesBuffer);
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.angles), gl.STATIC_DRAW);

	this.colors = [
		[1.0,  0.0,  0.0,  1.0],    // Front face: red
		[1.0,  0.0,  0.0,  1.0],    // Back face: white
		[0.0,  1.0,  0.0,  1.0],    // Top face: green
		[0.0,  0.0,  1.0,  1.0],    // Bottom face: blue
		[1.0,  1.0,  0.0,  1.0],    // Right face: yellow
		[1.0,  0.0,  1.0,  1.0]     // Left face: purple
	];

	this.angleColors = [
		[1.0,  1.0,  1.0,  1.0],
		[1.0,  1.0,  1.0,  1.0],
		[1.0,  1.0,  1.0,  1.0],
		[1.0,  1.0,  1.0,  1.0],
		[1.0,  1.0,  1.0,  1.0],
		[1.0,  1.0,  1.0,  1.0]
	];

	this.generatedColors = [], this.generatedAngleColors = [];

	for (var j=0; j<6; j++) {
		var c = this.colors[j];
		var cc = this.angleColors[j];
		
		for (var i=0; i<4; i++) {
			this.generatedColors = this.generatedColors.concat(c);
			this.generatedAngleColors = this.generatedAngleColors.concat(cc);
		}
	}

	this.cubeVerticesColorBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, this.cubeVerticesColorBuffer);
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.generatedColors), gl.STATIC_DRAW);

	this.anglesColorBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, this.anglesColorBuffer);
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.generatedAngleColors), gl.STATIC_DRAW);
	
	this.cubeVerticesIndexBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.cubeVerticesIndexBuffer);

	// Этот массив определяет каждую грань как два треугольника,
	// используя индексы в массиве вершин, чтобы определить позицию
	// каждого треугольника.

	this.cubeVertexIndices = [
		0,  1,  2,      0,  2,  3,    // front
		4,  5,  6,      4,  6,  7,    // back
		8,  9,  10,     8,  10, 11,   // top
		12, 13, 14,     12, 14, 15,   // bottom
		16, 17, 18,     16, 18, 19,   // right
		20, 21, 22,     20, 22, 23    // left
	];

	// Теперь отправим массив элементов в GL

	gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(this.cubeVertexIndices), gl.STATIC_DRAW);
}

/*Отрисовка сцены*/
lab1.prototype.drawScene = function(gl){
	//очистка canvas
	gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
	//установка viewport
	gl.viewport(0, 0, gl.viewportWidth, gl.viewportHeight);

	mat4.perspective(45, this.horizAspect, 0.1, 100.0, this.pMatrix);
	//создаем матрицу текущего состояния (изначально - единичная) model-view matrix
	mat4.identity(this.mvMatrix);
	mat4.translate(this.mvMatrix, [0.0, 0.0, -10.0]);
	mat4.rotate(this.mvMatrix, this.cubeXRotation, [1,0,0]);
	mat4.rotate(this.mvMatrix, this.cubeYRotation, [0,1,0]);
	mat4.rotate(this.mvMatrix, this.cubeZRotation, [0,0,1]);

	gl.bindBuffer(gl.ARRAY_BUFFER, this.cubeVerticesBuffer);
	gl.vertexAttribPointer(this.shaderProgram.vertexPositionAttribute, 3, gl.FLOAT, false, 0, 0);

	gl.bindBuffer(gl.ARRAY_BUFFER, this.cubeVerticesColorBuffer);
	gl.vertexAttribPointer(this.shaderProgram.vertexColorAttribute, 4, gl.FLOAT, false, 0, 0);

	gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.cubeVerticesIndexBuffer);

	this.setMatrixUniforms(gl);
	gl.drawElements(gl.TRIANGLES, 36, gl.UNSIGNED_SHORT, 0);

	gl.bindBuffer(gl.ARRAY_BUFFER, null);
	gl.bindBuffer(gl.ARRAY_BUFFER, this.anglesBuffer);
	gl.vertexAttribPointer(this.shaderProgram.vertexPositionAttribute, 3, gl.FLOAT, false, 0, 0);
	gl.bindBuffer(gl.ARRAY_BUFFER, this.anglesColorBuffer);
	gl.vertexAttribPointer(this.shaderProgram.vertexColorAttribute, 4, gl.FLOAT, false, 0, 0);
	gl.drawArrays(gl.LINES, 0, 6);
}

/*Перенос изменений матриц в видеокарту*/
lab1.prototype.setMatrixUniforms = function(gl) {
	gl.uniformMatrix4fv(this.shaderProgram.pMatrixUniform, false, this.pMatrix);
	gl.uniformMatrix4fv(this.shaderProgram.mvMatrixUniform, false, this.mvMatrix);
}

/*Экспорт модуля*/
module.exports = lab1;

/***/ }),
/* 3 */
/***/ (function(module, exports) {

function lab2(id, id2){
	this.canvas = null;
	this.canvasId = id;
	this.controlsId = id2;
	this.gl = null;
	this.flow = null;
	this.data = null;
}

lab2.prototype.prepare = function(){
	var canvasC = document.getElementById(this.canvasId);
	var controlsC = document.getElementById(this.controlsId);
	canvasC.innerHTML = '<canvas id="lab2" width="600px" height="600px" style="border-right: 1px solid black;"></canvas>';
	this.canvas = document.getElementById('lab2');
	this.gl = this.canvas.getContext('2d');
	this.gl.lineWidth = "0.5";


	controlsC.innerHTML = '<p>Значения координат точек</p><br>'
	this.data = new Array();

	this.inputs = new Array();
	var input1_1 = document.createElement('input');		this.inputs.push(input1_1);
	var input1_2 = document.createElement('input');		this.inputs.push(input1_2);
	var input2_1 = document.createElement('input');		this.inputs.push(input2_1);
	var input2_2 = document.createElement('input');		this.inputs.push(input2_2);
	var input3_1 = document.createElement('input');		this.inputs.push(input3_1);
	var input3_2 = document.createElement('input');		this.inputs.push(input3_2);
	var input4_1 = document.createElement('input');		this.inputs.push(input4_1);
	var input4_2 = document.createElement('input');		this.inputs.push(input4_2);
	var input5_1 = document.createElement('input');		this.inputs.push(input5_1);
	var input5_2 = document.createElement('input');		this.inputs.push(input5_2);
	var input6_1 = document.createElement('input');		this.inputs.push(input6_1);
	var input6_2 = document.createElement('input');		this.inputs.push(input6_2);
	var input7_1 = document.createElement('input');		this.inputs.push(input7_1);
	var input7_2 = document.createElement('input');		this.inputs.push(input7_2);
	var input8_1 = document.createElement('input');		this.inputs.push(input8_1);
	var input8_2 = document.createElement('input');		this.inputs.push(input8_2);
	var input9_1 = document.createElement('input');		this.inputs.push(input9_1);
	var input9_2 = document.createElement('input');		this.inputs.push(input9_2);
	var input10_1 = document.createElement('input');	this.inputs.push(input10_1);
	var input10_2 = document.createElement('input');	this.inputs.push(input10_2);
	
	var thisClass = this;

	this.elemData = undefined;
	var cur = this;
	this.inputs.forEach(function(item,i,arr){
		item.type = "number";
		if (i%2 == 0){
			item.value = parseInt(Math.random()*60+60*i/2);
			if(!cur.elemData) cur.elemData = new Array(2);
			cur.elemData[0] = item.value;
		}
		else{
			item.value = parseInt(Math.random()*600);
			cur.elemData[1] = item.value;
		}
		item.id = 'input-'+i;
		item.className = 'lab2-input';
		controlsC.appendChild(item);
		if(i%2 != 0){
			controlsC.appendChild(document.createElement('br'));
			cur.data.push(cur.elemData);
			cur.elemData = undefined;
		}
	})
	var clickElem = document.createElement('input');
	clickElem.type = 'submit';
	clickElem.value = 'Перерисовать';
	clickElem.onclick = function(e){
		e.preventDefault();
		cur.setDataFromInput();
	};

	var randElem = document.createElement('input');
	randElem.type = 'submit';
	randElem.value = 'Случайные значения';
	randElem.onclick = function(e){
		e.preventDefault();
		cur.inputs.forEach(function(item,i,arr){
			if (i%2 == 0){
				item.value = parseInt(Math.random()*60+60*i/2);
			}
			else{
				item.value = parseInt(Math.random()*600);
			}
		})
		cur.setDataFromInput();
	}
	controlsC.appendChild(clickElem);
	controlsC.appendChild(randElem);
}

lab2.prototype.setDataFromInput = function(){
	this.data = new Array();
	this.elemData = undefined;
	var cur = this;
	this.inputs.forEach(function(item,i,arr){
		if (i%2 == 0){
			if(!cur.elemData) cur.elemData = new Array(2);
			cur.elemData[0] = item.value;
		}
		else{
			cur.elemData[1] = item.value;
			cur.data.push(cur.elemData);
			cur.elemData = undefined;
		}
	});
	this.changeData();
}

lab2.prototype.changeData = function(){
	this.flow1 = this.getBezierCurve(this.data, 0.01);
	this.canvas.width = this.canvas.width;
	var cur = this;
	this.gl.beginPath();
	this.gl.strokeStyle = '#08c';
	this.gl.setLineDash([5,3]);
	this.data.forEach(function(item, i, arr){
		
		if(i == 0) cur.gl.moveTo(item[0], item[1]);
		else cur.gl.lineTo(item[0], item[1]);
	});
	cur.gl.stroke();
	this.gl.setLineDash([1,0]);
	this.data.forEach(function(item, i, arr){
		cur.gl.font = "10pt Arial";
		cur.gl.fillStyle = '#000';
		cur.gl.fillText(i+1, parseInt(item[0])+10, parseInt(item[1])+10);
		cur.gl.beginPath();
		cur.gl.arc(item[0], item[1], 3, 0, 2 * Math.PI, false);
		cur.gl.fillStyle = '#08c';
		cur.gl.fill();
	})
	this.gl.strokeStyle = "#000";

	this.drawLines(this.gl, this.flow1, 0);
}

lab2.prototype.destroy = function(){
	this.canvas = null;
	this.gl = null;
}

lab2.prototype.getBezierBasis = function(i, n, t) {
	// Факториал
	function f(n) {
		return (n <= 1) ? 1 : n * f(n - 1);
	};
	
	// считаем i-й элемент полинома Берштейна
	return (f(n)/(f(i)*f(n - i)))* Math.pow(t, i)*Math.pow(1 - t, n - i);
}

// arr - массив опорных точек. Точка - двухэлементный массив, (x = arr[0], y = arr[1])
// step - шаг при расчете кривой (0 < step < 1), по умолчанию 0.01
lab2.prototype.getBezierCurve = function(arr, step) {
	if (step == undefined) {
		step = 0.01;
	}
	
	var res = new Array()
	
	for (var t = 0; t < 1 + step; t += step) {
		if (t > 1) {
			t = 1;
		}
		
		var ind = res.length;
		
		res[ind] = new Array(0, 0);
		
		for (var i = 0; i < arr.length; i++) {
			var b = this.getBezierBasis(i, arr.length - 1, t);
			
			res[ind][0] += arr[i][0] * b;
			res[ind][1] += arr[i][1] * b;
		}
	}
	
	return res;
}

lab2.prototype.drawLines = function(ctx, arr, delay, pause) {
	if (delay == undefined) {
		delay = 10;
	}
	
	if (pause == undefined) {
		pause = delay;
	}
	var i = 0;
	
	function delayDraw() {
		if (i >= arr.length - 1) {
			return;
		}
		
		ctx.moveTo(arr[i][0],arr[i][1]);
		ctx.lineTo(arr[i+1][0],arr[i+1][1]);
		ctx.stroke();
	
		++i;
		
		setTimeout(delayDraw, delay);
	}
	
	setTimeout(delayDraw, pause);
}

module.exports = lab2;

/***/ }),
/* 4 */
/***/ (function(module, exports) {

function lab4 (id, id2){
	this.canvas = null;
	this.canvasId = id;
	this.controlsId = id2;
	this.gl = null;
	this.curData = null;
	this.data = new Array();
	this.rectPos = [100,200,500,400];
	current = this;
}

var current;

lab4.prototype.prepare = function(){
	var canvasC = document.getElementById(this.canvasId);
	var controlsC = document.getElementById(this.controlsId);
	canvasC.innerHTML = '<canvas id="lab4" width="600px" height="600px" style="border-right: 1px solid black; z-index: 10;"></canvas>';
	this.canvas = document.getElementById('lab4');
	this.gl = this.canvas.getContext('2d');
	this.setRect();
	var clickElem = document.createElement('input');
	clickElem.type = 'submit';
	clickElem.value = 'Сбросить отрезки';
	clickElem.onclick = function(e){
		e.preventDefault();
		current.clearCanvas(true);
	};

	var el = document.getElementById('lab4');
	el.addEventListener('click', current.getClickXY, false);

	controlsC.appendChild(clickElem);
}

lab4.prototype.getClickXY = function(event){
	var clickX = (event.layerX == undefined ? event.offsetX : event.layerX) + 1;
	var clickY = (event.layerY == undefined ? event.offsetY : event.layerY) + 1;
	if(!current.curData) {
		current.curData = new Array(2);
		current.curData[0] = [clickX, clickY];
	}
	else {
		current.curData[1] = [clickX, clickY];
		current.data.push(current.curData);
		current.drawLine(current.curData);
		current.curData = undefined;
	}
}

lab4.prototype.reDraw = function(){
	this.clearCanvas(false);
	this.data.forEach(function(item, i ,array){
		current.drawLine(item);
	});
}

lab4.prototype.drawLine = function(item){
	current.gl.beginPath();
	current.gl.moveTo(item[0][0], item[0][1]);
	current.gl.lineTo(item[1][0], item[1][1]);
	current.gl.closePath();
	var check = current.checkLine(item, 5);
	if(check){
		current.gl.strokeStyle = '#f00';
		current.gl.lineWidth = '3';
	}
	else{
		current.gl.strokeStyle = '#00f';
		current.gl.lineWidth = '1';
	}
	current.gl.stroke();
}

lab4.prototype.checkLine = function(item, iterations){
	if (iterations == 0) return false;
	//Mother of God! I'm so sorry for this shit, but that's Heisenbag
	if (item[0][0] >= this.rectPos[0] && item[0][0] <= this.rectPos[2] && item[0][1] >= this.rectPos[1] && item[0][1] <= this.rectPos[3]) return true;
	if(item[1][0] >= this.rectPos[0] && item[1][0] <= this.rectPos[2] && item[1][1] >= this.rectPos[1] && item[1][1] <= this.rectPos[3]) return true;
	
	//End of shit
	else{
		var nitem = new Array(2), nitem2 = new Array(2), npos = new Array(2);
		npos[0] = parseInt((item[0][0]+item[1][0])/2);
		npos[1] = parseInt((item[0][1]+item[1][1])/2);
		nitem[0] = item[0];
		nitem[1] = npos;
		nitem2[0] = npos;
		nitem2[1] = item[1];
		console.log(item, nitem, nitem2);
		var res1 = current.checkLine(nitem, iterations - 1);
		var res2 = current.checkLine(nitem2, iterations - 1);
		console.log(res1, res2);
		if (res2 || res1) return true
	}
	return false;
}

lab4.prototype.clearCanvas = function(destroyData){
	this.canvas.width = this.canvas.width;
	if(destroyData) this.data = [];
	this.setRect();
}

lab4.prototype.setRect = function(){
	this.gl.lineWidth = "0.5";
	this.gl.beginPath();
	this.gl.fillStyle = "rgba(0,0,0,.2)";
	this.gl.rect(this.rectPos[0],this.rectPos[1],this.rectPos[2]-this.rectPos[0],this.rectPos[3]-this.rectPos[1])
	this.gl.fill();
	this.gl.strokeStyle = '#000';
	this.gl.stroke();
	this.gl.closePath();
}

module.exports = lab4;

/***/ })
/******/ ]);