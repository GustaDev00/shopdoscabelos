import './index.scss';

export const Moleskine = () => {

    const ShowElements = () => {
        let $element1 = $(".section-image-two"),
          $element2 = $(".section-image-four"),
          topElement1 = $($element1).offset().top,
          topElement2 = $($element2).offset().top,
          heightElement = $($element1).height(),
          heightElement2 = $($element2).height(),
          heightWindow = $(window).height();    
      
        $(window).scroll(function() {
          EffectElement(topElement1, heightElement, heightWindow);
          EffectElement2(topElement2, heightElement2, heightWindow);
        });
    };
      
    const EffectElement = (topElement1, heightElement, heightWindow) => {
        let scroll = $(document).scrollTop();
        topElement1 = $(".section-image-two").offset().top;
        heightElement = $(".section-image-two").height();
      
        if (
          scroll + heightWindow - heightElement / 2 > topElement1 &&
          scroll < topElement1 + heightElement - heightElement / 3
        ) {
          $(".section-image-two").addClass("is-active");
        }
    };
      
    const EffectElement2 = (topElement2, heightElement2, heightWindow) => {
        let scroll = $(document).scrollTop();
        topElement2 = $(".section-image-four").offset().top;
        heightElement2 = $(".section-image-four").height();  
      
        if (
          scroll + heightWindow - heightElement2 / 2 > topElement2 &&
          scroll < topElement2 + heightElement2 - heightElement2 / 4
        ) {
          $(".section-image-four").addClass("is-active");
        }
    };
      
    $(document).ready(function() {
        ShowElements();
        EffectElement();
        EffectElement2();
    });
      
}