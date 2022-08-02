import './index.scss';

export const Search = () => {
console.log("Página busca");
    // const searchTools = () => {
    //     $(".x-search-results ul").slick();
    //     $(".x-header__wrapper .fulltext-search-box").click(function () {
    //       $(".x-header__wrapper .x-close-search").fadeIn();
    //     });
      
    //     $(".x-header__wrapper .x-close-search").click(function () {
    //       $(".x-header__wrapper .fulltext-search-box").val("");
    //       $(".x-search-results ul").html(" ");
    //       $(this).fadeOut();
    //       $(".x-header__wrapper .fulltext-search-box").blur();
    //     });
      
    //     $(".x-header__wrapper .fulltext-search-box").keyup(function (event) {
    //       var busca = $(this).val();
    //       if (busca.length > 1) {
    //         $.ajax({
    //           type: "GET",
    //           url: "/api/catalog_system/pub/products/search/" + busca,
    //           headers: {
    //             resources: "0-12",
    //           },
      
    //           success: function (data) {
    //             var search = data;
    //             var container = $(".x-search-results ul");
    //             $(container).removeClass(
    //               "slick-dotted slick-initialized slick-slider"
    //             );
    //             $(container).html(" ");
      
    //             for (var i = 0; i < search.length; i++) {
    //               products = search[i];
    //               productName = products.productName;
    //               productLink = products.link;
      
    //               var skus = products.items;
      
    //               for (var j = 0; j < skus.length; j++) {
    //                 var sku = skus[j];
    //               }
      
    //               productImage =
    //                 "/arquivos/ids/" +
    //                 products.items[0].images[0].imageId +
    //                 "-420-270/" +
    //                 products.items[0].images[0].imageText +
    //                 ".jpg";
      
    //               if (container.find("li").length <= 11) {
    //                 $(container).append(
    //                   "<li><a href=" +
    //                     productLink +
    //                     "><span><img src=" +
    //                     productImage +
    //                     " alt=" +
    //                     productName +
    //                     ' border="0" /></span><h3>' +
    //                     productName +
    //                     "</h3></a></li>"
    //                 );
    //               }
    //             }
    //           },
    //           complete: function () {
    //             $(".x-search-results ul").slick({
    //               dots: true,
    //               infinite: false,
    //               slidesToShow: 4,
    //               speed: 500,
    //             });
    //           },
      
    //           error: function (data) {
    //             console.log(data);
    //             console.log("Ops, ocorreu um erro.");
    //           },
    //         });
    //       } else if (busca.length < 1) {
    //         $(".x-search-results ul").html(" ");
    //       }
    //     });
    // };

    // const setPageTitle = () => {
    //     var titleCateg = $(".bread-crumb").find("a").last().text();
    //     $(".x-department-title").text(titleCateg);

    //     if (titleCateg == "Botas" || titleCateg == "SANDÁLIAS COM SALTO") {
    //         $(".x-off-flag").css("top", "-55px");
    //         $(".x-product-list").css("margin-top", "70px");
    //     }

    //     $("body.x-categoria h1.x-term-result").remove();
    // }

    // const searchEmptyMain = () => {
    //   let field = $(".x-search-empty-content .x-serach-middle .fulltext-search-box");
  
    //   field.val("Busque Novamente");
  
    //   field.focus(function(){
    //       field.val("");
    //   });
  
    //   field.blur(function(){
    //       field.val("Busque Novamente");
    //   });
  
    //   let url = $(window.location).attr('href').split('=')[1];
    //   $(".x-search-empty-content .x-title-search .x-term").html(url);
    // };

    // searchTools();
    // setPageTitle();
    // searchEmptyMain();
}