// 基准URL
var base_url = "http://127.0.0.1:8080/";
// 招聘后台请求的URL
var job_url = base_url+"GetJob/";
// 政策服务后台请求的URL
var news_url = base_url+'GetNews/';
// 舟山医院后台请求的URL
var zsyyAppointmentURL = base_url+"GetHospitalZSYY/";
// 航班信息后台请求的URL
var flight_url = base_url+"GetFlight/";
// 列车信息后台请求的URL
var train_url = base_url+"GetTrain/";
// 时间后台请求的URL
var time_url = base_url+"GetFlight/";
// 天气信息后台请求的URL
var weather_url = base_url+"GetWeather/";
// 华数主页URL
//var wasu_url = "http://21.254.52.134/inforscreen2.0_zs/g2.0/index.html";
var wasu_url = "http://21.254.52.141/cloudidea.imcp/dispatchIndex.action?portalParam=BDP";
// 三务公开基准URL
var sanwu_base_url = "http://21.254.49.18/dispatchIndex.action";
// 服务器地址
var serverUrl ='http://21.254.52.133/citycloud.restful/';
// 取cookie
function getCookie(sName){
	var aCookie = document.cookie.split("; ");
	for (var i=0; i < aCookie.length; i++)
	{
		var aCrumb = aCookie[i].split("=");
		if (sName == aCrumb[0]){
		  return decodeURIComponent(aCrumb[1]);
		}
	}
	return null;
}
//从URL中取得特定参数
function getParamString(url,paramName){
	var result = new RegExp("(^|)"+paramName+"=([^\&]*)(\&|$)","gi").exec(url),param;
	if(param=result){
		return param[2];
	}
	return "";
}