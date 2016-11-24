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
	canvasC.innerHTML = '<canvas id="lab2" width="600px" height="600px"></canvas>';
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
		cur.data = new Array();
		cur.elemData = undefined;
		cur.inputs.forEach(function(item,i,arr){
			if (i%2 == 0){
				if(!cur.elemData) cur.elemData = new Array(2);
				cur.elemData[0] = item.value;
			}
			else{
				cur.elemData[1] = item.value;
			}
			if(i%2 != 0){
				cur.data.push(cur.elemData);
				cur.elemData = undefined;
			}
		});
		cur.changeData();
	};
	controlsC.appendChild(clickElem);
}

lab2.prototype.changeData = function(){
	this.flow = this.getBezierCurve(this.data, 0.01);
	this.canvas.width = this.canvas.width;
	var cur = this;
	this.data.forEach(function(item, i, arr){
		cur.gl.font = "10pt Arial";
		cur.gl.fillStyle = '#000';
		cur.gl.fillText(i+1, parseInt(item[0])+10, parseInt(item[1])+10);
		cur.gl.beginPath();
		cur.gl.arc(item[0], item[1], 3, 0, 2 * Math.PI, false);
		cur.gl.fillStyle = '#08c';
		cur.gl.fill();
	})
	this.drawLines(this.gl, this.flow, 20);
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