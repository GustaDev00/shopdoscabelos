import './index.scss';

import '../../assets/javascripts/slick';

export const Home = () => {

  const mainSlick = () => {
    $(".x-main > .banners-full").slick({
      autoplay: true,
      autoplaySpeed: 4000,
      arrows: true,
      dots: true,
      fade: true,
      cssEase: "linear",
    });
  }

  const shelfSlick = () => {
    $(".x-main .x-product-list ul").slick({
      autoplay: true,
      autoplaySpeed: 4000,
      dots: true,
      infinite: false,
      speed: 300,
      arrows: true,
      slidesToShow: 4,
      slidesToScroll: 4,
    });
  }

  const removeBiggyShelf = () => {
    $("#biggy-one").css("display", "none");
  }
      
  $(document).ready(function () {
    mainSlick();
    shelfSlick();
    removeBiggyShelf();
  });  
}