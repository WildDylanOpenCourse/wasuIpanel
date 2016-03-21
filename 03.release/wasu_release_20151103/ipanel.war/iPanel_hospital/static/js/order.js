// JScript source code
var pos = 0;
var pos2 = 0;
var panel = 0;

var returnURL = ""; //返回主页面的地址

document.onkeydown = grabEvent;
document.onirkeypres = grabEvent;

function init() {
	// 从URL中取参数的个数
	var length = location.href.split("?").length;
	// 没有参数的情况
	if(1 == length) {
		returnURL = "../index.html?tag=3";
	// 有参数的情况
	} else {
		// 从URL中取得返回主页面的地址
		returnURL = getParamString(location.href, "returnURL");
	}
}

//从URL中取得特定参数
function getParamString(url,paramName){
	var result = new RegExp("(^|)"+paramName+"=([^\&]*)(\&|$)","gi").exec(url),param;
	console.log(result);
	if(param=result){
		return param[2];
	}
	return "";
}

function grabEvent() {
	var key_code = event.which != undefined ? event.which : event.keyCode;
	var _ks_li = $("#ks1").find("li");
	var _ks2_li = $("#ks2").find("li");
	var _ks1 = $("#ks1");
	var _ks2 = $("#ks2");
	var _back = $(".index_back")
	switch (key_code) {
		//up	 
		case 1:
		case 28:
		case 269:
		case 38:
		if(panel == 0){
			if(pos > 4){
				_ks_li.eq(pos).removeClass("active");
				pos -= 5;
				_ks_li.eq(pos).addClass("active");
			}else if(pos < 5){
				_back.addClass("active");
				_ks1.find(".active").removeClass("active");
				pos = 1111;
			}
		}else if(panel == 1){
			if(pos2 > 4){
				_ks2_li.eq(pos2).removeClass("active");
				pos2 -= 5;
				_ks2_li.eq(pos2).addClass("active");
			}else if(pos2 < 5){
				_ks2.hide();
				_ks2_li.eq(pos2).removeClass("active");
				pos2 = 0;
				pos = 44;
				_ks1.show();
				_ks_li.eq(pos).addClass("active");
				panel = 0;
			}
		}
			return 0;
			break;
		//down	 
		case 2:
		case 40:
		case 31:
		case 270:
		if(panel == 0){
			if(pos < 40){
				_ks_li.eq(pos).removeClass("active");
				pos += 5;
				_ks_li.eq(pos).addClass("active");
			}else if(pos > 39 && pos < 45){
				_ks1.hide();
				_ks_li.eq(pos).removeClass("active");
				_ks2.show();
				_ks2_li.eq(pos2).addClass("active");
				panel = 1;
			}else if(pos == 1111){
				_back.removeClass("active");
				_ks1.find("li").eq(0).addClass("active");
				pos = 0
			}
		}else if(panel == 1){
			if(pos2 < 36){
				_ks2_li.eq(pos2).removeClass("active");
				pos2 += 5;
				_ks2_li.eq(pos2).addClass("active");
			}
		}
			return 0;
			break;
		case 3: //left
		case 37:
		case 29:
		case 271:
		if(panel == 0){
			if(pos != 0){
				_ks_li.eq(pos).removeClass("active");
				pos -= 1;
				_ks_li.eq(pos).addClass("active");
			}
		}else if(panel == 1){
			if(pos2 != 0){
				_ks2_li.eq(pos2).removeClass("active");
				pos2 -= 1;
				_ks2_li.eq(pos2).addClass("active");
			}else if(pos2 == 0){
				_ks2_li.eq(pos2).removeClass("active");
				_ks2.hide();
				_ks1.show();
				pos = 44;
				_ks_li.eq(pos).addClass("active");
				panel = 0;
			}
		}
			return 0;
			break;
		//right	 
		case 4:
		case 30:
		case 272:
		case 39:
		if(panel ==0){
			if(pos == 44){
				_ks1.hide();
				_ks_li.eq(pos).removeClass("active");
				_ks2.show();
				panel = 1;
			}else{
				_ks_li.eq(pos).removeClass("active");
				pos += 1;
				_ks_li.eq(pos).addClass("active");
			}
		}else if(panel == 1){
			if(pos2 < 40){
				_ks2_li.eq(pos2).removeClass("active");
				pos2 += 1;
				_ks2_li.eq(pos2).addClass("active");
			}
		}
			return 0;
			break;
		case 13: //enter
			if(panel == 0 && pos != 1111){
				var did = _ks1.find('.active').find('span').text();
				location.href = 'doctor.html?deptId='+ did +'&returnURL='+returnURL;
			}else{
				var did = _ks2.find('.active').find('span').text();
				location.href = 'doctor.html?deptId='+ did +'&returnURL='+returnURL;
			}
			if(pos == 1111){
				location.href = returnURL;//'../index.html?3';
			}
			return 0;
			break;
		case 832: //f1
			return 0;
			break;
		case 340: //back
			location.href = returnURL;//'../index.html?3';
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