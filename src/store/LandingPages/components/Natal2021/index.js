import './index.scss';
import 'slick-carousel';

export const Natal2021 = () => {

    const banner3Slick = () => {
        $(".banner3__images").slick({
            arrows: false,
            dots: true,
            infinite: false,
            slidesToShow: 1,
            slidesToScroll: 1,
        });
    }

    banner3Slick();
}