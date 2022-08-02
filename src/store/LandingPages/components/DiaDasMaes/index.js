import './index.scss';
import 'slick-carousel';
export const DiaDasMaes = () => {


$(function(){
    $('.banners-carrossel').slick({
        autoplay: true,
        speed: 0,
        slidesToShow: 1,
        slidesToScroll: 1,
        infinite: true,
        lazyLoad: 'ondemand',
    })
})

$(function(){
    $(".x-main .x-product-list ul").slick({
      autoplay: true,
      autoplaySpeed: 4000,
      dots: false,
      infinite: false,
      speed: 300,
      arrows: true,
      slidesToShow: 4,
      slidesToScroll: 4,
    });
  })
  
  $(function(){
    $(".x-main .last-slick-section").slick({
      autoplay: true,
      autoplaySpeed: 4000,
      dots: false,
      infinite: true,
      speed: 300,
      arrows: true,
      slidesToShow: 1.05,
      slidesToScroll: 1,
    });
  })
}