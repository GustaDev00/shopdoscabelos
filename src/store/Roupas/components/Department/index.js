import './index.scss';

// import '../../../../assets/javascripts/smartResearch-mrcat';
// import '../../../../assets/javascripts/infinityScroll';

export const DepartamentoRoupas = () => {
    var ClickOnProduct;

    const vtexSmartResearch = () => {
      $(function () {
        $(
          ".search-multiple-navigator input[type='checkbox']"
        ).vtexSmartResearch({
          loadContent: ".prateleira[id^=ResultItems]",
          shelfClass: ".prateleira",
          elemLoading:
            '<div id="scrollLoading"><img src="/arquivos/loader-spinner.gif" /></div>',
          ajaxCallback: function () {
            productsLine();
          },
          shelfCallback: function () {
            productsLine();
            document.dispatchEvent(new CustomEvent('mrcat--on-change-shelf'));
          },
          infiniteScrollCallback: function (){
            document.dispatchEvent(new CustomEvent('mrcat--on-change-shelf'));
          },
        });
      });
    }

    // Deixar somente o tamanho para selecionar
    const nameSku = () => {
      if ($(".is-checklist-item label").length > 0) {
        $(".is-checklist-item label").each(function () {
          $(this).text($(this).text().split("/")[1]);
        });
      }
    };

    //Mudança da quantidade de produtos por linha
    const productsLine  = () => {

      var $product_shelf = $(".x-product-list .prateleira > ul > li");

      $(".x-grid-selector__group").on("click", function () {
        $(this)
          .addClass("x-grid-selector__group--active")
          .siblings(".x-grid-selector__group")
          .removeClass("x-grid-selector__group--active");
        ClickOnProduct = true;

        if ($(this).data("grid") != 3) {
          $(".resultItemsWrapper").addClass("active");
        } else {
          $(".resultItemsWrapper").removeClass("active");
        }

        if ($(this).data("grid") === 4) {
          $product_shelf.addClass("shelfFour");
          $product_shelf.removeClass("shelfThree");
        } else {
          $product_shelf.addClass("shelfThree");
          $(".btn-quickshop").addClass("adjustHeight");
          $product_shelf.removeClass("shelfFour");
        }
      });

      if (!ClickOnProduct) {
          $(".x-grid-selector__group[data-grid='3']").addClass(
            "x-grid-selector__group--active"
          );
          $product_shelf.addClass("shelfThree");
          $(".btn-quickshop").addClass("adjustHeight");
          $product_shelf.removeClass("shelfFour");
      } else if (
        $(".x-grid-selector__group[data-grid='3']").hasClass(
          "x-grid-selector__group--active"
        )
      ) {
        $product_shelf.addClass("shelfThree");
        $(".btn-quickshop").addClass("adjustHeight");
        $product_shelf.removeClass("shelfFour");
      } else if (
        $(".x-grid-selector__group[data-grid='4']").hasClass(
          "x-grid-selector__group--active"
        )
      ) {
        $product_shelf.addClass("shelfFour");
        $product_shelf.removeClass("shelfThree");
      }
    };

    const videoReady = () => {
      $(".x-product-list .prateleira li .video").each(function () {
        if ($(this).find("li video").length > 0) {
          var video = $(this).find("li").html();
          var teste = $(video).attr("src");
          $(this).closest(".x-box-product").addClass('video-product');

          var $box = $(this).siblings(".product-image");
          $box.html(
            '<video style="width:100%;" muted="" loop="" autoplay=""> <source src="' +
              teste +
              '" type="video/mp4"> </video>'
          );
        }
      });
    };

    // Não deixar que o cliente selecione mais de um checkbox por vez
    const checkbox  = (self) => {
      $(self).closest(".insert-sku-checklist").find("li").removeClass("active");

      if (!$(self).is(":checked")) {
        $(self)
          .closest(".selector-sku")
          .next()
          .text("selecione um tamanho")
          .css("background", "#707070");
        return;
      }

      $(self)
        .closest(".selector-sku")
        .next()
        .text("adicionar ao carrinho")
        .css("background", "#000");

      $(self).closest("li").addClass("active");

      $(self)
        .closest(".insert-sku-checklist")
        .find("li:not('.active') input[type=checkbox]")
        .each(function () {
          $(this).prop("checked", false);
        });
    };

    //Drop dos filtros
    const dropFilters = () =>{
      const $filters = $(".search-multiple-navigator .refino h5");
      $filters.addClass("active-most");
      $filters.on("click", function () {
        if ($(".active-less").length > 0) {
          $("#suiteshare_chat").show();
        } else {
          $("#suiteshare_chat").hide();
        }

        $(this).toggleClass("active-most active-less");
        $(this).closest(".refino").find("div").toggleClass("--active");
      });
      $(".x-filters-general").addClass("active");
    };

    //Ordenação dos produtos
    const orderBy = () => {
      $(".x-orderby ul li a").each(function () {
        var linkAtual = $(".orderBy select").eq(0);
        if (linkAtual.length) {
          linkAtual = linkAtual.attr("onchange").split("'")[1];
          var linkFinal = linkAtual + $(this).data("orderby");
          $(this).attr("href", linkFinal);
        }
      });

      // open orderby
      $(".x-orderby").mouseover(function () {
        $(this).addClass("x-active");
        $(".x-orderby .x-drop").addClass("x-active");
      });

      // close orderby
      $(".x-orderby").mouseleave(function () {
        $(this).find(".x-title-drop").removeClass("x-active");
        $(".x-orderby .x-drop").removeClass("x-active");
      });
    };

    const addToCart = () => {
      $(".buy-button").on("click", function () {
        if ($(this).prev().find("li").hasClass("active")) {
          var $liSku = $(this).prev().find(".is-checklist-item.from-shelf.active");
          var idSku = $liSku.find(".insert-sku-checkbox").attr("rel");

          var item = {
            id: idSku,
            quantity: 1,
            seller: "1",
          };
          vtexjs.checkout.getOrderForm()
              .done(function(res){
                    // console.log("Produto adicionado!");
              })
              .then(function(){
                  vtexjs.checkout.addToCart([item],null,1).done(function(orderForm){
                      window.updateCart()
                      $('.minicart__button-open').trigger('click');
                  });
              });
        }
      });
    };

    const toggleSeo = () => {
      $(".x-content__seo--open").click(function () {
        $(".x-content__seo--text").toggleClass("active");
        if ($(".x-content__seo--text").hasClass("active")) {
          $(".x-content__seo--open").text("ver menos");
        } else {
          $(".x-content__seo--open").text("ver mais");
        }
      });
    }

    $(".insert-sku-checklist")
      .find("input[type=checkbox]")
      .on("click", function () {
        checkbox(this);
      });

    videoReady();

    const totalNumberProducts = () => {
        let numberOfProducts = $('.searchResultsTime .resultado-busca-numero .value')[0].innerHTML;
        $('.x-total-product__number').html(`( ${numberOfProducts} )`);
    }

    $(document).ready(function () {
      productsLine();
      dropFilters();
      orderBy();
      nameSku();
      addToCart();
      toggleSeo();
      vtexSmartResearch();
      totalNumberProducts();

      // Colocar o titulo da pagina
      var titleCateg = $(".bread-crumb").find("a").last().text();

      $(".x-department-title").text(titleCateg);

      $('#returnToTop').hide();
    });

    $(document).ajaxStop(function (){
      productsLine();
    })
}
