/**
 * Created by lenovo on 2017/2/16.
 */
import $ from 'jquery';
!function ($) {
    $.fn.carousel = function (options) {

        //默认属性
        var deFaults = {
            width: 310,
            height: 206,
            speed: 5005555,
            autoplay: true,
            mouseenter: 'off'
        };

        //创建图片包裹层，操控图片节点。
        var $singleControl = $('<ul class="single-control"></ul>'),
            $li_1 = $('<li><a href="#">1</a></li>'),
            $li_2 = $('<li><a href="#">2</a></li>'),
            $li_3 = $('<li><a href="#">3</a></li>'),
            $li_4 = $('<li><a href="#">4</a></li>'),
            $directionControl = $('<ul class="direction-control"></ul>'),
            $pre = $('<li><a class="dir-goleft" href="#">pre</a></li>'),
            $next = $('<li><a class="dir-goright" href="#">next</a></li>'),
            $carouselContainer = $('<div class="carouselContainer"></div>'),
            $imgCt = $('<div class="img-ct"></div>');


        var $parent = this,
            settings = $.extend(true, {}, deFaults, options),
            $items = $parent.children(),
            imgCount = $parent.children().length,
            crtIdx = 0,
            isAnimate = false,//状态锁，用户多次点击也只有一次生效。
            speed = settings.speed;

        //所有操作都在这个对象里，模块化。
        var carouselObj = {
            appendElements: appendElements,
            setAttributes: setAttributes,
            play: play,
            isAutoplay: isAutoplay,
            setMouseEffect: setMouseEffect,
            init: function () {
                this.appendElements();
                this.setAttributes();
                this.play(0);
                this.isAutoplay();
                this.setMouseEffect();
            }
        };

        //初始化
        carouselObj.init();

        function appendElements() {
            $($imgCt).append($items);
            $singleControl.append($li_1, $li_2, $li_3, $li_4);
            $directionControl.append($pre, $next);
            $parent.append($carouselContainer, $singleControl, $directionControl);
            $carouselContainer.append($imgCt);
            $parent.append( );

        };
        var $singleBtn = $('.single-control li');

        //设置节点基础属性
        function setAttributes() {
            $imgCt.children().css({
                'width': settings.width,
                'height': settings.height,
                'position': 'absolute', //使所有图片在同一位置防止图片切换时发生空白。
                'display': 'none' //如果不为none，所有图片叠加在一起，显示的为最后一张。而逻辑里等把最后一张fadeOut时间已过去很久。

            });
            $imgCt.css({
                'width': settings.width,
                'height': settings.height
            });
            $carouselContainer.css({
                'width': settings.width,
                'height': settings.height,
                'overflow': 'hidden',
                'position':  'relative'
            });

        }
        //自动播放
        function isAutoplay() {
            if(settings.autoplay) {
                autoPlay();
            } else {
                settings.mouseenter = 'off';
            }
        }


        $next.on('click', function (event) {
            event.preventDefault();//取消默认事件
            playNext();
        })
        $pre.on('click', function (event) {
            event.preventDefault();
            playPre();
        })
        function playNext() {
            play((crtIdx + 1) % imgCount);
        }

        function playPre() {
            play((imgCount + crtIdx - 1) % imgCount);
        }

        function play(idx) {
            if (isAnimate) return;
            isAnimate = true;
            fade(idx);
            crtIdx = idx;
            set(crtIdx);
        }
        function set () {
            $('.img-ct img').eq(0).data('show', true);
            var temp = 0;
            if(temp !== crtIdx) {
                temp = crtIdx;
                $('.img-ct img').eq(temp).siblings().data('show', false);
                $('.img-ct img').eq(temp).data('show', true);
            } else {
                $('.img-ct img').eq(temp).siblings().data('show', false);
                $('.img-ct img').eq(temp).data('show', true);
            }
        }

        //鼠标进入
        function fade(idx) {
            $items.eq(crtIdx).fadeOut(speed);
            $items.eq(idx).fadeIn(speed, function () {
                isAnimate = false;
            })
        }
        var timer;

        //自动播放
        function autoPlay() {
            timer = setInterval(playNext, 3000);
        }

        //判断鼠标位置
        function judge() {
            $parent.on('mouseenter', function () {
                clearInterval(timer);
            })
            $parent.on('mouseleave', function () {
                autoPlay();
            })
        }

        //设置鼠标进入图区暂停播放
        function setMouseEffect() {
            if(settings.mouseenter === 'on') {
                judge();
            }
        }
        //点击选择图片事件
        $singleBtn.on('click', function (event) {
            event.preventDefault();
            var idx = $(this).index();
            play(idx);
        })
        return this;
    }
}(jQuery);