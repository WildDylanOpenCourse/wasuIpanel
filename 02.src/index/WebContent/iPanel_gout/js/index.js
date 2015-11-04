// JScript source code
var pos = 0;
function $(id) {
    return document.getElementById(id);
}

document.onkeydown = grabEvent;
document.onirkeypres = grabEvent;

function init(){
	//init
	$("focus").style.left = "283px";
}

function grabEvent() {
    var key_code = event.which != undefined ? event.which : event.keyCode;
	var _focus = $("focus");
    switch (key_code) {
        //up     
        case 1:
        case 28:
        case 269:
        case 38:
            return 0;
            break;
        //down     
        case 2:
        case 40:
        case 31:
        case 270:
            return 0;
            break;
        case 3: //left
        case 37:
        case 29:
        case 271:
        	_focus.style.left = '283px';
        	pos = pos - 1;
            return 0;
            break;
        //right     
        case 4:
        case 30:
        case 272:
        case 39:
        	_focus.style.left = '703px';
        	pos = pos + 1;
            return 0;
            break;
        case 13: //enter
        	if(pos == 0){
        		location.href="ship.html"
        	}else{
        		location.href="http://www.sina.com/"
        	}
            return 0;
            break;
        case 832: //f1
            return 0;
            break;
        case 340: //back
            return 0;
            break;
        case 372: //上一页
        case 105:
            return 0;
            break;
        case 373: //下一页
        case 99:
            return 0;
            break;
    }
}