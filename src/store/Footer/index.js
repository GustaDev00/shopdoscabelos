import './index.scss'

export const Footer = () => {
    const animateFooter = () => {

      $(".x-footer .x-block-group .x-title").click(function () {
        $(".x-footer .x-block-group .x-block-links").slideToggle();
      });
    
      $(".x-footer__topCategory .x-title").click(function () {
        $(".x-footer__topCategory .x-block-links, .x-footer__topCategory .x-title").toggleClass("is-active");
      });
    };

    const share = () => {
      var components = {
        whatsapp: ".x-footer .x-step__btn--whatsapp",
        email: ".x-footer .x-step__btn--email",
      };
      var product = "Mr. Cat - Bolsas e Sapatos Femininos e Masculinos! ";
      var page = window.location.href;
    
      $(components.whatsapp).on("click", function () {
        // var url = "whatsapp://send?text=" + page;
        var url = "http://api.whatsapp.com/send?text=" + product + "%0A" + page;
    
        return (
          window.open(
            url,
            "",
            "menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=300,width=600"
          ),
          !1
        );
      });
      $(components.email).on("click", function () {
        var url =
          "mailto:?subject=Novidades Mr. Cat!&body=Veja você também!%0D%0A%0D" +
          product +
          "%0D%0A%0D" +
          page +
          "%0D%0A%0D";
    
        return (window.location.href = url);
      });
    };

    const helpBoxClick = () => {

        $('.helpbox__list__close').on('click', (e) => {
            $('.helpbox').toggleClass('active');
            $('.helpbox__list__close').toggleClass('active');
            $('.helpbox__list li:not(:first-child)').not(this).each(function() {
                $($(this).children()[1]).removeClass('active');
            });
        });
          
        $('.helpbox__list > li:not(:first-child)').on('click', function(e) {
            $('.helpbox').removeClass('active');
            $('.helpbox__list__close').removeClass('active');
            $($(this).children()[1]).toggleClass('active');
            $('.helpbox__list li:not(:first-child)').not(this).each(function() {
                $($(this).children()[1]).removeClass('active');
            });
        });
    }

    animateFooter();
    share();
    helpBoxClick();
}