var parseHash=function(){
	var hash=window.location.hash.substr(1).split("&");
	var data={};
	for(var i=0;i<hash.length;i++){
		var pair=hash[i].split("=");
		if(parseFloat(pair[1])==pair[1]) pair[1]=parseFloat(pair[1]);
		data[pair[0]]=pair[1];
	}
	return data;
}

if(window.location.hash!=""){
	var initial=parseHash();
}

var presets=[
	{"seed":262,"segments":6,"levels":5,"vMultiplier":2.36,"twigScale":0.39,"initalBranchLength":0.49,"lengthFalloffFactor":0.85,"lengthFalloffPower":0.99,"clumpMax":0.454,"clumpMin":0.404,"branchFactor":2.45,"dropAmount":-0.1,"growAmount":0.235,"sweepAmount":0.01,"maxRadius":0.139,"climbRate":0.371,"trunkKink":0.093,"treeSteps":5,"taperRate":0.947,"radiusFalloffRate":0.73,"twistRate":3.02,"trunkLength":2.4,"trunkMaterial":"TrunkType1","twigMaterial":"BranchType6"},
	{"seed":861,"segments":10,"levels":5,"vMultiplier":0.66,"twigScale":0.47,"initalBranchLength":0.5,"lengthFalloffFactor":0.85,"lengthFalloffPower":0.99,"clumpMax":0.449,"clumpMin":0.404,"branchFactor":2.75,"dropAmount":0.07,"growAmount":-0.005,"sweepAmount":0.01,"maxRadius":0.269,"climbRate":0.626,"trunkKink":0.108,"treeSteps":4,"taperRate":0.876,"radiusFalloffRate":0.66,"twistRate":2.7,"trunkLength":1.55,"trunkMaterial":"TrunkType2","twigMaterial":"BranchType5"},
	{"seed":152,"segments":6,"levels":5,"vMultiplier":1.16,"twigScale":0.44,"initalBranchLength":0.49,"lengthFalloffFactor":0.85,"lengthFalloffPower":0.99,"clumpMax":0.454,"clumpMin":0.246,"branchFactor":3.2,"dropAmount":0.09,"growAmount":0.235,"sweepAmount":0.01,"maxRadius":0.111,"climbRate":0.41,"trunkKink":0.0,"treeSteps":5,"taperRate":0.835,"radiusFalloffRate":0.73,"twistRate":2.06,"trunkLength":2.45,"trunkMaterial":"TrunkType3","twigMaterial":"BranchType2"},
	{"seed":499,"segments":8,"levels":5,"vMultiplier":1,"twigScale":0.28,"initalBranchLength":0.5,"lengthFalloffFactor":0.98,"lengthFalloffPower":1.08,"clumpMax":0.414,"clumpMin":0.282,"branchFactor":2.2,"dropAmount":0.24,"growAmount":0.044,"sweepAmount":0,"maxRadius":0.096,"climbRate":0.39,"trunkKink":0,"treeSteps":5,"taperRate":0.958,"radiusFalloffRate":0.71,"twistRate":2.97,"trunkLength":1.95,"trunkMaterial":"TrunkType3","twigMaterial":"BranchType3"},
	{"seed":267,"segments":8,"levels":4,"vMultiplier":0.96,"twigScale":0.71,"initalBranchLength":0.12,"lengthFalloffFactor":1,"lengthFalloffPower":0.7,"clumpMax":0.556,"clumpMin":0.404,"branchFactor":3.5,"dropAmount":0.18,"growAmount":-0.108,"sweepAmount":0.01,"maxRadius":0.139,"climbRate":0.419,"trunkKink":0.093,"treeSteps":5,"taperRate":0.947,"radiusFalloffRate":0.73,"twistRate":3.53,"trunkLength":1.75,"trunkMaterial":"TrunkType3","twigMaterial":"BranchType4"},
	{"seed":519,"segments":6,"levels":5,"vMultiplier":1.01,"twigScale":0.52,"initalBranchLength":0.65,"lengthFalloffFactor":0.73,"lengthFalloffPower":0.76,"clumpMax":0.53,"clumpMin":0.419,"branchFactor":3.4,"dropAmount":-0.16,"growAmount":0.128,"sweepAmount":0.01,"maxRadius":0.168,"climbRate":0.472,"trunkKink":0.06,"treeSteps":5,"taperRate":0.835,"radiusFalloffRate":0.73,"twistRate":1.29,"trunkLength":2.2,"trunkMaterial":"TrunkType2","twigMaterial":"BranchType1"},
	{"seed":152,"segments":8,"levels":5,"vMultiplier":1.16,"twigScale":0.39,"initalBranchLength":0.49,"lengthFalloffFactor":0.85,"lengthFalloffPower":0.99,"clumpMax":0.454,"clumpMin":0.454,"branchFactor":3.2,"dropAmount":0.09,"growAmount":0.235,"sweepAmount":0.051,"maxRadius":0.105,"climbRate":0.322,"trunkKink":0,"treeSteps":5,"taperRate":0.964,"radiusFalloffRate":0.73,"twistRate":1.5,"trunkLength":2.25,"trunkMaterial":"TrunkType1","twigMaterial":"BranchType2"},
	{"seed":267,"segments":8,"levels":4,"vMultiplier":0.96,"twigScale":0.7,"initalBranchLength":0.26,"lengthFalloffFactor":0.94,"lengthFalloffPower":0.7,"clumpMax":0.556,"clumpMin":0.404,"branchFactor":3.5,"dropAmount":-0.15,"growAmount":0.28,"sweepAmount":0.01,"maxRadius":0.139,"climbRate":0.419,"trunkKink":0.093,"treeSteps":5,"taperRate":0.947,"radiusFalloffRate":0.73,"twistRate":3.32,"trunkLength":2.2,"trunkMaterial":"TrunkType1","twigMaterial":"BranchType3"}
]

$(function(){
var fields=[
{group:"Tree",fields:[
	{name:"seed",title:"Random Seed",range:[1,1000],value:1,step:1,type:"slider"},
	{name:"segments",title:"Branch Segments",range:[6,20],value:6,step:2,type:"slider"},
	{name:"levels",title:"Branching Level Depth",range:[0,7],value:4,step:1,type:"slider"},
	{name:"vMultiplier",title:"Texture V mulitplier",range:[0.01,10],value:1,step:0.05,type:"slider"},
	{name:"twigScale",title:"Twig Scale",range:[0,1],value:0.5,step:0.01,type:"slider"}
]},
{group:"Branching",fields:[
	{name:"initalBranchLength",title:"Initial Branch Length",range:[0.1,1],value:0.43,step:0.01,type:"slider"},
	{name:"lengthFalloffFactor",title:"Branch Length Falloff Rate",range:[0.5,1],value:0.75,step:0.01,type:"slider"},
	{name:"lengthFalloffPower",title:"Branch Length Falloff Power",range:[0.1,1.5],value:1,step:0.01,type:"slider"},
	{name:"clumpMax",title:"Max Clumpling",range:[0,1],value:0.5,step:0.001,type:"slider"},
	{name:"clumpMin",title:"Min Clumpling",range:[0,1],value:0.33,step:0.001,type:"slider"},
	{name:"branchFactor",title:"Symmetry",range:[2,4],value:2.7,step:0.05,type:"slider"},
	{name:"dropAmount",title:"Droop",range:[-1,1],value:0.00,step:0.01,type:"slider"},
	{name:"growAmount",title:"Growth",range:[-0.5,1],value:0,step:0.001,type:"slider"},
	{name:"sweepAmount",title:"Sweep",range:[-1,1],value:0,step:0.001,type:"slider"}
	
]},
{group:"Trunk",fields:[
	{name:"maxRadius",title:"Trunk Raidus",range:[0.05,1],value:0.144,step:0.001,type:"slider"},
	{name:"climbRate",title:"Climb Rate",range:[0.05,1],value:0.5,step:0.001,type:"slider"},
	{name:"trunkKink",title:"Kink",range:[0,0.5],value:0,step:0.001,type:"slider"},
	{name:"treeSteps",title:"Trunk forks",range:[0,35],value:4,step:1,type:"slider"},
	{name:"taperRate",title:"Taper Rate",range:[0.7,1],value:0.92,step:0.001,type:"slider"},
	{name:"radiusFalloffRate",title:"Radius Falloff Rate",range:[0.5,0.8],value:0.68,step:0.01,type:"slider"},
	{name:"twistRate",title:"Twists",range:[0,10],value:1.45,step:0.01,type:"slider"},
	{name:"trunkLength",title:"Trunk Length",range:[0.1,5],value:2.1,step:0.05,type:"slider"}
]},
{group:"Textures",fields:[
	{name:"trunkMaterial",title:"Trunk Material",value:"TrunkType2",type:"selectImage",options:[["images/trunk1.jpg","TrunkType1"],["images/trunk2.jpg","TrunkType2"],["images/trunk3.jpg","TrunkType3"],["images/trunk4.jpg","TrunkType4"]]},
	{name:"twigMaterial",title:"Twig Material",value:"BranchType5",type:"selectImage",options:[["images/branch1.jpg","BranchType1"],["images/branch2.jpg","BranchType2"],["images/branch3.jpg","BranchType3"],["images/branch4.jpg","BranchType4"],["images/branch5.jpg","BranchType5"],["images/branch6.jpg","BranchType6"]]}
]}
];

var getProperties=function(){
	var output={};
	for(var i=0;i<fields.length;i++){
		for(var j=0;j<fields[i].fields.length;j++){
			var field=fields[i].fields[j];
			output[field.name]=field.value;
		}
	}
	return output;
};


var socialWindow=function(url){
	return window.open(url,"social","width=600,height=400,location=no,directories=no,status=no,menubar=no,toolbar=no,resizable=no");
}

var linkbox=document.getElementById("linkbox");
var googleplus=document.getElementById("googleplus");
var twitter=document.getElementById("twitter");
var facebook=document.getElementById("facebook");
var setHash=function(properties){
	var hash=[];
	for(n in properties) hash.push(n+"="+properties[n]);
	window.location.hash=hash.join("&");
	linkbox.value=window.location;
	googleplus.onclick=function(){socialWindow("https://plus.google.com/share?url="+escape(window.location));};
	twitter.onclick=function(){socialWindow("https://twitter.com/intent/tweet?original_referer="+escape(window.location)+"&text=Check+out+my+tree&url="+escape(window.location.href));};
	facebook.onclick=function(){socialWindow("http://www.facebook.com/sharer/sharer.php?u="+escape(window.location)+"&ref=fbshare&t=My+tree+created+online");};
}

var setProperties=function(properties){
	for(var i=0;i<fields.length;i++){
		for(var j=0;j<fields[i].fields.length;j++){
			var field=fields[i].fields[j];
			if(properties[field.name]!==undefined){
				field.value=properties[field.name];
				if(field.bound){
					if(field.type=="slider") $(field.bound).slider("value",properties[field.name]);
					if(field.type=="select") {
						for(var k=0;k<field.bound.options.length;k++){
							if(field.bound.options[k].value==properties[field.name]){
								field.bound.selectedIndex=k;
							}
						}
					}
				}
			}
		}
	}
};

window.setPreset=function(i){
	setProperties(presets[i])
	createTree(presets[i]);
};

window.showAbout=function(){
	$( "#about" ).dialog({width:'600px'});
};

window.showSaveCollada=function(){
	$( "#exportCollada" ).dialog();
	exportdae.href=generateColladaFile(flattenArray(myTree.verts),flattenArray(myTree.normals),flattenArray(myTree.UV),flattenArray(myTree.faces), flattenArray(myTree.vertsTwig),flattenArray(myTree.normalsTwig),flattenArray(myTree.uvsTwig),flattenArray(myTree.facesTwig))
	
};

window.showSaveWavefront=function(){
	$( "#exportWavefront" ).dialog();
	exportobj.href=generateObjFile(flattenArray(myTree.verts),flattenArray(myTree.normals),flattenArray(myTree.UV),flattenArray(myTree.faces), flattenArray(myTree.vertsTwig),flattenArray(myTree.normalsTwig),flattenArray(myTree.uvsTwig),flattenArray(myTree.facesTwig))
};

var buildGui=function(){
	var sliders=$("#sliders");
	for(var i=0;i<fields.length;i++){
		sliders.find("ul").first().append("<li><a href='#tab"+(i+2)+"'>"+fields[i].group+"</a></li>");
		var acontent=$("<div id='tab"+(i+2)+"'></div>");
		sliders.append(acontent);
		for(var j=0;j<fields[i].fields.length;j++){
			var field=fields[i].fields[j];
			
			var container=$("<div class='input'><h4>"+field.title+"</h4></div>");
			switch(field.type){
				case "slider":
					var slider=$("<div class='slider'></div>");
					container.append(slider);
					slider.slider({
						min:field.range[0],
						max:field.range[1],
						value:field.value,
						step:field.step,
					});
					slider.each(function(){
						$.data(this,"data",field);
						field.bound=this;
					});
					slider.bind("slidestop",function(event,ui){
						$.data(this,"data").value=ui.value;
						createTree(getProperties());
					});
					slider.bind("slide",function(event,ui){
						$.data(this,"data").value=ui.value;
						createTree(getProperties());
					});
					break;
				case "select":
					var select=$("<select />");
					for(var k=0;k<field.options.length;k++){
						var option=$("<option value='"+field.options[k]+"'"+(field.options[k]==field.value ? " selected" : "")+">"+field.options[k]+"</option>");
						select.append(option);
					}
					field.bound=select[0];
					$.data(select[0],"data",field);
					select.bind("change",function(){
						var field=$.data(this,"data");
						field.value=this.options[this.selectedIndex].value;
						createTree(getProperties());
					});
					container.append(select);
					break;
				case "selectImage":
					var images=$("<div />");
					for(var k=0;k<field.options.length;k++){
						var image=$("<img src=\""+field.options[k][0]+"\" />");
						image.css({cursor:"pointer",margin: 3});
						images.append(image);
						image.bind("click",function(imageValue,images){
							return function(){
								$.data(images,"data").value=imageValue;
								createTree(getProperties());
							};
						}(field.options[k][1],images[0]));
					}
					field.bound=images[0];
					$.data(images[0],"data",field);
					
					container.append(images);
					break;
			}
			acontent.append(container);
		}
	}
	sliders.tabs();


	$("#json").bind("change",function(){
		try{
			var json=JSON.parse(this.value);
		}catch(e){
			alert("invalid json");
		}
		setProperties(json)
		if(json) createTree(json);
	});
};





var canvas = document.getElementById( 'canvas' );
var controls = document.getElementById( 'controls' );
canvas.width=800;
canvas.height=800;

var renderer = new GLGE.Renderer( canvas ,function(){window.location="http://get.webgl.org/"});
renderer.cullFaces=true;

var XMLdoc = new GLGE.Document();
var treeMesh;
var twigMesh;
var tree;
var twigs,twigs2;
var myTreel
var exportobj=document.getElementById("exportobj");
var exportdae=document.getElementById("exportdae");
var generating=$("#generating");
var timer;

var createTree=function(data){
	if(timer) clearTimeout(timer);
	generating.stop(true,true);
	generating.fadeIn(200);
	timer=setTimeout(function(){
		setHash(data);
		var start=+new Date;
		myTree=new Tree(data);
		treeMesh=new GLGE.Mesh();
		treeMesh.setPositions(flattenArray(myTree.verts));
		treeMesh.setNormals(flattenArray(myTree.normals));
		treeMesh.setUV(flattenArray(myTree.UV));
		treeMesh.setFaces(flattenArray(myTree.faces));
		tree.setMesh(treeMesh);
		tree.setMaterial(XMLdoc.getElement( data.trunkMaterial ));

		twigMesh=new GLGE.Mesh();
		twigMesh.setPositions(flattenArray(myTree.vertsTwig));
		twigMesh.setNormals(flattenArray(myTree.normalsTwig));
		twigMesh.setUV(flattenArray(myTree.uvsTwig));
		twigMesh.setFaces(flattenArray(myTree.facesTwig));
		twigs.setMesh(twigMesh);
		twigs.setMaterial(XMLdoc.getElement( data.twigMaterial ));
		
		twigs2.setMesh(twigMesh);
		twigs2.setMaterial(XMLdoc.getElement( data.twigMaterial ));
		
		document.getElementById("time").innerHTML=(+new Date-start)+"ms";
		document.getElementById("verts").innerHTML=myTree.vertsTwig.length+myTree.verts.length;
		document.getElementById("faces").innerHTML=myTree.facesTwig.length+myTree.faces.length;
		
		document.getElementById("json").value=JSON.stringify(data).split(",").join(",\n");	
		generating.stop(true,true);
		generating.fadeOut(200);
	},200);
}
var flattenArray=function(input){
	var retArray=[];
	for(var i=0;i<input.length;i++){
		for(var j=0;j<input[i].length;j++){
			retArray.push(input[i][j]);
		}
	}
	return retArray;
}
	
XMLdoc.onLoad = function(){
	treeMesh=new GLGE.Mesh;
	twigMesh=new GLGE.Mesh;
	
	var scene = XMLdoc.getElement( "mainscene" );
	var camera = XMLdoc.getElement( "mainCamera" );
    
	camera.setCanvas(canvas);
	camera.latitude=-0.2;
	camera.longitude=1.8;
	
	var positions=[];
	for(var x=-50; x<50;x++){
		positions.push(x,0,-50,x,0,50,50,0,x,-50,0,x);
	}
	var line=(new GLGE.Object).setDrawType(GLGE.DRAW_LINES);
	line.setMesh((new GLGE.Mesh).setPositions(positions));
	line.setMaterial(XMLdoc.getElement( "lines" ));
	line.setZtransparent(true);
	line.setDepthMask(false);
	scene.addObject(line);
	
	var resize=function(){
		canvas.style.width=(innerWidth-250)+"px";
		canvas.style.height=(innerHeight-50)+"px";
		controls.style.height=(innerHeight-60)+"px";
		camera.setAspect((innerWidth-250)/(innerHeight-50));
	}

	$(window).resize(resize);
	requestAnimationFrame(resize);
	
		
	twigs=new GLGE.Object();
	twigs.setMesh(twigMesh);
	twigs.setZtransparent(true);
	twigs.setDepthMask(false);
	twigs.setBlending([ "ONE","ONE_MINUS_SRC_ALPHA"]);
	scene.addObject(twigs);
	
	twigs2=new GLGE.Object();
	twigs2.setMesh(twigMesh);
	twigs2.setZtransparent(true);
	twigs2.setBlending([ "ONE","ONE_MINUS_SRC_ALPHA"]);
	twigs2.zDepth=0;
	scene.addObject(twigs2);
	
	tree=new GLGE.Object();
	tree.setMaterial(XMLdoc.getElement( "TrunkType1" ));
	tree.setMesh(treeMesh);
	scene.addObject(tree);
	
	
	
	createTree(getProperties());
	
	renderer.setScene( scene );
	renderer.render();
	var lasttime;
	var render=function(){
		var now=+new Date;
		renderer.render();
		lasttime=now;
		requestAnimationFrame(render);
	};
	render();
	
	$("body").animate({opacity:1},1000);
}
XMLdoc.load("scene.xml");

buildGui();

if(!initial){
	setProperties(presets[0]);
}else{
	setProperties(initial);
}

});