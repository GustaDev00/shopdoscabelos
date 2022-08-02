import './index.scss';

export const ReaberturaLojas = () => {
    const openStores = () => {

      $("div.state").each(function(index) {
        $(this).on("click", function() {
            $(this).hasClass("is-open") ? $(this).removeClass("is-open") : $(this).addClass("is-open")
        })
      })
    }

    $(document).ready(function() {
      openStores()
    });
}