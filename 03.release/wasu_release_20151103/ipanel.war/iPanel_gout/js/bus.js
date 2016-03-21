// JScript source code
document.onkeydown = grabEvent;
document.onirkeypres = grabEvent;
var list_Pos = 0;
var area_Pos = 5;
var start_Pos = 0; //起始点指针
var q = 0 //左右增加票务信息
var dropdown_Pos_1 = 0 //第二个下拉的框指针

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
					ChangeClass_up('train_end_input', 'train_start_input');
					list_Pos--;
				} else if (list_Pos == 2) {
					ChangeClass_up('train_back', 'train_end_input');
					list_Pos = 1;
				} else if (list_Pos == 3) {
					ChangeClass_up('train_search', 'train_end_input');
					list_Pos = 1;
				} else if (list_Pos == 4) {
					ChangeClass_up('train_btn_0', 'train_back');
					list_Pos = 2;
				} else if (list_Pos == 6) {
					ChangeClass_up('train_btn_2', 'train_search');
					list_Pos = 3;
				}
			} else if (area_Pos == 10) {
				dbroad_up();
			} else if (area_Pos == 11) {
				font_up();
			} else if (area_Pos == 51) {
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
			//down     
		case 2:
		case 40:
		case 31:
		case 270:
			if (area_Pos == 5) {
				if (list_Pos == 0) {
					ChangeClass_down('train_start_input', 'train_end_input');
					list_Pos++;
				} else if (list_Pos == 1) {
					ChangeClass_down('train_end_input', 'train_search');
					list_Pos = 3;
				} else if (list_Pos == 2) {
					ChangeClass_down('train_back', 'train_btn_0');
					list_Pos = 4;
				} else if (list_Pos == 3) {
					ChangeClass_down('train_search', 'train_btn_2');
					list_Pos = 6;
				}
			} else if (area_Pos == 10) {
				dbroad_down();
			} else if (area_Pos == 11) {
				font_down();
			} else if (area_Pos == 51) {
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
			//left
		case 3:
		case 37:
		case 29:
		case 271:
			if (area_Pos == 5) {
				if (list_Pos == 3) {
					ChangeClass2('train_search', 'train_back');
				} else if (list_Pos == 6) {
					ChangeClass2('train_btn_2', 'train_btn_1');
				} else if (list_Pos == 5) {
					ChangeClass2('train_btn_1', 'train_btn_0');
				} else if (list_Pos == 4) {
					ChangeClass2('train_btn_0', 'train_search');
				} else if (list_Pos == 2) {
					ChangeClass2('train_back', 'train_end_input');
				} else if (list_Pos == 1) {
					ChangeClass2('train_end_input', 'train_start_input');
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
					ChangeClass('train_back', 'train_search')
				} else if (list_Pos == 3) {
					ChangeClass('train_search', 'train_btn_0')
				} else if (list_Pos == 4) {
					ChangeClass('train_btn_0', 'train_btn_1')
				} else if (list_Pos == 5) {
					ChangeClass('train_btn_1', 'train_btn_2')
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
					$(".start_dropdownlist").show();
					area_Pos = 51;
				} else if (list_Pos == 1) {
					$(".start_dropdownlist_1").show();
					area_Pos = 41;
				} else if (list_Pos == 2) {
					location.href = '../index.html?tag=2';
				} else if (list_Pos == 3) {
					list_Pos = 9; //弹出的查询记录 指针
					$(".train_search").removeClass("active");
					$(".train_popup0").show();
					var start_detail = $(".start").html();
					var end_detail = $(".end").html();
					$(".start_station").html(start_detail);
					console.log(start_detail + end_detail)
					for (var m = 0; m < busArray.length; m++) {
						if (start_detail == busArray[m].start && end_detail == busArray[m].end) {
							if (q % 3 == 0) {
								$(".detail_1").children('tbody').append("<tr><td class='start_station'>" + busArray[m].start + "</td><td>-</td><td class='end_station'>" + busArray[m].end_station + "</td><td class='time'>" + busArray[m].bus_time + "</td><td class='ticket'>" + busArray[m].bus_tick + "</td></tr>");
								q++;
							} else if (q % 3 == 1) {
								$(".detail_2").children('tbody').append("<tr><td class='start_station'>" + busArray[m].start + "</td><td>-</td><td class='end_station'>" + busArray[m].end_station + "</td><td class='time'>" + busArray[m].bus_time + "</td><td class='ticket'>" + busArray[m].bus_tick + "</td></tr>");
								q++;
							} else {
								$(".detail_3").children('tbody').append("<tr><td class='start_station'>" + busArray[m].start + "</td><td>-</td><td class='end_station'>" + busArray[m].end_station + "</td><td class='time'>" + busArray[m].bus_time + "</td><td class='ticket'>" + busArray[m].bus_tick + "</td></tr>");
								q++;
							}
						}
					}
				} else if (list_Pos == 4) {
					location.href = '../iPanel_gout/train.html';
					list_Pos++;
				} else if (list_Pos == 5) {
					location.href = '../iPanel_gout/ship.html';
					list_Pos++;
				} else if (list_Pos == 6) {
					location.href = '../iPanel_gout/flight.html';
					list_Pos++;
				} else if (list_Pos == 9) {
					$(".train_popup0").hide();
					$(".train_search").addClass("active");
					$(".detail_1").html("<tbody>"+"</tbody>");
					$(".detail_2").html("<tbody>"+"</tbody>");
					$(".detail_3").html("<tbody>"+"</tbody>");
					list_Pos = 3;
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
			} else if (area_Pos == 51) {
				if (start_Pos == 0) {
					$(".start").html("定海");
					start_Pos = 0;
					$(".start_dropdownlist").hide();
					area_Pos = 5;
				} else if (start_Pos == 1) {
					$(".start").html("普陀");
					start_Pos = 0;
					$(".start_dropdownlist").hide();
					area_Pos = 5;
				} else if (start_Pos == 2) {
					$(".start").html("新城");
					start_Pos = 0;
					$(".start_dropdownlist").hide();
					area_Pos = 5;
				}
			} else if (area_Pos == 41) {
				var dropdown_Pos_1_text = $('.items_1_' + dropdown_Pos_1).html();
				$('.end').html(dropdown_Pos_1_text);
				$(".start_dropdownlist_1").hide();
				$('.items_1_' + dropdown_Pos_1).removeClass('active');
				dropdown_Pos_1 = 0;
				$('.items_1_' + dropdown_Pos_1).addClass('active');
				area_Pos = 5;
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
	if (dropdown_Pos_1 < 25) {
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

//right
function ChangeClass(c1, c2) {
		$("." + c1 + "").removeClass("active");
		$("." + c2 + "").addClass("active");
		sfz_num = "";
		text_1 = "";
		list_Pos++;
	}
	//left

function ChangeClass2(c1, c2) {
		$("." + c1 + "").removeClass("active");
		$("." + c2 + "").addClass("active");
		sfz_num = "";
		text_1 = "";
		list_Pos--;
	}
	//down

function ChangeClass_down(c1, c2) {
		$("." + c1 + "").removeClass("active");
		$("." + c2 + "").addClass("active");
		sfz_num = "";
		text_1 = "";
	}
	//up

function ChangeClass_up(c1, c2) {
	$("." + c1 + "").removeClass("active");
	$("." + c2 + "").addClass("active");
	sfz_num = "";
	text_1 = "";
}