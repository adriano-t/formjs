 
function Treeview(name){
	this.formType = "treeview";
	this.root = new TreeNode("root");
	this.DOM = document.createElement("div");
	this.DOM.className = "tv_div";
	this.DOM.addEventListener("contextmenu", function(event){ 
		event.preventDefault();
		event.stopPropagation();
		return false;
	}, false);
	this.instanced = false;
	this.dragElement = null;
	
	
	this.DOM.addEventListener("dragover", function( event ) {
		event.preventDefault();
	}, false);
			
}

Treeview.prototype.populate = function(){
	//clear
	if(this.instanced)
		return;
	var ul = document.createElement("ul");
	this.root.ul = ul;
	this.DOM.appendChild(ul);
	
	//instance nodes
	this.recursiveInstance(this.root, true);
	
	this.instanced = true;
}

Treeview.prototype.recursiveInstance = function(node){
	if(node.childs.length > 0){		
		for(var i = 0; i < node.childs.length; i++){
			var childNode = node.childs[i];
			childNode.treeview = this;
			var li = document.createElement("li");
			li.addEventListener("mouseover", function(){
				this.className = "tv_li_over";
			}, false);
			
			li.addEventListener("mouseout", function(){
				if(this.node.selected)
					this.className = "tv_li_selected";
				else
					this.className = "tv_li";
			}, false);
			
			li.className = "tv_li";
			childNode.li = li;
			li.node = childNode;
			node.ul.appendChild(li);
			
			//update UL
			childNode.updateUL(childNode.childs.length > 0);
			
			
			if(childNode.contextmenu){
				li.addEventListener("contextmenu", function(e){
					this.node.contextmenu.show(e.pageX, e.pageY);
				}, false);
			}
			
			//select node
			li.addEventListener("click", function(){ 
				this.node.treeview.select(this.node);
			}, false);
			
			//drag & drop
			if(childNode.draggable){
				li.setAttribute("draggable", true);
				li.addEventListener("dragstart", function(event){
					event.dataTransfer.setData("Text", event.target.id);
					this.node.treeview.dragged = this.node;
				});				
			}
			
			
			li.addEventListener("drop", function( event ) {
				event.preventDefault();
				var dragged = this.node.treeview.dragged; 
				var target = event.target.node;  
				//check HierarchyRequestError
				if(dragged != target && !FormJS.isChild(dragged.ul, target.li)){
					if(dragged.getParentLocked() == target.getParentLocked()){
						dragged.parent.removeChild(dragged);
						
						if(target.isDirectory){ //folder
							if(!target.ul){ 
								target.updateUL(true);
							}
							target.addChild(dragged);
						}
						else{ //file
							target.parent.insertChild(dragged, target);
						}
						
					}
				}
			}, false);
			
			
			//icon
			var iconSpan = document.createElement("span");
			iconSpan.className = "tv_icon";
			iconSpan.node = childNode;
			if(childNode.icon) 
				childNode.icon.set(iconSpan); 
			
			li.appendChild(iconSpan);
			childNode.iconSpan = iconSpan;
			
			var textSpan = document.createElement("span");
			textSpan.className = "tv_text";
			textSpan.node = childNode;
			textSpan.innerHTML = childNode.text;
			li.appendChild(textSpan);
			childNode.textSpan = textSpan;
			 
			this.recursiveInstance(node.childs[i]);
			
		}
	}
}


Treeview.prototype.removeAll = function(){
	this.root.destroyChilds();
}

Treeview.prototype.expand = function(level){
	if(level === undefined){
		//collapse all
	}
} 

Treeview.prototype.expand = function(level){
	if(level === undefined){
		//collapse all
	}
} 

Treeview.prototype.collapse = function(level){
	if(level === undefined){
		//collapse all
	}
} 

Treeview.prototype.select = function(node){
	if(this.selectedNode){
		this.selectedNode.li.className = "tv_li";
		this.selectedNode.selected = false;
	}
	this.selectedNode = node;
	node.li.className = "tv_li_selected";
	node.selected = true;
} 


TreeNode.prototype.destroyChilds = function(){
	for(var i = 0; i < this.childs.length; i++){
		this.childs[i].destroyChilds();
	}
	this.updateUL(false);
}


function TreeNode(text, icon, draggable, contextmenu){
	this.elementType = "node";
	this.childs = [];
	this.isDirectory = false;
	this.parent = parent;	
	this.contextmenu = contextmenu;
	this.ul = null;
	this.text = text;
	this.icon = icon;
	this.selected = false;
	this.open = false;
	this.treeview = null;
	this.draggable = draggable;
	this.parent = null;
	this.locked = false;
}

TreeNode.prototype.addChild = function(node){
	this.isDirectory = true;
	this.childs.push(node);
	node.parent = this;
	
	if(this.treeview && this.treeview.instanced)
		if(this.ul){		
			this.ul.appendChild(node.li);
			if(node.ul)
				this.ul.appendChild(node.ul);
		}
	
}
 

TreeNode.prototype.insertChild = function(node, after){
	this.isDirectory = true;
	this.childs.splice(this.childs.indexOf(after)+1, 0, node);
	node.parent = this;
	
	
	if(this.treeview && this.treeview.instanced)
	{
		if(node.ul)
			after.li.parentNode.insertBefore(node.ul, after.li.nextSibling);
		after.li.parentNode.insertBefore(node.li, after.li.nextSibling);
	}
}

TreeNode.prototype.getParentLocked = function(){
	if(this.locked)
		return this;
	var parent = this.parent;
	while (parent) {
		if (parent.locked) {
			return parent;
		}
		parent = parent.parent;
	}
	return null;
}

TreeNode.prototype.removeChild = function(node){ 
	this.childs.splice(this.childs.indexOf(node), 1);
	
	if(this.treeview && this.treeview.instanced){
		if(node.ul)
			node.li.parentNode.removeChild(node.ul);
		node.li.parentNode.removeChild(node.li);
		
		if(this.childs.length == 0){
			this.updateUL(false);
		}
	}
}
TreeNode.prototype.removeChildIndex = function(index){
	this.childs.splice(index, 1);
}


TreeNode.prototype.isChild = function(node){
	return (this.childs.indexOf(node) != -1);
}

TreeNode.prototype.setOpen = function(open){
	if(open != this.open){
		this.open = open;
		if(this.open){
			if(this.childs.length > 0){
				this.ul.style.display = "block";
				this.arrowSpan.className = "tv_arrow_open";
			}
		}
		else{
			this.ul.style.display = "none";
			this.arrowSpan.className = "tv_arrow_closed";
		}
	}
}


TreeNode.prototype.updateUL = function(hasChilds){ 
	var parent = this.parent.ul;
	
	if(this.arrowSpan)
		this.li.removeChild(this.arrowSpan);
			
	if(hasChilds){
		var ul = document.createElement("ul");
		ul.style.display = "none";
		this.ul = ul;
		ul.className = "tv_ul"; 
		parent.insertBefore(ul, this.li.nextSibling);
		
		var arrowSpan = document.createElement("span");
		arrowSpan.className = "tv_arrow_closed";
		arrowSpan.node = this;
		this.li.insertBefore(arrowSpan, this.li.firstChild);
		
		this.arrowSpan = arrowSpan;
		arrowSpan.addEventListener("click", function(){
			this.node.setOpen(!this.node.open); //toggle
		}, false);

		this.li.addEventListener("dblclick", function(){
			this.node.setOpen(!this.node.open); //toggle
		}, false);
	}
	else{
		if(this.ul){
			this.ul.parentNode.removeChild(this.ul);
			this.ul = null;
			this.childs = [];
		}
		var arrowSpan = document.createElement("span");
		arrowSpan.className = "tv_empty";
		arrowSpan.node = this;
		this.li.insertBefore(arrowSpan, this.li.firstChild);
		this.arrowSpan = arrowSpan; 
	}
}
 


