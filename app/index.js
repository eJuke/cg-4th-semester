//styles
import './style/main.scss';
//js

// import '../node_modules/react/dist/react.min.js';
// import '../node_modules/react-dom/dist/react-dom.min.js';

var canvasID = 'canvas',
		controlsID = 'controls',
		Lab1 = require ('./lab-code/lab1.js'),
		Lab2 = require ('./lab-code/lab2.js'),
		Lab4 = require ('./lab-code/lab4.js'),
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