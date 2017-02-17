/**
 * Created by lenovo on 2017/2/16.
 */
import $ from 'jquery';
!function ($) {
    $.fn.carousel = function (options) {

        //Ĭ������
        var deFaults = {
            width: 310,
            height: 206,
            speed: 5005555,
            autoplay: true,
            mouseenter: 'off'
        };

        //����ͼƬ�����㣬�ٿ�ͼƬ�ڵ㡣
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
            isAnimate = false,//״̬�����û���ε��Ҳֻ��һ����Ч��
            speed = settings.speed;

        //���в���������������ģ�黯��
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

        //��ʼ��
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

        //���ýڵ��������
        function setAttributes() {
            $imgCt.children().css({
                'width': settings.width,
                'height': settings.height,
                'position': 'absolute', //ʹ����ͼƬ��ͬһλ�÷�ֹͼƬ�л�ʱ�����հס�
                'display': 'none' //�����Ϊnone������ͼƬ������һ����ʾ��Ϊ���һ�š����߼���Ȱ����һ��fadeOutʱ���ѹ�ȥ�ܾá�

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
        //�Զ�����
        function isAutoplay() {
            if(settings.autoplay) {
                autoPlay();
            } else {
                settings.mouseenter = 'off';
            }
        }


        $next.on('click', function (event) {
            event.preventDefault();//ȡ��Ĭ���¼�
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

        //������
        function fade(idx) {
            $items.eq(crtIdx).fadeOut(speed);
            $items.eq(idx).fadeIn(speed, function () {
                isAnimate = false;
            })
        }
        var timer;

        //�Զ�����
        function autoPlay() {
            timer = setInterval(playNext, 3000);
        }

        //�ж����λ��
        function judge() {
            $parent.on('mouseenter', function () {
                clearInterval(timer);
            })
            $parent.on('mouseleave', function () {
                autoPlay();
            })
        }

        //����������ͼ����ͣ����
        function setMouseEffect() {
            if(settings.mouseenter === 'on') {
                judge();
            }
        }
        //���ѡ��ͼƬ�¼�
        $singleBtn.on('click', function (event) {
            event.preventDefault();
            var idx = $(this).index();
            play(idx);
        })
        return this;
    }
}(jQuery);