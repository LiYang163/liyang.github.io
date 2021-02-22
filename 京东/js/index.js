// 网页头部固定定位div
// window.onscroll = function(){
// 	var top =document.documentElement.scrollTop;
// 	var nav = document.getElementsByClassName('nav')[0];
//
// 	if(top>=150){
// 		nav.style.display ="block";
// 		nav.style.position ="fixed";
// 		nav.style.top ="0";
// 		nav.style.height ="48px";
// 		nav.style.zIndex ="1000";
// 	}else{
// 		nav.style.display ="none";
// 		nav.style.height ="0";
// 	}
// }


//网页右边Tab栏切换
// 动画函数
var timerId = null;
;(function () {
    function animate(element, target, timeout,tiear) {
        if (timerId) {
            clearTimeout(timerId);
            timerId = null;
        }
        timerId = setInterval(function () {
            var step = 10;
            var current = element.offsetLeft;
            if (current > target) {
                step = -Math.abs(step);
            }
            if (Math.abs(current - target) <= Math.abs(step)) {
                clearTimeout(timerId);
                element.style.left = target + 'px';
                if(tiear){
                    tiear();
                }
                return;
            }
            current += step;
            element.style.left = current + 'px';
        }, timeout);
    }
    window.animate=animate;
})(window,undefined)


var newT = document.getElementById('newT');
var flag = document.getElementById('flag');
var newsContainer = document.getElementById('newsContainer');
for (var i = 0; i < 2; i++) {
    var links = newT.children[i];
    links.setAttribute('index', i);
    links.onmouseover = linkMouseover;
}

function linkMouseover() {
    var offsetLeft = this.offsetLeft;
    animate(flag, offsetLeft - 3, 30);
    for (var i = 0, len = newsContainer.children.length; i < len; i++) {
        if (newsContainer.children[i].className.indexOf('hide') === -1) {
            newsContainer.children[i].className = 'news-b hide';
        }
        var index = this.getAttribute('index');
        newsContainer.children[index].className = 'news-b show';
    }
}

// 网页中间轮播图
var grid_col2_top = document.getElementsByClassName('grid_col2_top')[0];
var gridImg = document.getElementById('gridImg');
var imgW = gridImg.offsetWidth;
var ul = gridImg.children[0];
var count = ul.children.length;
var ol = gridImg.children[1];
var arrows = document.getElementById('arrows');
var arrLeft = arrows.children[0];
var arrRight = arrows.children[1];
var index = 0;
grid_col2_top.onmouseenter = function () {
    arrows.style.display = 'block';
}
grid_col2_top.onmouseleave = function () {
    arrows.style.display = 'none';
}
init();

function init() {
    for (var i = 0; i < count; i++) {
        var li = document.createElement('li');
        ol.appendChild(li);
        li.index = i;
        if (i === 0) {
            li.className = 'cur';
        }
        li.onclick = liClick;
    }
    ul.appendChild(ul.children[0].cloneNode(true));
}

function activeImgOrder(index) {
    for (var i = 0; i < count; i++) {
        ol.children[i].className = '';
    }
    ol.children[index].className = 'cur';
}

function liClick() {
    index = this.index;
    activeImgOrder(index);
    animate(ul, -index * imgW, 10);
}
function tiears(){
    ul.style.left ='0px';
}

arrRight.onclick = function () {
    if (index == count) {
        ul.style.left = '0px';
        index = 0;
    }
    index++;
    if (index < count) {
        animate(ul, -index * imgW, 10);
        activeImgOrder(index);
    } else {
        animate(ul, -index * imgW, 10,tiears);
        activeImgOrder(0);
    }

}
arrLeft.onclick = function () {
    if (index == 0) {
        index =count;
        ul.style.left =-index*imgW+'px';
    }
    index--;
    animate(ul, -index * imgW, 10);
    activeImgOrder(index);
}
// setInterval(function () {
//     arrRight.click();
// },3000)

