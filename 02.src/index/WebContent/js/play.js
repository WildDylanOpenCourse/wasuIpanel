document.onsystemevent = grabEvent;
//document.onkeypress = grabEvent;
//document.onirkeypress = grabEvent;

function grabEvent(event)
{
	 var keycode = event.which;  //消息的按键值
	 //播放完成后，循环播放
	 iPanel.debug("keycode=="+keycode);
	// messageLog.showAll("keycode=="+keycode);
	 switch(keycode){
	 		case 5210:
	 		 	media.AV.close();
				setTimeout("playVOD()",2000);
				return 0;
				break;
			case 5202:
				iPanel.debug("5202");
				media.AV.play();
				return 0;
				break;
		 	case 5205:
				var hVersion = hardware.STB.hVersion;
				if(hVersion=="0371666f"){
					media.AV.play();    //hm3000 ，后来发的5205 没有发play了
					return 0;
				}else{
					return 1;
				}
				break;
			case 339:
				iPanel.debug("returnVideo_flag=="+returnVideo_flag);
				if(returnVideo_flag){
					returnVideo(lpos,tpos,wpos,hpos);
					return 0;
				}
				return 1;
				break;

	}
}

//视频流播放
function play() {

		VOD.changeServer("isma_v2","ip");
		// alert("rth-2");
		Video();
		// alert("rth-3");
		timeVideoDelay = setTimeout("Video()",1500);
		// VOD.changeServer("sihua_3rd","ip");
		playVOD();

}

function playVOD(){
	// playUrl = "rtsp://21.254.5.158:554/00000000000000000000000007244783.ts?Contentid=00000000000000000000000007244783&token=AEF8691A592C60F93B5D49F3B2D25EFED0F97176B55D8B2BB4727FCCF0D6918E784CF0DB2EACB4CF839613046B1575BDC4FA874FC50A1539CA7717D41AF19A18E356D49A9F87CE8AC3BA56298AE124A8356084481E3BFB35C62C7AF6E5059F3ADC95347DF7B46CBCC724DA11F7647A94C991B61E06B39E9D5E5B45E43E377DEFD9C867F0BE53EE2131F361BD624AE0B1DE08D0F9762344D711E1C11A6200C8CB85361A22A8806ECFC53E58C2EF511518D30C6BA969631EA6AB8636F452ED9205B0A6D6E173262E9169A9F74821FFB6DDB690716490&isHD=0&isIpqam=0&servicetype=1&mode=2";
	playUrl= "rtsp://21.254.5.158:554/00000000000000000000000007683269.ts?Contentid=00000000000000000000000007683269&token=078CC78A3B9D60F9DFE23A14FBE8EC834C117024A35A94897A00655EEF15D131CC6BC5329A045AB5BFEDB37CC3A34A629504B06AC13ABC10302A2339225E8423F0C69EA68A3C6DF977B6D5144D50C37365454C01BB94DEF1C85A34AC1903754F8B3148B48133E5F4293080BB02DCCDC2DD4B10D823716AA2943520EB3C38067199964F6DBD0B39985715AFB9E36D3B82B5277702AF865917DAAAA9DD5BF9EBDADC1788E7CF9CDD8FB1C6F41B0FEBCBFD799C260F124EE5D9FDE765E6983637034CC5C647B1173DE0C97BE71C4C34FDF5BA7A86D937406D60&isHD=0&isIpqam=0&servicetype=1&mode=2";
	media.AV.open(playUrl, 'VOD');
	media.AV.play();
}

function Video(){
	media.video.setPosition(47,103,583,490);
}

/*
function _fullScreen(){
	for(var i = 0;i < document.getElementsByTagName("div").length; i++){
		document.getElementsByTagName("div")[i].style.visibility="hidden";
	}
	document.body.background = "";
	media.video.setPosition(0,0,1280,720);


}
*/

//视频流关闭
function closeit() {
		try {
			clearTimeout(timeVideoDelay);
			iPanel.Media.setPosition(1,1,1,1);
			media.AV.close();
		} catch (e) {}

	}
