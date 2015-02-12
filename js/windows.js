
function WindowJS(element, title, icons, size){
	this.formType = "window";
	FormJS.windows.push(this);
	this.elements = [];
	this.resizers = [];
	this.resizeSides = [];
	this.resizersCursors = ["nw-resize", "ns-resize", "ne-resize", "ew-resize", "nw-resize", "ns-resize", "ne-resize", "ew-resize"];
	this.resizersActions = [[1,0,0,1], [1,0,0,0], [1,1,0,0], [0,1,0,0], [0,1,1,0], [0,0,1,0], [0,0,1,1], [0,0,0,1]];
	this.x = 0; this.y = 0;
	this.width = 0; this.height = 0;
	this.minWidth = 200; this.minHeight = 100;
	if(FormJS.isElement(element)){
		this.DOM = element;
	}
	else{
		this.DOM = document.createElement("div");
	}
	
	
	
	this.DOM.className = "wnd_container";

	this.DOMpadding = FormJS.getElementPadding(this.DOM);
	
	//window position and size
	if(size && size.length == 4){
		this.setPosition(size[0], size[1]);
		this.setSize(size[2], size[3]);
	}
	else{
		this.setPosition(100, 100);
		this.setSize(220, 260);
	}
	
	var divs = element.getElementsByTagName('div');
	
	//window title
	var title = (divs.length >= 1) ? divs[0] : undefined;
	
	if(title && title.className != "wnd_title"){
		title = document.createElement("div"); 
		title.className = "wnd_title";
		element.insertBefore(title, element.firstChild);
	}
	if(title.innerHTML.length == 0){
		title.innerHTML = (typeof titleText == "string" )? titleText : "Window Title";
	}
	this.DOMTitle = title;
	
	var h = parseInt(element.style.height) - FormJS.getElementSize(title).height; 
	 
	//window body
	var wbody = (divs.length >= 2) ? divs[1] : undefined;	
	if(!wbody || wbody.className != "wnd_body"){
		wbody = document.createElement("div");
		wbody.className = "wnd_body";
		element.insertBefore(wbody, element.firstChild.nextSibling);
	}
	this.DOMBody = wbody;
	wbody.style.height = h + "px";
	
	
	//window events
	var win = this;
	this.drag = false;
	this.resizing = false;
	this.resizingTop = false;
	this.resizingRight = false;
	this.resizingBottom = false;
	this.resizingLeft = false;
	this.canDrag = true;
	
	
	element.addEventListener("mousedown", function(e){
		FormJS.setWindow(win);
	}, true); 
	
	title.addEventListener("mousedown", function(e){
		win.drag = true;
		 
		FormJS.setSelectable(win.DOM, false); 
		var pos = FormJS.getElementPosition(this);
		win.px = (e.clientX - pos.x);
		win.py = (e.clientY - pos.y);
	}, false);
	
	
	window.addEventListener("mouseup", function(){
		 
		win.drag = false;
		win.resizing = false;
	}, false);
	
	window.addEventListener("mousemove", function(e){
		if(win.drag && win.canDrag){
			win.setPosition(
				FormJS.clamp(e.clientX - win.px, 0, e.clientX - win.px + win.width),
				FormJS.clamp(e.clientY - win.py, 0, e.clientY - win.py + win.width)
			);
		}else{
			win.drag = false; 
		}
		if(win.resizing){
			var x = win.x;
			var y = win.y;
			var w = win.width;
			var h = win.height; 
			var mx = Math.max(e.clientX, 0);
			var my = Math.max(e.clientY, 0); 
			if(win.resizeSides[0]){
				var diff = y - my;
				if(h + diff > win.minHeight){
					h += diff;
					y = my;
				}else{ 
					y += h - win.minHeight;
					h = win.minHeight;
				} 
			}
			if(win.resizeSides[1]){
				w = Math.max(win.minWidth, mx-x);
			}
			if(win.resizeSides[2]){
				h = Math.max(win.minHeight, my-y);
			}
			if(win.resizeSides[3]){
				var diff = x - mx;
				if(w + diff > win.minWidth){
					w += diff;
					x = mx;
				}else{ 
					x += w - win.minWidth;
					w = win.minWidth;
				} 
			}			
			 
			win.setPosition(x, y);
			win.setSize(w, h);
		}
	}, false);
	
	
	
	this.iconClose = null;
	this.iconMinimize = null;
	this.iconMaximize = null;
	//icons 
	if(icons && icons.length >= 3){ 
		var div = document.createElement('div');
		div.className = "wnd_icon_div";
		title.appendChild(div);
	
		if(icons[0]){
			div.appendChild(
				this.creatIcon("0px 0px", "0px -21px", function(){
				
				})
			);
		}
		if(icons[1]){
			div.appendChild(
				this.creatIcon("-21px 0px", "-21px -21px", function(){
					
				})
			);
		}
		if(icons[2]){
			div.appendChild(
				this.creatIcon("-42px 0px", "-42px -21px", function(){
					win.hide();
				})
			);
		}
		
	}
}


WindowJS.prototype.show = function(){
	this.DOM.style.display = "block";
}

WindowJS.prototype.hide = function(){
	this.DOM.style.display = "none";
}
WindowJS.prototype.focus = function(){ 
	this.DOMTitle.style.backgroundColor = "#333";
	FormJS.setSelectable(this.DOM, true);
}
WindowJS.prototype.blur = function(){
	this.DOMTitle.style.backgroundColor = "#555";
}


WindowJS.prototype.setPosition = function(x, y){
	this.x = x;
	this.y = y;
	this.DOM.style.top = y + "px";
	this.DOM.style.left = x + "px";
}

WindowJS.prototype.setSize = function(width, height){
	var padding = this.DOMpadding;
	this.width = width;
	this.height = height; 
	
	this.DOM.style.width  = (width  - (padding.left + padding.right)) + "px";
	this.DOM.style.height = (height - (padding.top + padding.bottom)) + "px";

	if(this.DOMBody){
		var h = parseInt(this.DOM.style.height) - FormJS.getElementSize(this.DOMTitle).height; 
		this.DOMBody.style.height = h + "px";
	}
	
	
	this.updateResizers();
}



WindowJS.prototype.creatIcon = function(backPos1, backPos2, clickEvent){
	
	var win = this;
	
	var ico = document.createElement('div');
	ico.className = "wnd_icon";
	ico.style.backgroundPosition = backPos1;
	
	ico.addEventListener("mouseover", function(){	
		ico.style.backgroundPosition = backPos2;
	}, false);
	
	ico.addEventListener("mouseout", function(){
		ico.style.backgroundPosition = backPos1; 
		win.canDrag = true;
	}, false);
	
	ico.addEventListener("click", function(){
		clickEvent();
	}, false);
	
	ico.addEventListener("mousedown", function(){
		win.canDrag = false;
		win.drag = false;
	}, false);
	ico.addEventListener("mouseup", function(){
		win.canDrag = true;
	}, false);

	return ico;
}

WindowJS.prototype.bringToFront = function(){
	
	
} 

WindowJS.prototype.updateResizers = function(){
	//padding
	var win = this;
	var sz = this.DOMpadding.left;
	var divs;
	if(this.resizers.length == 0){
		divs = []; 
 
		for(var i = 0; i < 8; i++){
			var el = document.createElement('div');
			el.className = "wnd_resizer";
			this.DOM.appendChild(el);
			el.resizeIndex = i;
			FormJS.eventSet(el, "mouseover", function(){
				this.style.cursor = win.resizersCursors[this.resizeIndex];
			});
			FormJS.eventSet(el, "mouseout", function(){
				this.style.cursor = "auto";
			});
			 
			FormJS.eventSet(el, "mousedown", function(){
				win.resizing = true;
				win.resizeSides = win.resizersActions[this.resizeIndex];
				FormJS.setSelectable(win.DOM, false);
			}, true);
			divs.push(el);
		}
		this.resizers = divs;
		
		//corners
		FormJS.setSize(divs[0], sz, sz);
		FormJS.setSize(divs[2], sz, sz);
		FormJS.setSize(divs[4], sz, sz);
		FormJS.setSize(divs[6], sz, sz);
	}else{
		divs = this.resizers;
	} 
	//corners
	FormJS.setPosition(divs[0], 0, 0);
	FormJS.setPosition(divs[2], this.width-sz, 0);
	FormJS.setPosition(divs[4], this.width-sz, this.height-sz);
	FormJS.setPosition(divs[6], 0			 , this.height-sz);
	
	//top side
	FormJS.setPosition(divs[1], sz, 0);
	FormJS.setSize(divs[1], this.width - sz*2, sz);
	//right side
	FormJS.setPosition(divs[3], this.width - sz, sz);
	FormJS.setSize(divs[3], sz, this.height - sz*2);
	//bottom side
	FormJS.setPosition(divs[5], sz, this.height - sz);
	FormJS.setSize(divs[5], this.width - sz*2, sz);
	//left side
	FormJS.setPosition(divs[7], 0, sz);
	FormJS.setSize(divs[7], sz, this.height - sz*2);

	
}
	





