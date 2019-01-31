 
var $ = function( id ) { return document.getElementById( id ); };

function getExtension(filename){
	return filename.substr(filename.lastIndexOf('.') + 1).toLowerCase();
}

function getDateString(separator) {

	var currentdate = new Date(); 
	return currentdate.getDate() + separator
		+ (currentdate.getMonth()+1)  + separator
		+ currentdate.getFullYear() + separator  
		+ currentdate.getHours() + separator 
		+ currentdate.getMinutes() + separator
		+ currentdate.getSeconds();		
}

function getBase64Image(img) {
    var canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;

    var ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0);

    var dataURL = canvas.toDataURL("image/png");
    return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
}

function SetDivSize(div, x, y, width, height) {
	div.style.left = x + "px";
	div.style.top = y + "px";
	div.style.width = width + "px";
	div.style.height = height + "px";
}
 
 
 
function CropImage (img, offsetX, offsetY, width, height) { 
  var buffer = document.createElement('canvas');
  var b_ctx = buffer.getContext('2d'); 
  buffer.width = width;
  buffer.height = height;
 
  b_ctx.drawImage(img, offsetX, offsetY, width, height,
                  0, 0, buffer.width, buffer.height);
  var img = new Image();
  img.src = buffer.toDataURL(); 
  img.width = width;
  img.height = height;
  return img;
};



Math.clamp = function(x, min, max) {
    return x < min ? min : (x > max ? max : x);
};

function choose(elements) {
	return elements[Math.floor(Math.random() *  elements.length)];
}

const TO_DEG = 180 / Math.PI;
const TO_RAD = Math.PI / 180;
const PI2 = Math.PI / 2;

function distance(x1, y1, x2, y2){ 
	return Math.sqrt((x2-x1)*(x2-x1) + (y2-y1)*(y2-y1));
}

function directionDeg(x1, y1, x2, y2) {
   return (Math.atan2(y1 - y2, x2 - x1) * TO_DEG + 360 ) % 360;
}

function direction(x1, y1, x2, y2) {
   return Math.atan2(y1 - y2, x2 - x1);
}

// public method for encoding an Uint8Array to base64
function toBase64 (input) {
    var keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
    var output = "";
    var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
    var i = 0;

    while (i < input.length) {
        chr1 = input[i++];
        chr2 = i < input.length ? input[i++] : Number.NaN; // Not sure if the index 
        chr3 = i < input.length ? input[i++] : Number.NaN; // checks are needed here

        enc1 = chr1 >> 2;
        enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
        enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
        enc4 = chr3 & 63;

        if (isNaN(chr2)) {
            enc3 = enc4 = 64;
        } else if (isNaN(chr3)) {
            enc4 = 64;
        }
        output += keyStr.charAt(enc1) + keyStr.charAt(enc2) +
                  keyStr.charAt(enc3) + keyStr.charAt(enc4);
    }
    return output;
}



// window.requestAnimFrame = (function(callback) {
	// return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame ||
	// function(callback) {
	  // window.setTimeout(callback, 1000 / 60);
	// };
// })();


// getComputedStylePropertyValue
(function preloadedFunctions(){
    // Preseted methods.
    if(window.getComputedStyle){
        window.getComputedStylePropertyValue = function(element, prop){
            var computedStyle = window.getComputedStyle(element, null);
            if(!computedStyle) return null;
            if(computedStyle.getPropertyValue) {
                return computedStyle.getPropertyValue(prop);
            } else if (computedStyle.getAttribute) {
                return computedStyle.getAttribute(prop);
            } else if(computedStyle[prop]) {
                return computedStyle[prop];
            };
        };
    }
    // jQuery JavaScript Library v1.9.0
    // http://www.minhacienda.gov.co/portal/pls/portal/PORTAL.wwsbr_imt_services.GenericView?p_docname=6240612.JS&p_type=DOC&p_viewservice=VAHWSTH&p_searchstring=
    // For IE8 or less
    else if ( document.documentElement.currentStyle ) {
        var rnumnonpx = new RegExp( "^(" + core_pnum + ")(?!px)[a-z%]+$", "i" ),
        rposition = /^(top|right|bottom|left)$/,
        core_pnum = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source;
        window.getComputedStylePropertyValue = function(element, prop){
            var left, rsLeft,
            ret = element.currentStyle && element.currentStyle[ prop ],
            style = element.style;

            if ( ret == null && style && style[ prop ] ) {
                ret = style[ prop ];
            }
            if ( rnumnonpx.test( ret ) && !rposition.test( prop ) ) {
                left = style.left;
                rsLeft = element.runtimeStyle && element.runtimeStyle.left;
                if ( rsLeft ) {
                    element.runtimeStyle.left = element.currentStyle.left;
                }
                style.left = prop === "fontSize" ? "1em" : ret;
                ret = style.pixelLeft + "px";
                style.left = left;
                if ( rsLeft ) {
                    element.runtimeStyle.left = rsLeft;
                }
            }
            return ret === "" ? "auto" : ret;
        };
    };
})();
