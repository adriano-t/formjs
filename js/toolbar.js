
function Toolbar(){
	this.formType = "toolbar";
	this.elements = [];
	this.DOM = document.createElement("div");
	this.DOM.className = "tb_div";
	
	this.selectedElement = undefined;
	this.waitNextClick = false;
	var tb = this;
	document.addEventListener("click", function(){
		if(tb.selectedElement && !tb.waitNextClick){
			tb.selectedElement.setSelected(false); 
			tb.selectedElement = undefined;		
		}
		tb.waitNextClick = false;
	},true);
}
 

Toolbar.prototype.addElement = function(icon, text, callback, contextmenu){
	
	//create DOM element
	var el = document.createElement("div");
	el.isSelected = false;
	el.isClickable = true;
	el.className = "tb_element";
	
		
	var element = {
		type : "element",
		icon : icon,
		text : text,
		contextmenu : contextmenu,
		callback : callback,
		DOM: el
	}
	
	//add the element into the array
	this.elements.push(element);
	
	//set icon
	if(typeof icon == "string" && icon.length > 0){
		var spanIcon = document.createElement("div");
		spanIcon.className = "tb_icon";
		spanIcon.style.backgroundImage="url('" + icon + "')";
		el.appendChild(spanIcon);
	}
	
	//set text
	if(text && text.length > 0){
		var spanText = document.createElement("span");
		spanText.innerHTML = text;
		spanText.className = "tb_text";
		el.appendChild(spanText);
	}
	
	//set contextmenu
	if(contextmenu){
		var spanCtx = document.createElement("span");
		spanCtx.className = "tb_context_dropdown";
		el.appendChild(spanCtx);
		
		var spanArrow = document.createElement("span");
		spanArrow.className = "tb_context_arrow";
		spanCtx.appendChild(spanArrow);
		
		if(callback){
			spanCtx.addEventListener("mousedown", function(event){
				el.setSelected(true);
			}, false);
		}
		
		el.setSelected = function(sel){
			if(sel){
				if(!this.isSelected){
					console.log(this, "Selected");
					this.isSelected = true;
					this.className = "tb_element_hover";
					spanCtx.className = "tb_context_dropdown_selected";
					
					var pos = FormJS.getElementPosition(this);
					contextmenu.show(pos.x, pos.y+this.offsetHeight, true);
					if(toolbar.selectedElement)
						toolbar.selectedElement.setSelected(false);
						
					toolbar.selectedElement = this;
					toolbar.waitNextClick = true;
				}else{ 
					this.className = "tb_element_hover";
					spanCtx.className = "tb_context_dropdown_hover";
					this.isClickable = false;
					this.isSelected = false;
				}
			}
			else{
				if(this.isSelected){
					console.log(this, "Selected Another");
					this.className = "tb_element";
					spanCtx.className = "tb_context_dropdown";
					this.isSelected = false;
				}
			}
		}
	}
	
	var toolbar = this; 
	
	
	el.addEventListener("mousedown", function(){
		if(contextmenu){ 
			if(!callback) //if is a contextmenu only button
				el.setSelected(true);
			else{
				//if it's a mixed button and the context menu is not opened
				if(spanCtx.className != "tb_context_dropdown_selected" && this.isClickable){ 
					this.className = "tb_element_selected";
					spanCtx.className = "tb_context_dropdown_hover";
				}
			}
		}
		else{
			this.className = "tb_element_selected";
		}
		
	});
	el.addEventListener("mouseup", function(){
		if(callback){
			this.className = "tb_element_hover";
		}
	});
	el.addEventListener("click", function(){
		if(callback){
			if(contextmenu){
				if(!this.isSelected)
					if(this.isClickable)
						callback();
					else
						this.isClickable = true;
			}
			else
				callback();
		} 
	});
	
	el.addEventListener("mouseover", function(){
		if(contextmenu){
			if(!this.isSelected){
				this.className = "tb_element_hover";
				spanCtx.className = "tb_context_dropdown_hover";
			}
		}else{
			this.className = "tb_element_hover";
		}
	});
	el.addEventListener("mouseout", function(){
		if(contextmenu){
			if(!this.isSelected){
				this.className = "tb_element";
				spanCtx.className = "tb_context_dropdown";
			}
			this.isClickable = true;
		}
		else{
			this.className = "tb_element";
		}
	});
	
	this.DOM.appendChild(el);
}

Toolbar.prototype.addSeparator = function(){
	//create DOM element
	var el = document.createElement("div");
	el.className = "tb_separator";

	var element = {
		type : "separator",
		DOM: el
	}
	
	//add the element into the array
	this.elements.push(element);
	
	this.DOM.appendChild(el);
}