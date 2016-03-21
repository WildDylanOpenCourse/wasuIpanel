// JScript source code
document.onkeydown = grabEvent;
document.onirkeypres = grabEvent;

var pos = 0; // 光标位置
var spos = 0; //起点站下拉光标位置
var epos = 0; //终点站下拉光标位置
var ef = 0; //终点站下拉第几项
var sf = 0; //起点站下拉第几项

function grabEvent() {
	var key_code = event.which != undefined ? event.which : event.keyCode;
	var _startInput = $(".ship_start_input");
	var _endInput = $(".ship_end_input");
	var _shipBack = $(".ship_back");
	var _shipSearch = $(".ship_search");
	var _shipNext = $(".ship_next");
	var _shipStartDrop = $('.start_dropdownlist');
	var _items = $('.items');
	var _start = $('.start');
	var _end = $(".end");
	var _xc_items = $(".xc_items");
	var _dt_items = $(".dt_items")
	var _gt_items = $(".gt_items")
	var _sj_items = $(".sj_items");
	var _shipPopup = $(".ship_popup")

	switch (key_code) {
		//up     
		case 1:
		case 28:
		case 269:
		case 38:
			if (pos == 2) {
				_shipBack.removeClass("active");
				_endInput.addClass("active");
				pos -= 1;
			} else if (pos == 3) {
				_shipSearch.removeClass("active");
				_endInput.addClass("active");
				pos = 1;
			} else if (pos == 100) {
				$(".ship_btn_0").removeClass("active");
				_shipBack.addClass("active");
				pos = 2;
			} else if (pos == 102) {
				$(".ship_btn_2").removeClass("active");
				_shipSearch.addClass("active");
				pos = 3;
			} else if (pos == 4) {
				_shipNext.removeClass("active");
				_endInput.addClass("active");
				pos -= 3;
			} else if (pos == 1) {
				_endInput.removeClass("active");
				_startInput.addClass("active");
				pos -= 1;
			} else if (pos == 10) { //startStation dropdownlist event
				if (spos < 4 && spos > 0) {
					sposjian()
				}
			} else if (pos == 11) { //endStation dropdownlist keyup event
				if (ef == 0) {
					if (epos > 0) {
						_xc_items.children("li").eq(epos).removeClass("active");
						epos -= 1;
						_xc_items.children("li").eq(epos).addClass("active");
					}
				} else if (ef == 1) {
					if (epos > 0) {
						_dt_items.children("li").eq(epos).removeClass("active");
						epos -= 1;
						_dt_items.children("li").eq(epos).addClass("active");
					}
				} else if (ef == 2) {
					if (epos > 0) {
						_gt_items.children("li").eq(epos).removeClass("active");
						epos -= 1;
						_gt_items.children("li").eq(epos).addClass("active");
					}
				} else if (ef == 3) {
					if (epos > 0) {
						_sj_items.children("li").eq(epos).removeClass("active");
						epos -= 1;
						_sj_items.children("li").eq(epos).addClass("active");
					}
				}
			}
			return 0;
			break;
			//down     
		case 2:
		case 40:
		case 31:
		case 270:
			if (pos == 0) {
				_startInput.removeClass("active");
				_endInput.addClass("active");
				pos += 1;
			} else if (pos == 1) {
				_endInput.removeClass("active");
				_shipBack.addClass("active");
				pos += 1;
			} else if (pos == 2) {
				_shipBack.removeClass("active");
				$(".ship_btn_0").addClass("active");
				pos = 100;
			} else if (pos == 3) {
				_shipSearch.removeClass("active");
				$(".ship_btn_2").addClass("active");
				pos = 102;
			} else if (pos == 10) { //startStation dropdownlist event
				if (spos < 3) {
					sposjia()
				}
			} else if (pos == 11) { //endStation dropdownlist keydown event
				if (ef == 0) {
					if (epos < 8) {
						_xc_items.children("li").eq(epos).removeClass("active");
						epos += 1;
						_xc_items.children("li").eq(epos).addClass("active");
					}
				} else if (ef == 1) {
					if (epos < 6) {
						_dt_items.children("li").eq(epos).removeClass("active");
						epos += 1;
						_dt_items.children("li").eq(epos).addClass("active");
					}
				} else if (ef == 2) {
					if (epos < 8) {
						_gt_items.children("li").eq(epos).removeClass("active");
						epos += 1;
						_gt_items.children("li").eq(epos).addClass("active");
					}
				} else if (ef == 3) {
					if (epos < 4) {
						_sj_items.children("li").eq(epos).removeClass("active");
						epos += 1;
						_sj_items.children("li").eq(epos).addClass("active");
					}
				}
			}
			return 0;
			break;
			//left
		case 3:
		case 37:
		case 29:
		case 271:
			if (pos == 3) {
				_shipSearch.removeClass("active");
				_shipBack.addClass("active");
				pos = 2;
			} else if (pos == 4) {
				_shipNext.removeClass("active");
				_shipSearch.addClass("active");
				pos -= 1;
			} else if (pos == 2) {
				_shipBack.removeClass("active");
				_endInput.addClass("active");
				pos -= 1;
			} else if (pos == 100) {
				$(".ship_btn_0").removeClass("active");
				_shipSearch.addClass("active");
				pos = 3;
			} else if (pos == 101) {
				$(".ship_btn_1").removeClass("active");
				$(".ship_btn_0").addClass("active");
				pos = 100;
			} else if (pos == 102) {
				$(".ship_btn_2").removeClass("active");
				$(".ship_btn_1").addClass("active");
				pos = 101;
			}
			return 0;
			break;
			//right     
		case 4:
		case 30:
		case 272:
		case 39:
			if (pos == 2) {
				_shipBack.removeClass("active");
				_shipSearch.addClass("active");
				pos = 3;
			} else if (pos == 1) {
				_endInput.removeClass("active");
				_shipBack.addClass("active");
				pos = 2;
			} else if (pos == 3) {
				_shipSearch.removeClass("active");
				$(".ship_btn_0").addClass("active");
				pos = 100;
			} else if (pos == 100) {
				$(".ship_btn_0").removeClass("active");
				$(".ship_btn_1").addClass("active");
				pos = 101;
			} else if (pos == 101) {
				$(".ship_btn_1").removeClass("active");
				$(".ship_btn_2").addClass("active");
				pos = 102;
			}
			return 0;
			break;
			//enter
		case 13:
			if (pos == 2) {
				location.href = '../index.html?tag=2';
			} else if (pos == 100) {
				location.href = '../iPanel_gout/train.html';
			} else if (pos == 101) {
				location.href = '../iPanel_gout/bus.html';
			} else if (pos == 102) {
				location.href = '../iPanel_gout/flight.html';
			} else if (pos == 0) {
				_shipStartDrop.show();
				pos = 10;
			} else if (pos == 3) { //search button event
				var start_txt = $(".start").html();
				var end_txt = $(".end").html();
				$(".start").html(start_txt);
				$(".detail_1").html(
					''
				);
				$(".detail_2").html(
					''
				)
				if (start_txt == '定海三江' && end_txt == '长涂') {
					table_0_input();
				} else if (start_txt == '定海三江' && end_txt == '秀山') {
					table_1_input();
				} else if (start_txt == '定海三江' && end_txt == '泗礁') {
					table_2_input();
				} else if (start_txt == '定海三江' && end_txt == '小洋山') {
					table_3_input();
				} else if (start_txt == '定海三江' && end_txt == '高亭') {
					table_4_input();
				} else if (start_txt == '定海三江' && end_txt == '大衢') {
					table_5_input();
				} else if (start_txt == '定海三江' && end_txt == '新城') {
					table_6_input();
				} else if (start_txt == '普陀墩头' && end_txt == '桃花') {
					table_7_input();
				} else if (start_txt == '普陀墩头' && end_txt == '蚂蚁') {
					table_8_input();
				} else if (start_txt == '普陀墩头' && end_txt == '六横') {
					table_9_input();
				} else if (start_txt == '普陀墩头' && end_txt == '虾峙') {
					table_10_input();
				} else if (start_txt == '普陀墩头' && end_txt == '登步') {
					table_11_input();
				} else if (start_txt == '普陀墩头' && end_txt == '佛渡') {
					table_12_input();
				} else if (start_txt == '普陀墩头' && end_txt == '嵊山') {
					table_13_input();
				} else if (start_txt == '岱山高亭' && end_txt == '衢山') {
					table_14_input();
				} else if (start_txt == '岱山高亭' && end_txt == '长涂') {
					table_15_input();
				} else if (start_txt == '岱山高亭' && end_txt == '秀北') {
					table_16_input();
				} else if (start_txt == '岱山高亭' && end_txt == '泗礁') {
					table_17_input();
				} else if (start_txt == '岱山高亭' && end_txt == '渔山') {
					table_18_input();
				} else if (start_txt == '岱山高亭' && end_txt == '官山大峧') {
					table_19_input();
				} else if (start_txt == '岱山高亭' && end_txt == '三江') {
					table_20_input();
				} else if (start_txt == '岱山高亭' && end_txt == '上海') {
					table_21_input();
				} else if (start_txt == '岱山高亭' && end_txt == '秀山') {
					table_22_input();
				} else if (start_txt == '嵊泗泗礁' && end_txt == '上海') {
					table_23_input();
				} else if (start_txt == '嵊泗泗礁' && end_txt == '三江') {
					table_24_input();
				} else if (start_txt == '嵊泗泗礁' && end_txt == '高亭') {
					table_25_input();
				} else if (start_txt == '嵊泗泗礁' && end_txt == '衢山') {
					table_26_input();
				} else if (start_txt == '嵊泗泗礁' && end_txt == '大洋山') {
					table_27_input();
				} else if (start_txt == '定海三江' && end_txt == '洋山') {
					table_28_input();
				}
				_shipPopup.show();
				pos = 12;
			} else if (pos == 12) { //detail back event
				_shipPopup.hide();
				pos = 3;
			} else if (pos == 10) { //startStation dropdownlist
				_start.text(_items.children(".active").text());
				_shipStartDrop.hide();
				_items.children("li").eq(spos).removeClass("active");
				_items.children("li").eq(0).addClass("active");
				//选择起点站 改变终点变默认文本
				if (spos == 0) {
					_end.text('长涂');
					sf = 0;
				} else if (spos == 1) {
					_end.text('桃花');
					sf = 1;
				} else if (spos == 2) {
					_end.text('衢山');
					sf = 2;
				} else if (spos == 3) {
					_end.text('上海')
					sf = 3;
				}
				spos = 0;
				pos = 0;
			} else if (pos == 1) { //endStation keyenter event                    
				pos = 11;
				var _endText = $(".end").text();
				//通过sf确定起点站，显示终点站第几项显示，并设置ef供后面使用
				if (sf == 0) {
					$(".xc_items").show();
					ef = 0;
				} else if (sf == 1) {
					$(".dt_items").show();
					ef = 1
				} else if (sf == 2) {
					$(".gt_items").show();
					ef = 2
				} else if (sf == 3) {
					$(".sj_items").show();
					ef = 3
				}
			} else if (ef == 0) { //选择终点站时回车设置终点站文字并初始化
				_end.text(_xc_items.children(".active").text());
				_xc_items.hide().children(".active").removeClass("active")
				_xc_items.children("li").eq(0).addClass("active");
				pos = 1;
				epos = 0;
			} else if (ef == 1) {
				_end.text(_dt_items.children(".active").text());
				_dt_items.hide().children(".active").removeClass("active")
				_dt_items.children("li").eq(0).addClass("active");
				pos = 1;
				epos = 0;
			} else if (ef == 2) {
				_end.text(_gt_items.children(".active").text());
				_gt_items.hide().children(".active").removeClass("active")
				_gt_items.children("li").eq(0).addClass("active");
				pos = 1;
				epos = 0;
			} else if (ef == 3) {
				_end.text(_sj_items.children(".active").text());
				_sj_items.hide().children(".active").removeClass("active")
				_sj_items.children("li").eq(0).addClass("active");
				pos = 1;
				epos = 0;
			}
			return 0;
			break;
		case 832: //f1
			return 0;
			break;
		case 340: //back
		case 8:
			location.href = '../index.html?tag=2';
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

	function table_0_input() {
		$(".detail_1").html(
			'<tbody>' +
			'<tr><td>三江-长涂</td><td>7：35</td><td>32.0元</td></tr>' +
			'<tr><td>三江-长涂</td><td>13：00</td><td>32.0元</td></tr>' +
			'</tbody>'
		);
		$(".detail_2").html(
			'<tbody>' +
			'<tr><td>三江-长涂(高速船)</td><td>8:45</td><td>44.0元</td></tr>' +
			'<tr><td>三江-长涂(高速船)</td><td>16:10</td><td>44.0元</td></tr>' +
			'</tbody>'
		)
	}

	function table_1_input() {
		$(".detail_1").html(
			'<tbody>' +
			'<tr><td>三江-秀山</td><td>7:10</td><td>11.0元</td></tr>' +
			'<tr><td>三江-秀山</td><td>8:20</td><td>11.0元</td></tr>' +
			'<tr><td>三江-秀山</td><td>9:30</td><td>11.0元</td></tr>' +
			'<tr><td>三江-秀山</td><td>10:50</td><td>11.0元</td></tr>' +
			'<tr><td>三江-秀山</td><td>11:50</td><td>11.0元</td></tr>' +
			'</tbody>'
		);
		$(".detail_2").html(
			'<tbody>' +
			'<tr><td>三江-秀山</td><td>13:40</td><td>11.0元</td></tr>' +
			'<tr><td>三江-秀山</td><td>14:40</td><td>11.0元</td></tr>' +
			'<tr><td>三江-秀山</td><td>16:00</td><td>11.0元</td></tr>' +
			'<tr><td>三江-秀山</td><td>17:10</td><td>11.0元</td></tr>' +
			'<tr><td>三江-秀山</td><td>18:10</td><td>11.0元</td></tr>' +
			'</tbody>'
		)
	}

	function table_2_input() {
		$(".detail_1").html(
			'<tbody>' +
			'<tr><td>三江-泗礁</td><td>8:30</td><td>125.0元</td></tr>' +
			'<tr><td>三江-泗礁</td><td>9:30</td><td>125.0元</td></tr>' +
			'<tr><td>三江-泗礁</td><td>10:30</td><td>125.0元</td></tr>' +
			'</tbody>'
		);
		$(".detail_2").html(
			'<tbody>' +
			'<tr><td>三江-泗礁</td><td>14:00</td><td>125.0元</td></tr>' +
			'<tr><td>三江-泗礁</td><td>14:50</td><td>125.0元</td></tr>' +
			'</tbody>'
		)
	}

	function table_3_input() {
		$(".detail_1").html(
			'<tbody>' +
			'<tr><td>三江-上海(南浦大桥)</td><td>8:00</td><td>88.0元</td></tr>' +
			'</tbody>'
		);
		$(".detail_2").html(
			'<tbody>' +
			'<tr><td>三江-上海(南浦大桥)</td><td>14:20</td><td>88.0元</td></tr>' +
			'</tbody>'
		)
	}

	function table_4_input() {
		$(".detail_1").html(
			'<tbody>' +
			'<tr><td>三江-高亭（车客渡轮）</td><td>6:50</td><td>18.0元</td></tr>' +
			'<tr><td>三江-高亭（车客渡轮）</td><td>7:20</td><td>18.0元</td></tr>' +
			'<tr><td>三江-高亭（车客渡轮）</td><td>8:00</td><td>18.0元</td></tr>' +
			'<tr><td>三江-高亭（车客渡轮）</td><td>8:40</td><td>18.0元</td></tr>' +
			'<tr><td>三江-高亭（车客渡轮）</td><td>9:20</td><td>18.0元</td></tr>' +
			'<tr><td>三江-高亭（车客渡轮）</td><td>10:10</td><td>18.0元</td></tr>' +
			'<tr><td>三江-高亭（车客渡轮）</td><td>10:40</td><td>18.0元</td></tr>' +
			'<tr><td>三江-高亭（车客渡轮）</td><td>11:20</td><td>18.0元</td></tr>' +
			'<tr><td>三江-高亭（车客渡轮）</td><td>12:00</td><td>18.0元</td></tr>' +
			'<tr><td>三江-高亭（车客渡轮）</td><td>12:40</td><td>18.0元</td></tr>' +
			'<tr><td>三江-高亭（车客渡轮）</td><td>13:10</td><td>18.0元</td></tr>' +
			'<tr><td>三江-高亭（车客渡轮）</td><td>13:50</td><td>18.0元</td></tr>' +
			'<tr><td>三江-高亭（车客渡轮）</td><td>14:30</td><td>18.0元</td></tr>' +
			'<tr><td>三江-高亭（车客渡轮）</td><td>15:30</td><td>18.0元</td></tr>' +
			'<tr><td>三江-高亭（车客渡轮）</td><td>15:50</td><td>18.0元</td></tr>' +
			'<tr><td>三江-高亭（车客渡轮）</td><td>16:40</td><td>18.0元</td></tr>' +
			'<tr><td>三江-高亭（车客渡轮）</td><td>17:20</td><td>18.0元</td></tr>' +
			'<tr><td>三江-高亭（车客渡轮）</td><td>18:30</td><td>18.0元</td></tr>' +
			'<tr><td>三江-高亭（车客渡轮）</td><td>20:00</td><td>18.0元</td></tr>' +
			'<tr><td>三江-高亭（高速船）</td><td>7:00</td><td>30.0元</td></tr>' +
			'<tr><td>三江-高亭（高速船）</td><td>7:40</td><td>30.0元</td></tr>' +
			'</tbody>'
		);
		$(".detail_2").html(
			'<tbody>' +
			'<tr><td>三江-高亭（高速船）</td><td>8:10</td><td>30.0元</td></tr>' +
			'<tr><td>三江-高亭（高速船）</td><td>8:30</td><td>30.0元</td></tr>' +
			'<tr><td>三江-高亭（高速船）</td><td>8:50</td><td>30.0元</td></tr>' +
			'<tr><td>三江-高亭（高速船）</td><td>9:10</td><td>30.0元</td></tr>' +
			'<tr><td>三江-高亭（高速船）</td><td>9:40</td><td>30.0元</td></tr>' +
			'<tr><td>三江-高亭（高速船）</td><td>10:00</td><td>30.0元</td></tr>' +
			'<tr><td>三江-高亭（高速船）</td><td>10:30</td><td>30.0元</td></tr>' +
			'<tr><td>三江-高亭（高速船）</td><td>11:00</td><td>30.0元</td></tr>' +
			'<tr><td>三江-高亭（高速船）</td><td>11:30</td><td>30.0元</td></tr>' +
			'<tr><td>三江-高亭（高速船）</td><td>12:25</td><td>30.0元</td></tr>' +
			'<tr><td>三江-高亭（高速船）</td><td>12:50</td><td>30.0元</td></tr>' +
			'<tr><td>三江-高亭（高速船）</td><td>13:20</td><td>30.0元</td></tr>' +
			'<tr><td>三江-高亭（高速船）</td><td>14:00</td><td>30.0元</td></tr>' +
			'<tr><td>三江-高亭（高速船）</td><td>14:20</td><td>30.0元</td></tr>' +
			'<tr><td>三江-高亭（高速船）</td><td>15:00</td><td>30.0元</td></tr>' +
			'<tr><td>三江-高亭（高速船）</td><td>15:20</td><td>30.0元</td></tr>' +
			'<tr><td>三江-高亭（高速船）</td><td>15:40</td><td>30.0元</td></tr>' +
			'<tr><td>三江-高亭（高速船）</td><td>16:20</td><td>30.0元</td></tr>' +
			'<tr><td>三江-高亭（高速船）</td><td>17:00</td><td>30.0元</td></tr>' +
			'<tr><td>三江-高亭（高速船）</td><td>17:40</td><td>30.0元</td></tr>' +
			'</tbody>'
		)
	}

	function table_5_input() {
		$(".detail_1").html(
			'<tbody>' +
			'<tr><td>三江-大衢(高速船)</td><td>6:40</td><td>61.0元</td></tr>' +
			'<tr><td>三江-大衢(高速船)</td><td>9:00</td><td>61.0元</td></tr>' +
			'<tr><td>三江-大衢(高速船)</td><td>9:50</td><td>61.0元</td></tr>' +
			'<tr><td>三江-大衢(高速船)</td><td>10:30</td><td>61.0元</td></tr>' +
			'<tr><td>三江-大衢(高速船)</td><td>12:40</td><td>61.0元</td></tr>' +
			'</tbody>'
		);
		$(".detail_2").html(
			'<tbody>' +
			'<tr><td>三江-大衢（高速船）</td><td>14:25</td><td>61.0元</td></tr>' +
			'<tr><td>三江-大衢（高速船）</td><td>16:00</td><td>61.0元</td></tr>' +
			'<tr><td>三江-大衢（车客渡轮）</td><td>9:20</td><td>48.0元</td></tr>' +
			'<tr><td>三江-大衢（车客渡轮）</td><td>15:20</td><td>48.0元</td></tr>' +
			'</tbody>'
		)
	}

	function table_6_input() {
		$(".detail_1").html(
			'<tbody>' +
			'<tr><td>三江-新城</td><td>6:40</td><td>32.0元</td></tr>' +
			'</tbody>'
		);
		$(".detail_2").html(
			''
		)
	}
	function table_7_input() {
		$(".detail_1").html(
			'<tbody>' +
			'<tr><td>墩头-桃花</td><td>7:20</td><td>15.0元</td></tr>' +
			'<tr><td>墩头-桃花(快艇)</td><td>8:00</td><td>27.0元</td></tr>' +
			'<tr><td>墩头-桃花</td><td>8:30</td><td>15.0元</td></tr>' +
			'<tr><td>墩头-桃花(快艇)</td><td>9:00</td><td>27.0元</td></tr>' +
			'<tr><td>墩头-桃花(快艇)</td><td>10:00</td><td>27.0元</td></tr>' +
			'<tr><td>墩头-桃花</td><td>10:30</td><td>15.0元</td></tr>' +
			'</tbody>'
		);
		$(".detail_2").html(
			'<tbody>' +
			'<tr><td>墩头-桃花</td><td>12:30</td><td>15.0元</td></tr>' +
			'<tr><td>墩头-桃花(快艇)</td><td>13:00</td><td>27.0元</td></tr>' +
			'<tr><td>墩头-桃花(快艇)</td><td>14:00</td><td>27.0元</td></tr>' +
			'<tr><td>墩头-桃花</td><td>14:30</td><td>15.0元</td></tr>' +
			'<tr><td>墩头-桃花(快艇)</td><td>15:00</td><td>27.0元</td></tr>' +
			'<tr><td>墩头-桃花</td><td>17:30</td><td>15.0元</td></tr>' +
			'</tbody>'
		)
	}
	function table_8_input() {
		$(".detail_1").html(
			'<tbody>' +
			'<tr><td>墩头-蚂蚁</td><td>7:20</td><td>13.0元</td></tr>' +
			'<tr><td>墩头-蚂蚁</td><td>9:00</td><td>13.0元</td></tr>' +
			'<tr><td>墩头-蚂蚁</td><td>11:00</td><td>13.0元</td></tr>' +
			'</tbody>'
		);
		$(".detail_2").html(
			'<tbody>' +
			'<tr><td>墩头-蚂蚁</td><td>14:30</td><td>13.0元</td></tr>' +
			'<tr><td>墩头-蚂蚁</td><td>15:40</td><td>13.0元</td></tr>' +
			'<tr><td>墩头-蚂蚁</td><td>16:30</td><td>13.0元</td></tr>' +
			'</tbody>'
		)
	}
	function table_9_input() {
		$(".detail_1").html(
			'<tbody>' +
			'<tr><td>墩头-六横</td><td>7:30</td><td>00.0元</td></tr>' +
			'<tr><td>墩头-六横</td><td>12:30</td><td>00.0元</td></tr>' +
			'<tr><td>墩头-六横</td><td>15:40</td><td>00.0元</td></tr>' +
			'<tr><td>墩头-六横蛟头(快艇)</td><td>8:30</td><td>33.0元</td></tr>' +
			'<tr><td>墩头-六横蛟头(快艇)</td><td>9:30</td><td>33.0元</td></tr>' +
			'<tr><td>墩头-六横蛟头(快艇)</td><td>10:30</td><td>33.0元</td></tr>' +
			'</tbody>'
		);
		$(".detail_2").html(
			'<tbody>' +
			'<tr><td>墩头-六横蛟头(快艇)</td><td>14:00</td><td>33.0元</td></tr>' +
			'<tr><td>墩头-六横蛟头(快艇)</td><td>15:30</td><td>33.0元</td></tr>' +
			'<tr><td>墩头-六横蛟头</td><td>7:30</td><td>18.0元</td></tr>' +
			'<tr><td>墩头-六横蛟头</td><td>12:30</td><td>18.0元</td></tr>' +
			'<tr><td>墩头-六横蛟头</td><td>16:00</td><td>18.0元</td></tr>' +
			'<tr><td>墩头-六横蛟头</td><td>16:30</td><td>18.0元</td></tr>' +
			'</tbody>'
		)
	}
	function table_10_input() {
		$(".detail_1").html(
			'<tbody>' +
			'<tr><td>墩头-虾峙</td><td>7:30</td><td>17.0元</td></tr>' +
			'<tr><td>墩头-虾峙</td><td>8:30</td><td>17.0元</td></tr>' +
			'<tr><td>墩头-虾峙</td><td>12:30</td><td>17.0元</td></tr>' +
			'<tr><td>墩头-虾峙</td><td>14:00</td><td>17.0元</td></tr>' +
			'</tbody>'
		);
		$(".detail_2").html(
			'<tbody>' +
			'<tr><td>墩头-虾峙</td><td>15:40</td><td>17.0元</td></tr>' +
			'<tr><td>墩头-虾峙黄石</td><td>12:00</td><td>17.0元</td></tr>' +
			'<tr><td>墩头-虾峙栅棚</td><td>9:40</td><td>17.0元</td></tr>' +
			'<tr><td>墩头-虾峙栅棚</td><td>15:00</td><td>17.0元</td></tr>' +
			'</tbody>'
		)
	}
	function table_11_input() {
		$(".detail_1").html(
			'<tbody>' +
			'<tr><td>墩头-登步</td><td>8:30</td><td>00.0元</td></tr>' +
			'<tr><td>墩头-登步</td><td>10:30</td><td>00.0元</td></tr>' +
			'</tbody>'
		);
		$(".detail_2").html(
			'<tbody>' +
			'<tr><td>墩头-登步</td><td>14:30</td><td>00.0元</td></tr>' +
			'<tr><td>墩头-登步</td><td>16:30</td><td>00.0元</td></tr>' +
			'</tbody>'
		)
	}
	function table_12_input() {
		$(".detail_1").html(
			'<tbody>' +
			'<tr><td>墩头-佛渡</td><td>12:00</td><td>00.0元</td></tr>' +
			'</tbody>'
		);
		$(".detail_2").html(
			'<tbody>' +
			'</tbody>'
		)
	}
	function table_13_input() {
		$(".detail_1").html(
			'<tbody>' +
			'<tr><td>墩头-嵊山</td><td>8:30</td><td>00.0元</td></tr>' +
			'</tbody>'
		);
		$(".detail_2").html(
			'<tbody>' +
			'</tbody>'
		)
	}
	function table_14_input() {
		$(".detail_1").html(
			'<tbody>' +
			'<tr><td>岱山-衢山</td><td>7:10</td><td>47.0元</td></tr>' +
			'<tr><td>岱山-衢山</td><td>9:40</td><td>47.0元</td></tr>' +
			'<tr><td>岱山-衢山</td><td>10:25</td><td>47.0元</td></tr>' +
			'</tbody>'
		);
		$(".detail_2").html(
			'<tbody>' +
			'<tr><td>岱山-衢山</td><td>13:15</td><td>47.0元</td></tr>' +
			'<tr><td>岱山-衢山</td><td>15:05</td><td>47.0元</td></tr>' +
			'<tr><td>岱山-衢山</td><td>16:30</td><td>47.0元</td></tr>' +
			'</tbody>'
		)
	}
	function table_15_input() {
		$(".detail_1").html(
			'<tbody>' +
			'<tr><td>岱山-长涂</td><td>7:50</td><td>12.0元</td></tr>' +
			'<tr><td>岱山-长涂</td><td>9:50</td><td>12.0元</td></tr>' +
			'<tr><td>岱山-长涂</td><td>15:20</td><td>12.0元</td></tr>' +
			'<tr><td>岱山-长涂</td><td>17:10</td><td>12.0元</td></tr>' +
			'<tr><td>岱山-长涂</td><td>6:30</td><td>12.0元</td></tr>' +
			'</tbody>'
		);
		$(".detail_2").html(
			'<tbody>' +
			'<tr><td>岱山-长涂</td><td>9:00</td><td>12.0元</td></tr>' +
			'<tr><td>岱山-长涂</td><td>11:10</td><td>12.0元</td></tr>' +
			'<tr><td>岱山-长涂</td><td>13:50</td><td>12.0元</td></tr>' +
			'<tr><td>岱山-长涂</td><td>16:10</td><td>12.0元</td></tr>' +
			'</tbody>'
		)
	}
	function table_16_input() {
		$(".detail_1").html(
			'<tbody>' +
			'<tr><td>岱山-秀北</td><td>6:25</td><td>00.0元</td></tr>' +
			'<tr><td>岱山-秀北</td><td>8:25</td><td>00.0元</td></tr>' +
			'<tr><td>岱山-秀北</td><td>10:50</td><td>00.0元</td></tr>' +
			'</tbody>'
		);
		$(".detail_2").html(
			'<tbody>' +
			'<tr><td>岱山-秀北</td><td>13:25</td><td>00.0元</td></tr>' +
			'<tr><td>岱山-秀北</td><td>15:30</td><td>00.0元</td></tr>' +
			'<tr><td>岱山-秀北</td><td>16:50</td><td>00.0元</td></tr>' +
			'</tbody>'
		)
	}
	function table_17_input() {
		$(".detail_1").html(
			'<tbody>' +
			'<tr><td>岱山-泗礁</td><td>15:25</td><td>106.0元</td></tr>' +
			'</tbody>'
		);
		$(".detail_2").html(
			'<tbody>' +
			'</tbody>'
		)
	}
	function table_18_input() {
		$(".detail_1").html(
			'<tbody>' +
			'<tr><td>岱山-渔山</td><td>13:40</td><td>00.0元</td></tr>' +
			'</tbody>'
		);
		$(".detail_2").html(
			'<tbody>' +
			'</tbody>'
		)
	}
	function table_19_input() {
		$(".detail_1").html(
			'<tbody>' +
			'<tr><td>岱山-官山大峧</td><td>10:45</td><td>00.0元</td></tr>' +
			'</tbody>'
		);
		$(".detail_2").html(
			'<tbody>' +
			'</tbody>'
		)
	}
	function table_20_input() {
		$(".detail_1").html(
			'<tbody>' +
			'<tr><td>岱山-三江</td><td>6:50</td><td>17.0元</td></tr>' +
			'<tr><td>岱山-三江</td><td>7:20</td><td>17.0元</td></tr>' +
			'<tr><td>岱山-三江</td><td>8:00</td><td>17.0元</td></tr>' +
			'<tr><td>岱山-三江</td><td>8:20</td><td>17.0元</td></tr>' +
			'<tr><td>岱山-三江</td><td>8:40</td><td>17.0元</td></tr>' +
			'<tr><td>岱山-三江</td><td>9:20</td><td>17.0元</td></tr>' +
			'<tr><td>岱山-三江</td><td>10:10</td><td>17.0元</td></tr>' +
			'<tr><td>岱山-三江</td><td>10:40</td><td>17.0元</td></tr>' +
			'<tr><td>岱山-三江</td><td>11:20</td><td>17.0元</td></tr>' +
			'<tr><td>岱山-三江</td><td>12:00</td><td>17.0元</td></tr>' +
			'<tr><td>岱山-三江</td><td>12:40</td><td>17.0元</td></tr>' +
			'<tr><td>岱山-三江</td><td>13:10</td><td>17.0元</td></tr>' +
			'<tr><td>岱山-三江</td><td>14:00</td><td>17.0元</td></tr>' +
			'<tr><td>岱山-三江</td><td>14:30</td><td>17.0元</td></tr>' +
			'<tr><td>岱山-三江</td><td>15:10</td><td>17.0元</td></tr>' +
			'<tr><td>岱山-三江</td><td>15:15</td><td>17.0元</td></tr>' +
			'<tr><td>岱山-三江</td><td>15:50</td><td>17.0元</td></tr>' +
			'<tr><td>岱山-三江</td><td>16:40</td><td>17.0元</td></tr>' +
			'<tr><td>岱山-三江</td><td>17:20</td><td>17.0元</td></tr>' +
			'<tr><td>岱山-三江</td><td>18:30</td><td>17.0元</td></tr>' +
			'<tr><td>岱山-三江</td><td>20:00</td><td>17.0元</td></tr>' +
			'<tr><td>岱山-三江（高速轮）</td><td>6:40</td><td>29.0元</td></tr>' +
			'</tbody>'
		);
		$(".detail_2").html(
			'<tbody>' +
			'<tr><td>岱山-三江（高速轮）</td><td>7:00</td><td>29.0元</td></tr>' +
			'<tr><td>岱山-三江（高速轮）</td><td>7:45</td><td>29.0元</td></tr>' +
			'<tr><td>岱山-三江（高速轮）</td><td>8:10</td><td>29.0元</td></tr>' +
			'<tr><td>岱山-三江（高速轮）</td><td>8:30</td><td>29.0元</td></tr>' +
			'<tr><td>岱山-三江（高速轮）</td><td>8:50</td><td>29.0元</td></tr>' +
			'<tr><td>岱山-三江（高速轮）</td><td>9:10</td><td>29.0元</td></tr>' +
			'<tr><td>岱山-三江（高速轮）</td><td>9:35</td><td>29.0元</td></tr>' +
			'<tr><td>岱山-三江（高速轮）</td><td>10:00</td><td>29.0元</td></tr>' +
			'<tr><td>岱山-三江（高速轮）</td><td>10:30</td><td>29.0元</td></tr>' +
			'<tr><td>岱山-三江（高速轮）</td><td>11:00</td><td>29.0元</td></tr>' +
			'<tr><td>岱山-三江（高速轮）</td><td>11:40</td><td>29.0元</td></tr>' +
			'<tr><td>岱山-三江（高速轮）</td><td>12:25</td><td>29.0元</td></tr>' +
			'<tr><td>岱山-三江（高速轮）</td><td>12:50</td><td>29.0元</td></tr>' +
			'<tr><td>岱山-三江（高速轮）</td><td>13:30</td><td>29.0元</td></tr>' +
			'<tr><td>岱山-三江（高速轮）</td><td>14:10</td><td>29.0元</td></tr>' +
			'<tr><td>岱山-三江（高速轮）</td><td>14:40</td><td>29.0元</td></tr>' +
			'<tr><td>岱山-三江（高速轮）</td><td>15:00</td><td>29.0元</td></tr>' +
			'<tr><td>岱山-三江（高速轮）</td><td>15:40</td><td>29.0元</td></tr>' +
			'<tr><td>岱山-三江（高速轮）</td><td>16:20</td><td>29.0元</td></tr>' +
			'<tr><td>岱山-三江（高速轮）</td><td>17:00</td><td>29.0元</td></tr>' +
			'<tr><td>岱山-三江（高速轮）</td><td>17:40</td><td>29.0元</td></tr>' +
			'</tbody>'
		)
	}
	function table_21_input() {
		$(".detail_1").html(
			'<tbody>' +
			'<tr><td>岱山-上海</td><td>7:40</td><td>80.0元</td></tr>' +
			'</tbody>'
		);
		$(".detail_2").html(
			'<tbody>' +
			'<tr><td>岱山-上海</td><td>14:50</td><td>80.0元</td></tr>' +
			'</tbody>'
		)
	}
	function table_22_input() {
		$(".detail_1").html(
			'<tbody>' +
			'<tr><td>岱山-秀山</td><td>8:25</td><td>10.0元</td></tr>' +
			'<tr><td>岱山-秀山</td><td>10:50</td><td>10.0元</td></tr>' +
			'<tr><td>岱山-秀山</td><td>16:50</td><td>10.0元</td></tr>' +
			'</tbody>'
		);
		$(".detail_2").html(
			'<tbody>' +
			'<tr><td>岱山-秀山</td><td>6:25</td><td>10.0元</td></tr>' +
			'<tr><td>岱山-秀山</td><td>13:25</td><td>10.0元</td></tr>' +
			'<tr><td>岱山-秀山</td><td>15:30</td><td>10.0元</td></tr>' +
			'</tbody>'
		)
	}
	function table_23_input() {
		$(".detail_1").html(
			'<tbody>' +
			'<tr><td>嵊泗泗礁-上海(南浦大桥)</td><td>8:20</td><td>76.0元</td></tr>' +
			'<tr><td>嵊泗泗礁-上海(南浦大桥)</td><td>9:30</td><td>76.0元</td></tr>' +
			'<tr><td>嵊泗泗礁-上海(南浦大桥)</td><td>9:15</td><td>76.0元</td></tr>' +
			'</tbody>'
		);
		$(".detail_2").html(
			'<tbody>' +
			'<tr><td>嵊泗泗礁-上海(南浦大桥)</td><td>13:00</td><td>76.0元</td></tr>' +
			'<tr><td>嵊泗泗礁-上海(南浦大桥)</td><td>14:50</td><td>76.0元</td></tr>' +
			'<tr><td>嵊泗泗礁-上海(南浦大桥)</td><td>13:01</td><td>76.0元</td></tr>' +
			'</tbody>'
		)
	}
	function table_24_input() {
		$(".detail_1").html(
			'<tbody>' +
			'<tr><td>嵊泗泗礁-三江</td><td>7:50</td><td>125.0元</td></tr>' +
			'<tr><td>嵊泗泗礁-三江</td><td>9:10</td><td>125.0元</td></tr>' +
			'<tr><td>嵊泗泗礁-三江</td><td>12:05</td><td>125.0元</td></tr>' +
			'</tbody>'
		);
		$(".detail_2").html(
			'<tbody>' +
			'<tr><td>嵊泗泗礁-三江</td><td>13:10</td><td>125.0元</td></tr>' +
			'<tr><td>嵊泗泗礁-三江</td><td>14:40</td><td>125.0元</td></tr>' +
			'</tbody>'
		)
	}
	function table_25_input() {
		$(".detail_1").html(
			'<tbody>' +
			'<tr><td>嵊泗泗礁-高亭</td><td>14:40</td><td>106.0元</td></tr>' +
			'</tbody>'
		);
		$(".detail_2").html(
			'<tbody>' +
			'</tbody>'
		)
	}
	function table_26_input() {
		$(".detail_1").html(
			'<tbody>' +
			'<tr><td>嵊泗泗礁-衢山</td><td>7:50</td><td>65.0元</td></tr>' +
			'</tbody>'
		);
		$(".detail_2").html(
			'<tbody>' +
			'</tbody>'
		)
	}
	function table_27_input() {
		$(".detail_1").html(
			'<tbody>' +
			'<tr><td>嵊泗泗礁-大洋山</td><td>14:50</td><td>73.0元</td></tr>' +
			'</tbody>'
		);
		$(".detail_2").html(
			'<tbody>' +
			'</tbody>'
		)
	}
	function table_28_input() {
		$(".detail_1").html(
			'<tbody>' +
			'<tr><td>三江-洋山</td><td>8:30</td><td>96.0元</td></tr>' +
			'</tbody>'
		);
		$(".detail_2").html(
			'<tbody>' +
			'<tr><td>三江-洋山</td><td>14:00</td><td>96.0元</td></tr>' +
			'</tbody>'
		)
	}


	//起点站定位加
	function sposjia() {
			_items.children("li").eq(spos).removeClass("active");
			spos += 1;
			_items.children("li").eq(spos).addClass("active");
		}
		//起点站定位减

	function sposjian() {
		_items.children("li").eq(spos).removeClass("active");
		spos -= 1;
		_items.children("li").eq(spos).addClass("active");
	}

}