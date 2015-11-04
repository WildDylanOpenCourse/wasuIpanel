// JScript source code
var left_Pos = 0; //左边指针
var work_Pos = 0; //工作指针
var bottom_Pos = 0; //底部翻页指针
var gongzhong_Pos = 0; //工种
var shebao_Pos = 0; //社保
var area_Pos = 0; //区块
var r = 0; //gongzhong
var w = 0; //shebao
var p = 0; //判断left是招聘的left还是社保的

var max_job_num = 11; //每页最大显示招聘信息数
var max_jobname_num = 30; //每页最大显示岗位名称数
var job_page_num = 0; //招聘信息的分页号
var jobname_page_num = 0; //岗位名的分页号
var jobDetailList; //招聘信息
var jobnameList; //岗位名称
var selectedJobName = ""; //选中的岗位名称

function init() {
	//init
	var href = location.href;
	var length = href.split("?").length;
	var news_id = href.split("?")[length - 1];
	p = parseInt(news_id);
	// 招聘
	if (p == 0) {
		left_Pos = 1;
		area_Pos = 1;
		$(".content_left_3").css({
			'visibility': 'visible'
		});
		$(".shanxuan").css({
			'visibility': 'visible'
		});
		$(".content_right").css({
			'visibility': 'visible'
		});
		$(".content_bottom").css({
			'visibility': 'visible'
		});
		$(".content_right_bottom_ul_li_" + work_Pos).addClass("active");
		//从后台取岗位名
		getJobName();
		//从后台取招聘信息
		getJobDetail();
	// 社保
	} else if (p == 1) {
		$(".content_top").addClass("active");
		$(".content_left_" + left_Pos).removeClass("active");
		$(".content_right1").css({
			'visibility': 'visible'
		});
		$(".content_right1_0").addClass("active");
		area_Pos = 5;
	}

}

//从后台取岗位名
function getJobName() {

	$.ajax({
		type : "POST",
		url : job_url,
		data : {
			call : "jobname"
		},
		cache : false,
		dataType : "json",
		success : function(data) {
			// 解析后台传来的json格式的岗位名称
			jobnameList = eval("(" + data + ")");
			// 填充岗位名称
			setJobName();
		}
	});
}

//从后台取招聘信息
function getJobDetail() {

	$.ajax({
		type : "POST",
		url : job_url,
		data : {
			call : "jobdetail",
			limit: max_job_num,
			offset: job_page_num,
			// 岗位名是中文  需要URLEncode编码之后再传
			jobname: encodeURI(selectedJobName)
		},
		cache : false,
		dataType : "json",
		success : function(data) {
			// 解析后台传来的json格式的招聘信息
			jobDetailList = eval("(" + data + ")");
			// 填充招聘信息
			setJobDetail();
		}
	});
}

// 填充岗位名称
function setJobName() {
	// 岗位名称的数量
	var jobNameSize = jobnameList.length;
	// 如果没有岗位名称
	if(0 == jobNameSize) {
		// 设置全部岗位名称为空
		setFullJobNameBlack();
	} else {
		// 每页岗位名称填充的数据
		for(var i=0; i<max_jobname_num; i++) {
			// 得到数据下标 本分页下标+每页最大数量*分页号
			var index = i + max_jobname_num * jobname_page_num;
			// 如果没有超过总数量
			if(index < jobNameSize) {
				$(".gongzhong_" + i).text(jobnameList[index]);
			// 下标超过总量
			} else {
				// 设置空的岗位名称
				setJobNameBlack(i);
			}
		}
	}
}

// 填充招聘信息
function setJobDetail() {
	// 招聘信息数量
	var jobDetailSize = jobDetailList.length;
	// 如果没有招聘信息
	if(0 == jobDetailSize) {
		// 招聘信息第一页  没有招聘信息
		if(0 ==job_page_num) {
			// 设置全部招聘信息为空
			setFullJobDetailBlack();
		// 招聘信息不是第一页  说明是翻页后没信息 保持页面内容不动
		} else {
			return;
		}

	} else {
		// 每页招聘信息填充的数据
		for(var i=0; i<max_job_num; i++) {
			// 如果下标在招聘信息数量内
			if(i < jobDetailSize) {
				$(".li_" + i).text(jobDetailList[i].jobname);
				$(".num_" + i).text(jobDetailList[i].hiringnum);
			// 下标超过招聘信息数量
			} else {
				// 设置空的招聘信息
				setJobDetailBlack(i);
			}
		}
	}
}

// 填充详细招聘信息
function setJobDetailInfo() {
	// 岗位名称
	$(".detail_0").text(jobDetailList[work_Pos].jobname);
	// 招聘公司名称
	$(".detail_1").text(jobDetailList[work_Pos].companyname);
	// 招聘公司联系电话
	$(".detail_2").text(jobDetailList[work_Pos].companyphoneno);
	// 招聘公司地址
	$(".detail_3").text(jobDetailList[work_Pos].companyaddr);
	// 薪资
	$(".detail_4").text(jobDetailList[work_Pos].salary);
	// 姓名
	$(".detail_5").text(jobDetailList[work_Pos].companyhr);
	// 性别
	$(".detail_6").text(jobDetailList[work_Pos].sex);
	// 年龄
	$(".detail_7").text(jobDetailList[work_Pos].age);
}

// 设置全部岗位名称为空
function setFullJobNameBlack() {
	for(var i=0; i<max_jobname_num; i++) {
		$(".gongzhong_" + i).text(" ");
	}
}

// 设置单个岗位名称为空
function setJobNameBlack(index) {
	$(".gongzhong_" + index).text(" ");
}

// 设置全部招聘信息为空
function setFullJobDetailBlack() {
	for(var i=0; i<max_job_num; i++) {
		$(".li_" + i).text(" ");
		$(".num_" + i).text(" ");
	}
}

// 设置单条招聘信息为空
function setJobDetailBlack(index) {
	$(".li_" + index).text(" ");
	$(".num_" + index).text(" ");
}

// 设置详细招聘信息为空
function setJobDetailInfoBlack() {
	// 岗位名称
	$(".detail_0").text(" ");
	// 招聘公司名称
	$(".detail_1").text(" ");
	// 招聘公司联系电话
	$(".detail_2").text(" ");
	// 招聘公司地址
	$(".detail_3").text(" ");
	// 薪资
	$(".detail_4").text(" ");
	// 姓名
	$(".detail_5").text(" ");
	// 性别
	$(".detail_6").text(" ");
	// 年龄
	$(".detail_7").text(" ");
}

// 工种选择页面翻页动作
// action 1 下一页
// -1 上一页
function doJobNameNextPreAction(action) {
	
	// 下一页
	if(1 == action) {
		// 岗位名称分页号+1
		jobname_page_num++;
		// 岗位名称分页号数据的最小标号超过数据总量
		if(jobname_page_num * max_jobname_num >= jobnameList.length) {
			// 岗位名称分页号-1
			jobname_page_num--;
		} else {
			// 填充岗位名称
			setJobName();
		}
	// 上一页
	} else {
		// 岗位名称分页号-1
		jobname_page_num--;
		// 岗位名称分页号负数 说明超过范围
		if(jobname_page_num < 0) {
			// 岗位名称分页号+1
			jobname_page_num++;
		} else {
			// 填充岗位名称
			setJobName();
		}
	}
}

function left_focus(__num) {
	if (__num == 1) {
		if (p == 0) {
			if (left_Pos < 3) {
				$(".content_left_" + left_Pos).removeClass("active");
				left_Pos = left_Pos + __num;
				$(".content_left_" + left_Pos).addClass("active");
			}
		} else if (p == 1) {
			if (left_Pos < 2) {
				$(".content_left_" + left_Pos).removeClass("active");
				left_Pos = left_Pos + __num;
				$(".content_left_" + left_Pos).addClass("active");
			}
		}
	} else if (__num == -1) {
		if (left_Pos > 0) {
			$(".content_left_" + left_Pos).removeClass("active");
			left_Pos = left_Pos + __num;
			$(".content_left_" + left_Pos).addClass("active");
		}
	}
}

function works_focus(__num) {
	if (__num == 1) {
		if (work_Pos < 10) {
			$(".content_right_bottom_ul_li_" + work_Pos).removeClass("active");
			work_Pos = work_Pos + __num;
			$(".content_right_bottom_ul_li_" + work_Pos).addClass("active");
		} else if (work_Pos == 10) {
			area_Pos++;
		}
	} else if (__num == -1) {
		if (work_Pos > 0) {
			$(".content_right_bottom_ul_li_" + work_Pos).removeClass("active");
			work_Pos = work_Pos + __num;
			$(".content_right_bottom_ul_li_" + work_Pos).addClass("active");
		}
	}
}

function bottom_focus() {
	if (bottom_Pos == 0) {
		$(".content_bottom_" + bottom_Pos).removeClass("active");
		bottom_Pos++;
		$(".content_bottom_" + bottom_Pos).addClass("active");
	} else if (bottom_Pos == 1) {
		$(".content_bottom_" + bottom_Pos).removeClass("active");
		bottom_Pos--;
		$(".content_bottom_" + bottom_Pos).addClass("active");
	}
}

function gongzhong_focus(__num) {
	if (__num == 1) {
		if (gongzhong_Pos < 31) {
			if (gongzhong_Pos == 9 || gongzhong_Pos == 19) {
				$(".gongzhong_" + gongzhong_Pos).removeClass("active");
				gongzhong_Pos = 30;
				$(".gongzhong_" + gongzhong_Pos).addClass("active");
			} else if (gongzhong_Pos == 29) {
				$(".gongzhong_" + gongzhong_Pos).removeClass("active");
				gongzhong_Pos = 31;
				$(".gongzhong_" + gongzhong_Pos).addClass("active");
			} else {
				$(".gongzhong_" + gongzhong_Pos).removeClass("active");
				gongzhong_Pos = gongzhong_Pos + __num;
				$(".gongzhong_" + gongzhong_Pos).addClass("active");
			}
		}
	} else if (__num == -1) {
		if (gongzhong_Pos > 0) {
			if (gongzhong_Pos == 30) {
				$(".gongzhong_" + gongzhong_Pos).removeClass("active");
				gongzhong_Pos = 9;
				$(".gongzhong_" + gongzhong_Pos).addClass("active");
				r = 0;
			} else if (gongzhong_Pos == 31) {
				$(".gongzhong_" + gongzhong_Pos).removeClass("active");
				gongzhong_Pos = 29;
				$(".gongzhong_" + gongzhong_Pos).addClass("active");
				r = 2;
			} else {
				$(".gongzhong_" + gongzhong_Pos).removeClass("active");
				gongzhong_Pos = gongzhong_Pos + __num;
				$(".gongzhong_" + gongzhong_Pos).addClass("active");
			}
		}
	}
}

function shebao_focus(__num) {
	if (__num == 1) {
		if (shebao_Pos < 2) {
			$(".content_right1_" + shebao_Pos).removeClass("active");
			shebao_Pos = shebao_Pos + __num;
			sfz_num = "";
			text_1 = "";
			$(".content_right1_" + shebao_Pos).addClass("active");
		}

	} else if (__num == -1) {
		if (shebao_Pos > 0) {
			$(".content_right1_" + shebao_Pos).removeClass("active");
			shebao_Pos = shebao_Pos + __num;
			sfz_num = "";
			text_1 = "";
			$(".content_right1_" + shebao_Pos).addClass("active");
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
			if (area_Pos == 1) {
				works_focus(-1);
			} else if (area_Pos == 2) {
				area_Pos--;
				body_Pos = 10;
				$(".content_bottom_0").removeClass("active");
				$(".content_bottom_1").removeClass("active");
				$(".content_right_bottom_ul_li_" + work_Pos).addClass("active");
				if (bottom_Pos == 1) {
					bottom_Pos--;
				};
			} else if (area_Pos == 0) {
				left_focus(-1);
			} else if (area_Pos == 4) {
				gongzhong_focus(-1);
			} else if (area_Pos == 5) {
				shebao_focus(-1);
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
			if (area_Pos == 1) {
				if (work_Pos == 10) {
					$(".content_right_bottom_ul_li_" + work_Pos).removeClass("active");
					$(".content_bottom_0").addClass("active");
				}
				works_focus(1);
			} else if (area_Pos == 2) {
				$(".content_right_bottom_ul_li_" + work_Pos).removeClass("active");
				$(".content_bottom_0").addClass("active");
			} else if (area_Pos == 0) {
				left_focus(1);
			} else if (area_Pos == 4) {
				gongzhong_focus(1);
			} else if (area_Pos == 5) {
				shebao_focus(1);
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
			if (area_Pos == 2) {
				bottom_focus();
			} else if (area_Pos == 1) {
				$(".content_right_bottom_ul_li_" + work_Pos).removeClass("active");
				area_Pos--;
				left_Pos = 3;
				work_Pos = 0;
				$(".content_left_" + left_Pos).addClass("active");
			} else if (area_Pos == 4) {
				if (gongzhong_Pos < 30) {
					if (r > 0 && r <= 2) {
						$(".gongzhong_" + gongzhong_Pos).removeClass("active");
						gongzhong_Pos = gongzhong_Pos - 10;
						$(".gongzhong_" + gongzhong_Pos).addClass("active");
						r--;
					}
				} else if (gongzhong_Pos == 31) {
					$(".gongzhong_" + gongzhong_Pos).removeClass("active");
					gongzhong_Pos = 30;
					$(".gongzhong_" + gongzhong_Pos).addClass("active");
				}
			} else if (area_Pos == 5) {
				$(".content_right1_" + shebao_Pos).removeClass("active");
				left_Pos = 2;
				$(".content_left_" + left_Pos).addClass("active");
				area_Pos = 0;
				shebao_Pos = 0;
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
			if (area_Pos == 2) {
				bottom_focus();
			} else if (area_Pos == 1) {
				if (list_Pos == 3) {
					$(".content_left_" + list_Pos).removeClass("active");
					$(".content_right_bottom_ul_li_" + work_Pos).removeClass("active");
				}
			} else if (area_Pos == 4) {
				if (gongzhong_Pos < 30) {
					if (r >= 0 && r < 2) {
						$(".gongzhong_" + gongzhong_Pos).removeClass("active");
						gongzhong_Pos = gongzhong_Pos + 10;
						$(".gongzhong_" + gongzhong_Pos).addClass("active");
						r++;
					}
				} else if (gongzhong_Pos == 30) {
					$(".gongzhong_" + gongzhong_Pos).removeClass("active");
					gongzhong_Pos = 31;
					$(".gongzhong_" + gongzhong_Pos).addClass("active");
				}

			} else if (area_Pos == 10) {
				dbroad_focus(1);
			} else if (area_Pos == 11) {
				dbroad_focus(1);
			}
			return 0;
			break;
		case 13: //enter
			//		alert("1."+bottom_Pos+":"+"2."+work_Pos)
			// 职位列表区域
			if (area_Pos == 2) {
				// 下一页
				if (bottom_Pos == 1) {
					// 招聘信息分页号+1
					job_page_num++
					// 后台取下一页的招聘信息
					getJobDetail()
					// 没有下一页的招聘信息
					if(0 == jobDetailList.length && job_page_num > 0) {
						// 招聘信息分页号-1
						job_page_num--;
					}
				}
				// 上一页
				if (bottom_Pos == 0) {
					// 招聘信息分页号-1
					job_page_num--;
					// 招聘信息分页号非负
					if(job_page_num >= 0) {
						// 后台取上一页的招聘信息
						getJobDetail();
					// 招聘信息分页号负数
					} else {
						// 不取数据  招聘信息分页号+1
						job_page_num--;
					}
				}
			// 详细招聘信息区域
			} else if (area_Pos == 1) {
				// 填充详细招聘信息
				setJobDetailInfo();
				$(".detail").css({
					'visibility': 'visible'
				});
				area_Pos = 3;
			} else if (area_Pos == 0) {
				if (left_Pos == 1) {
					$(".content_top").removeClass("active");
					$(".content_right1_0").removeClass("active");
					$(".content_right_bottom_ul_li_" + work_Pos).addClass("active");
					$(".content_right1").css({
						'visibility': 'hidden'
					});
					$(".shanxuan").css({
						'visibility': 'visible'
					});
					$(".content_right").css({
						'visibility': 'visible'
					});
					$(".content_bottom").css({
						'visibility': 'visible'
					});
					$(".content_left_3").css({
						'visibility': 'visible'
					});
					$(".content_left_" + left_Pos).removeClass("active");
					area_Pos = 1;
					p = 0;
				} else if (left_Pos == 3) {
					$(".content_left_" + left_Pos).removeClass("active");
					$(".gongzhong").css({
						'visibility': 'visible'
					});
					$(".gongzhong_" + gongzhong_Pos).addClass("active");
					area_Pos = 4;
				} else if (left_Pos == 0) {
					location.href = '../index.html?1';
				} else if (left_Pos == 2) {
					$(".content_top").addClass("active");
					$(".content_left_" + left_Pos).removeClass("active");
					$(".content_left_3").css({
						'visibility': 'hidden'
					})
					$(".shanxuan").css({
						'visibility': 'hidden'
					});
					$(".content_right").css({
						'visibility': 'hidden'
					});
					$(".content_bottom").css({
						'visibility': 'hidden'
					});
					$(".content_right1").css({
						'visibility': 'visible'
					});
					$(".content_right1_0").addClass("active");
					area_Pos = 5;
				}
			// 详细招聘信息区域  退出按钮
			} else if (area_Pos == 3) {
				$(".detail").css({
					'visibility': 'hidden'
				});
				// 设置详细招聘信息为空
				setJobDetailInfoBlack();
				area_Pos = 1;
			// 工种选择区域
			} else if (area_Pos == 4) {
				// 选择工种
				if (gongzhong_Pos < 30) {
					// 如果选中空的工种  不做任何动作
					if(" " == $(".gongzhong_" + gongzhong_Pos).text()) {
						return;
					}
					$(".gongzhong").css({
						'visibility': 'hidden'
					});
					// 设置选中的岗位名称
					selectedJobName = jobnameList[gongzhong_Pos];
					if("全部" == selectedJobName) {
						selectedJobName = "";
					}
					// 重置岗位名称分页号到第一页
					jobname_page_num = 0;
					// 重置岗位名称第一页的数据
					setJobName();
					// 重置招聘信息分页号
					job_page_num = 0;
					// 从后台取招聘信息
					getJobDetail();
					$(".gongzhong_" + gongzhong_Pos).removeClass("active");
					area_Pos = 1;
					gongzhong_Pos = 0;
					$(".content_right_bottom_ul_li_0").addClass("active");
				// 工种下一页
				} else if (gongzhong_Pos == 31) {
					// 工种翻页动作
					doJobNameNextPreAction(1);
				// 工种上一页
				} else if (gongzhong_Pos == 30) {
					// 工种翻页动作
					doJobNameNextPreAction(-1);
				}
			} else if (area_Pos == 5) {
				if (shebao_Pos == 2) {
					$(".build").show();
//					$(".sb_detail").css({
//						'visibility': 'visible'
//					});
					area_Pos++;
				} else if (shebao_Pos == 0) {
					dbroad_visible();
				} else if (shebao_Pos == 1) {
					dbroad_visible();
				}
			} else if (area_Pos == 6) {
//				$(".sb_detail").css({
//					'visibility': 'hidden'
//				});
				$(".build").hide();
				area_Pos--;
			} else if (area_Pos == 10) {
				if (shebao_Pos == 0) {
					dbroad_enter("sfz");
				} else if (shebao_Pos == 1) {
					dbroad_enter("sfz_password");
				}
			} else if (area_Pos == 11) {
				if (font_Pos <= 35) {
					if (shebao_Pos == 0) {
						font_hidden("sfz");
					} else if (shebao_Pos == 1) {
						font_hidden("sfz_password");
					}
				} else if (font_Pos == 37) {
					font_show_page_next();
				} else if (font_Pos == 36) {
					font_show_page_previous();
				}
			}
			return 0;
			break;
		case 832: //f1
			return 0;
			break;
		case 340: //back
			if(area_Pos == 0){
				location.href = '../index.html?1';
			}else if (area_Pos == 1) {
				location.href = '../index.html?1';
			}else if (area_Pos == 3) {//工作
				$(".detail").css({
					'visibility': 'hidden'
				});
				// 设置详细招聘信息为空
				setJobDetailInfoBlack();
				area_Pos = 1;
			}else if (area_Pos == 4) {//工种
				// 选择工种
				if (gongzhong_Pos < 30) {
					// 如果选中空的工种  不做任何动作
					if(" " == $(".gongzhong_" + gongzhong_Pos).text()) {
						return;
					}
					$(".gongzhong").css({
						'visibility': 'hidden'
					});
					// 设置选中的岗位名称
					selectedJobName = jobnameList[gongzhong_Pos];
					if("全部" == selectedJobName) {
						selectedJobName = "";
					}
					// 重置岗位名称分页号到第一页
					jobname_page_num = 0;
					// 重置岗位名称第一页的数据
					setJobName();
					// 重置招聘信息分页号
					job_page_num = 0;
					// 从后台取招聘信息
					getJobDetail();
					$(".gongzhong_" + gongzhong_Pos).removeClass("active");
					area_Pos = 1;
					gongzhong_Pos = 0;
					$(".content_right_bottom_ul_li_0").addClass("active");
		 		}
		 	}else if (area_Pos == 5) {
		 		 location.href = '../index.html?1';
		 	}else if (area_Pos == 6) {
		 		$(".build").hide();
				area_Pos--;
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