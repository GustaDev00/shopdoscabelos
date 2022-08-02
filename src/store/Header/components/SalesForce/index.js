export const SalesForce = () => {

    const closeSalesForce = () => {
        $(document).on("click", ".salesforce .salesforce--close", function () {
          $(".salesforce").addClass("is-disabled");
          $(".biggy-autocomplete__content").addClass("hasnt-salesforce");
        });
    }

    closeSalesForce();
}