// JScript source code
var focus_Pos = 0
document.onkeydown = grabEvent;
document.onirkeypres = grabEvent;

var newsContentsList; //新闻列表的数组
var newsType = 0; //新闻类型
var page_num = 0; //index.html的页号
var rowid = 0; //新闻编号
var page_part_num = 0; //当前页的上下页标号
var page_text_array=new Array();
var max_page_line_num = 0; //最大行数
var page_line_num = 4; //页面显示的行数

function init() {
	$(".content_2_" + focus_Pos).addClass("active");
	var urlinfo = location.href;
	//页号
	page_num = urlinfo.split("?")[1].split("=")[1];
	//新闻编号
	rowid = urlinfo.split("?")[2].split("=")[1];
	//新闻类型
	var href = location.href;
	var length = href.split("?").length;
	var news_id = href.split("?")[length - 1];
	newsType = parseInt(news_id);
	//从后台取新闻
	getNews();
}


//从后台取新闻 
function getNews() {
	
	$.ajax({
		type:"POST",
		url:news_url,
		data:{call:"newsdata",newstype:newsType,num:rowid},
		cache:false,
		dataType:"json",
		success:function(data){
			//解析后台传来的json格式的新闻
			newsContentsList = eval("("+data+")");
			//判断有图片
			if(newsContentsList[0].img.length > 0) {
				$(".content_1").html(
						'<div class="content_1_0">'+
						'<div class="content_1_0_img_0"></div>'+
						'<div class="content_1_0_img_1"></div>'+
						'</div>'+
						'<div class="content_1_1"></div>'
					);
				page_line_num = 4;
			} else {
				$(".content_1").html(
						'<div class="content_1_1">'+
						'</div>'
					);
				$(".content_1_1").css({
					'top': '20px' , 
			     'height': '470px'
				})
				page_line_num = 11;
			}
			//填充新闻
			setNewsContents();
		}
	});
}

//填充新闻内容
function setNewsContents() {
	//取到新闻内容
	if(newsContentsList[0].rowid > 0 ){
		//先按段落分
		var strarray = newsContentsList[0].text.split("\n");
		//行编号
		var index=0;
		for(var i=0; i<strarray.length; i++) {
			//段落中按照每一行45个字分行
			for(var j=0; j<strarray[i].length/45; j++) {
				var linetext = strarray[i].substring(j*45, (j+1)*45);
				//按行存入数组中
				page_text_array[index] = linetext;
				index++;
			}
		}
		//得到这条新闻的最大行数
		max_page_line_num = page_text_array.length;
		//标题
		$(".head").html(newsContentsList[0].title);
		//副标题
		$(".head2").html(newsContentsList[0].subtitle);
		//内容
		var newstext = "";
		//内页读取页面显示行数内容显示
		for(var i=0; i<page_line_num; i++) {
			//行数不超过本条新闻最大行数
			if(i<max_page_line_num) {
				newstext = newstext + page_text_array[i]+ "<br>";
			}
		}
		//拼出来的内容写入相应位置
		$(".content_1_1").html(newstext);
		//图片
		setNewsImg();
	}
}

//填充新闻中的图片
function setNewsImg() {
	//有图片的话 在内容中加图片
	if(newsContentsList[0].img.length > 0){
		//图片的文件名存入数组
		var img = newsContentsList[0].img.split(';');
		//每页最多显示3张图片
		for(var i=0; i<2; i++) {
//			//具体页面显示的图片标号为  分页数*3+1
//			var index = page_part_num*3 + i;
			//图片编号不超过本条新闻的图片总数
			if(i < img.length) {
				var imghtml = '<img src="'+base_url+'newsimg/'+newsType+'/'+img[i]+'" width=558 height=326>';
				$(".content_1_0_img_"+i).html(imghtml);
			//编号超过部分 填充空
			} else {
				$(".content_1_0_img_"+i).html(" ");
			}
		}
	}
}

//跳转index.html的函数
//url带参数页号page_num、政策信息指针newsType
function getNewsIndex() {
	var indexurl = 'index.html?offset=' + page_num + '?' + newsType;
	location.href = indexurl;
}

function action_pos(__num) {
	if (__num == 1) {
		if (focus_Pos < 2) {
			$(".content_2_" + focus_Pos).removeClass("active");
			focus_Pos = focus_Pos + __num
			$(".content_2_" + focus_Pos).addClass("active");
		}
	} else if (__num == -1) {
		if (focus_Pos > 0) {
			$(".content_2_" + focus_Pos).removeClass("active");
			focus_Pos = focus_Pos + __num;
			$(".content_2_" + focus_Pos).addClass("active");
		}
	}
}

function grabEvent() {
	var key_code = event.which != undefined ? event.which : event.keyCode;
	switch (key_code) {
		//up     
		case 1:
		case 28:
		case 269:
		case 38:

			return 0;
			break;
			//down     
		case 2:
		case 40:
		case 31:
		case 270:

			return 0;
			break;
		case 3: //left
		case 37:
		case 29:
		case 271:
			action_pos(-1);
			return 0;
			break;
			//right     
		case 4:
		case 30:
		case 272:
		case 39:
			action_pos(1);
			return 0;
			break;
		case 13: //enter
			// 返回
			if(focus_Pos == 0){
				getNewsIndex();
			// 下一页
			}else if(focus_Pos == 2){
				//分页号+！
				page_part_num++;
				//内容
				var newstext = "";
				for(var i=0; i<page_line_num; i++) {
					//每个分页显示的新闻内容为   分页号*页面显示行数+当前行数
					var index = page_part_num*page_line_num+i;
					//行号不超过最大行数
					if(index < max_page_line_num) {
						newstext = newstext + page_text_array[index]+ "<br>";
					}
				}
				//有内容的话填充
				if(newstext.length > 0) {
					//内容
					$(".content_1_1").html(newstext);
					//图片
					setNewsImg();
				//没有内容 说明新闻已经到底 分页号-1
				} else {
					page_part_num--;
				}
			// 上一页
			}else if(focus_Pos == 1){
				//分页号-1
				page_part_num--;
				//分页号负数  说明已经到头 分页号+1
				if(page_part_num < 0) {
					page_part_num++;
					return;
				}
				//内容
				var newstext = "";
				for(var i=0; i<page_line_num; i++) {
					//每个分页显示的新闻内容为   分页号*页面显示行数+当前行数
					var index = page_part_num*page_line_num+i;
					//行号不超过最大行数
					if(index < max_page_line_num) {
						newstext = newstext + page_text_array[index]+ "<br>";
					}
				}
				//内容
				$(".content_1_1").html(newstext);
				//图片
				setNewsImg();
			}
			return 0;
			break;
		case 832: //f1
			return 0;
			break;
		case 340: //back
			//返回
			getNewsIndex();
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
