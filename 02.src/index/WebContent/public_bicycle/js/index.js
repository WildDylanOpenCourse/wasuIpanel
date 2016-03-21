// JScript source code
var list_Pos = 0;
var area_Pos = 0;
var flag = 0;
//init
function init() {
		$(".list_" + list_Pos).addClass('active');
		$(".map").css({
			'background': 'url(img/map_' + list_Pos + '.png)'
		});
		$(".list" + flag).css({
			'visibility': 'visible'
		});
		$(".tiao").css({
			'background': 'url(img/tiao_' + flag + '.png)'
		});
	}
	//doctor_list_pos

function list_focus(__num) {
	if (__num == 1) {
		if (flag < 9) {
			if (list_Pos % 8 >= 0 || list_Pos % 8 <= 7) {
				if (list_Pos % 8 == 7) {
					$(".list_" + list_Pos).removeClass('active');
					$(".list" + flag).css({
						'visibility': 'hidden'
					});
					flag++;
					$(".tiao").css({
						'background': 'url(img/tiao_' + flag + '.png)'
					});
					list_Pos = list_Pos + __num;
					$(".list" + flag).css({
						'visibility': 'visible'
					});
					$(".list_" + list_Pos).addClass('active');
					$(".map").css({
						'background': 'url(img/map_' + list_Pos + '.png)'
					})
				} else if (list_Pos == 70) {
					$(".list_" + list_Pos).removeClass('active');
					$(".list" + flag).css({
						'visibility': 'hidden'
					});
					flag = 0;
					$(".tiao").css({
						'background': 'url(img/tiao_' + flag + '.png)'
					});
					list_Pos = 0;
					$(".list" + flag).css({
						'visibility': 'visible'
					});
					$(".list_" + list_Pos).addClass('active');
					$(".map").css({
						'background': 'url(img/map_' + list_Pos + '.png)'
					})
				} else {
					$(".list_" + list_Pos).removeClass('active');
					list_Pos = list_Pos + __num;
					$(".list_" + list_Pos).addClass('active');
					$(".map").css({
						'background': 'url(img/map_' + list_Pos + '.png)'
					})
				}
			}
		}
	} else if (__num == -1) {
		if (flag >= 0) {
			if (list_Pos % 8 >= 0 || list_Pos % 8 <= 7) {
				if (list_Pos == 0) {
					$(".list_" + list_Pos).removeClass('active');
					$(".list" + flag).css({
						'visibility': 'hidden'
					});
					flag = 8;
					$(".tiao").css({
						'background': 'url(img/tiao_' + flag + '.png)'
					});
					list_Pos = 70;
					$(".list" + flag).css({
						'visibility': 'visible'
					});
					$(".list_" + list_Pos).addClass('active');
					$(".map").css({
						'background': 'url(img/map_' + list_Pos + '.png)'
					})
				} else if (list_Pos % 8 == 0) {
					$(".list_" + list_Pos).removeClass('active');
					$(".list" + flag).css({
						'visibility': 'hidden'
					});
					flag--;
					$(".tiao").css({
						'background': 'url(img/tiao_' + flag + '.png)'
					});
					list_Pos = list_Pos + __num;
					$(".list" + flag).css({
						'visibility': 'visible'
					});
					$(".list_" + list_Pos).addClass('active');
					$(".map").css({
						'background': 'url(img/map_' + list_Pos + '.png)'
					})
				} else {
					$(".list_" + list_Pos).removeClass('active');
					list_Pos = list_Pos + __num;
					$(".list_" + list_Pos).addClass('active');
					$(".map").css({
						'background': 'url(img/map_' + list_Pos + '.png)'
					})
				}
			}
		}
	}
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
			if (area_Pos == 0) {
				list_focus(-1);
			}
			return 0;
			break;
			//down     
		case 2:
		case 40:
		case 31:
		case 270:
			if (area_Pos == 0) {
				list_focus(1);
			}
			return 0;
			break;
		case 3: //left
		case 37:
		case 29:
		case 271:
			if (area_Pos == 1) {
				$(".btn_black").removeClass("active");
				$(".list_" + list_Pos).addClass('active');
				area_Pos--;
			}
			return 0;
			break;
			//right     
		case 4:
		case 30:
		case 272:
		case 39:
			if (area_Pos == 0) {
				$(".list_" + list_Pos).removeClass('active');
				$(".btn_black").addClass("active");
				area_Pos++;
			}
			return 0;
			break;
		case 13: //enter
			if (area_Pos == 1) {
				location.href = '../index.html?tag=5';
			}
			return 0;
			break;
		case 832: //f1
			return 0;
			break;
		case 340: //back
			location.href = '../index.html?tag=5';
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