// JScript source code
var pos = 0;

document.onkeydown = grabEvent;
document.onirkeypres = grabEvent;

function grabEvent() {
	var key_code = event.which != undefined ? event.which : event.keyCode;
	var _zsyy = $(".zsyy");
		_back = $(".index_back")
	switch (key_code) {
		//up	 
		case 1:
		case 28:
		case 269:
		case 38:
			_zsyy.removeClass('active');
			_back.addClass('active');
			pos = 1;
			return 0;
			break;
		//down	 
		case 2:
		case 40:
		case 31:
		case 270:
			_zsyy.addClass('active');
			_back.removeClass('active');
			pos = 0;
			return 0;
			break;
		case 3: //left
		case 37:
		case 29:
		case 271:
			return 0;
			break;
		//right	 
		case 4:
		case 30:
		case 272:
		case 39:
			return 0;
			break;
		case 13: //enter
			if(pos == 0){
				location.href = 'order.html'
			}else{
				location.href = '../index.html?3';
			}
			return 0;
			break;
		case 832: //f1
			return 0;
			break;
		case 340: //back
			if(pos == 2) {
				location.href = '../index.html?3';
			}
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