/*! wheeljs - v0.0.1 - 2015-06-22
* Copyright (c) 2015 ztMin; Licensed MIT */
(function ($) {
	"use strict";
	var Wheel=function(o,option){
		this.defaults = {
	        active:'cur',	//当前显示元素追加样式名
	        ul:'.pageUl',	//滚动体
	        li:'.pageLi',	//页面样式名称
	        isLateral:true,	//是否是横向
	        isAbsolute:true,	//是否绝对定位
	        fnBack:function(){}	//回调函数
	    };
	    this.defaults=$.extend(this.defaults,option);
	    this.o=o;
	    this.init();
	};
	//初始化
	Wheel.prototype.init=function(){
		var _this=this;
	    this.index=0;
	    this.ul=this.o.children(this.defaults.ul);//获取ul元素
		this.li=this.ul.children(this.defaults.li);//获取li元素
		this.setPosition();//设置位置
		this.isScrill=false;	//是否在滚动
		this.to(0);

		//火狐浏览器
		if(document.addEventListener){
			this.o[0].addEventListener('DOMMouseScroll',function(e){
				e = e || window.event;
				//e.stopPropagation();
				var back=_this.mScroll(e);
				if(!back){
					if(e.stopPropagation) { //W3C阻止冒泡方法  
				        e.stopPropagation();  
				    } else {
				        e.cancelBubble = true; //IE阻止冒泡方法  
				    }
			    }
			},true);
		}
		//IE/Opera/Chrome/Safari
		this.o[0].onmousewheel=function(e){
			e = e || window.event;
			//e.stopPropagation();
			var back=_this.mScroll(e);
			if(!back){
				if(e.stopPropagation) { //W3C阻止冒泡方法  
			        e.stopPropagation();
			    } else {
			        e.cancelBubble = true; //IE阻止冒泡方法  
			    }
		    }
		};
	};
	//设置位置
	Wheel.prototype.setPosition=function(){
		//绝对定位方式
		if(this.defaults.isAbsolute){
			this.ul.css({
				position:'relative',
				width:'100%',
				height:'100%'
			});
			//横向滚动
			if(this.defaults.isLateral){
				this.li.css({
					position:'absolute',
					width:'100%',
					height:'100%',
					top:0,
					left:100+'%'
				});
			}else{
				this.li.css({
					position:'absolute',
					width:'100%',
					height:'100%',
					top:100+'%',
					left:0
				});
			}
		}else{
			//横向滚动
			var l=this.li.length;
			if(this.defaults.isLateral){
				this.ul.css({
					position:'relative',
					width:l+'00%',
					height:'100%'
				});
				this.li.css({
					float:'left',
					width:100/this.li.length+'%',
					height:'100%'
				});
			}else{
				this.ul.css({
					height:l+'00%',
					width:'100%'
				});
				this.li.css({
					height:100/this.li.length+'%',
					width:'100%'
				});
			}
		}
	};
	//添加滚动事件
	Wheel.prototype.mScroll=function(e){
		if(this.isScrill){return false;}
		this.isScrill=true;
		if(e.preventDefault){ e.preventDefault(); }else{ (e.returnValue = false);}
		var direct=e.wheelDelta?e.wheelDelta:-1*e.detail;
		var back=false;
		if(direct>0){
			this.index--;
			if(this.index<0){back=true;}
			if(this.index<=0){
				this.index=0;
			}
		}else{
			this.index++;
			var l=this.li.length-1;
			if(this.index>=l){
				back=this.index===l?false:true;
				this.index=l;
			}
		}
		this.to(this.index);
		return back;
	};
	//跳转到指定页
	Wheel.prototype.to=function(index){
		//console.log(index);
		var _this=this;
		var i=0,li=this.li,l=li.length,isLateral=this.defaults.isLateral;
		if(this.defaults.isAbsolute){
			li.eq(index).css({zIndex:99}).addClass(this.defaults.active).animate({
				left:0,
				top:0
			},500,function(){
				for(i=0;i<l;i++){
					var obj={};
					if(isLateral){
						if(i<index){
							obj={
								left:-100+'%',
								top:0
							};
						}else if(i>index){
							obj={
								left:100+'%',
								top:0
							};
						}
					}else{
						if(i<index){
							obj={
								top:-100+'%',
								left:0
							};
						}else if(i>index){
							obj={
								top:100+'%',
								left:0
							};
						}
					}
					li.eq(i).css(obj);
				}
				_this.isScrill=false;
				if(typeof _this.defaults.fnBack ==='function'){_this.defaults.fnBack(_this);}
			}).siblings(this.defaults.li).css({zIndex:88}).removeClass(this.defaults.active);
		}else{
			if(isLateral){
				this.ul.animate({left:-index+'00%'},500,function(){
					if(typeof _this.defaults.fnBack ==='function'){_this.defaults.fnBack(_this);}
					_this.isScrill=false;
				});
			}else{
				this.ul.animate({top:-index+'00%'},500,function(){
					if(typeof _this.defaults.fnBack ==='function'){_this.defaults.fnBack(_this);}
					_this.isScrill=false;
				});
			}
		}
	};

	$.fn.wheel = function(option,event){
		option=option || {};
		return this.each(function(){
			var me=$(this),key='wheel',data=me.data(key);
			if(!data){
				var d=new Wheel(me,option,event);
				me.data(key,d);
			}else{
				for(var i in option){
					data.defaults[i]=option[i];
				}
				data.init();
			}
		});
	};
}(jQuery));
