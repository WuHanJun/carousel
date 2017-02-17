/**
 * Created by lenovo on 2017/2/17.
 */
import $ from 'jquery';
var crtIdx = $('#slides').carousel({
    width: 920,
    height: 400,
    autoplay: true,
    speed: 10,
    mouseenter: 'on'
});

$('.single-control li:first-child a').html('<img src="http://zegendary.coding.me/project/project/high%20bigger%20slides/img/thumb_macbook.png" alt="thumbnail">');
$('.single-control li:nth-child(2) a').html('<img src="http://zegendary.coding.me/project/project/high%20bigger%20slides/img/thumb_macbook.png" alt="thumbnail">');
$('.single-control li:nth-child(3) a').html('<img src="http://zegendary.coding.me/project/project/high%20bigger%20slides/img/thumb_macbook.png" alt="thumbnail">');
$('.single-control li:nth-child(4) a').html('<img src="http://zegendary.coding.me/project/project/high%20bigger%20slides/img/thumb_macbook.png" alt="thumbnail">');
$('.direction-control').remove();

$('.single-control li:first-child').addClass('active');

$('.single-control').on('click', 'li', function () {
    $(this).addClass('active');
    $(this).siblings().removeClass('active');
})
setInterval(function () {
    $('.carouselContainer .img-ct img').each(function () {
        if($(this).css('display') === 'block') {
            var idx = $(this).index();
            $('.single-control li').eq(idx).addClass('active');
            $('.single-control li').eq(idx).siblings().removeClass('active');
        }
    })
},3);
