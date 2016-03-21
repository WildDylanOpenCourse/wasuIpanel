// JScript source code
var zz_Pos = 0; // 第一个栏目上部分的指针
var sb_Pos = 0; // 第二个栏目上部分的指针
var cx_Pos = 0; // 出行指针
var yy_Pos = 0; // 医院
var gg_Pos = 0; // 公共自行车
var san_Pos = 0;//三务公开
var list_Pos = 0; // 导航指针
var list_Pos_t = 0; // 记录导航的前一个指针
var r = 0; // 上下部分指针
var x = 0; // 判断要消失的页面
var returnURL = ""; // 返回页面地址

var stoken = "F7E0E98A090BB20CB8F50FBA18735846";
var apiKey = "12345";

function showClock() {

	var hours = $(".hour").text();
	var minutes = $(".minutes").text();
	if (hours <= 23) {
		minutes++;
		if (minutes.toString().length == 1) {
			minutes = "0" + minutes;
		}
		if (minutes == 60) {
			minutes = "00";
			hours++;
			if (hours.toString().length == 1) {
				hours = "0" + hours;
			} else {
				// hours++;
			}
		}
	} else if (hours == 24) {
		hours = "00"
	}
	$('.hour').html(hours);
	$('.minutes').html(minutes);

	setTimeout("showClock()", 60000);
}

// 从后台取时间
function gettime() {

	$.ajax({
		type : "POST",
		url : time_url,
		data : {
			call : "gettime"
		},
		cache : false,
		dataType : "json",
		success : function(data) {
			var time = data.split(':');
			$(".hour").html(time[0]);
			$(".minutes").text(time[1]);
			showClock();
		}
	});
}

// 从后台取天气
function getWeather(call) {

	// 如果cookies中没有  从后台取
	$.ajax({
		type : "POST",
		url : weather_url,
		data : {
			call : call
		},
		cache : false,
		dataType : "json",
		success : function(data) {
			var weather = data;
			$(".weather").text(weather);
			document.cookie = "weather="+encodeURIComponent(weather);
		}
	});
}

//从cookie中取天气
function getWeatherFromCookie() {
	var arrCookies = document.cookie.split(";");
	for(var i=0; i<arrCookies.length; i++) {
		var info = arrCookies[i].split("=");
		//天气
		if("weather" == info[0]) {
			$(".weather").text(decodeURIComponent(info[1]));
			return true;
		}
	}
	return false;
}

function init() {

	// 后台取时间
	gettime();
	// init
	var href = location.href;
	var news_id = getParamString(href, "tag");
	returnURL = getParamString(href, "returnURL");
	
	// 没有参数tag的情况下
	if ("" == news_id) {
		list_Pos = 0;
	// 有参数tag的情况下
	} else {
		// 得到导航指针和它的前一个指针(这种情况下就是他本身)
		list_Pos = parseInt(news_id)
		list_Pos_t = news_id;
	}
	// 返回页面地址
	if ("" == returnURL) {
		if (null != getCookie("returnURL")) {
			returnURL = getCookie("returnURL");
		} else {
			returnURL = wasu_url;
		}
	} else {
		document.cookie = "returnURL="+encodeURIComponent(returnURL);
	}
	
	change_tv_bg();
	$(".contentBody_0_bottom" + list_Pos).css({
		'visibility' : "visible"
	});
	$(".contentBody_0_bottom" + list_Pos + "_0").addClass("active");
	$(".contentBody_1_li_" + list_Pos).css({
		'color' : '#107478'
	});
	$(".contentBody_1_li_" + list_Pos).addClass("active");
	
	// cookie里没有天气信息
	if("" == news_id || !getWeatherFromCookie()) {
		// 后台取定海的天气
		getWeather("getDinghaiWeather");
	}

	// 导航栏在政策信息时
	if(0 == list_Pos) {
		// 播放视频
		play();
	}
}

// 跳转三务公开的函数getCookie("stbid")
function goToSanwu() {
	var sanwu_url;
	sanwu_url = sanwu_base_url+'?type=1&stbId='+hardware.STB.serial+'&index=http://22.192.1.201:9005/index.html?tag=6';//+location.href;
	location.href = sanwu_url;
}

document.onkeydown = grabEvent;
document.onirkeypres = grabEvent;

// 导航
function list_focus(__num) {
	if (list_Pos == 0) {
		if (__num == -1) {
			$(".contentBody_1_li_" + list_Pos).removeClass("active");
			$(".contentBody_1_li_" + list_Pos).css({
				'color' : '#697783'
			});
			list_Pos = 7;
			// $(".contentBody_1_li_" + list_Pos).addClass("active");
			$(".contentBody_1_li_" + list_Pos).css({
				'color' : '#ffc600'
			});
		} else {
			list_Pos_t = list_Pos;
			change_list(__num);
		}
	} else if (list_Pos == 7) {
		if (__num == 1) {
			$(".contentBody_1_li_" + list_Pos).removeClass("active");
			$(".contentBody_1_li_" + list_Pos).css({
				'color' : '#697783'
			});
			list_Pos = 0;
			$(".contentBody_1_li_" + list_Pos).addClass("active");
			$(".contentBody_1_li_" + list_Pos).css({
				'color' : '#00cad8'
			});
		} else {
			change_list(__num);
		}
	} else {
		change_list(__num);
	}
}

// 导航条转换返回橘色
function change_list(__num) {
	$(".contentBody_1_li_" + list_Pos).removeClass("active");
	$(".contentBody_1_li_" + list_Pos).css({
		'color' : '#697783'
	});
	list_Pos = list_Pos + __num;
	$(".contentBody_1_li_" + list_Pos).addClass("active");
	if (list_Pos == 7) {
		$(".contentBody_1_li_" + list_Pos).css({
			'color' : '#ffc600'
		});
		$(".contentBody_1_li_" + list_Pos).css({
			'background' : 'none'
		});
	} else {
		$(".contentBody_1_li_" + list_Pos).css({
			'color' : '#00cad8'
		});
	}
}

// 政策服务
function zhengce_service(__num) {
	if (__num == 1) {
		if (zz_Pos == 2 || zz_Pos == 3) {
			$(".contentBody_0_bottom0_" + zz_Pos).removeClass("active");
			zz_Pos = 4;
			$(".contentBody_0_bottom0_" + zz_Pos).addClass("active");
		} else {
			$(".contentBody_0_bottom0_" + zz_Pos).removeClass("active");
			zz_Pos = zz_Pos + __num;
			$(".contentBody_0_bottom0_" + zz_Pos).addClass("active");
		}
	} else if (__num == -1) {
		if (zz_Pos > 0) {
			if (zz_Pos == 2) {
				$(".contentBody_0_bottom0_" + zz_Pos).removeClass("active");
				zz_Pos = 0;
				$(".contentBody_0_bottom0_" + zz_Pos).addClass("active");
			} else {
				$(".contentBody_0_bottom0_" + zz_Pos).removeClass("active");
				zz_Pos = zz_Pos + __num;
				$(".contentBody_0_bottom0_" + zz_Pos).addClass("active");
			}
		}
	}
}
// 社保

function shebao_focus(__num) {
	if (__num == 1) {
		if (sb_Pos < 1) {
			$(".contentBody_0_bottom1_" + sb_Pos).removeClass('active');
			sb_Pos = sb_Pos + __num;
			$(".contentBody_0_bottom1_" + sb_Pos).addClass('active');
		}
	} else if (__num == -1) {
		if (sb_Pos > 0) {
			$(".contentBody_0_bottom1_" + sb_Pos).removeClass('active');
			sb_Pos = sb_Pos + __num;
			$(".contentBody_0_bottom1_" + sb_Pos).addClass('active');
		}
	}
}
// 出行

function chuxing_focus(__num) {
	if (__num == 1) {
		if (cx_Pos < 3) {
			$(".contentBody_0_bottom2_" + cx_Pos).removeClass('active');
			cx_Pos = cx_Pos + __num;
			$(".contentBody_0_bottom2_" + cx_Pos).addClass('active');
		}
	} else if (__num == -1) {
		if (cx_Pos > 0) {
			$(".contentBody_0_bottom2_" + cx_Pos).removeClass('active');
			cx_Pos = cx_Pos + __num;
			$(".contentBody_0_bottom2_" + cx_Pos).addClass('active');
		}
	}
}
// 医院

function hospital_focus(__num) {
	if (__num == 1) {
		if (yy_Pos < 2) {
			$(".contentBody_0_bottom3_" + yy_Pos).removeClass('active');
			yy_Pos = yy_Pos + __num;
			$(".contentBody_0_bottom3_" + yy_Pos).addClass('active');
		}
	} else if (__num == -1) {
		if (yy_Pos > 0) {
			$(".contentBody_0_bottom3_" + yy_Pos).removeClass('active');
			yy_Pos = yy_Pos + __num;
			$(".contentBody_0_bottom3_" + yy_Pos).addClass('active');
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
		// if (r == 1) {
		// r--;
		// if (list_Pos == 0) {
		// zz_Pos = 0;
		// $(".contentBody_0_bottom0_" + zz_Pos).addClass("active");
		// } else if (list_Pos == 1) {
		// $(".contentBody_0_bottom1").css({
		// "visibility": "visible"
		// });
		// $(".contentBody_0_bottom1_" + sb_Pos).addClass("active");
		// }
		// }
		// else if (r == 0) {
		if (r == 0) {
			if (list_Pos == 0) {
				if (zz_Pos == 3) {
					$(".contentBody_0_bottom0_" + zz_Pos).removeClass("active");
					zz_Pos = 2;
					$(".contentBody_0_bottom0_" + zz_Pos).addClass("active");
				} else if (zz_Pos == 2) {
					$(".contentBody_0_bottom0_" + zz_Pos).removeClass("active");
					zz_Pos = 0;
					$(".contentBody_0_bottom0_" + zz_Pos).addClass("active");
				} else if (zz_Pos == 4) {
					$(".contentBody_0_bottom0_" + zz_Pos).removeClass("active");
					zz_Pos = 1;
					$(".contentBody_0_bottom0_" + zz_Pos).addClass("active");
				}
			} else if (list_Pos == 2) {
				if (cx_Pos == 2) {
					$(".contentBody_0_bottom2_" + cx_Pos).removeClass("active");
					cx_Pos = 0;
					$(".contentBody_0_bottom2_" + cx_Pos).addClass("active");
				} else if (cx_Pos == 3) {
					$(".contentBody_0_bottom2_" + cx_Pos).removeClass("active");
					cx_Pos = 1;
					$(".contentBody_0_bottom2_" + cx_Pos).addClass("active");
				}
			} else if (list_Pos == 3) {
				if (yy_Pos == 1 || yy_Pos == 2) {
					$(".contentBody_0_bottom3_" + yy_Pos).removeClass('active');
					yy_Pos = 0;
					$(".contentBody_0_bottom3_" + yy_Pos).addClass('active');
				}
			}
		} else if (r == 1) {
			if (list_Pos == 0) {
				zz_Pos = 3;
				$(".contentBody_1_li_" + list_Pos).css({
					'color' : '#107478'
				});
				$(".contentBody_0_bottom" + list_Pos + "_" + zz_Pos).addClass(
						"active");
				r = 0;
			} else if (list_Pos == 1) {
				sb_Pos = 0;
				$(".contentBody_1_li_" + list_Pos).css({
					'color' : '#107478'
				});
				$(".contentBody_0_bottom" + list_Pos + "_" + sb_Pos).addClass(
						"active");
				r = 0;
			} else if (list_Pos == 2) {
				cx_Pos = 2;
				$(".contentBody_1_li_" + list_Pos).css({
					'color' : '#107478'
				});
				$(".contentBody_0_bottom" + list_Pos + "_" + cx_Pos).addClass(
						"active");
				r = 0;
			} else if (list_Pos == 3) {
				yy_Pos = 1;
				$(".contentBody_1_li_" + list_Pos).css({
					'color' : '#107478'
				});
				$(".contentBody_0_bottom" + list_Pos + "_" + yy_Pos).addClass(
						"active");
				r = 0;
			} else if (list_Pos == 5) {
				$(".contentBody_1_li_" + list_Pos).css({
					'color' : '#107478'
				});
				$(".contentBody_0_bottom" + list_Pos + "_0").addClass("active");
				r = 0;
			} else if (list_Pos == 6) {
				$(".contentBody_1_li_" + list_Pos).css({
					'color': '#107478'
				});
				$(".contentBody_0_bottom" + list_Pos + "_0").addClass("active");
				r = 0;
			}
		}
		// }
		return 0;
		break;
	// down
	case 2:
	case 40:
	case 31:
	case 270:
		if (r == 0) {
			if (list_Pos == 0) {
				if (zz_Pos == 1) {
					$(".contentBody_0_bottom0_" + zz_Pos).removeClass("active");
					zz_Pos = 4;
					$(".contentBody_0_bottom0_" + zz_Pos).addClass("active");
				} else if (zz_Pos == 0) {
					$(".contentBody_0_bottom0_" + zz_Pos).removeClass("active");
					zz_Pos = 2;
					$(".contentBody_0_bottom0_" + zz_Pos).addClass("active");
				} else if (zz_Pos == 2) {
					$(".contentBody_0_bottom0_" + zz_Pos).removeClass("active");
					zz_Pos = 3;
					$(".contentBody_0_bottom0_" + zz_Pos).addClass("active");
				} else if (zz_Pos == 3 || zz_Pos == 4) {
					$(".contentBody_0_bottom0_" + zz_Pos).removeClass("active");
					$(".contentBody_1_li_" + list_Pos).css({
						'color' : '#00cad8'
					});
					r++;
				}
			} else if (list_Pos == 1) {
				$(".contentBody_0_bottom1_" + sb_Pos).removeClass("active");
				$(".contentBody_1_li_" + list_Pos).css({
					'color' : '#00cad8'
				});
				r++;
			} else if (list_Pos == 2) {
				if (cx_Pos == 0) {
					$(".contentBody_0_bottom2_" + cx_Pos).removeClass("active");
					cx_Pos = 2;
					$(".contentBody_0_bottom2_" + cx_Pos).addClass("active");
				} else if (cx_Pos == 1) {
					$(".contentBody_0_bottom2_" + cx_Pos).removeClass("active");
					cx_Pos = 3;
					$(".contentBody_0_bottom2_" + cx_Pos).addClass("active");
				} else if (cx_Pos == 2 || cx_Pos == 3) {
					$(".contentBody_0_bottom2_" + cx_Pos).removeClass("active");
					$(".contentBody_1_li_" + list_Pos).css({
						'color' : '#00cad8'
					});
					r++;
				}
			} else if (list_Pos == 3) {
				if (yy_Pos == 0) {
					$(".contentBody_0_bottom3_" + yy_Pos).removeClass("active");
					yy_Pos = 1;
					$(".contentBody_0_bottom3_" + yy_Pos).addClass("active");
				} else if (yy_Pos == 1 || yy_Pos == 2) {
					$(".contentBody_0_bottom3_" + yy_Pos).removeClass("active");
					$(".contentBody_1_li_" + list_Pos).css({
						'color' : '#00cad8'
					});
					r++;
				}
			} else if (list_Pos == 5) {
				$(".contentBody_0_bottom5_" + gg_Pos).removeClass("active");
				$(".contentBody_1_li_" + list_Pos).css({
					'color' : '#00cad8'
				});
				r++;
			} else if (list_Pos == 6) {
				$(".contentBody_0_bottom6_" + gg_Pos).removeClass("active");
				$(".contentBody_1_li_" + list_Pos).css({
					'color': '#00cad8'
				});
				r++;
			} else if (list_Pos == 31) {
				$(".dinghai").html('');
				list_Pos = 3;
			}
		}
		return 0;
		break;
	case 3: // left
	case 37:
	case 29:
	case 271:
		if (r == 0) {
			if (list_Pos == 0) {
				zhengce_service(-1);
			} else if (list_Pos == 1) {
				shebao_focus(-1);
			} else if (list_Pos == 2) {
				chuxing_focus(-1);
			} else if (list_Pos == 3) {
				hospital_focus(-1);
			}
		} else if (r == 1) {
			list_focus(-1);
			change_left_right();
			console.log(list_Pos_t + "!!!" + list_Pos)
			// 导航栏停留在政策服务时  放视频
			if(0 == list_Pos) {
				play();
			// 导航栏停留在返回时  不变
			} else if(7 == list_Pos){
				//nothing
			// 导航栏停留其他地方 关闭视频
			} else {
				closeit();
			}
		}
		return 0;
		break;
	// right
	case 4:
	case 30:
	case 272:
	case 39:
		if (r == 0) {
			if (list_Pos == 0) {
				if (zz_Pos < 4) {
					zhengce_service(1);
				}
			} else if (list_Pos == 1) {
				shebao_focus(1);
			} else if (list_Pos == 2) {
				chuxing_focus(1);
			} else if (list_Pos == 3) {
				hospital_focus(1);
			}
		} else if (r == 1) {
			list_focus(1);
			change_left_right();
			console.log(list_Pos_t + "!!!" + list_Pos)
			// alert("pos="+list_Pos+"t="+list_Pos_t )
			// list_Pos_t = list_Pos;
			// x++;
			// 导航栏停留在政策服务时  放视频
			if(0 == list_Pos) {
				play();
			// 导航栏停留在返回时  不变
			} else if(7 == list_Pos){
				//nothing
			// 导航栏停留其他地方 关闭视频
			} else {
				closeit();
			}
		}
		return 0;
		break;
	case 13: // enter
		if (r == 1) {
			change_left_right();
			if (list_Pos == 7) {
				location.href = returnURL;
			} 
		} else if (r == 0) {
			if (list_Pos == 0) {
				$(".contentBody_0_bottom" + list_Pos).css({
					'visibility' : "hidden"
				});
				location.href = '../zhengce_service/index.html?tag=' + zz_Pos;
				// 进入政策服务的子页面 关闭视频
				closeit();
			} else if (list_Pos == 1) {
				$(".contentBody_0_bottom" + list_Pos).css({
					'visibility' : "hidden"
				});
				location.href = '../shebao_service/index.html?' + sb_Pos;
			} else if (list_Pos == 2) {
				$(".contentBody_0_bottom" + list_Pos).css({
					'visibility' : "hidden"
				});
				if (cx_Pos == 0) {
					location.href = '../ipanel_gout/train.html';
				} else if (cx_Pos == 1) {
					location.href = '../iPanel_gout/ship.html';
				} else if (cx_Pos == 2) {
					location.href = '../iPanel_gout/bus.html';
				} else if (cx_Pos == 3) {
					location.href = '../iPanel_gout/flight.html';
				}
			} else if (list_Pos == 3) {
				if (yy_Pos == 0) {
					location.href = '../iPanel_hospital/order.html';
				} else if (yy_Pos == 1) {
					$(".dinghai").show();
					list_Pos = 31;
				} else if (yy_Pos == 2) {
					location.href = '../iPanel_hospital/shanghai_h.html';
				}
			} else if (list_Pos == 5) {
				if (gg_Pos == 0) {
					location.href = 'public_bicycle/index.html';
				}
			// 三务公开 TODO
			} else if (list_Pos == 6)  {
				if (san_Pos == 0) {
//					go2Sanwu();
					goToSanwu();
				} 
			} else if (list_Pos == 31) {
				$(".dinghai").hide();
				list_Pos = 3;
			}
		}
		return 0;
		break;
	case 832: // f1
		return 0;
		break;
	case 340: // back
		//回到首页
		location.href = returnURL;
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

// 导航条的切换
function change_left_right() {
	if ((list_Pos == 7 && list_Pos_t == 6) ||
		(list_Pos == 7 && list_Pos_t == 0)){

		$(".contentBody_0_bottom" + list_Pos).css({
			'visibility' : "visible"
		});
	}else if (list_Pos == 0 && list_Pos_t == 7) {
		
		$(".contentBody_0_bottom6").css({
			'visibility' : "hidden"
		});
		$(".contentBody_0_bottom" + list_Pos).css({
			'visibility' : "visible"
		});
		change_tv_bg();
	}else if (list_Pos == 6 && list_Pos_t == 7) {
		$(".contentBody_0_bottom0").css({
			'visibility' : "hidden"
		});
		$(".contentBody_0_bottom" + list_Pos).css({
			'visibility' : "visible"
		});
		change_tv_bg();
	} else  {

		$(".contentBody_0_bottom" + list_Pos_t).css({
			'visibility' : "hidden"
		});
		$(".contentBody_0_bottom" + list_Pos).css({
			'visibility' : "visible"
		});
		change_tv_bg();
	}
	// $(".contentBody_0_bottom" + list_Pos + "_0").addClass("active");
	// $(".contentBody_1_li_" + list_Pos).css({
	// 'color': '#697783'
	// });
	zz_Pos = 0;
	sb_Pos = 0;
	cx_Pos = 0;
	yy_Pos = 0;
	list_Pos_t = list_Pos;
	
}
// 判断是不是有视频的背景
function change_tv_bg() {
	if (list_Pos == 0) {
		$('body').css({
			'background': 'transparent',
			'background-image' : 'url(img/tv_bg.png)',
			
		});
	} else {
		$('body').css({
			'background': 'transparent',
			'background-color' : '#283847',
			
		});
	}
}
