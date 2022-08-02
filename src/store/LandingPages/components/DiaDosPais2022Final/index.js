import './index.scss';

export const DiaDosPais2022Final = () => {
   
    $(".carousel .carousel__container").slick({
        autoplay: true,
        infinite: false,
        arrows: false,
        centerMode: true,
        autoplaySpeed: 2500,
        pauseOnFocus: true,
        dots: true,
        slidesToShow: 1,
        slidesToScroll: 1
    });
    
    // let video = document.getElementById('video-pais');
    
    // video.addEventListener('click', unmute);
    
    // function unmute() {
    //     video.muted = !video.muted;
    // }
    
}