// JScript source code
var pos = 0;
var dlist_Pos = 1;
var l_Pos = 1; //登陆窗口指针
var area_Pos = 0;
var login_num ="";
var login_cred = "";
var login_pass = "";
var login_name = "";
var date = new Date();

var page_appt_num = 5; //每页最多可以显示的医生挂号信息
var docApptList; //医生挂号信息的数组
var page_num = 0; //分页编号
var departmentId; //科室编号
var scheduleId; //排班表id
var returnURL = "";

//init
function init() {
		
	//从cookies中取用户信息
	setUserInfo();
	//从URL取得部门编号
	var localURL= location.href;
	var department_id = getParamString(localURL, "deptId");
	//从URL中取得返回主页面的地址
	returnURL = getParamString(localURL, "returnURL");
	//从后台取医生挂号信息
	getDoctorAppointment(department_id);
}

// 从URL中取得特定参数
function getParamString(url,paramName){
	var result = new RegExp("(^|)"+paramName+"=([^\&]*)(\&|$)","gi").exec(url),param;
	if(param=result){
		return param[2];
	}
	return "";
}

//从后台取医生挂号信息
function getDoctorAppointment(department_id) {
	
	$.ajax({
		type:"POST",
		url:zsyyAppointmentURL,
		data:{call:"getAppointmentInfo",
			  deptid:department_id},
		cache:false,
		dataType:"json",
		success:function(data){
			//解析后台传来的json格式的医生挂号信息
		    docApptList = eval("("+data+")");

		    //有数据的情况下
		    if(docApptList.length > 0) {
		    	$(".doctor_list_" + dlist_Pos).addClass("active");
		    	//医院代码
		    	scheduleId = docApptList[0].scheduleId;
		    	//科室编号
		    	departmentId = docApptList[0].departmentId;
				//向页面填充医生挂号信息
				setDocApptData();
		    } else {
		    	$(".doctor_list_" + dlist_Pos).css({
					'background':'url(static/img/doctor_list_bg_0.png)'
				})
		    }
		}
	});
}

//填充医生挂号信息
function setDocApptData() {
	//得到后台传入数据的数量
	var docApptDataNum = docApptList.length;
	//每页5条信息的填充
	for(var i=0; i<page_appt_num; i++) {
		//得到数据标号
		var index = i+page_num*page_appt_num;
		//标号比数据的数量小
		if(index < docApptDataNum) {
			$(".doctor_name").eq(i)
			    .text(docApptList[index].name+"/"+
			          docApptList[index].title);
			$(".doctor_tickit").eq(i)
		        .text(docApptList[index].regDate+" "+
		              docApptList[index].regTime+" 余"+
		              docApptList[index].leftNum+"号");
	    // 标号比数据的数量大
		} else {
			$(".doctor_name").eq(i).text("");
		    $(".doctor_tickit").eq(i).text("");
		}
	}
}

//从cookies中写入用户信息
function setUserInfo() {
	var arrCookies = document.cookie.split(";");
	for(var i=0; i<arrCookies.length; i++) {
		var info = arrCookies[i].split("=");
		//姓名
		if("userName" == info[0]) {
			$(".login_name_input").html(decodeURI(info[1]));
			continue;
		//手机号码
		} else if("userNum" == info[0]) {
			$(".login_num_input").html(info[1]);
			continue;
		//身份证
		} else if("userCred" == info[0]) {
			$(".login_cred_input").html(info[1]);
			continue;
		}
	}
}

//挂号预约
function doAppoinment(index) {
	// 姓名
	var patientName = $(".login_name_input").html();
	// 身份证
	var idCardNo = $(".login_cred_input").html();
	// 手机号
	var mobile = $(".login_num_input").html();
	var doctorId = docApptList[index].doctorId;
	//验证手机号长度
	if(mobile.length != 11) {
		$('.num_waring').show();
		area_Pos = 100;//电话号码警告的提示框area_Pos
		return;
	}
	//验证身份证号长度
	if(idCardNo.length != 15 && idCardNo.length != 18) {
		$('.sfz_waring').show();
		area_Pos = 101;//身份证警告的提示框area_Pos
		return;
	}
	//上下午 0:上午 1:下午
	var sxw;
	if(docApptList[index].regTime == "上午") {
		sxw = 0;
	} else {
		sxw = 1;
	}
	$.ajax({
		type:"POST",
		url:zsyyAppointmentURL,
		data:{call:"doAppointment",
			  patientName:encodeURI(patientName),//患者姓名
			  idCardNo:idCardNo,//患者身份证号码
			  mobile:mobile,//患者手机号码
			  scheduleId:scheduleId,//排班表id
			  departmentId:departmentId,//科室编号
			  doctorId:doctorId,//医生编号
			  sxw:sxw},//上下午
		cache:false,
		dataType:"json",
		success:function(data){
			// 预约失败
			if('' == data) {
				// 显示预约失败的提示框
				$('.fail_waring').show();
				area_Pos = 103;//预约失败的提示框area_Pos
			// 预约成功
			} else {
				// 显示预约成功的提示框
				$('.success_waring').show();
				area_Pos = 102;//预约成功的提示框area_Pos
			}
		}
	});
}

function doctor_up() {
	if (area_Pos == 0) {
		if (dlist_Pos == 1) {
			$(".doctor_list_" + dlist_Pos).css({
				'background':'url(static/img/doctor_list_bg_1.png)'
			});
			$(".doctor_list_" + dlist_Pos).removeClass("active");
			dlist_Pos--;
			$(".index_back").addClass("active");
		} else if (dlist_Pos == 5 || dlist_Pos == 4 || dlist_Pos == 3 || dlist_Pos == 2) {
			$(".doctor_list_" + dlist_Pos).css({
				'background':'url(static/img/doctor_list_bg_1.png)'
			});
			$(".doctor_list_" + dlist_Pos).removeClass("active");
			dlist_Pos--;
			var _doctor_name = $(".doctor_list_" + dlist_Pos).children(".doctor_name").html();
			if(_doctor_name.length == 1 || _doctor_name.length == 0){
				$(".doctor_list_" + dlist_Pos).css({
					'background':'url(static/img/doctor_list_bg_0.png)'
				})
			}else{
				$(".doctor_list_" + dlist_Pos).addClass("active");
				$(".doctor_list_" + dlist_Pos).css({
					'background':'url(static/img/doctor_list_bg.png)'
				})
			}
			
		} else if (dlist_Pos == 6 || dlist_Pos == 7) {
			$(".doctor_page_0").removeClass("active");
			$(".doctor_page_1").removeClass("active");
			dlist_Pos = 5;
			var _doctor_name = $(".doctor_list_" + dlist_Pos).children(".doctor_name").html();
			if(_doctor_name.length == 1 || _doctor_name.length == 0){
				$(".doctor_list_" + dlist_Pos).css({
					'background':'url(static/img/doctor_list_bg_0.png)'
				})
			}else{
				$(".doctor_list_" + dlist_Pos).addClass("active");
				$(".doctor_list_" + dlist_Pos).css({
					'background':'url(static/img/doctor_list_bg.png)'
				})
			}
		}
	} else if (area_Pos == 5) {
		if (l_Pos == 2 || l_Pos == 3 || l_Pos == 4 || l_Pos == 5 ) {
			$(".login_" + l_Pos).removeClass("active");
			l_Pos--;
			$(".login_" + l_Pos).addClass("active");
			$(".doctor_list_" + dlist_Pos).css({
				'background':'url(static/img/doctor_list_bg.png)'
			})
		}
	}
}

function doctor_down() {
	if (area_Pos == 0) {
		if (dlist_Pos == 5) {
			$(".doctor_list_" + dlist_Pos).css({
				'background':'url(static/img/doctor_list_bg_1.png)'
			});
			$(".doctor_list_" + dlist_Pos).removeClass("active");
			dlist_Pos++;
			$(".doctor_page_0").addClass("active");
		} else if (dlist_Pos == 1 || dlist_Pos == 4 || dlist_Pos == 3 || dlist_Pos == 2) {
			$(".doctor_list_" + dlist_Pos).css({
				'background':''
			});
			$(".doctor_list_" + dlist_Pos).removeClass("active");
			dlist_Pos++;
			var _doctor_name = $(".doctor_list_" + dlist_Pos).children(".doctor_name").html();
			if(_doctor_name.length == 1 || _doctor_name.length == 0){
				$(".doctor_list_" + dlist_Pos).css({
					'background':'url(static/img/doctor_list_bg_0.png)'
				})
			}else{
				$(".doctor_list_" + dlist_Pos).addClass("active");
				$(".doctor_list_" + dlist_Pos).css({
					'background':'url(static/img/doctor_list_bg.png)'
				})
			}
		} else if (dlist_Pos == 0) {
			$(".index_back").removeClass("active");
			dlist_Pos++;
			$(".doctor_list_" + dlist_Pos).addClass("active");
			$(".doctor_list_" + dlist_Pos).css({
				'background':'url(static/img/doctor_list_bg.png)'
			})
		}
	} else if (area_Pos == 5) {
		if (l_Pos == 1 || l_Pos == 2 || l_Pos == 3 || l_Pos == 4 ) {
			$(".login_" + l_Pos).removeClass("active");
			l_Pos++;
			$(".login_" + l_Pos).addClass("active");
		}
	}
}
document.onkeydown = grabEvent;
document.onirkeypres = grabEvent;

function grabEvent() {
	var _table1 = $(".doctor_table1");
	var _table2 = $(".doctor_table2");
	var _back = $(".index_back")
	var key_code = event.which != undefined ? event.which : event.keyCode;
	switch (key_code) {
		//up     
		case 1:
		case 28:
		case 269:
		case 38:
			if (area_Pos == 0 || area_Pos == 5) {
				sfz_num = "";
				text_1 = "";
				doctor_up();
			} else if (area_Pos == 10) {
				dbroad_up();
			} else if (area_Pos == 11) {
				font_up();
			}
			return 0;
			break;
			//down     
		case 2:
		case 40:
		case 31:
		case 270:
			if (area_Pos == 0 || area_Pos == 5) {
				sfz_num = "";
				text_1 = "";
				doctor_down();
			} else if (area_Pos == 10) {
				dbroad_down();
			} else if (area_Pos == 11) {
				font_down();
			}
			return 0;
			break;
		case 3: //left
		case 37:
		case 29:
		case 271:
			if (area_Pos == 0) {
				if (dlist_Pos == 7) {
					$(".doctor_page_1").removeClass("active");
					dlist_Pos--;
					$(".doctor_page_0").addClass("active");
				} else if (dlist_Pos == -1) {
					$(".login_icon").removeClass("active");
					dlist_Pos++;
					_back.addClass("active");
				}
			} else if (area_Pos == 10) {
				dbroad_focus(-1);
			} else if (area_Pos == 11) {
				dbroad_focus(-1);
			}
			return 0;
			break;
			//right     
		case 4:
		case 30:
		case 272:
		case 39:
			if (area_Pos == 0) {
				if (dlist_Pos == 6) {
					$(".doctor_page_0").removeClass("active");
					dlist_Pos++;
					$(".doctor_page_1").addClass("active");
				}
			} else if (area_Pos == 10) {
				dbroad_focus(1);
			} else if (area_Pos == 11) {
				dbroad_focus(1);
			}
			return 0;
			break;
		case 13: //enter
			if (area_Pos == 0) {
				if (dlist_Pos == 0) {
					// 返回的链接带着返回主页的链接
					location.href = 'order.html?returnURL='+returnURL;
			    //下一页
				} else if (dlist_Pos == 7) {
					//分页号+1
					page_num++;
					//分页最小标号超过数据总数
					if(page_num*5 >= docApptList.length) {
						//分页号-1
						page_num--;
					//分页最小标号没超过 说明还有数据
					} else {
						//填充当页数据
						setDocApptData();
					}
				//上一页
				} else if (dlist_Pos == 6) {
					//分页号-1
					page_num--;
					//分页号负数 说明超过范围
					if(page_num < 0) {
						//分页号+1
						page_num++
					} else {
						//填充当页数据
						setDocApptData();
					}
				//选择医生 进行预约挂号
				} else if (dlist_Pos >= 1 && dlist_Pos <= 5) {
					//本条信息的下标
					var i = page_num*5+dlist_Pos-1;
					//下标超过数据最大数 直接返回
					if(i >= docApptList.length) {
						return;
					}
					
					$(".login_page").css({
						'visibility': 'visible'
					});
					$(".login_1").addClass("active");
					area_Pos = 5;
					//从cookies中写入用户信息
					setUserInfo();
				}
			// 预约弹窗
			} else if (area_Pos == 5) {
				// 姓名
				if (l_Pos == 1) {
					dbroad_visible();
					$(".db38").html("中文");
					$(".dbroad").css({
						'top': '280px'
					});
					$(".pinyin").css({
						'top': '280px'
					});
				// 手机号
				} else if (l_Pos == 2) {
					dbroad_visible();
					$(".db38").html("英文");
					$(".dbroad").css({
						'top': '390px'
					});
				// 身份证
				} else if (l_Pos == 3) {
					dbroad_visible();
					$(".db38").html("英文");
					$(".dbroad").css({
						'top': '500px'
					});
				// 预约
				} else if (l_Pos == 4) {
//					$(".login_page").css({
//						'visibility': 'hidden'
//					});
					$(".login_"+l_Pos).removeClass("active");
					area_Pos = 0;
					l_Pos = 1;
					//本条信息的下标
					var i = page_num*5+dlist_Pos-1;
					//预约操作
					doAppoinment(i);
				// 取消
				} else if (l_Pos == 5) {
					$(".login_page").css({
						'visibility': 'hidden'
					});
					$(".login_"+l_Pos).removeClass("active");
					area_Pos = 0;
					l_Pos = 1;
				} 

			} else if (area_Pos == 10) {
				if (l_Pos == 1) {
					$(".pinyin").css({
						'visibility': 'visible'
					});
					dbroad_enter("login_name_input");
					login_num = $(".login_name_input").html();
					document.cookie = "userName="+encodeURI(login_name);
				} else if(l_Pos == 2) {
					dbroad_enter("login_num_input");
					login_num = $(".login_num_input").html();
					document.cookie = "userNum="+login_num;
				} else if (l_Pos == 3) {
					dbroad_enter("login_cred_input");
					login_cred = $(".login_cred_input").html();
					document.cookie = "userCred="+login_cred;
				} 
//				else if (l_Pos == 4) {
//					dbroad_enter("login_pass_input");
//					login_pass = $(".login_pass_input").html();
//					documen.cookie = "userPass="+login_pass;
//				}
			} else if (area_Pos == 11) {
				if (font_Pos <= 35) {
					if (l_Pos == 1) {
						font_hidden("login_name_input");
					} else if (l_Pos == 2) {
						font_hidden("login_num_input");
					} else if( l_Pos == 3){
						font_hidden("login_cred_input");
					} else if(l_Pos == 4){
						font_hidden("login_pass_input");
					}
				} else if (font_Pos == 37) {
					font_show_page_next();
				} else if (font_Pos == 36) {
					font_show_page_previous();
				}
			// 手机号码长度不对的提示框
			} else if (area_Pos == 100){
				// 提示框隐藏
				$('.num_waring').hide();
				// 登陆窗口指针定位到手机号
				l_Pos = 2;
				// 焦点保持在手机号
				$(".login_2").addClass("active");
				// 区域指针定位到预约弹窗
				area_Pos = 5;
			// 身份证号码长度不对的提示框
			} else if (area_Pos == 101){
				// 提示框隐藏
				$('.sfz_waring').hide();
				// 登陆窗口指针定位到身份证号
				l_Pos = 3;
				// 焦点保持在身份证号
				$(".login_3").addClass("active");
				// 区域指针定位到预约弹窗
				area_Pos = 5;
			// 预约成功的提示框
			} else if (area_Pos == 102){
				// 提示框隐藏
				$('.success_waring').hide();
				// 预约弹窗隐藏
				$(".login_page").css({
					'visibility': 'hidden'
				});
				// 弹窗上的focus效果去除
				$(".login_"+l_Pos).removeClass("active");
				// 区域指针定位到主窗口
				area_Pos = 0;
				// 登陆窗口指针定位到姓名
				l_Pos = 1;
			} else if (area_Pos == 103) {
				// 提示框隐藏
				$('.fail_waring').hide();
				// 预约弹窗隐藏
				$(".login_page").css({
					'visibility': 'hidden'
				});
				// 弹窗上的focus效果去除
				$(".login_"+l_Pos).removeClass("active");
				// 区域指针定位到主窗口
				area_Pos = 0;
				// 登陆窗口指针定位到姓名
				l_Pos = 1;
			}
			return 0;
			break;
		case 832: //f1
			return 0;
			break;
		case 340: //back
			if (area_Pos == 0 ) {
				// 返回的链接带着返回主页的链接
				location.href = 'order.html?returnURL='+returnURL;
			}else if (area_Pos == 5) {
				$(".login_page").css({
					'visibility': 'hidden'
				});
				$(".login_"+l_Pos).removeClass("active");
				area_Pos = 0;
				l_Pos = 1;
			}else if (area_Pos == 10) {
		 		dbroad_hidden();
		 	}else if (area_Pos == 11) {
		 		font_hidden();
		 		dbroad_hidden();
		 	};
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