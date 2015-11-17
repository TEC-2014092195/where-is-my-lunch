
  var canvas = oCanvas.create({
  	canvas: "#canvas",
  	background: "#70C4B4",
  	fps: 60
});



var avenues = [{"idAvenue":0,"name":"Avenida0","idCity":1,"geom":[{"x":0,"y":0},{"x":500,"y":0}]},{"idAvenue":1,"name":"Avenida1","idCity":1,"geom":[{"x":0,"y":100},{"x":500,"y":100}]},{"idAvenue":2,"name":"Avenida2","idCity":1,"geom":[{"x":0,"y":200},{"x":500,"y":200}]},{"idAvenue":3,"name":"Avenida3","idCity":1,"geom":[{"x":0,"y":300},{"x":500,"y":300}]},{"idAvenue":4,"name":"Avenida4","idCity":1,"geom":[{"x":0,"y":400},{"x":500,"y":400}]},{"idAvenue":5,"name":"Avenida5","idCity":1,"geom":[{"x":0,"y":500},{"x":500,"y":500}]}];
var blocks = [{"idBlock":1,"name":"R1","geom":[[{"x":0,"y":400},{"x":0,"y":500},{"x":100,"y":500},{"x":100,"y":400},{"x":0,"y":400}]],"idStreet":0,"idAvenue":4},{"idBlock":2,"name":"R2","geom":[[{"x":400,"y":400},{"x":400,"y":500},{"x":500,"y":500},{"x":500,"y":400},{"x":400,"y":400}]],"idStreet":4,"idAvenue":4},{"idBlock":3,"name":"R3","geom":[[{"x":200,"y":300},{"x":200,"y":400},{"x":300,"y":400},{"x":300,"y":300},{"x":200,"y":300}]],"idStreet":2,"idAvenue":3},{"idBlock":4,"name":"R4","geom":[[{"x":400,"y":200},{"x":400,"y":300},{"x":500,"y":300},{"x":500,"y":200},{"x":400,"y":200}]],"idStreet":4,"idAvenue":2},{"idBlock":5,"name":"R5","geom":[[{"x":100,"y":100},{"x":100,"y":200},{"x":200,"y":200},{"x":200,"y":100},{"x":100,"y":100}]],"idStreet":1,"idAvenue":1},{"idBlock":6,"name":"R6","geom":[[{"x":300,"y":0},{"x":300,"y":100},{"x":400,"y":100},{"x":400,"y":0},{"x":300,"y":0}]],"idStreet":3,"idAvenue":0}];
var streets = [{"idStreet":0,"name":"Calle0","idCity":1,"geom":[{"x":0,"y":0},{"x":0,"y":500}]},{"idStreet":1,"name":"Calle1","idCity":1,"geom":[{"x":100,"y":0},{"x":100,"y":500}]},{"idStreet":2,"name":"Calle2","idCity":1,"geom":[{"x":200,"y":0},{"x":200,"y":500}]},{"idStreet":3,"name":"Calle3","idCity":1,"geom":[{"x":300,"y":0},{"x":300,"y":500}]},{"idStreet":4,"name":"Calle4","idCity":1,"geom":[{"x":400,"y":0},{"x":400,"y":500}]},{"idStreet":5,"name":"Calle5","idCity":1,"geom":[{"x":500,"y":0},{"x":500,"y":500}]}];

var prototypeavenue = canvas.display.line({
  x: canvas.width / 2,
  y: canvas.height / 2,
  cap: "round"
});
var prototypeblock = canvas.display.rectangle({
  cap: "round",
  width: 100,
  height: 100
});


var prototypeImage = canvas.display.image({
	origin: { x: "center", y: "center" },
	//image: "img/r1.png",
	width: 50,
	height: 50
});
var prototypeText = canvas.display.text({
	origin: { x: "center", y: "top" },
	font: "bold 10px sans-serif"	
});
var rectangleCity = canvas.display.rectangle({
	cap: "round",
  	width: 500,
  	height: 500,
  	x: 20,
  	y: 35,
  	fill: "#70C4B4",
  	stroke: "5px #887866",
  	cap: "round"
});
canvas.addChild(rectangleCity);
var linesAvenues = [];
var linesStreets = [];
var rectanglesBlocks = [];
var imagesR = [];
var textR = [];
var colors = ["#F1654C","#9DCD82","#64B0BB","#E4C972","#BB9A73","#F1F5E1"];
var colorsDark = ["#BA3722","#7DA665","#488189","#BAA459","#7A6348","#72746D"];
var images = ["r1.png","r2.png","r3.png","r4.png","r5.png","r6.png"];
var restaurants = ["CARNES","VEGETARIANO","MARISCOS","ITALIANO","CHINO","MIXTO"];
var $idRestaurant = undefined;
for (var i = 0; i < avenues.length; i++) {
  linesAvenues.push(prototypeavenue.clone({
    start: avenues[i].geom[0],
    end: avenues[i].geom[1],
    stroke: "5px #887866" // stroke o fill
  }));  
  linesStreets.push(prototypeavenue.clone({
    start: streets[i].geom[0],
    end: streets[i].geom[1],
    stroke: "5px #887866" // stroke o fill
  }));	
  
  
  //console.log((100 - i*10));
  rectanglesBlocks.push(prototypeblock.clone({
      x: blocks[i].geom[0][1].x,
      y: 500-blocks[i].geom[0][1].y, //porque está al reves el y en Gis
      //fill: "hsl(4, "+ (100 - i*2) +"%, "+ (50 - i*2) +"%)"
      fill: colors[i]
  }));
  textR.push(prototypeText.clone({
  	x: rectanglesBlocks[i].width /2,
	  y: (rectanglesBlocks[i].height / 2)+35,
  	text: restaurants[i],
  	fill: colorsDark[i]
  }));
  rectanglesBlocks[i].addChild(textR[i]);
  rectangleCity.addChild(rectanglesBlocks[i]);
};
for (var i = 0; i < avenues.length; i++) {
	rectangleCity.addChild(linesAvenues[i]);
  	rectangleCity.addChild(linesStreets[i]);
    
  	imagesR.push(prototypeImage.clone({
  		x: rectanglesBlocks[i].width / 2,
		  y: rectanglesBlocks[i].height / 2,
  		image: "../../../assets/main/img/"+images[i],
      idRestaurant: i+1
  	}));
    if(i == 0){
      imagesR[i].idRestaurant = 2;
    }
    if(i == 1){
      imagesR[i].idRestaurant = 1; 
    }
    
    
  rectanglesBlocks[i].addChild(imagesR[i]);
  //rectanglesBlocks[i].addChild(imagesR[i]);
  
  
};



var title = canvas.display.text({
	x: canvas.width /2,
	y: 0,
	origin: { x: "center", y: "top" },
	font: "bold 24px sans-serif",
	text: "WIML map",
	fill: "#236962"
});

canvas.addChild(title);
$( "#clickme" ).click(function() {
  $( "#collapseExample" ).collapse({
    toggle: true
  });
});

/*var canvasG = document.getElementById("canvas");
canvasG.style.width = '250px';
canvasG.style.height = '250px';*/
