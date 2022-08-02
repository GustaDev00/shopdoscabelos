import './index.scss';

export const BiggySearch = () => {

    const removeBiggySearchMyVtex = () => {
        if (window.location.href.indexOf("myvtex") > -1) {
          $("body").addClass("remove-biggy-search");
          $(".biggy-autocomplete__form").removeAttr("action");
      
          $("#campo-de-busca").keypress(function (e) {
            if (e.which == 13) {
              e.preventDefault();
              window.location.href =
                "https://mrcatstore.myvtex.com/busca/?ft=" +
                $("#campo-de-busca").val();
            }
          });
      
          $(".x-icon-search").on("click", function () {
            window.location.href =
              "https://mrcatstore.myvtex.com/busca/?ft=" + $("#campo-de-busca").val();
          });
          
        }
    };

    const customBiggySearch = () => {
        $(".biggy-autocomplete__input")
          .attr(
            "style",
            "background-color: transparent; width: calc(100% - 30px) !important;"
          )
          .attr("placeholder", "Busca");
      }

    $(document).ready(function () {
        removeBiggySearchMyVtex();
        customBiggySearch();
    });

    $(document).ajaxStop(function () {
        if ($(".salesforce-wrapper").length < 1) {
          $(".biggy-autocomplete__content").addClass("hasnt-salesforce");
        }
    });
}