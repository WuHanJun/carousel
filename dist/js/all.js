/**
 * Created by lenovo on 2017/2/17.
 */
import $ from 'jquery';
//初始化插件
var crtIdx = $('#slides').carousel({
    width: 920,
    height: 400,
    autoplay: true,
    speed: 100,
    mouseenter: 'on'
});

var handle = {
    //创建节点
    createElements: function createElements() {
        $('.single-control li:first-child a').html('<img src="./dist/image/thumb_macbook.png" alt="thumbnail">');
        $('.single-control li:nth-child(2) a').html('<img src="./dist/image/thumb_iphone.png" alt="thumbnail">');
        $('.single-control li:nth-child(3) a').html('<img src="./dist/image/thumb_imac.png" alt="thumbnail">');
        $('.single-control li:nth-child(4) a').html('<img src="./dist/image/thumb_about.png" alt="thumbnail">');
    },
    //事件点击
    bind: function () {
        $('.single-control').on('click', 'li', function () {
            var _this = $(this);
            _this.addClass('active');
            _this.siblings().removeClass('active');
        });
    },
    //小图标自动跟随播放
    autoFollow: function () {
        setInterval(function () {
            $('.carouselContainer .img-ct img').each(function () {

                if ($(this).data('show') === true) {
                    var idx = $(this).index();
                    $('.single-control li').eq(idx).addClass('active');
                    $('.single-control li').eq(idx).siblings().removeClass('active');
                }
            })
        }, 10);
    },
    init: function(){
        this.createElements();
        $('.direction-control').remove();//移除前进后退按钮
        $('.single-control li:first-child').addClass('active');
        this.bind();
        this.autoFollow();
    }
}
handle.init();











