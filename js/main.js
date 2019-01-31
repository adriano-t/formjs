

window.addEventListener('load', function() {
  App.start();
}, true);


App = { 
	start : function(){
			//create all elements
			//Get the div element
		var divWorkspace = document.getElementById("workspace");
		var divToolbar = document.getElementById("toolbar");
		

		
		
		
		/********************************
		******** Context menu 1 *********
		********************************/
		var submenu2 = new Contextmenu();
		submenu2.addElement(icon_plus , "Add", function(){
			alert("Added!");
		});
		submenu2.addSeparator();
		submenu2.addElement(icon_arrow_down, "Move Down", function(){
			alert("Moved Down!");
		});
		
		
		/********************************
		******** Context menu 2 *********
		********************************/
		var submenu = new Contextmenu();
		submenu.addElement( icon_newfile, "Show Document", function(){});
		
		/********************************
		******** Context menu 3 *********
		********************************/
		var mainmenu = new Contextmenu();
		
		mainmenu.addElement(icon_newfile  , "View file",function(){
		
		}, submenu);
		mainmenu.addElement(icon_paste, "Paste", function(){
		
		});
		mainmenu.addElement(icon_arrows_lrtb, "Move Bone", function(){
		
		});
		mainmenu.addElement(icon_arrows_lr, "Scale Bone", function(){
		
		});
		
		mainmenu.addElement(icon_copy, "Copy", function(){
		
		});
		
		
		
		/********************************
		********* Toolbar Test **********
		********************************/

		var toolbar = new Toolbar();

		//add an element
		toolbar.addElement(
			"",		 //icon
			"File",  //text
			null,	 //onclick function
			mainmenu //context menu
		);
		
		toolbar.addElement(
			icon_folder_closed2,
			"Load",
			function(){}
		);
			
		//toolbar separator
		toolbar.addSeparator();
		
		toolbar.addElement(
			icon_save,
			"Save",
			function(){ alert("Clicked Save!");},
			submenu2
		);
		
		toolbar.addElement(
			icon_rectselection2,
			"Select",
			function(){}
		);
		
		toolbar.addSeparator();
		
		
		//only icons
		toolbar.addElement( icon_loop, "",
			function(){}
		);
		toolbar.addElement( icon_folder_closed2, "",
			function(){}
		);
		
		divToolbar.appendChild(toolbar.DOM);
		
		
		
		/********************************
		******** Treeview Test **********
		********************************/
		
		tree = new Treeview();
		
		images = [icon_newfile, icon_addfile, icon_paste];
		names = ["spr_scarpallaccia", "spr_antani",  "spr_tapioco",  "spr_tarapia",  "spr_prematurata",  "spr_allacciascarpa"];
		folders = ["Animations", "Sprites",  "Rooms",  "Backgrounds",  "Sounds",  "Settings"];
		groups = ["Group", "Player",  "Glare", "Old",  "Temp",  "Mascetti"];
		
		for(var i=0; i< 5; i++){
			var node = new TreeNode(choose(folders), icon_folder_closed2);
			
			for(var j=0; j< 5; j++){
				var node2 = new TreeNode(choose(groups), icon_folder_closed2, true);
				
				for(var k=0; k< 5; k++){
					var node3 = new TreeNode(choose(names), choose(images) , true, mainmenu);
					node2.addChild(node3);
				}
			
				node.addChild(node2);
			}
			tree.root.addChild(node);
			node.locked = true;
		}
		
		tree.populate();
		tree.DOM.style.width = "150px";
		tree.DOM.style.height = "300px";
		
		
		/********************************
		********** Window Test **********
		********************************/
		  
		var elem = document.getElementById("test_window");
		elem.style.visibility = "visible";
		win1 = new WindowJS(elem, "Window with cofandina", [true, true, true]);
			
		
		win2 = new WindowJS(null, null, [false, false, true]); 
		win2.setPosition(200, 90);
		//win2.DOMBody.appendChild(tree.DOM);
		
		splitview1 = new SplitView("vertical", 20);
		
		win2.DOMBody.appendChild(splitview1.DOM)
	},
}