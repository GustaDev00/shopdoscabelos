import './index.scss';

export const EuDeMrCat = () => {

    const columnSlide = () => {
        return new Promise(function(resolve, reject) {
            $(".x-insta__column").each(function() {
                0 == $(this).find(".x-flex .instagram-media").length && $(this).remove()
            }),
            resolve({
                status: !0
            })
        }
        ).then(function() {
            $(".x-insta__photos").slick({
                infinite: !1,
                slidesToShow: 4,
                arrows: !0,
                dots: !1,
                slidesToScroll: 1
            })
        })
    };

    const imagePopup = () => {
        $(".vve-image__container img").click(function() {
            var link = $(this).attr("src");
            $("#x-pop-img").attr("src", link),
            $(".x-insta__poup").addClass("x-active")
        }),
        $(".x-popup-close").click(function() {
            $(".x-insta__poup").removeClass("x-active")
        })
    };

    const sectionClone = () => {
        var cloned = $(".x-insta__photos").clone();
        $("#x-insta-controller").append(cloned),
        $("body").append("<style>@keyframes slideUp{ 100% { transform: translateY(-100%);}}</style>")
    };

    $(document).ready(function() {
        columnSlide()
    });
}