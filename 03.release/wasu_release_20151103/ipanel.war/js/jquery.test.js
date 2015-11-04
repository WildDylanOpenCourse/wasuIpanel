/*模拟实现Jquery效果 edit 2013/8/28 1.0.4*/
/**
 * 实现功能
 * $(id)/$(class)
 * $.ajax
 * $.post
 * $.get
 * fadeIn
 * fadeOut
 * focus
 * blur
 * attr
 * html
 * css(selector)
 * addClass
 * removeClass
 * children
 * find /效率过低，建议用children代替
 * parent
 * append
 */
var ajax={
	async:false
}
var $=function(str)
{
	
	/*Jquery 对象返回本身*/
	/* tv will reset if add this condition?
	if(str instanceof Jquery)
	{
		return str;
	}*/
	/**/
	if(typeof str === "object")
	{
		return new Jquery(new Array(str));
	}
	if(str=='body')
	{
		//alert('aa');
		return new Jquery(new Array(document.body));
	};
	if(str=='document')
	{
		return new Jquery(new Array(document));
	};
	if(arguments.length==0)
	{
		return ;
	}
	if(typeof str === "function")
	{
		ready(str);
		return;
	}
	var headstr=str.substr(0,1);
	var namestr=str.substring(1,str.length);
	if(headstr=="#")
	{
		return new Jquery(new Array(document.getElementById(namestr)));
	}else if(headstr==".")
	{
		 var classElements = [],allElements = document.getElementsByTagName('*');
		    for (var i=0; i< allElements.length; i++ )
		   {
		    	var strs=allElements[i].className.split(" ");
		       for(var index=0;index<strs.length;index++)
		       {
		    	   if(strs[index]==namestr)
		    		   classElements[classElements.length] = allElements[i];
		       }
		   }
		return new Jquery(classElements);
		
	};
	function ready(fn)
	{
		if (document.readyState === "complete" || document.readyState === "loaded") //IE10 fires interactive too early
		{
			fn();
		}
		else
			document.addEventListener("DOMContentLoaded", fn, false);
		return this;
	}
}
$.albo=false;
$.alert=function(strs){
	if(!$.albo)
	{
		alert(strs);
	}
}
/*实现ajax*/
$.ajax=function(obj){
  try {
	var xmlHttp;
	if (window.ActiveXObject) {    
        xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");    
    }else if (window.XMLHttpRequest) {    
        xmlHttp = new XMLHttpRequest();    
    };
	if(!xmlHttp){    
        return alert('create failed');    
    };
    
    var appendStrs='';
  //  obj.data['bollAsync']=ajax.async;
    for ( var item in obj.data )
    {
    	appendStrs+=(item+'='+encodeURIComponent(obj.data[item])+'&');
    };
    appendStrs=appendStrs.substr(0,appendStrs.length-1);
    
    if(obj.type=='GET')
    {
    	if(appendStrs!='')
    		obj.url=obj.url+(obj.url.indexOf("?")>0?'&':"?")+appendStrs;
    }
    xmlHttp.open(obj.type,obj.url,ajax.async); 
    xmlHttp.setRequestHeader("Content-Type","application/x-www-form-urlencoded"); 
    var readySate=xmlHttp.readyState;
    xmlHttp.onreadystatechange = function(){
    	if(xmlHttp.readyState!=readySate)
    		{
    			readySate=xmlHttp.readyState;
	    		if (xmlHttp.readyState == 4) {// onCompleteInternal  
	                if (xmlHttp.status == 200) {
	                    if (obj.success != null) 
	    				{
	    					try {
	                       //obj.success( eval("("+xmlHttp.responseText+")")); 
	                    	obj.success(xmlHttp.responseText);
	    					} catch(e) {
	    					  $.alert("ajax callback异常："+e.message);
	    					}
	    				}
	                }  
	            }  
    		}
    	
    };
    //ajax send data
    if(obj.type=='GET')
    	xmlHttp.send(null);
    else
    	xmlHttp.send(appendStrs);
  } catch(e) {
    $.alert("ajax异常："+e.message);
  }
};
/*利用ajax实现post*/
$.post=function(webUrl,para,callback)
{
	var obj={};
	obj.url=webUrl;
	obj.data=para;
	obj.success=callback;
	obj.type="POST";
	$.ajax(obj);
};
/*利用ajax实现get*/
$.get=function(webUrl,para,callback)
{
	var obj={};
	obj.url=webUrl;
	obj.data=para;
	obj.success=callback;
	obj.type="GET";
	$.ajax(obj);
};

$.proCss=function(cssStr)
{
	var index=cssStr.lastIndexOf('-');
	if(index==-1)
		return cssStr;
	else
	{
		return cssStr.substring(0,index)+cssStr.substr(index+1,1).toUpperCase()+cssStr.substring(index+2,cssStr.length);
	}
	
};
//保存缓存数据
$.data={};
function Jquery(elem)
{
	this.target=elem;
	if(this.isArray(this.target))
		this.length=this.target.length;
	else
		this.length=0;
};
Jquery.prototype={
	constructor:Jquery,
	/*判断是否数组*/
	isArray:function(obj){
		//return Object.prototype.toString.call(obj) === '[object Array]'; 
		return obj instanceof Array;
	},
	getArray:function(){
		if(!this.isArray(this.target))
			var targetT=new Array(this.target);
		else
			var targetT=this.target;
			return targetT;
	},
	/*获取数值类型*/
	type:function( obj ) {
		if ( obj == null ) {
			return String( obj );
		}
		if(typeof obj === "function")
			return "function";
		if(typeof obj === "object")
			return "object";
		return typeof obj;
	},
	/************css操作****************/
	css:function(obj){
		if(typeof(obj)=='object')
		{
			for(var i=0;i<this.target.length;i++)
			{
				for ( var p in obj ){
					this.target[i].style[$.proCss(p)]=obj[p];
				};
			}
		}else {
			var tar=this.target[0];
			if(tar.currentStyle)
		    {
				return tar.currentStyle[$.proCss(obj)];
		    }else{
		    	return document.defaultView.getComputedStyle(tar,null)[$.proCss(obj)];
		    }
		};
	},
	hasClass:function(cls,obj){
		var has = false;
		//alert(obj.className+"/"+(obj.className=='undefined'));
		if(obj.className==undefined||obj.className==''||obj.className==' ')
		{
			return false;
		}
		var cssList = obj.className.split(' ');
		for(var i=0;i<cssList.length;i++)
		{
			if(cssList[i]==cls)
			{
				has=true;
				break;
			}
		}
		return has;
	},
	addClass:function(cls){
		for(var i=0;i<this.target.length;i++)
			{
				if (!this.hasClass(cls,this.target[i]))
					{
						if(this.target[i].className=='')
							this.target[i].className +=cls;
						else
							this.target[i].className +=" " + cls;
					}
			}
		return this;
	},
	removeClass:function(cls){
		if(cls==null||cls=='')
		{
			 this.target[0].className ='';
			 return this;
		}else{
			 if (this.hasClass(cls,this.target[0])) {
				var tmpCls = ' '+this.target[0].className;
				tmpCls=  tmpCls.replace(' '+cls, '');
				if(tmpCls.length>0)
					this.target[0].className =tmpCls.substr(1);
				else
					this.target[0].className =tmpCls;
			 };
			 return this;
		};
	},
	fadeIn:function(time,callback){
		 ffcallback=callback;
		 this.fade(true,time);
	},
	fadeOut:function(time){
		ffcallback=callback;
		 this.fade(false,time);
	},
	fade:function(flag,time){
	   var target = this.target[0];
       target.alpha = flag ? 1 : 100;
       target.style.opacity = (target.alpha / 100);
       target.style.filter = 'alpha(opacity=' + target.alpha + ')';
       var value = target.alpha; 
       (function() {
           target.style.opacity = (value / 100);
           target.style.filter = 'alpha(opacity=' + value + ')';
           if (flag) {
               value+=10;
               if (value <= 100) {
                   setTimeout(arguments.callee,1); //继续调用本身 
               }else
            	   if( ffcallback!=null) ffcallback();
           } else {
               value-=10;
               if (value >= 0) {
                   setTimeout(arguments.callee, 1); //继续调用本身 
               }else{
            	   target.style.display='none';
            	    if( ffcallback!=null) ffcallback();
               }
            	  
           }
       })();
	},
	//html,text操作
	append:function(html)
	{
		for(var i=0;i<this.target.length;i++)
			this.target[i].innerHTML+=html;
	},
	addChild:function(obj)
	{
		//for(var i=0;i<this.target.length;i++)
		this.target[0].appendChild(obj);	
	},
	html:function(obj){
		
		if(obj==null||obj=='undefined')
		{
			return  this.target[0].innerHTML;
		}else{
			for(var i=0;i<this.target.length;i++)
				this.target[i].innerHTML=obj;
			return this;
		};
	},
	text:function(obj){
		
		if(obj==null||obj=='undefined')
		{
			return  this.target[0].innerText;
		}else{
			for(var i=0;i<this.target.length;i++)
				this.target[i].innerText=obj;
			return this;
		};
	},	
	focus:function(){
		for(var i=0;i<this.target.length;i++)
		{
			this.target[i].focus();
		}
		return this;
	},
	blur:function(){
		for(var i=0;i<this.target.length;i++)
		{
			this.target[i].blur();
		}
		return this;
	},
	attr:function(key,value){
		if(arguments.length==1)
		{
			return this.target[0].getAttribute(key);
		}else{
			if(key=='src')
			{
				this.target[0].src=value;
			}
			else
				this.target[0].setAttribute(key,value);
			return this;
		}
	},
	selector:function(str,type){
		//type=0 find type=1 children
		var childElems;
		var findClass=false;
		var findElems = [];
		var headstr=str.substr(0,1);
		if(headstr=='#')
		{
			return new Jquery(new Array(this.target[0].getElementById(str.substring(1,str.length))));
		}
		if(headstr=='.')
			findClass=true;
		else
			findClass=false;
		for(var index=0;index<this.target.length;index++)
		{
			/*
			if(type==0)
			{
				if(!findClass)
				{
					childElems=this.target[index].getElementsByTagName(str);
					for(var i=0;i<childElems.length;i++)
						findElems.push(childElems[i]);
				}
				else
				{
					childElems=this.target[index].getElementsByTagName('*');
					for(var i=0;i<childElems.length;i++)
					{
						if(childElems[i].className.indexOf(str.substring(1,str.length))>=0)
						{
							findElems.push(childElems[i]);
						}				
					}					
				}
			}
			else if(type==1)
				childElems=this.target[index].childNodes;
			*/
			if(type==0)
			{
				if(findClass)
				{
					childElems=this.target[index].getElementsByTagName('*');
				}else{
					childElems=this.target[index].getElementsByTagName(str);
				}
			}else if(type==1)
			{
				childElems=this.target[index].childNodes;
			}
			
			for(var i=0;i<childElems.length;i++)
			{	//alert(childElems[i].nodeName+' '+childElems[i].nodeType);
				if(childElems[i].nodeType==1)
				{
					if(!findClass)
					{
						//alert(childElems[i].nodeName);
						if(childElems[i].nodeName.toUpperCase()==str.toUpperCase())
						{
							findElems.push(childElems[i]);
						}
					}else{
						   var clsstr=str.substring(1,str.length);
						   var clslist=childElems[i].className.split(" ");
					       for(var index=0;index<clslist.length;index++)
					       {
					    	   if(clslist[index]==clsstr)
					    	   	   findElems.push(childElems[i]);
					       }
					}
				}
			};
		}
		return new Jquery(findElems);
	},
	
	find:function(str){
		return this.selector(str,0);
	},
	children:function(str){
		return this.selector(str,1);
	},
	parent:function(){
		return new Jquery(new Array(this.target[0].parentNode));
	},
	eq:function(index){
		return new Jquery(new Array(this.target[index]));
	},
	prev:function(){
		var obj=this.target[0].previousSibling;
		while(obj!=null&&obj.nodeType!=1)
			obj=obj.previousSibling;
		return new Jquery(new Array(obj));
	},
	show:function(){
		this.css({'display':'block'});
		return this;
	},
	hide:function(){
		this.css({'display':'none'});
		return this;
	},
	on:function(eve,callback){
		switch(eve)
		{
			case 'keyup':
				this.target[0].onkeyup=callback;
		}
	}	
};