/**************************    canvas    *********************/
var drawing = document.getElementById('drawing');

//确定浏览器支持canvas
if(drawing.getContext){

	var context = drawing.getContext('2d');
	
	//红色描边的矩形
	context.strokeStyle = '#f00';
	context.strokeRect(10, 10, 50, 50);

	//蓝色半透明的矩形
	context.fillStyle = "rgba(0, 0, 255, 0.5)";
	context.fillRect(30, 30, 50, 50);

	//清楚某个区域
	context.clearRect(40, 40, 10, 10);
	
}