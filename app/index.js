//styles
import './style/main.scss';
//js

// import '../node_modules/react/dist/react.min.js';
// import '../node_modules/react-dom/dist/react-dom.min.js';

var rootElementId = 'root',
		Lab1 = require ('./lab-code/lab1.js'),
		lab1 = new Lab1(rootElementId);

var cpath = (window.location.toString() == 'https://ejuke.github.io/cg-7th-semester/') ? window.location.toString() : '/';

document.body.onload = function(e){
	lab1.prepare();

	lab1.readShader(cpath+'app/shaders/lab1.frag');
	lab1.readShader(cpath+'app/shaders/lab1.vert');

}