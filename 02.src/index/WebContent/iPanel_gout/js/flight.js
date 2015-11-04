// JScript source code
document.onkeydown = grabEvent;
document.onirkeypres = grabEvent;
var list_Pos = 1;
var area_Pos = 5;
var day_Pos = 3; //起始星期几
var dropdown_Pos = 0;
var dropdown_Pos_1 = 0

var daydelay = 0; //当天开始延后的天数
var max_flight_num = 10; //每页最大显示航班数

function init() {
	//从后台取当前的星期数
	getNowDayOfWeek()
}

//设置页面时间部分数据
function setweekday() {

	if (day_Pos == 7) {
		setday('周一', '周二', '周三', '周四', '周五', '周六', '周日')
	} else if (day_Pos == 1) {
		setday('周二', '周三', '周四', '周五', '周六', '周日', '周一')
	} else if (day_Pos == 2) {
		setday('周三', '周四', '周五', '周六', '周日', '周一', '周二')
	} else if (day_Pos == 3) {
		setday('周四', '周五', '周六', '周日', '周一', '周二', '周三')
	} else if (day_Pos == 4) {
		setday('周五', '周六', '周日', '周一', '周二', '周三', '周四')
	} else if (day_Pos == 5) {
		setday('周六', '周日', '周一', '周二', '周三', '周四', '周五')
	} else if (day_Pos == 6) {
		setday('周日', '周一', '周二', '周三', '周四', '周五', '周六')
	}
}

function setday(one, two, three, four, five, six, seven) {
	$('.train-day').append(
		'<div class="train_d_0">' + one +
		'</div><div class="train_d_1">' + two +
		'</div><div class="train_d_2">' + three +
		'</div><div class="train_d_3">' + four +
		'</div><div class="train_d_4">' + five +
		'</div><div class="train_d_5">' + six +
		'</div><div class="train_d_6">' + seven +
		'</div>')
}

//从后台取当前的星期数
function getNowDayOfWeek() {
	
	$.ajax({
		type:"POST",
		url:flight_url,
		data:{call:"getdayofweek"},
		cache:false,
		dataType:"json",
		success:function(data){
			//起始星期几
			day_Pos = data;
			//设置页面时间部分数据
			setweekday();
		}
	});
}

//从后台取航班信息
function getFlight() {
	//出发地
	var start = $(".start").text();
	//到达地
	var end = $(".end").text();
	//当天开始延后的天数  由于list_Pos的编号  需要-1才是正确的值
	//从后台取航班信息
	getFlightData(daydelay-1, start, end);
}

//从后台取航班信息
function getFlightData(daydelay, dep, arr) {
	
	$.ajax({
		type:"POST",
		url:flight_url,
		//传到后台的参数  其中出发地dep和到达地arr需要URLEncode编码
		data:{call:"getflightdata",
			  daydelay:daydelay,
			  depcity:encodeURI(dep),
			  arrcity:encodeURI(arr)},
		cache:false,
		dataType:"json",
		success:function(data){
			//解析后台传来的json格式的航班信息
			var flightDataList = eval("("+data+")");
			//填充航班信息
			setFlightData(flightDataList);
		}
	});
}

//填充航班信息
function setFlightData(flightDataList) {

	//从后台得到的航班信息数量
	var flight_num = flightDataList.length;
	//初始化设置整页都是空的航班信息
	setFullBlankData();
	//如果没有航班信息
	if(flight_num == 0) {
		//没有航班信息显示的消息
		$(".jc").eq(0).text("未查到您所需要的航班信息");
	} else {
		for(var index=0; index<max_flight_num; index++){
			//下标没有超过航班信息数量
			if(index < flight_num) {
				//航班号
				$(".hb").eq(index).
				    text(flightDataList[index].flightNO);
				//预计出发
				$(".s_time").eq(index).
				    text(flightDataList[index].planDptTime);
				//机场
				$(".jc").eq(index).
				    text(flightDataList[index].dptAirport +
                         " - " + 
                         flightDataList[index].arrAirport);
				//预计到达
				$(".e_time").eq(index).
				    text(flightDataList[index].planArrTime);
			}
		}
	}
}

//设置整页为空的航班信息
function setFullBlankData() {
	//航班号
	$(".hb").text(" ");
	//预计出发
	$(".s_time").text(" ");
	//机场
	$(".jc").text(" ");
	//预计到达
	$(".e_time").text(" ");		
}

//设置空的航班信息
function setBlankData(index) {
	//航班号
	$(".hb").eq(index).text(" ");
	//预计出发
	$(".s_time").eq(index).text(" ");
	//机场
	$(".jc").eq(index).text(" ");
	//预计到达
	$(".e_time").eq(index).text(" ");	
}

function grabEvent() {
	var key_code = event.which != undefined ? event.which : event.keyCode;
	switch (key_code) {
		//up     
		case 1:
		case 28:
		case 269:
		case 38:
			if (area_Pos == 5) {
				if (list_Pos == 1) {
					var start_txt = $(".start").html();
					if (start_txt != '舟山') {
						change_class_up('train_end_input', 'train_start_input');
						list_Pos--;
					}
				} else if (list_Pos == 2) {
					change_class_up_1('train_d_0');
				} else if (list_Pos == 3) {
					change_class_up_1('train_d_1');
				} else if (list_Pos == 4) {
					change_class_up_1('train_d_2');
				} else if (list_Pos == 5) {
					change_class_up_1('train_d_3');
				} else if (list_Pos == 6) {
					change_class_up_1('train_d_4');
				} else if (list_Pos == 7) {
					change_class_up_1('train_d_5');
				} else if (list_Pos == 8) {
					change_class_up_1('train_d_6');
				} else if (list_Pos == 9) {
					for (var d = 0; d <= 6; d++) {
						$(".train_d_" + d).removeClass("active");
					}
					change_class_up('train_back', 'train_d_0');
					list_Pos = 2;
					//设置传后台用的参数  星期几
					daydelay = list_Pos;
				} else if (list_Pos == 10) {
					for (var d = 0; d <= 6; d++) {
						$(".train_d_" + d).removeClass("active");
					}
					change_class_up('train_search', 'train_d_0');
					list_Pos = 2;
					//设置传后台用的参数  星期几
					daydelay = list_Pos;
				} else if (list_Pos == 11) {
					change_class_up('train_btn_0', 'train_back');
					list_Pos = 9;
				} else if (list_Pos == 13) {
					change_class_up('train_btn_2', 'train_search');
					list_Pos = 10;
				};
			} else if (area_Pos == 10) {
				dbroad_up();
			} else if (area_Pos == 11) {
				font_up();
			} else if (area_Pos == 41) {
				change_class_dropdownlist_1_up();
			}
			return 0;
			break;
			//down     
		case 2:
		case 40:
		case 31:
		case 270:
			if (area_Pos == 5) {
				if (list_Pos == 0) {
					change_class_up('train_start_input', 'train_d_0');
					list_Pos = 2;
				} else if (list_Pos == 1) {
					change_class_up('train_end_input', 'train_d_0');
					list_Pos++;
				} else if (list_Pos == 2) {
					change_class_up_2('train_search');
					//设置传后台用的参数  星期几
					daydelay = list_Pos;
					list_Pos = 10;
				} else if (list_Pos == 3) {
					change_class_up_2('train_search');
					//设置传后台用的参数  星期几
					daydelay = list_Pos;
					list_Pos = 10;
				} else if (list_Pos == 4) {
					change_class_up_2('train_search');
					//设置传后台用的参数  星期几
					daydelay = list_Pos;
					list_Pos = 10;
				} else if (list_Pos == 5) {
					change_class_up_2('train_search');
					//设置传后台用的参数  星期几
					daydelay = list_Pos;
					list_Pos = 10;
				} else if (list_Pos == 6) {
					change_class_up_2('train_search');
					//设置传后台用的参数  星期几
					daydelay = list_Pos;
					list_Pos = 10;
				} else if (list_Pos == 7) {
					change_class_up_2('train_search');
					//设置传后台用的参数  星期几
					daydelay = list_Pos;
					list_Pos = 10;
				} else if (list_Pos == 8) {
					change_class_up_2('train_search');
					// 设置传后台用的参数 延迟天数
					daydaley = list_Pos;
					list_Pos = 10;
				} else if (list_Pos == 2) {
					change_class_up_2('train_search');
					//设置传后台用的参数  星期几
					daydelay = list_Pos;
					list_Pos = 9;
				} else if (list_Pos == 9) {
					change_class_up('train_back', 'train_btn_0');
					list_Pos = 11;
				} else if (list_Pos == 10) {
					change_class_up('train_search', 'train_btn_2');
					list_Pos = 13;
				}
			} else if (area_Pos == 10) {
				dbroad_down();
			} else if (area_Pos == 11) {
				font_down();
			} else if (area_Pos == 41) {
				change_class_dropdownlist_1_down();
			}
			return 0;
			break;
			//left
		case 3:
		case 37:
		case 29:
		case 271:
			if (area_Pos == 5) {
				if (list_Pos == 2) {
					var end_txt = $(".end").html();
					if (end_txt == '舟山') {
						change_class_left('train_d_0', 'train_start_input');
						list_Pos = 0;
					} else {
						change_class_left('train_d_0', 'train_end_input');
						list_Pos == 1;
					}
				} else if (list_Pos == 8) {
					change_class_left2('train_d_6', 'train_d_5');
				} else if (list_Pos == 7) {
					change_class_left2('train_d_5', 'train_d_4');
				} else if (list_Pos == 6) {
					change_class_left2('train_d_4', 'train_d_3');
				} else if (list_Pos == 5) {
					change_class_left2('train_d_3', 'train_d_2');
				} else if (list_Pos == 4) {
					change_class_left2('train_d_2', 'train_d_1');
				} else if (list_Pos == 3) {
					change_class_left2('train_d_1', 'train_d_0');
				} else if (list_Pos == 10) {
					change_class_left('train_search', 'train_back');
				} else if (list_Pos == 9) {
					for (var d = 0; d <= 5; d++) {
						$(".train_d_" + d).removeClass("active");
						$(".train_d_" + d).css({
							'color' : '#4e4e4e'
						});
					}
					change_class_left('train_back', 'train_d_6');
				} else if (list_Pos == 11) {
					change_class_left('train_btn_0', 'train_search');
				} else if (list_Pos == 12) {
					change_class_left('train_btn_1', 'train_btn_0');
				} else if (list_Pos == 13) {
					change_class_left('train_btn_2', 'train_btn_1');
				} else if (list_Pos == 100) {
					var start_txt = $(".start").html();
					if (start_txt == '舟山') {
						change_class_left('change_p', 'train_end_input');
						list_Pos = 1;
					} else {
						change_class_left('change_p', 'train_start_input');
						list_Pos = 0;
					}
				}
			} else if (area_Pos == 10 || area_Pos == 11) {
				dbroad_focus(-1);
			} else if (area_Pos == 41) {
				change_class_dropdownlist_1(-1);
			}
			return 0;
			break;
			//right     
		case 4:
		case 30:
		case 272:
		case 39:
			if (area_Pos == 5) {
				if (list_Pos == 2) {
					change_class_right2('train_d_0', 'train_d_1');
				} else if (list_Pos == 3) {
					change_class_right2('train_d_1', 'train_d_2');
				} else if (list_Pos == 4) {
					change_class_right2('train_d_2', 'train_d_3');
				} else if (list_Pos == 5) {
					change_class_right2('train_d_3', 'train_d_4');
				} else if (list_Pos == 6) {
					change_class_right2('train_d_4', 'train_d_5');
				} else if (list_Pos == 7) {
					change_class_right2('train_d_5', 'train_d_6');
				} else if (list_Pos == 8) {
					$(".train_back").addClass("active");
					list_Pos++;
//					change_class_right('train_d_6', 'train_back');
				} else if (list_Pos == 9) {
					change_class_right('train_back', 'train_search');
				} else if (list_Pos == 10) {
					change_class_right('train_search', 'train_btn_0');
				} else if (list_Pos == 11) {
					change_class_right('train_btn_0', 'train_btn_1');
				} else if (list_Pos == 12) {
					change_class_right('train_btn_1', 'train_btn_2');
				} else if (list_Pos == 3) {
					change_class_right('train_day_input', 'train_back');
				} else if (list_Pos == 1) {
					change_class_right('train_end_input', 'change_p');
					list_Pos = 100;
				} else if (list_Pos == 0) {
					change_class_right('train_start_input', 'change_p');
					list_Pos = 100;
				}
			} else if (area_Pos == 10) {
				dbroad_focus(1);
			} else if (area_Pos == 11) {
				dbroad_focus(1);
			} else if (area_Pos == 41) {
				change_class_dropdownlist_1(1);
			}
			return 0;
			break;
			//enter
		case 13:
			if (area_Pos == 5) {
				if (list_Pos == 0) {
					$(".start_dropdownlist_1").show();
					area_Pos = 41;
				} else if (list_Pos == 1) {
					$(".start_dropdownlist_1").show();
					area_Pos = 41;
				} else if (list_Pos == 2) {
					$(".train_d_0").addClass("active");
					$(".train_search").addClass("active");
					//设置传后台用的参数  星期几
					daydelay = list_Pos;
					list_Pos = 10;
				} else if (list_Pos == 3) {
					$(".train_d_1").addClass("active");
					//设置传后台用的参数  星期几
					daydelay = list_Pos;
					list_Pos = 10;
					$(".train_search").addClass("active");
				} else if (list_Pos == 4) {
					$(".train_d_2").addClass("active");
					//设置传后台用的参数  星期几
					daydelay = list_Pos;
					list_Pos = 10;
					$(".train_search").addClass("active");
				} else if (list_Pos == 5) {
					$(".train_d_3").addClass("active");
					//设置传后台用的参数  星期几
					daydelay = list_Pos;
					list_Pos = 10;
					$(".train_search").addClass("active");
				} else if (list_Pos == 6) {
					$(".train_d_4").addClass("active");
					//设置传后台用的参数  星期几
					daydelay = list_Pos;
					list_Pos = 10;
					$(".train_search").addClass("active");
				} else if (list_Pos == 7) {
					$(".train_d_5").addClass("active");
					//设置传后台用的参数  星期几
					daydelay = list_Pos;
					list_Pos = 10;
					$(".train_search").addClass("active");
				} else if (list_Pos == 8) {
					$(".train_d_6").addClass("active");
					//设置传后台用的参数  星期几
					daydelay = list_Pos;
					list_Pos = 10;
					$(".train_search").addClass("active");
				} else if (list_Pos == 9) {
					location.href = '../index.html?2';
				//查询按钮按下
				} else if (list_Pos == 10) {
					$(".change_p").hide();
					//后台取航班信息
					getFlight();
					$(".train_popup").show();
					var start_detail = $(".start").html();
					$(".start_station").html(start_detail);
					list_Pos = 99; //弹出的查询记录 指针
				} else if (list_Pos == 11) {
					location.href = '../iPanel_gout/train.html';
					list_Pos++;
				} else if (list_Pos == 12) {
					location.href = '../iPanel_gout/ship.html';
					list_Pos++;
				} else if (list_Pos == 13) {
					location.href = '../iPanel_gout/bus.html';
					list_Pos++;
				} else if (list_Pos == 99) {
					$(".change_p").show();
					for (var i = 0; i <= 6; i++) {
						$(".train_d_" + i).removeClass("active");
					}
					$(".train_popup").hide();
					//返回查询页面     设置航班信息页面都是空的航班信息
					setFullBlankData();
					list_Pos = 10;
				} else if (list_Pos == 100) {
					var start_txt = $(".start").html();
					var end_txt = $(".end").html();
					if (start_txt == '舟山') {
						$(".start").html(end_txt);
						$(".end").html('舟山');
						$(".change_p").removeClass("active");
						$(".train_start_input").addClass("active");
						sfz_num = "";
						text_1 = "";
						list_Pos = 0;
					} else {
						$(".start").html('舟山');
						$(".end").html(start_txt);
						$(".change_p").removeClass("active");
						$(".train_end_input").addClass("active");
						sfz_num = "";
						text_1 = "";
						list_Pos = 1;
					}
					if (dropdown_Pos == 0) {
						dropdown_Pos = 1;
					} else {
						dropdown_Pos = 0;
					}
				}
			} else if (area_Pos == 10) {
				if (list_Pos == 0) {
					$(".pinyin").css({
						'visibility': 'visible'
					});
					dbroad_enter("start");
				} else if (list_Pos == 1) {
					$(".pinyin").css({
						'visibility': 'visible'
					});
					dbroad_enter("end");
				} else if (list_Pos == 2) {
					dbroad_enter("train_mouth_input");
				} else if (list_Pos == 3) {
					dbroad_enter("train_day_input");
				}
			} else if (area_Pos == 11) {
				if (font_Pos <= 35) {
					if (list_Pos == 0) {
						font_hidden("start");
					} else if (list_Pos == 1) {
						font_hidden("end");
					}
				} else if (font_Pos == 37) {
					font_show_page_next();
				} else if (font_Pos == 36) {
					font_show_page_previous();
				}
			} else if (area_Pos == 41) {
				if (dropdown_Pos == 0) {
					var dropdown_Pos_1_text = $('.items_1_' + dropdown_Pos_1).html();
					$('.end').html(dropdown_Pos_1_text);
					dropdownlist_hide();
				} else {
					var dropdown_Pos_1_text = $('.items_1_' + dropdown_Pos_1).html();
					$('.start').html(dropdown_Pos_1_text);
					dropdownlist_hide();
				}

			}
			return 0;
			break;
		case 832: //f1
			return 0;
			break;
		case 340: //back
		case 8:
			location.href = '../index.html?2';
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

function change_class_dropdownlist_1(__num) {
	if (__num == 1) {
		if (dropdown_Pos_1 < 29) {
			$('.items_1_' + dropdown_Pos_1).removeClass('active');
			dropdown_Pos_1 = dropdown_Pos_1 + __num;
			$('.items_1_' + dropdown_Pos_1).addClass('active');
		}
	} else if (__num == -1) {
		if (dropdown_Pos_1 > 0) {
			$('.items_1_' + dropdown_Pos_1).removeClass('active');
			dropdown_Pos_1 = dropdown_Pos_1 + __num;
			$('.items_1_' + dropdown_Pos_1).addClass('active');
		}
	}

}

function change_class_dropdownlist_1_down() {
	if (dropdown_Pos_1 < 24) {
		$('.items_1_' + dropdown_Pos_1).removeClass('active');
		dropdown_Pos_1 = dropdown_Pos_1 + 5;
		$('.items_1_' + dropdown_Pos_1).addClass('active');
	}
}

function change_class_dropdownlist_1_up() {
		if (dropdown_Pos_1 > 4) {
			$('.items_1_' + dropdown_Pos_1).removeClass('active');
			dropdown_Pos_1 = dropdown_Pos_1 - 5;
			$('.items_1_' + dropdown_Pos_1).addClass('active');
		}
	}
	//隐藏下拉框

function dropdownlist_hide() {
	$(".start_dropdownlist_1").hide();
	$('.items_1_' + dropdown_Pos_1).removeClass('active');
	dropdown_Pos_1 = 0;
	$('.items_1_' + dropdown_Pos_1).addClass('active');
	area_Pos = 5;
}

function change_class_up_1(c1) {
	var end_txt = $('.end').html();
	for (var d = 0; d <= 6; d++) {
		$(".train_d_" + d).removeClass("active");
		$(".train_d_" + d).css({
			'color' : '#4e4e4e'
		});
	}
	if (end_txt == '舟山') {
		change_class_up(c1, 'train_start_input');
		list_Pos = 0;
	} else {
		change_class_up(c1, 'train_end_input');
		list_Pos = 1;
	}
}

function change_class_up(c1, c2) {
	$("." + c1 + "").removeClass("active");
	$("." + c2 + "").addClass("active");
	sfz_num = "";
	text_1 = "";
}
function change_class_up_2( c2) {
	$("." + c2 + "").addClass("active");
	sfz_num = "";
	text_1 = "";
}


function change_class_left(c1, c2) {
	$("." + c1 + "").removeClass("active");
	$("." + c2 + "").addClass("active");
	sfz_num = "";
	text_1 = "";
	list_Pos--;
}

function change_class_right(c1, c2) {
	$("." + c1 + "").removeClass("active");
	$("." + c2 + "").addClass("active");
	sfz_num = "";
	text_1 = "";
	list_Pos++;
}
//list_Pos 2-8 right
function change_class_right2(c1, c2) {
	$("." + c1 + "").removeClass("active");
	$("." + c2 + "").addClass("active");
	$("." + c1 + "").css({
		'color' : '#4e4e4e'
	});
	$("." + c2 + "").css({
		'color' : '#ffa800'
	});
	list_Pos++;
}
//list_Pos 2-8 left
function change_class_left2(c1, c2) {
	$("." + c1 + "").removeClass("active");
	$("." + c2 + "").addClass("active");
	$("." + c1 + "").css({
		'color' : '#4e4e4e'
	});
	$("." + c2 + "").css({
		'color' : '#ffa800'
	});
	list_Pos--;
}