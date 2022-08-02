import './index.scss';

export const Flags = () => {
    
  const addOffFlag = () => {
    var item = $(".prateleira ul > li");
    item.each(function () {
      if ($(this).hasClass("has-old-price")) {
        if (!$(this).find(".x-off-flag").length) {
          $(this)
            .find(".product-image")
            .prepend("<div class='x-off-flag'><span>Off</span></div>");
  
          var oldPrice = parseFloat(
            $(this).find(".price .old-price").text().replace("R$", "")
          );
          var bestPrice = parseFloat(
            $(this).find(".price .best-price").text().replace("R$", "")
          );
          var desconto = Math.floor(100 - (bestPrice / oldPrice) * 100);
  
          $(this)
            .find(".x-off-flag")
            .prepend("<span>" + desconto + "%<span>");
        }
      }
    });
  }

  $(document).ready(function () {
    addOffFlag();
  });

  $(document).ajaxStop(function () {
    addOffFlag();
  });
}