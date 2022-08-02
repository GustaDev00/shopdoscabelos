import './index.scss';

export const Aniversario = () => {

    const slider = () => {
        $('.x-aniversario .slider__images').slick({
            centerMode: true,
            autoplay: false,
            arrows: true,
            dots: false,
            slidesToShow: 3.15,
            slidesToScroll: 1,
            responsive: [
                {
                  breakpoint: 1350,
                  settings: {
                    centerMode: false,
                  }
                }
            ]
        })
    }

    slider();
}