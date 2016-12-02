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