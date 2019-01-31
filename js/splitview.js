 
function SplitView(type, percent) {
	this.formType = "splitview"; 
	this.type = type; 
	var d = document.createElement("div");
	d.className = "sv_div";
	d.addEventListener("contextmenu", function(event){ 
		event.preventDefault();
		event.stopPropagation();
		return false;
	}, false);  
	 
	this.DOM = d;
	
	
	var d1 = document.createElement("div"); 
	d1.className = (type == "horizontal") ? "sv_panel_v" : "sv_panel_h";
	d.appendChild(d1);
	
	
	var gut = document.createElement("div");
	gut.className = (type == "horizontal") ? "sv_gutter sv_gutter-horizontal" : "sv_gutter sv_gutter-vertical" ;
	d.appendChild(gut);
	
	
	var d2 = document.createElement("div"); 
	d2.className = (type == "horizontal") ? "sv_panel_v" : "sv_panel_h";
	d.appendChild(d2);
	
	 
	
	var split = this;
	
	window.addEventListener("resize", function(){  
		    
		var pos = FormJS.getElementPosition(d); 
		var size = FormJS.getElementSize(d);
		
		var p = 0;
		if (type == "horizontal") {
			this.splitsize = FormJS.clamp(split.splitsize, 15,  size.width - 10);
			p = this.splitsize / size.width * 100;
		}
			
		else if (type == "vertical") { 
			this.splitsize = FormJS.clamp(split.splitsize, 15, size.height - 10);
			p = this.splitsize / size.height * 100;
		}
		
		split.setSplit(p);
		 
	}, false);
	
	window.addEventListener("mouseup", function(){ 
		window.removeEventListener("mousemove", split.onMouseMove, false);
	}, false);
	
	this.onMouseMove = function(e) {
		var pos = FormJS.getElementPosition(d); 
		var size = FormJS.getElementSize(d); 
		var bounds = d.getBoundingClientRect(); 
		 
		if(split.type == "horizontal"){   
			var x = FormJS.clamp(e.clientX - bounds.left, 15, size.width - 15);
			split.setSplit(x / size.width * 100);
		}
		else if(split.type == "vertical"){  
			var y = FormJS.clamp(e.clientY - bounds.top, 15, size.height - 15);  
			split.setSplit(y / size.height * 100); 
		}
	}
	  
	this.setSplit = function(x) {  
		var size = FormJS.getElementSize(d); 
		
		this.splitpercent = x;
		
		var gutter_half = 3;
		if(split.type == "horizontal"){ 
			d1.style.width = "calc(" + x + "% - " + gutter_half + "px)"; 
			d2.style.width = "calc(" + (100-x) + "% - " + gutter_half + "px)";  
			this.splitsize = Math.floor(x/100 * size.width);
		 
		}
		else if(split.type == "vertical"){ 
			d1.style.height = "calc(" + x + "% - " + gutter_half + "px)"; 
			d2.style.height = "calc(" + (100-x) + "% - " + gutter_half + "px)"; 
			this.splitsize = Math.floor(x/100 * size.height);
		}  
	}
	
	setTimeout(function(){ split.setSplit(percent); }, 0); 
	
	gut.addEventListener("mousedown", function(e){
		  
		FormJS.setSelectable(gut, false);
			
		window.addEventListener("mousemove", split.onMouseMove, false);
		// var pos = FormJS.getElementPosition(this);
		// console.log(pos); 
		// gut.px = (e.clientX - pos.x);
		// gut.py = (e.clientY - pos.y);
	}, false);
	
}
 

