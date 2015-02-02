
function Contextmenu(){
	this.formType = "contextmenu";
	this.elements = [];
	this.DOM = document.createElement("div");
	this.DOM.className = "cm_container";
	
	this.DOM.style.display = "block"; 
	this.submenu = undefined;
	this.selected = undefined;
	
	var menu = this;
	
	this.parent = null;
	this.clicked = false;
	
	this.DOM.addEventListener("mousedown", function(){
		menu.clicked = true;
	});
	
	
	document.addEventListener("click", function(){
		if(!menu.clicked && menu.DOM.style.display != "none")
			menu.close(true);
		menu.clicked = false;
	}, true);
	
	
	window.addEventListener('resize', function() { 
		menu.resetSize();
	}, true);

		
}
 
Contextmenu.prototype.close = function(recursiveUp, recursiveDown){
	if(recursiveUp)
		if(this.parent)
			this.parent.close(recursiveUp, recursiveDown);
	if(recursiveDown)
		if(this.submenu)
			this.submenu.close(recursiveUp, recursiveDown);
	if(this.selected)
		this.selected.className = "cm_element";
		
	this.submenu = undefined;
	this.selected = undefined;
	this.DOM.style.display = "none"; 
}

Contextmenu.prototype.resetSize = function(){
	var pos = FormUtils.getElementPosition(this.DOM);
	if(pos.x < 0 || pos.x + this.DOM.offsetWidth > window.innerWidth ){
		if(this.parent){
			var parentX = FormUtils.getElementPosition(this.parent.DOM).x;
			
			var posLeft = parentX - this.DOM.offsetWidth - 5;
			var posRight = parentX + this.DOM.offsetWidth + 35;
			var spaceLeft = parentX;
			var spaceRight = window.innerWidth - posRight - 35;
			if(spaceLeft > spaceRight){ 
				this.DOM.style.left = ((posLeft > 0)? posLeft : 5 ) + "px"; 
			}else{
				this.DOM.style.left =  (window.innerWidth - this.DOM.offsetWidth ) + "px"; 
			}
		}else{
			this.DOM.style.left =  (window.innerWidth - this.DOM.offsetWidth ) + "px";
		}
	}

} 

Contextmenu.prototype.show = function(x, y, prevent){
	if(prevent)
		this.clicked = true;
		
	this.DOM.style.display = "block";
	if(!isNaN(x) && !isNaN(y)){
		this.x = x;
		this.y = y;
	}else{
		this.x = 0;
		this.y = 0;
	} 
	this.DOM.style.left = this.x + "px";
	this.DOM.style.top = this.y + "px";
	
	var menu = this;
	setTimeout(function(){
		menu.resetSize();
	}, 3); 
	document.body.appendChild(this.DOM);
}

 
Contextmenu.prototype.addElement = function(icon, text, callback, contextmenu){
	
	//create DOM element
	var el = document.createElement("div");
	el.className = "cm_element";
	
		
	var element = {
		icon : icon,
		text : text,
		contextmenu : contextmenu,
		callback : callback,
		DOM: el
	}
	
	//add the element into the array
	this.elements.push(element);
	
	//set icon
	if(typeof icon == "string"){
		var spanIcon = document.createElement("div");
		spanIcon.className = "cm_icon";
		spanIcon.style.backgroundImage="url('" + icon + "')";
		el.appendChild(spanIcon);
	}
	
	//set text
	var spanText = document.createElement("span");
	spanText.innerHTML = text;
	spanText.className = "cm_text";
	el.appendChild(spanText);
	
	 
	var menu = this; 
	
	if(contextmenu){
		//arrow
		var spanArrow = document.createElement("span");
		spanArrow.className = "cm_arrow";
		el.appendChild(spanArrow);
	}
	
	el.addEventListener("click", function(){
		if(callback)
			callback();
		if(!contextmenu)
			menu.close(true);
	});
	
	
	el.addEventListener("mouseover", function(){
		 this.className = "cm_element_hover";
		 
		 if(menu.selected != this){
			if(menu.submenu)
				menu.submenu.close(false, true);
			if(menu.selected)
				menu.selected.className = "cm_element";
			menu.selected = this;
			
			if(contextmenu){
				menu.submenu = contextmenu;
				contextmenu.parent = menu;
				contextmenu.show(FormUtils.getElementPosition(menu.DOM).x + menu.DOM.offsetWidth , FormUtils.getElementPosition(this).y);
				
			}
				
		 }
	});
	
	el.addEventListener("mouseout", function(){
		if(menu.selected != this){
			this.className = "cm_element";
		}
	});
	
	this.DOM.appendChild(el);
}

Contextmenu.prototype.addSeparator = function(){
	//create DOM element
	var el = document.createElement("div");
	el.className = "cm_separator";

	var element = {
		type : "separator",
		DOM: el
	}
	
	//add the element into the array
	this.elements.push(element);
	
	this.DOM.appendChild(el);

}