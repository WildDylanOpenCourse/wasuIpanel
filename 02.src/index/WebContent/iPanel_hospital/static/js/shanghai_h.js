// JScript source code
var list_Pos = 0;

function init() {
	$(".tb_0").css({
		'visibility': 'visible'
	});
	$(".goback").addClass('active');
}

function change_class(c1, c2) {
	$("." + c1 + "").removeClass("active");
	$("." + c2 + "").addClass("active");
}
document.onkeydown = grabEvent;
document.onirkeypres = grabEvent;

function grabEvent() {
	var key_code = event.which != undefined ? event.which : event.keyCode;
	switch (key_code) {
		//up     
		case 1:
		case 28:
		case 269:
		case 38:
			if (list_Pos == 1) {
				change_class('pre_btn', 'goback');
				list_Pos = 0;
			} else if (list_Pos == 2) {
				change_class('next_btn', 'goback');
				list_Pos = 0;
			}
			return 0;
			break;
			//down     
		case 2:
		case 40:
		case 31:
		case 270:
			if (list_Pos == 0) {
				change_class('goback', 'pre_btn');
				list_Pos = 1;
			}
			return 0;
			break;
		case 3: //left
		case 37:
		case 29:
		case 271:
			if (list_Pos == 1) {
				change_class('pre_btn', 'goback');
				list_Pos = 0;
			} else if (list_Pos == 2) {
				change_class('next_btn', 'pre_btn');
				list_Pos = 1;
			}
			return 0;
			break;
			//right     
		case 4:
		case 30:
		case 272:
		case 39:
			if (list_Pos == 1) {
				change_class('pre_btn', 'next_btn');
				list_Pos = 2;
			} else if (list_Pos == 0) {
				change_class('goback', 'pre_btn');
				list_Pos = 1;
			}
			return 0;
			break;
		case 13: //enter
			if (list_Pos == 0) {
				location.href = '../index.html?3';
			} else if (list_Pos == 1) {
				$(".tb_0").css({
					'visibility': 'visible'
				});
				$(".tb_1").css({
					'visibility': 'hidden'
				});
			} else if (list_Pos == 2) {
				$(".tb_0").css({
					'visibility': 'hidden'
				});
				$(".tb_1").css({
					'visibility': 'visible'
				});
			}
			return 0;
			break;
		case 832: //f1
			return 0;
			break;
		case 340: //back
			location.href = '../index.html?3';
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