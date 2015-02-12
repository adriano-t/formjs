
FormJS = { 
	windowFocused : null,
	windows : [],
	baseZIndex: 1,
	
	setWindow : function(win){
		if(this.windowFocused)
			this.windowFocused.blur();
		this.windowFocused = win;
		
		//make all windows unselectable
		for(var i = 0; i < this.windows.length; i++){
			this.setSelectable(this.windows[i].DOM, false);
		}
		
		this.windows.splice(this.windows.indexOf(win), 1);
		this.windows.push(win);
		
		for(var i = 0; i < this.windows.length; i++){
			this.windows[i].DOM.style.zIndex = this.baseZIndex + i;
		}
		
		win.focus();
	},
	
	isNode : function(obj) {
		return(
			typeof Node === "object" ? obj instanceof Node : obj &&
			typeof obj === "object" &&
			typeof obj.nodeType === "number" &&
			typeof obj.nodeName==="string"
		);
	},
	
	isElement : function(obj) {
		return (
			typeof HTMLElement === "object" ? obj instanceof HTMLElement : obj &&
			typeof obj === "object" &&
			obj !== null &&
			obj.nodeType === 1 &&
			typeof obj.nodeName==="string"
		);
	},
	 
	getElementPosition : function(element){
		if(!element)
			return {x:0, y:0};
		var rect = element.getBoundingClientRect();
		var scrollTop = document.documentElement.scrollTop?
						document.documentElement.scrollTop:document.body.scrollTop;
		var scrollLeft = document.documentElement.scrollLeft?                   
						 document.documentElement.scrollLeft:document.body.scrollLeft;
		return {x: rect.left+scrollLeft, y: rect.top+scrollTop};
		
	},
	
	getElementSize : function(element){ 
		return {
			width:
				Math.max(element.offsetWidth, element.scrollWidth)
				+ parseInt(this.getStyle(element, "margin-left") || 0)
				+ parseInt(this.getStyle(element, "margin-right") || 0)
				+ parseInt(this.getStyle(element, "border-left") || 0)
				+ parseInt(this.getStyle(element, "border-right") || 0)
			,
			height:
				Math.max(element.offsetHeight, element.scrollHeight)
				+ parseInt(this.getStyle(element, "margin-top") || 0)
				+ parseInt(this.getStyle(element, "margin-bottom") || 0)
				+ parseInt(this.getStyle(element, "border-top") || 0)
				+ parseInt(this.getStyle(element, "border-bottom") || 0)
		}; 
	},
	
	getElementMargin : function(element){
		return {
			left: parseInt(this.getStyle(element, "margin-left") || 0),
			right: parseInt(this.getStyle(element, "margin-right") || 0),
			top: parseInt(this.getStyle(element, "margin-top") || 0),
			bottom: parseInt(this.getStyle(element, "margin-bottom") || 0)
		}
	},
	
	
	getElementBorder : function(element){
		return {
			left: parseInt(this.getStyle(element, "border-left") || 0),
			right: parseInt(this.getStyle(element, "border-right") || 0),
			top: parseInt(this.getStyle(element, "border-top") || 0),
			bottom: parseInt(this.getStyle(element, "border-bottom") || 0)
		}
	},
	
	getElementPadding : function(element){
		return {
			left: parseInt(this.getStyle(element, "padding-left") || 0),
			right: parseInt(this.getStyle(element, "padding-right") || 0),
			top: parseInt(this.getStyle(element, "padding-top") || 0),
			bottom: parseInt(this.getStyle(element, "padding-bottom") || 0)
		}
	},
	
	getStyle: function(el, styleProperty){ 
		if (el.currentStyle)
			var y = el.currentStyle[styleProperty];
		else if (window.getComputedStyle)
			var y = document.defaultView.getComputedStyle(el,null).getPropertyValue(styleProperty);
		return y;
	},
	
	isChild : function(parent, child) {
		var node = child.parentNode;
		while (node != null) {
			if (node == parent) {
				return true;
			}
			node = node.parentNode;
		}
		return false;
	},
	
	clamp : function(val, min, max){
		if(max < min) return val;
		if(val < min) val = min;
		if(val > max) val = max;
		return val;
	},
	
	setSelectable: function(element, selectable){
		if(selectable){
			element.style.userSelect = "text";
			element.style.webkitUserSelect = "text";
			element.style.MozUserSelect = "text";
			element.setAttribute("unselectable", "on");
		}else{ 
			element.style.userSelect = "none";
			element.style.webkitUserSelect = "none";
			element.style.MozUserSelect = "none";
			element.setAttribute("unselectable", "off");
		}
	},
	
	setSize : function(element, width, height){
		element.style.width = width + "px";
		element.style.height = height + "px";
	},
	setPosition : function(element, x, y){
		element.style.left = x + "px";
		element.style.top = y + "px";
	},
	
	eventSet : function(element, type, callback, capture){
		element.addEventListener(type, callback, capture===true);
		if(!element.formjsEvents) element.formjsEvents = [];
		element.formjsEvents[type] = callback;
	}, 
	
	eventReplace : function(element, type, callback){
		element.removeEventListener(type, element.formjsEvents[type]);
		element.addEventListener(type, callback, false);
		element.formjsEvents[type] = callback;
	},
	
	eventRemove : function(element, type){
		element.removeEventListener(type, element.formjsEvents[type]);
	}
	
};
 