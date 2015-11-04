var db_Pos = 0;
var sfz_num = ""; //身份证号
var sfz_password = 0; //密码
var k = 0; //判断是否第一次
var font_Pos = 0;
var font_Pos_1 = 0;
var shuru = ""; //输入法
var a_Pos = 0; //数组指针
var text_0 = "" //文字
var text_1 = ""

//键盘左右移动
function dbroad_focus(__num) {
		shuru = $(".db38").html();
		if (shuru == '英文') {
			if (__num == 1) {
				if (db_Pos < 37) { //只有英文37
					$(".db" + db_Pos).removeClass("active");
					db_Pos = db_Pos + __num;
					$(".db" + db_Pos).addClass("active");
				}
			} else if (__num == -1) {
				if (db_Pos > 0) {
					$(".db" + db_Pos).removeClass("active");
					db_Pos = db_Pos + __num;
					$(".db" + db_Pos).addClass("active");
				}
			}
		} else {
			if (area_Pos == 10) {
				if (__num == 1) {
					if (db_Pos < 38) {
						$(".db" + db_Pos).removeClass("active");
						db_Pos = db_Pos + __num;
						$(".db" + db_Pos).addClass("active");
					}
				} else if (__num == -1) {
					if (db_Pos == 0 || db_Pos == 10 || db_Pos == 20 || db_Pos == 30) {
						$(".db" + db_Pos).removeClass("active");
						area_Pos = 11;
						font_Pos = 0;
						$(".font_li_" + font_Pos).addClass("active");
					} else if (db_Pos > 0) {
						$(".db" + db_Pos).removeClass("active");
						db_Pos = db_Pos + __num;
						$(".db" + db_Pos).addClass("active");
					}
				}
			} else if (area_Pos == 11) {
				if (__num == 1) {
					if (font_Pos <= font_Pos_1 - 1) {
						$(".font_li_" + font_Pos).removeClass("active");
						font_Pos = font_Pos + __num;
						$(".font_li_" + font_Pos).addClass("active");
					} else if (font_Pos == 36) {
						//						alert("font_Pos"+font_Pos+"!!2222"+"font_Pos_1"+font_Pos_1);
						console.log("font_Pos" + font_Pos + "!!2222" + "font_Pos_1" + font_Pos_1);
						$(".font_li_" + font_Pos).removeClass("active");
						font_Pos = 37;
						$(".font_li_" + font_Pos).addClass("active");
					}
				} else if (__num == -1) {
					if (font_Pos == 36) {
						console.log("font_Pos" + font_Pos + "!!2222" + "font_Pos_1" + font_Pos_1);
						$(".font_li_" + font_Pos).removeClass("active");
						font_Pos = font_Pos_1;
						$(".font_li_" + font_Pos).addClass("active");
					} else if (font_Pos > 0) {
						$(".font_li_" + font_Pos).removeClass("active");
						font_Pos = font_Pos + __num;
						$(".font_li_" + font_Pos).addClass("active");
					}
				}
			}

		}
	}
	//键盘向上

function dbroad_up() {
		var db = db_Pos - 10;
		if (db == 28) {
			$(".db" + db_Pos).removeClass('active');
			db_Pos = 29;
			$(".db" + db_Pos).addClass('active');
		} else if (db >= 0) {
			$(".db" + db_Pos).removeClass('active');
			db_Pos = db;
			$(".db" + db).addClass('active');
		}
	}
	//键盘向下

function dbroad_down() {
		var db = db_Pos + 10;
		if (db < 38) {
			$(".db" + db_Pos).removeClass('active');
			db_Pos = db;
			$(".db" + db).addClass('active');
		} else if (db == 37 || db == 38) {
			$(".db" + db_Pos).removeClass('active');
			db_Pos = 37;
			$(".db" + db_Pos).addClass('active');
		} else if (db == 39) {
			$(".db" + db_Pos).removeClass('active');
			db_Pos = 37;//只有英文37
			$(".db" + db_Pos).addClass('active');
		}
	}
	//文字区域向上

function font_up() {
		if (font_Pos == 36) {
			$(".font_li_" + font_Pos).removeClass("active");
			font_Pos = font_Pos_1;
			$(".font_li_" + font_Pos).addClass("active");
		} else if (font_Pos == 37) {
			$(".font_li_" + font_Pos).removeClass("active");
			font_Pos = font_Pos_1;
			$(".font_li_" + font_Pos).addClass("active");
		} else if (font_Pos > 8) {
			$(".font_li_" + font_Pos).removeClass("active");
			font_Pos = font_Pos - 9;
			$(".font_li_" + font_Pos).addClass("active");
		}
	}
	//文字区域向下

function font_down() {
		if (font_Pos < 38) {
			font_Pos = font_Pos + 9;
			console.log($(".font_li_" + font_Pos));
			if ($(".font_li_" + font_Pos).length != 0) {
				console.log("font_Pos" + font_Pos + "!!2222");
				if (font_Pos == 43 || font_Pos == 44) {
					font_Pos = font_Pos - 9;
					$(".font_li_" + font_Pos).removeClass("active");
					font_Pos = 36;
					$(".font_li_" + font_Pos).addClass("active");
				} else {
					font_Pos = font_Pos - 9;
					$(".font_li_" + font_Pos).removeClass("active");
					font_Pos = font_Pos + 9;
					$(".font_li_" + font_Pos).addClass("active");
				}
			} else {
				console.log("font_Pos" + font_Pos + "!!2222");
				font_Pos = font_Pos - 9;
				$(".font_li_" + font_Pos).removeClass("active");
				font_Pos = 36;
				$(".font_li_" + font_Pos).addClass("active");
			}
		}
	}
	//显示中文文字

function font_show() {
		if (shuru == '中文') {
			$(".pinyin_content").html("<ul></ul>");
			var a = getChars(sfz_num);
			var a_length = a.length;
			var b = "";
			for (var f = 0; f <= 35; f++) {
				b = a[a_Pos];
				console.log(a_Pos)
				if (b != null) {
					$(".pinyin_content").children('ul').append("<li class='font_li_" + f + "'>" + b + "</li>");
					font_Pos_1 = a_Pos;
					a_Pos++;
				}
			}
			if (a_length >= 37) {
				$(".font_li_36").css({
					'visibility': 'visible'
				});
				$(".font_li_37").css({
					'visibility': 'visible'
				});
			}
		}
	}
	//文字框翻next页

function font_show_page_next() {
		var a = getChars(sfz_num);
		var a_length = a.length;
		if (a_Pos < a_length) {
			$(".pinyin_content").html("<ul></ul>");
			for (var f = 0; f <= 35; f++) {
				b = a[a_Pos];
				if (b != null) {
					$(".pinyin_content").children('ul').append("<li class='font_li_" + f + "'>" + b + "</li>");
					font_Pos_1 = f;
					a_Pos++;
				}
			}
		}
		console.log("font_Pos" + font_Pos + "!||||||" + "font_Pos_1" + font_Pos_1);
	}
	//翻前页

function font_show_page_previous() {
		var a = getChars(sfz_num);
		var a_length = a.length;
		if (a_length >= 36 && a_length <= 71) {
			$(".pinyin_content").html("<ul></ul>");
			a_Pos = 0;
			for (var f = 0; f <= 35; f++) {
				b = a[a_Pos];
				if (b != null) {
					$(".pinyin_content").children('ul').append("<li class='font_li_" + f + "'>" + b + "</li>");
					font_Pos_1 = 36 ;
					a_Pos++;
				}
			}
		} else if (a_length >= 72 && a_length <= 107) {
			$(".pinyin_content").html("<ul></ul>");
			a_Pos = 72;
			for (var f = 0; f <= 35; f++) {
				b = a[a_Pos];
				if (b != null) {
					$(".pinyin_content").children('ul').append("<li class='font_li_" + f + "'>" + b + "</li>");
					font_Pos_1 = 72 ;
					a_Pos++;
				}
			}
		} else if (a_length >= 108 && a_length <= 143) {
			$(".pinyin_content").html("<ul></ul>");
			a_Pos = 108;
			for (var f = 0; f <= 35; f++) {
				b = a[a_Pos];
				if (b != null) {
					$(".pinyin_content").children('ul').append("<li class='font_li_" + f + "'>" + b + "</li>");
					font_Pos_1 = 108 ;
					a_Pos++;
				}
			}
		} else if (a_length >= 144 && a_length <= 179) {
			$(".pinyin_content").html("<ul></ul>");
			a_Pos = 144;
			for (var f = 0; f <= 35; f++) {
				b = a[a_Pos];
				if (b != null) {
					$(".pinyin_content").children('ul').append("<li class='font_li_" + f + "'>" + b + "</li>");
					font_Pos_1 = 144 ;
					a_Pos++;
				}
			}
		}
	}
	//中文切换

function font_hidden() {
	$(".font_li_" + font_Pos).removeClass("active");
	text_0 = $(".font_li_" + font_Pos).html();
	text_1 = text_1 + text_0;
	$(".sfz").html(text_1);
	sfz_num = "";
	area_Pos--;
	db_Pos = 0;
	a_Pos = 0;
	$(".db" + db_Pos).addClass("active");
	var a = getChars(sfz_num);
	var a_length = a.length;
	if (a_length >= 37) {
		$(".font_li_36").css({
			'visibility': 'visible'
		});
		$(".font_li_37").css({
			'visibility': 'visible'
		});
	}
}

//键盘输入

function dbroad_enter(cl) {
		shuru = $(".db38").html();
		if (db_Pos == 0) {
			sfz_num = sfz_num + "1";
			$("." + cl + "").html(text_1 + sfz_num);
			font_show();
		} else if (db_Pos == 1) {
			sfz_num = sfz_num + "2";
			$("." + cl + "").html(text_1 + sfz_num);
			font_show();
		} else if (db_Pos == 2) {
			sfz_num = sfz_num + "3";
			$("." + cl + "").html(text_1 + sfz_num);
			font_show();
		} else if (db_Pos == 3) {
			sfz_num = sfz_num + "4";
			$("." + cl + "").html(text_1 + sfz_num);
			font_show();
		} else if (db_Pos == 4) {
			sfz_num = sfz_num + "5";
			$("." + cl + "").html(text_1 + sfz_num);
			font_show();
		} else if (db_Pos == 5) {
			sfz_num = sfz_num + "6";
			$("." + cl + "").html(text_1 + sfz_num);
			font_show();
		} else if (db_Pos == 6) {
			sfz_num = sfz_num + "7";
			$("." + cl + "").html(text_1 + sfz_num);
			font_show();
		} else if (db_Pos == 7) {
			sfz_num = sfz_num + "8";
			$("." + cl + "").html(text_1 + sfz_num);
			font_show();
		} else if (db_Pos == 8) {
			sfz_num = sfz_num + "9";
			$("." + cl + "").html(text_1 + sfz_num);
			font_show();
		} else if (db_Pos == 9) {
			sfz_num = sfz_num + "0";
			$("." + cl + "").html(text_1 + sfz_num);
			font_show();
		} else if (db_Pos == 10) {
			sfz_num = sfz_num + "q";
			$("." + cl + "").html(text_1 + sfz_num);
			font_show();
		} else if (db_Pos == 11) {
			sfz_num = sfz_num + "w";
			$("." + cl + "").html(text_1 + sfz_num);
			font_show();
		} else if (db_Pos == 12) {
			sfz_num = sfz_num + "e";
			$("." + cl + "").html(text_1 + sfz_num);
			font_show();
		} else if (db_Pos == 13) {
			sfz_num = sfz_num + "r";
			$("." + cl + "").html(text_1 + sfz_num);
			font_show();
		} else if (db_Pos == 14) {
			sfz_num = sfz_num + "t";
			$("." + cl + "").html(text_1 + sfz_num);
			font_show();
		} else if (db_Pos == 15) {
			sfz_num = sfz_num + "y";
			$("." + cl + "").html(text_1 + sfz_num);
			font_show();
		} else if (db_Pos == 16) {
			sfz_num = sfz_num + "u";
			$("." + cl + "").html(text_1 + sfz_num);
			font_show();
		} else if (db_Pos == 17) {
			sfz_num = sfz_num + "i";
			$("." + cl + "").html(text_1 + sfz_num);
			font_show();
		} else if (db_Pos == 18) {
			sfz_num = sfz_num + "o";
			$("." + cl + "").html(text_1 + sfz_num);
			font_show();
		} else if (db_Pos == 19) {
			sfz_num = sfz_num + "p";
			$("." + cl + "").html(text_1 + sfz_num);
			font_show();
		} else if (db_Pos == 20) {
			sfz_num = sfz_num + "a";
			$("." + cl + "").html(text_1 + sfz_num);
			font_show();
		} else if (db_Pos == 21) {
			sfz_num = sfz_num + "s";
			$("." + cl + "").html(text_1 + sfz_num);
			font_show();
		} else if (db_Pos == 22) {
			sfz_num = sfz_num + "d";
			$("." + cl + "").html(text_1 + sfz_num);
			font_show();
		} else if (db_Pos == 23) {
			sfz_num = sfz_num + "f";
			$("." + cl + "").html(text_1 + sfz_num);
			font_show();
		} else if (db_Pos == 24) {
			sfz_num = sfz_num + "g";
			$("." + cl + "").html(text_1 + sfz_num);
			font_show();
		} else if (db_Pos == 25) {
			sfz_num = sfz_num + "h";
			$("." + cl + "").html(text_1 + sfz_num);
			font_show();
		} else if (db_Pos == 26) {
			sfz_num = sfz_num + "j";
			$("." + cl + "").html(text_1 + sfz_num);
			font_show();
		} else if (db_Pos == 27) {
			sfz_num = sfz_num + "k";
			$("." + cl + "").html(text_1 + sfz_num);
			font_show();
		} else if (db_Pos == 28) {
			sfz_num = sfz_num + "l";
			$("." + cl + "").html(text_1 + sfz_num);
			font_show();
		} else if (db_Pos == 30) {
			sfz_num = sfz_num + "z";
			$("." + cl + "").html(text_1 + sfz_num);
			font_show();
		} else if (db_Pos == 31) {
			sfz_num = sfz_num + "x";
			$("." + cl + "").html(text_1 + sfz_num);
			font_show();
		} else if (db_Pos == 32) {
			sfz_num = sfz_num + "c";
			$("." + cl + "").html(text_1 + sfz_num);
			font_show();
		} else if (db_Pos == 33) {
			sfz_num = sfz_num + "v";
			$("." + cl + "").html(text_1 + sfz_num);
			font_show();
		} else if (db_Pos == 34) {
			sfz_num = sfz_num + "b";
			$("." + cl + "").html(text_1 + sfz_num);
			font_show();
		} else if (db_Pos == 35) {
			sfz_num = sfz_num + "n";
			$("." + cl + "").html(text_1 + sfz_num);
			font_show();
		} else if (db_Pos == 36) {
			sfz_num = sfz_num + "m";
			$("." + cl + "").html(text_1 + sfz_num);
			font_show();
		} else if (db_Pos == 29) {
			dbroad_hidden();
		} else if (db_Pos == 37) {
			if (shuru == '英文') {
				sfz_num = sfz_num.substr(0, sfz_num.length - 1);
				$("." + cl + "").html(text_1 + sfz_num);
			} else {
				if (sfz_num == "") {
					text_1 = text_1.substr(0, text_1.length - 1);
					$("." + cl + "").html(text_1);
				} else {
					sfz_num = sfz_num.substr(0, sfz_num.length - 1);
					$("." + cl + "").html(text_1 + sfz_num);
					font_Pos = 0;
					font_Pos_1 = 0;
					a_Pos = 0;
					font_show();
				}
			}
		} else if (db_Pos == 38) {
			if (shuru == '英文') {
				$(".db38").html("中文");
				$(".pinyin").css({
					'visibility': 'visible'
				});
				shuru = '中文';
				font_show();
			} else {
				$(".db38").html("英文");
				$(".pinyin").css({
					'visibility': 'hidden'
				});
				$(".font_li_36").css({
					'visibility': 'hidden'
				});
				$(".font_li_37").css({
					'visibility': 'hidden'
				});
			}
		}
	}
	//显示键盘

function dbroad_visible() {
		$(".dbroad").css({
			'visibility': 'visible'
		});
		$(".db0").addClass("active");
		area_Pos = 10;
	}
	//消失键盘

function dbroad_hidden() {
	$(".dbroad").css({
		'visibility': 'hidden'
	});
	$(".pinyin").css({
		'visibility': 'hidden'
	});
	$(".font_li_36").css({
		'visibility': 'hidden'
	});
	$(".font_li_37").css({
		'visibility': 'hidden'
	});
	$(".db" + db_Pos).removeClass("active");
	area_Pos = 5;
	db_Pos = 0;
	k = 0;
	$(".db38").html("英文");
}