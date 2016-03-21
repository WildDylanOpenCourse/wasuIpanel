// JScript source code
var news_Pos = 0; // 政策信息指针
var body_Pos = 0; // 中间信息指针
var bottom_Pos = 0; // 底部按钮指针
var q = 0; // 区块指针

var newsContentsList; // 新闻列表的数组
var page_num = 0; // 页号
var news_num = 0; // 获取的新闻数量
var returnURL = "../index.html?tag=0"; // 返回地址

function init() {
		// init
		var href = location.href;
		var news_id = getParamString(href, "tag");
		news_Pos = parseInt(news_id);
		$(".content_0_" + news_Pos).addClass("active");
		// 页号
		var offset = getParamString(href, "offset");
		if(typeof offset === 'undefined' || offset == '') {
			page_num = 0;
		} else {
			page_num = offset;
		}
		// 返回地址
		if("" != getParamString(href, "returnURL")) {
			returnURL = getParamString(href, "returnURL");
		}
		getNews();

	}
	// 政策信息列表

//从URL中取得特定参数
function getParamString(url,paramName){
	var result = new RegExp("(^|)"+paramName+"=([^\&]*)(\&|$)","gi").exec(url),param;
	if(param=result){
		return param[2];
	}
	return "";
}
// 从后台取新闻
function getNews() {

	$.ajax({
		type:"POST",
		url:news_url,
		data:{call:"newslist",newstype:news_Pos,num:page_num},
		cache:false,
		dataType:"json",
		success:function(data){
			// 解析后台传来的json格式的新闻
			newsContentsList = eval("("+data+")");
			// 新闻的数量
			news_num = newsContentsList.length;
			// 填充新闻
			getPageNews();
		}
	});
}

// 填充当页的新闻
function getPageNews() {
	// 如果没有抓到新闻 不填充内容直接返回
	if(news_num == 0) {
		return;
	}
	for(var index=0; index<4; index++) {
		// 下标没超过最大的时候 插入相关新闻
		if(index < news_num) {
			$("#rowid_"+index).html(newsContentsList[index].rowid);
			$(".content_1_0_0_0").eq(index)
				.html(newsContentsList[index].title);
			$(".content_1_0_0_1").eq(index)
				.html(newsContentsList[index].subtitle);
			$(".content_1_0_0_3").eq(index)
				.html(newsContentsList[index].shorttext);
			$(".content_1_0_0_2").eq(index).css({
				'background': 'url(../zhengce_service/img/xinwen_0.png)'
			});
			// 如果有图片 取本条新闻第一张图片 TODO 图片不显示
			if(newsContentsList[index].img.length > 0) {
				var img = newsContentsList[index].img.split(';');
				var imghtml = '<img src="'+base_url+'newsimg/'+news_Pos+'/'+img[0]+'" width=271 height=194>';
				$(".content_1_0_0_2").eq(index).html(imghtml);
			// 没有图片 内部html为空
			} else {
				$(".content_1_0_0_2").eq(index).html('');
			}
		// 下标超过最大的时候
		} else {
			$(".content_1_0_0_0").eq(index)
				.html(" ");
			$(".content_1_0_0_1").eq(index)
				.html(" ");
			$(".content_1_0_0_3").eq(index)
				.html(" ");
			$(".content_1_0_0_2").eq(index)
			    .html(" ");
			$(".content_1_0_0_2").eq(index).css({
				'background': 'url()'
			});
		}
	}
	$(".content_1_0_0_0").css({
		'color': 'black' ,
		'height':'30px' ,
		'white-space':'nowrap',
		'overflow':'hidden',
		'text-overflow':'ellipsis'
	});
}

// 跳转news.html的函数 TODO 没有带body_Pos 从news.html返回时focus无法定位中间信息
// url带参数页号page_num、新闻编号rowid、政策信息指针news_Pos
function getDetailNews() {
	// 新闻编号
	var rowid = $("#rowid_"+body_Pos).text();
	var detail_url = "../zhengce_service/news.html";
	detail_url = detail_url + "?offset=" + page_num + 
	                          "&rowid=" + rowid + "&tag=" + news_Pos + "&returnURL=" + returnURL;
	location.href = detail_url;
}

function news(__num) {
		if (__num == 1) {
			if (news_Pos < 4) {
				$(".content_0_" + news_Pos).removeClass("active");
				news_Pos = news_Pos + __num;
				$(".content_0_" + news_Pos).addClass("active");
				// 页号重置为0
				page_num = 0;
				// ajax从后台取对应的新闻
				getNews();
			}
		} else if (__num == -1) {
			if (news_Pos > 0) {
				$(".content_0_" + news_Pos).removeClass("active");
				news_Pos = news_Pos + __num;
				$(".content_0_" + news_Pos).addClass("active");
				// 页号重置为0
				page_num = 0;
				// ajax从后台取对应的新闻
				getNews();
			}
		}
	}
	// content1

function contentFocus(__num) {
		if (__num == 1) {
			if (body_Pos < 3) {
				$(".content_" + q + "_" + body_Pos).removeClass("active");
				body_Pos = body_Pos + __num;
				$(".content_" + q + "_" + body_Pos).addClass("active");
			}
		} else if (__num == -1) {
			if (body_Pos > 0) {
				$(".content_" + q + "_" + body_Pos).removeClass("active");
				body_Pos = body_Pos + __num;
				$(".content_" + q + "_" + body_Pos).addClass("active");
			}
		}
	}
	// content2

function bottomFocus(__num) {
	if (__num == 1) {
		if (bottom_Pos < 2) {
			$(".content_" + q + "_" + bottom_Pos).removeClass("active");
			bottom_Pos = bottom_Pos + __num;
			$(".content_" + q + "_" + bottom_Pos).addClass("active");
		}
	} else if (__num == -1) {
		if (bottom_Pos > 0) {
			$(".content_" + q + "_" + bottom_Pos).removeClass("active");
			bottom_Pos = bottom_Pos + __num;
			$(".content_" + q + "_" + bottom_Pos).addClass("active");
		}
	}
}
document.onkeydown = grabEvent;
document.onirkeypres = grabEvent;

function grabEvent() {
	var key_code = event.which != undefined ? event.which : event.keyCode;
	switch (key_code) {
		// up
		case 1:
		case 28:
		case 269:
		case 38:
			if (q == 2) {
				$(".content_" + q + "_" + bottom_Pos).removeClass("active");
				bottom_Pos = 0;
				q--;
				$(".content_" + q + "_" + body_Pos).addClass("active");
			} else if (q == 1) {
				$(".content_" + q + "_" + body_Pos).removeClass("active");
				body_Pos = 0;
				q--;
				$(".content_" + q + "_" + news_Pos).addClass("active");
			}
			return 0;
			break;
			// down
		case 2:
		case 40:
		case 31:
		case 270:
			if (q == 1) {
				$(".content_" + q + "_" + body_Pos).removeClass("active");
				q++;
				$(".content_" + q + "_" + bottom_Pos).addClass("active");
			} else if (q == 0) {
				q++;
				$(".content_" + q + "_" + bottom_Pos).addClass("active");
			}
			return 0;
			break;
		case 3: // left
		case 37:
		case 29:
		case 271:
			if (q == 0) {
				news(-1);
			} else if (q == 1) {
				contentFocus(-1);
			} else if (q == 2) {
				bottomFocus(-1);
			}
			return 0;
			break;
			// right
		case 4:
		case 30:
		case 272:
		case 39:
			if (q == 0) {
				news(1);
			} else if (q == 1) {
				contentFocus(1);
			} else if (q == 2) {
				bottomFocus(1);
			}
			return 0;
			break;
		case 13: // enter
			// 底部按钮
			if (q == 2) {
				// 下一页
				if (bottom_Pos == 2) {
					// 页号+1
					page_num++;
					// 后台取新闻
					getNews();
					// 没有取到新闻 页号-1
					if(newsContentsList.length == 0 && page_num>0){
						page_num--;
					}
				// 上一页
				} else if (bottom_Pos == 1) {
					// 页号-1
					page_num--;
					// 页号非负的情况下
					if(page_num >= 0) {
						// 后台取新闻
						getNews();
					} else {
						// 页号负数的情况下 不取数据 页号+1
						page_num++
					}
				} else if (bottom_Pos == 0) {
					location.href = returnURL;//'../index.html?tag=0';
				}
			// 中间信息
			} else if (q == 1) {
				getDetailNews();
			}
			return 0;
			break;
		case 832: // f1
			return 0;
			break;
		case 340: // back
			//回到首页
			location.href = returnURL;//'../index.html?tag=0';
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