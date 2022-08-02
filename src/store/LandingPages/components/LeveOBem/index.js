import './index.scss';

export const LeveOBem = () => {
    const mainSlick = () => {
        $(".section-banner .wrapper, .section-instagram--photos").slick({
          autoplay: true,
          autoplaySpeed: 4000,
          arrows: false,
          dots: false,
          fade: true,
          cssEase: "linear",
        });
    }
      
    const isScrolledIntoView = (elem) => {
        var docViewTop = $(window).scrollTop();
        var docViewBottom = docViewTop + $(window).height();
      
        var elemTop = $(elem).offset().top;
        var elemBottom = elemTop + $(elem).height();
      
        return elemBottom <= docViewBottom && elemTop >= docViewTop;
    }
      
    const animateNumber = () => {
        if (isScrolledIntoView($(".section-info--shoesDonations")) && !viewed) {
          viewed = true;
          $(".section-info--shoesDonations > span").each(function () {
            $(this)
              .prop("Counter", 0)
              .animate(
                {
                  Counter: $(this).text(),
                },
                {
                  duration: 2000,
                  easing: "swing",
                  step: function (now) {
                    $(this).text(Math.ceil(now));
                  },
                }
              );
          });
        }
    }

    $(window).scroll(animateNumber);
    let viewed = false;

    $(document).ready(function () {
        mainSlick();
        animateNumber();
    });
}