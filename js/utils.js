
FormUtils = {
	isElement : function(obj) {
	  try {
		return obj instanceof HTMLElement;
	  }
	  catch(e){
		return (typeof obj==="object") &&
		  (obj.nodeType===1) && (typeof obj.style === "object") &&
		  (typeof obj.ownerDocument ==="object");
	  }
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
	
	isChild : function(parent, child) {
		var node = child.parentNode;
		while (node != null) {
			if (node == parent) {
				return true;
			}
			node = node.parentNode;
		}
		return false;
	}
}

