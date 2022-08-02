import "./index.scss"

export const PosHeader = () => {

    $(window).load(function() {
        $(".pos-header__content").slick({
            infinite: true,
            slidesToShow: 1,
            adaptiveWidth: true,
            speed: 2000,
            slidesToScroll: 1,
            autoplay: true,
            autoplaySpeed: 5000,
        })
       
    })


}