


## 使用方法

```html
<link rel="stylesheet" href="../src/wheel.css">
<script src="http://cdn.bootcss.com/jquery/1.11.3/jquery.min.js"></script>
<script src="scr/wheeljs.min.js"></script>
<script>
  jQuery(function ($) {
    var option={
        active:'cur',	//当前显示元素追加样式名
        ul:'.pageUl',	//滚动体
        li:'.pageLi',	//页面样式名称
        isLateral:true,	//是否是横向
        isAbsolute:true,	//是否绝对定位
        fnBack:function(){}	//回调函数
    }
    $('.wheel').wheel(option); // "wheel"
  });
</script>
```


## License

MIT © ztMin
