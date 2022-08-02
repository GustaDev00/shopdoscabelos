import './index.scss';
import 'slick-carousel';

export const Omnichannel = () => {
    $(function(){
        $('.section2 .slider-retirada').slick({
            autoplay: false,
            speed: 0,
            slidesToShow: 1,
            slidesToScroll: 1,
            infinite: true,
            dots: true,
            draggable: true
        })
    })

    $(".banner-section4 div ul li h2").click(function(event) {

        $(this).siblings("p").toggleClass("x-active");
        $(this).toggleClass("is-active");
     
    });
};