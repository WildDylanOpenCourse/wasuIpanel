// JScript source code
document.onkeydown = grabEvent;
document.onirkeypres = grabEvent;
var list_Pos = 0;
var area_Pos = 5;
var day_Pos = 3; // 起始星期几
var start_Pos = 0; // 宁波上海杭州起始点pos
var dropdown_Pos = 0; // 下拉的框指针
var dropdown_Pos_1 = 0 //第二个下拉的框指针

var daydaley = 0; // 当天开始延后的天数
var max_train_num = 10; // 每页最大显示列车车次信息
var trainDataList; // 列车车次信息数据
var page_num = 0; // 分页号
var page_data_num = 10; // 每个分页最多显示的数据

function init() {
	// 从后台取当前的星期数
	getNowDayOfWeek();
	// 设置每个分页最多显示的数据
	page_data_num = $(".hb").length;
}

// 设置页面时间部分数据
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

// 从后台取当前的星期数
function getNowDayOfWeek() {

	$.ajax({
		type : "POST",
		url : train_url,
		data : {
			call : "getdayofweek"
		},
		cache : false,
		dataType : "json",
		success : function(data) {
			// 起始星期几
			day_Pos = data;
			//
			setweekday();
		}
	});
}

// 从后台取列车车次信息
function getTrain() {
	// 出发地
	var start = $(".start").text();
	// 到达地
	var end = $(".end").text();
	// 当天开始延后的天数 由于list_Pos的编号 需要-1才是正确的星期数
	// 从后台取航班信息
	getTrainData(daydaley - 1, start, end);
}

// 从后台取航班信息
function getTrainData(daydelay, dep, arr) {

	$.ajax({
		type : "POST",
		url : train_url,
		// 传到后台的参数 其中出发地dep和到达地arr需要URLEncode编码
		data : {
			call : "gettraindata",
			daydelay : daydelay,
			depcity : encodeURI(dep),
			arrcity : encodeURI(arr)
		},
		cache : false,
		dataType : "json",
		success : function(data) {
			// 解析后台传来的json格式的航班信息
			trainDataList = eval("(" + data + ")");
			// 填充航班信息
			setTrainData();
		}
	});
}

// 填充列车车次信息
function setTrainData() {
	// 后台传入的列车车次数据的数量
	var trainDataNum = trainDataList.length;
	// 如果没有列出车次数据
	if (0 == trainDataNum) {
		// 清空页面数据
		setFullBlankData();
		// 没有列出车次信息显示的消息
		$(".jc").eq(0).text("未查到您所需要的列车车次信息");
		return;
	}
	// 每页填充的数据
	for (var i = 0; i < page_data_num; i++) {
		// 得到数据标号
		var index = i + page_num * page_data_num;
		// 标号比数据的数量小
		if (index < trainDataNum) {
			// 车次
			$(".hb").eq(i).text(trainDataList[index].trainNo);
			// 预计出发
			$(".s_time").eq(i).text(trainDataList[index].deptTime);
			// 车站
			$(".jc").eq(i).text(
					trainDataList[index].depStation + " - "
							+ trainDataList[index].arrStation);
			// 预计到达
			$(".e_time").eq(i).text(trainDataList[index].arrTime);
			// 标号比数据的数量大
		} else {
			// 设置空的列车车次信息
			setBlankData(i);
		}
	}
}

// 设置整页为空的列车车次信息
function setFullBlankData() {
	// 航班号
	$(".hb").text(" ");
	// 预计出发
	$(".s_time").text(" ");
	// 机场
	$(".jc").text(" ");
	// 预计到达
	$(".e_time").text(" ");
}

// 设置空的列车车次信息
function setBlankData(index) {
	// 航班号
	$(".hb").eq(index).text(" ");
	// 预计出发
	$(".s_time").eq(index).text(" ");
	// 机场
	$(".jc").eq(index).text(" ");
	// 预计到达
	$(".e_time").eq(index).text(" ");
}

// 翻页时动作
// action 1 下一页
// -1 上一页
function doNextPreAction(action) {

	// 下一页
	if (action == 1) {
		// 分页号+1
		page_num++;
		// 分页最小标号超过数据总数
		if (page_num * page_data_num >= trainDataList.length) {
			// 分页号-1
			page_num--;
		} else {
			// 清空页面数据
			setFullBlankData();
			// 填充当前页数据
			setTrainData();
		}
		// 下一页
	} else {
		// 分页号-1
		page_num--;
		// 分页号负数 说明超过范围
		if (page_num < 0) {
			// 分页号+1
			page_num++;
		} else {
			// 清空页面数据
			setFullBlankData();
			// 填充当前页数据
			setTrainData();
		}
	}
}

function grabEvent() {
	var key_code = event.which != undefined ? event.which : event.keyCode;
	switch (key_code) {
	// up
	case 1:
	case 28:
	case 269:
	case 38:
		if (area_Pos == 5) {
			if (list_Pos == 1) {
				change_class_up('train_end_input', 'train_start_input');
				list_Pos = 0;
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
				// 设置传后台用的参数 延迟天数
				daydaley = list_Pos;
			} else if (list_Pos == 10) {
				for (var d = 0; d <= 6; d++) {
					$(".train_d_" + d).removeClass("active");
				}
				change_class_up('train_search', 'train_d_0');
				list_Pos = 2;
				// 设置传后台用的参数 延迟天数
				daydaley = list_Pos;
			} else if (list_Pos == 11) {
				change_class_up('train_btn_0', 'train_back');
				list_Pos = 9;
				// 设置传后台用的参数 延迟天数
				daydaley = list_Pos;
			} else if (list_Pos == 13) {
				change_class_up('train_btn_2', 'train_search');
				list_Pos = 10;
			}
			;
		} else if (area_Pos == 10) {
			dbroad_up();
		} else if (area_Pos == 11) {
			font_up();
		} else if (area_Pos == 4) {
			if (start_Pos > 0) {
				$(".items").children("li").eq(start_Pos).removeClass("active");
				start_Pos--;
				$(".items").children("li").eq(start_Pos).addClass("active");
			}
		} else if (area_Pos == 41) {
			change_class_dropdownlist_1_up();
		}
		return 0;
		break;
	// down
	case 2:
	case 40:
	case 31:
	case 270:
		if (area_Pos == 5) {
			if (list_Pos == 0) {
				change_class_up('train_start_input', 'train_end_input');
				list_Pos = 1;
			} else if (list_Pos == 1) {
				change_class_up('train_end_input', 'train_d_0');
				list_Pos++;
			} else if (list_Pos == 2) {
				change_class_up_2('train_search');
				// 设置传后台用的参数 延迟天数
				daydaley = list_Pos;
				list_Pos = 10;
			} else if (list_Pos == 3) {
				change_class_up_2('train_search');
				// 设置传后台用的参数 延迟天数
				daydaley = list_Pos;
				list_Pos = 10;
			} else if (list_Pos == 4) {
				change_class_up_2('train_search');
				// 设置传后台用的参数 延迟天数
				daydaley = list_Pos;
				list_Pos = 10;
			} else if (list_Pos == 5) {
				change_class_up_2('train_search');
				// 设置传后台用的参数 延迟天数
				daydaley = list_Pos;
				list_Pos = 10;
			} else if (list_Pos == 6) {
				change_class_up_2('train_search');
				// 设置传后台用的参数 延迟天数
				daydaley = list_Pos;
				list_Pos = 10;
			} else if (list_Pos == 7) {
				change_class_up_2('train_search');
				// 设置传后台用的参数 延迟天数
				daydaley = list_Pos;
				list_Pos = 10;
			} else if (list_Pos == 8) {
				change_class_up_2('train_search');
				// 设置传后台用的参数 延迟天数
				daydaley = list_Pos;
				list_Pos = 10;
			} else if (list_Pos == 2) {
				change_class_up_2('train_search');
				// 设置传后台用的参数 延迟天数
				daydaley = list_Pos;
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
		} else if (area_Pos == 4) {
			if (start_Pos < 2) {
				$(".items").children("li").eq(start_Pos).removeClass("active");
				start_Pos++;
				$(".items").children("li").eq(start_Pos).addClass("active");
			}
		} else if (area_Pos == 41) {
			change_class_dropdownlist_1_down();
		}
		return 0;
		break;
	// left
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
				if (start_txt != '') {
					change_class_left('change_p', 'train_end_input');
					list_Pos = 1;
				} else {
					change_class_left('change_p', 'train_start_input');
					list_Pos = 0;
				}
			} else if (list_Pos == 21) {
				$(".pre-btn").removeClass("active");
				$(".goback").addClass("active");
				list_Pos--;
			} else if (list_Pos == 22) {
				$(".back-btn").removeClass("active");
				$(".pre-btn").addClass("active");
				list_Pos--;
			}
		} else if (area_Pos == 10 || area_Pos == 11) {
			dbroad_focus(-1);
		} else if (area_Pos == 41) {
			change_class_dropdownlist_1(-1);
		}
		return 0;
		break;
	// right
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
//				change_class_right('train_d_6', 'train_back');
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
			} else if (list_Pos == 20) {
				$(".goback").removeClass("active");
				$(".pre-btn").addClass("active");
				list_Pos++;
			} else if (list_Pos == 21) {
				$(".pre-btn").removeClass("active");
				$(".back-btn").addClass("active");
				list_Pos++;
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
	// enter
	case 13:
		if (area_Pos == 5) {
			if (list_Pos == 0) {
				if (dropdown_Pos == 0) {
					$(".start_dropdownlist").css({
						'top': '80px'
					});
					$(".start_dropdownlist").show();
					area_Pos = 4;
				} else if (dropdown_Pos == 1) {
					$(".start_dropdownlist_1").show();
					area_Pos = 41;
				}
			} else if (list_Pos == 1) {
				if (dropdown_Pos == 0) {
					$(".start_dropdownlist_1").show();
					area_Pos = 41;
				} else {
					$(".start_dropdownlist").css({
						'top': '80px'
					});
					$(".start_dropdownlist").show();
					area_Pos = 4;
				}
			} else if (list_Pos == 2) {
				$(".train_d_0").addClass("active");
				$(".train_search").addClass("active");
				// 设置传后台用的参数 延迟天数
				daydaley = list_Pos;
				list_Pos = 10;
			} else if (list_Pos == 3) {
				$(".train_d_1").addClass("active");
				// 设置传后台用的参数 延迟天数
				daydaley = list_Pos;
				list_Pos = 10;
				$(".train_search").addClass("active");
				// 设置传后台用的参数 延迟天数
				daydaley = list_Pos;
			} else if (list_Pos == 4) {
				$(".train_d_2").addClass("active");
				// 设置传后台用的参数 延迟天数
				daydaley = list_Pos;
				list_Pos = 10;
				$(".train_search").addClass("active");
			} else if (list_Pos == 5) {
				$(".train_d_3").addClass("active");
				// 设置传后台用的参数 延迟天数
				daydaley = list_Pos;
				list_Pos = 10;
				$(".train_search").addClass("active");
			} else if (list_Pos == 6) {
				$(".train_d_4").addClass("active");
				// 设置传后台用的参数 延迟天数
				daydaley = list_Pos;
				list_Pos = 10;
				$(".train_search").addClass("active");
			} else if (list_Pos == 7) {
				$(".train_d_5").addClass("active");
				// 设置传后台用的参数 延迟天数
				daydaley = list_Pos;
				list_Pos = 10;
				$(".train_search").addClass("active");
			} else if (list_Pos == 8) {
				$(".train_d_6").addClass("active");
				// 设置传后台用的参数 延迟天数
				daydaley = list_Pos;
				list_Pos = 10;
				$(".train_search").addClass("active");
			} else if (list_Pos == 9) {
				location.href = '../index.html?2';
				// 查询按钮按下
			} else if (list_Pos == 10) {
				// change_p 2-8
				$(".change_p").hide();
				// 后台取列车车次信息
				getTrain();
				$(".train_popup").show();
				var start_detail = $(".start").html();
				$(".start_station").html(start_detail);
				$(".goback").addClass("active");
				list_Pos = 20; // 弹出的查询记录 指针
			} else if (list_Pos == 11) {
				location.href = '../iPanel_gout/ship.html';
				list_Pos++;
			} else if (list_Pos == 12) {
				location.href = '../iPanel_gout/bus.html';
				list_Pos++;
			} else if (list_Pos == 13) {
				location.href = '../iPanel_gout/flight.html';
				list_Pos++;
				// 返回
			} else if (list_Pos == 20) {
				// change_p 2-8
				$(".change_p").show();
				$(".train_popup").hide();
				// 清空页面数据
				setFullBlankData();
				list_Pos = 10;
				// 上一页
			} else if (list_Pos == 21) {
				// $(".detail_1").children('tbody').html('')
				// for (var i = 0; i < 16; i++) {
				// $(".detail_1").children('tbody').append(
				// '<tr>'
				// + '<td class="hb" width="20%">MU32222</td>'
				// + '<td class="s_time" width="15%">22：40</td>'
				// + '<td class="jc" width="50%">三江三江-长涂三江江</td>'
				// + '<td class="e_time" width="15%">22：35</td>'
				// + '</tr>')
				// }
				// 翻页操作
				doNextPreAction(-1);
				// 下一页
			} else if (list_Pos == 22) {
				// $(".detail_1").children('tbody').html('')
				// for (var i = 0; i < 16; i++) {
				// $(".detail_1").children('tbody').append(
				// '<tr>'
				// + '<td class="hb" width="20%">MU32222</td>'
				// + '<td class="s_time" width="15%">22：40</td>'
				// + '<td class="jc" width="50%">三江三江-长涂三江江</td>'
				// + '<td class="e_time" width="15%">22：35</td>'
				// + '</tr>')
				// }
				// 翻页操作
				doNextPreAction(1);

			} else if (list_Pos == 100) {
				// 起点站
				var start_txt = $(".start").html();
				// 终点站
				var end_txt = $(".end").html();
				// 起点站下拉菜单
				var start_html = $(".train_start_input").html();
				// 终点站下拉菜单
				var end_html = $(".train_end_input").html();
				if (start_txt != '宁波' && start_txt != '上海' && start_txt != '杭州') {
					// 起点站的下拉菜单替换成终点站的下拉菜单
					$(".train_start_input").html(end_html.replace('class="end"','class="start"'));
//					$(".train_start_input").html(
//							'<div class="start">' + end_txt + '</div>'
//									+ '<div class="start_dropdownlist rel">'
//									+ '<ul class="items">'
//									+ '<li class="active">宁波</li>'
//									+ '<li>上海</li>' + '<li>杭州</li>' + '</ul>'
//									+ '</div>');
					// 终点站的下拉菜单替换成起点站的下拉菜单
					$(".train_end_input").html(start_html.replace('class="start"','class="end"'));
//					$(".train_end_input").html(
//							'<div class="end">' + start_txt + '</div>');
					$(".change_p").removeClass("active");
					$(".train_start_input").addClass("active");
					sfz_num = "";
					text_1 = "";
					list_Pos = 0;
				} else {
					// 起点站的下拉菜单替换成终点站的下拉菜单
					$(".train_start_input").html(end_html.replace('class="end"','class="start"'));
//					$(".train_start_input").html(
//							'<div class="start">' + end_txt + '</div>');
					// 终点站的下拉菜单替换成起点站的下拉菜单
					$(".train_end_input").html(start_html.replace('class="start"','class="end"'));
//					$(".train_end_input").html(
//							'<div class="end">' + start_txt + '</div>'
//									+ '<div class="start_dropdownlist rel">'
//									+ '<ul class="items">'
//									+ '<li class="active">宁波</li>'
//									+ '<li>上海</li>' + '<li>杭州</li>' + '</ul>'
//									+ '</div>');
					$(".change_p").removeClass("active");
					$(".train_start_input").addClass("active");
					sfz_num = "";
					text_1 = "";
					list_Pos = 0;
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
					'visibility' : 'visible'
				});
				dbroad_enter("start");

			} else if (list_Pos == 1) {
				$(".pinyin").css({
					'visibility' : 'visible'
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
		} else if (area_Pos == 4) {
			if (dropdown_Pos == 0) {
				if (start_Pos == 0) {
					$(".start").html("宁波");
				} else if (start_Pos == 1) {
					$(".start").html("上海");
				} else if (start_Pos == 2) {
					$(".start").html("杭州");
				}
			} else {
				if (start_Pos == 0) {
					$(".end").html("宁波");
				} else if (start_Pos == 1) {
					$(".end").html("上海");
				} else if (start_Pos == 2) {
					$(".end").html("杭州");
				}
			}
			$(".items").children('li').eq(start_Pos).removeClass("active");
			start_Pos = 0;
			$(".start_dropdownlist").hide();
			area_Pos = 5;
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
	case 832: // f1
		return 0;
		break;
	case 340: // back
	case 8:
		location.href = '../index.html?2';
		return 0;
		break;
	case 372: // 上一页
	case 105:
		return 0;
		break;
	case 373: // 下一页
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
//隐藏下拉 
function dropdownlist_hide() {
		$(".start_dropdownlist_1").hide();
		$('.items_1_' + dropdown_Pos_1).removeClass('active');
		dropdown_Pos_1 = 0;
		$('.items_1_' + dropdown_Pos_1).addClass('active');
		area_Pos = 5;
	}
	//交换按钮

function chenge_end_start() {
	var start_txt = $(".start").html();
	var end_txt = $(".end").html();
	if (start_txt != '宁波' && start_txt != '上海' && start_txt != '杭州') {
		$(".train_start_input").html(
			'<div class="end">' + end_txt + '</div>' +
			'<div class="start_dropdownlist rel">' +
			'<ul class="items">' +
			'<li class="active">宁波</li>' +
			'<li>上海</li>' +
			'<li>杭州</li>' +
			'</ul>' +
			'</div>');
		$(".train_end_input").html(
			'<div class="start">' + start_txt + '</div>' +
			'<div class="start_dropdownlist_1 rel">' +
			'<ul class="items_1">' +
			'<li  class="items_1_0 active">北京</li>' +
			'<li class="items_1_1">郑州</li>' +
			'<li class="items_1_2">广州</li>' +
			'<li class="items_1_3">南京</li>' +
			'<li class="items_1_4">西安</li>' +
			'<li class="items_1_5">上海</li>' +
			'<li class="items_1_6">深圳</li>' +
			'<li class="items_1_7">徐州</li>' +
			'<li class="items_1_8">重庆</li>' +
			'<li class="items_1_9">天津</li>' +
			'<li class="items_1_10">武汉</li>' +
			'<li class="items_1_11">成都</li>' +
			'<li class="items_1_12">哈尔滨</li>' +
			'<li class="items_1_13">东莞</li>' +
			'<li class="items_1_14">株洲</li>' +
			'<li class="items_1_15">沈阳</li>' +
			'<li class="items_1_16">宝鸡</li>' +
			'<li class="items_1_17">济南</li>' +
			'<li class="items_1_18">洛阳</li>' +
			'<li class="items_1_19">乌鲁木齐</li>' +
			'<li class="items_1_20">商丘</li>' +
			'<li class="items_1_21">杭州</li>' +
			'<li class="items_1_22">长春</li>' +
			'<li class="items_1_23">兰州</li>' +
			'<li class="items_1_24">福州</li>' +
			'<li class="items_1_25">蚌埠</li>' +
			'<li class="items_1_26">长沙</li>' +
			'<li class="items_1_27">青岛</li>' +
			'<li class="items_1_28">苏州</li>' +
			'<li class="items_1_29">阜阳</li>' +
			'</ul>' +
			'</div>'
		);
		$(".change_p").removeClass("active");
		$(".train_start_input").addClass("active");
		sfz_num = "";
		text_1 = "";
		list_Pos = 0;
	} else {
		$(".train_start_input").html(
			'<div class="start">' + end_txt + '</div>' +
			'<div class="start_dropdownlist_1 rel">' +
			'<ul class="items_1">' +
			'<li  class="items_1_0 active">北京</li>' +
			'<li class="items_1_1">郑州</li>' +
			'<li class="items_1_2">广州</li>' +
			'<li class="items_1_3">南京</li>' +
			'<li class="items_1_4">西安</li>' +
			'<li class="items_1_5">上海</li>' +
			'<li class="items_1_6">深圳</li>' +
			'<li class="items_1_7">徐州</li>' +
			'<li class="items_1_8">重庆</li>' +
			'<li class="items_1_9">天津</li>' +
			'<li class="items_1_10">武汉</li>' +
			'<li class="items_1_11">成都</li>' +
			'<li class="items_1_12">哈尔滨</li>' +
			'<li class="items_1_13">东莞</li>' +
			'<li class="items_1_14">株洲</li>' +
			'<li class="items_1_15">沈阳</li>' +
			'<li class="items_1_16">宝鸡</li>' +
			'<li class="items_1_17">济南</li>' +
			'<li class="items_1_18">洛阳</li>' +
			'<li class="items_1_19">乌鲁木齐</li>' +
			'<li class="items_1_20">商丘</li>' +
			'<li class="items_1_21">杭州</li>' +
			'<li class="items_1_22">长春</li>' +
			'<li class="items_1_23">兰州</li>' +
			'<li class="items_1_24">福州</li>' +
			'<li class="items_1_25">蚌埠</li>' +
			'<li class="items_1_26">长沙</li>' +
			'<li class="items_1_27">青岛</li>' +
			'<li class="items_1_28">苏州</li>' +
			'<li class="items_1_29">阜阳</li>' +
			'</ul>' +
			'</div>'
		);
		$(".train_end_input").html(
			'<div class="end">' + start_txt + '</div>' +
			'<div class="start_dropdownlist rel">' +
			'<ul class="items">' +
			'<li class="active">宁波</li>' +
			'<li>上海</li>' +
			'<li>杭州</li>' +
			'</ul>' +
			'</div>');
		$(".change_p").removeClass("active");
		$(".train_start_input").addClass("active");
		sfz_num = "";
		text_1 = "";
		list_Pos = 0;
	}
	if (dropdown_Pos == 0) {
		dropdown_Pos = 1;
	} else {
		dropdown_Pos = 0;
	}
}

function change_class_up_1(c1) {
	var end_txt = $('.end').html();
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

function change_class_up_2(c2) {
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
// list_Pos 2-8 right
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
// list_Pos 2-8 left
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