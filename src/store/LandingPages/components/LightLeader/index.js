import './index.scss';

export const LightLeader = () => {

    var $target = $(".anime-left, .anime-right"),
    animationClass = "anime-start",
    offset = $(window).height() * 3 / 4;

    const animeScroll = () => {
        var documentTop = $(document).scrollTop();

        $target.each(function () {
        var itemTop = $(this).offset().top;

        if (documentTop > itemTop - offset) {
            $(this).addClass(animationClass);
        } else {
            $(this).removeClass(animationClass);
        }
        });
    };

    $(document).ready(function () {
        animeScroll();
    });

    $(document).scroll(function () {
        animeScroll();
    });
}