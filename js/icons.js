 
function Icon(i, j) {
	this.x = i * this.size.w;
	this.y = j * this.size.h;			
}

Icon.prototype.path = "res/icons.png";
Icon.prototype.size = {w: 16, h:16};

Icon.prototype.set = function(element) {
	element.style.backgroundPosition = (-this.x) + "px " + (-this.y) + "px ";
	element.style.width = this.size.w + "px";
	element.style.height = this.size.h + "px";
	element.style.backgroundImage="url('" + this.path + "')"
}

//8 per row
icon_plus = new Icon(0, 0);
icon_arrow_down = new Icon(1, 0);
icon_arrow_left = new Icon(2, 0);
icon_arrow_right = new Icon(3, 0);
icon_arrow_up = new Icon(4, 0);
icon_copy = new Icon(5, 0);
icon_cut = new Icon(6, 0);
icon_cut2 = new Icon(7, 0);

icon_newfile = new Icon(0, 1);
icon_folder_open = new Icon(1, 1);
icon_folder_closed = new Icon(2, 1);
icon_arrows_lr = new Icon(3, 1);
icon_arrows_lrtb = new Icon(4, 1);
icon_addfile = new Icon(5, 1);
icon_loop = new Icon(6, 1); 
icon_rectselection = new Icon(7, 1);

icon_sortsize = new Icon(0, 2);
icon_sortname = new Icon(1, 2);
icon_folder_open2 = new Icon(2, 2);
icon_folder_closed2 = new Icon(3, 2);
icon_paste = new Icon(4, 2);
icon_save = new Icon(5, 2);
icon_rectselection2 = new Icon(6, 2);
icon_newfile2 = new Icon(7, 2);

icon_redo = new Icon(0, 3);
icon_undo = new Icon(1, 3);