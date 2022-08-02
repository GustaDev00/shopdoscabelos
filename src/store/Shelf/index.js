import './index.scss';

export const Shelf = () => {
    const removeHelpComplement = () => {
        $(".helperComplement").remove();
    }

    const verifyShelfOldPrice = () => {
        var item = $(".prateleira ul > li");
      
        item.each(function () {
          var oldpriceLength = $(this).find(".price .old-price").length;
          var hasOldPriceClass = $(this).hasClass("has-old-price").length;
      
          if (oldpriceLength && !hasOldPriceClass) {
            $(this).addClass("has-old-price");
          }
        });
    }

    // show only sku number on label
    const quickShopSkuName = () => {
      if ($(".is-checklist-item label").length > 0) {
        $(".is-checklist-item label").each(function () {
          $(this).text($(this).text().split("/")[1]);
        });
      }
    }
    
    const quickShopSkuSelection = (self) => {
      let buyButton = $(self).closest('.x-quickshop-skus').siblings('.x-quickshop-buy');
      let li = $(self).parent('li');
    
      $(self).closest(".insert-sku-checklist").find("li").removeClass("x-active");
    
      if (!$(self).is(":checked")) {
        $(self)
          .closest('.x-quickshop-skus')
          .siblings('.x-quickshop-buy')
          .attr('data-sku', '');
    
        buyButton.removeClass('x-active');
        buyButton.text('selecione um tamanho:');
        return;
      }
    
      let sku = $(self).attr('rel');
    
      $(self)
        .closest('.x-quickshop-skus')
        .siblings('.x-quickshop-buy')
        .attr('data-sku', sku);
    
      buyButton.addClass('x-active');
      buyButton.text('+ adicionar ao carrinho');
    
      li.siblings().removeClass('x-active');
      li.toggleClass('x-active');
    
      $(self)
        .closest(".insert-sku-checklist")
        .find("li:not('.x-active') input[type=checkbox]")
        .each(function () {
          $(this).prop("checked", false);
        });
    }
    
    const quickShopBuy = () => {
      $('.x-quickshop-buy').on('click', function (e) {
        e.preventDefault();
    
        let sku = $(this).attr('data-sku');
        let $this = $(this);
    
        if (sku != '') {
          vtexjs.checkout
            .getOrderForm()
            .then(function () {
              let item = [
                {
                  id: sku,
                  quantity: 1,
                  seller: '1',
                }
              ];
              return vtexjs.checkout.addToCart(item);
            })
            .done(function () {
              window.updateCart();
    
              $this.siblings('.x-quickshop-added').addClass('x-active');
              $this.closest('.x-quickshop').css('opacity', '1');
    
              setTimeout(function () {
                $('.minicart__button-open').trigger('click');
    
                $this.siblings('.x-quickshop-added').removeClass('x-active');
                $this.closest('.x-quickshop').css('opacity', '0');
              }, 1500)
            });
        }
      });
    }

    const onClickPages = () => {
        var pages = $(".pages li");
        pages.on("click", function () {
          verifyShelfOldPrice();
          addOffFlag();
        });
    }

    const shelfCarousel = () => {
      MRCAT.shelfCarousel = new VTEX.VtexShelfProperties(
        MRCAT.vtexUtils,
        VTEX.VtexCatalog,
        shelfCarouselProp,
        true
      );
      MRCAT.shelfCarousel.setEventName("shelfCarouselEnd");
      MRCAT.shelfCarousel.setShelfContainer(".js--shelf-carousel");
    }
  
    const shelfCarouselProp = ($el, product) => {
      // Images size:
      var imageWidth = $el.data("imageWidth");
      var imageHeight = $el.data("imageHeight");
      var imageLabelName = "1";
      var imageLabelName2 = "2";
      var productName = product.productName;
  
      var imageUrl = product.items[0].images[0].imageUrl;
      var imageLabel = {};
  
      if (imageLabelName) {
        imageLabel = MRCAT.globalHelpers.objectSearch(product, {
          imageLabel: imageLabelName,
        });
        imageUrl = imageLabel.imageUrl ? imageLabel.imageUrl : imageUrl;
      }
      if (imageLabelName2) {
        imageLabel2 = MRCAT.globalHelpers.objectSearch(product, {
          imageLabel: imageLabelName2,
        });
        imageUrl2 = imageLabel2.imageUrl ? imageLabel2.imageUrl : imageUrl;
      }
  
      if (imageWidth && imageHeight) {
        imageUrl = MRCAT.vtexHelpers.getResizedImage(
          imageUrl,
          imageWidth,
          imageHeight
        );
        imageUrl2 = MRCAT.vtexHelpers.getResizedImage(
          imageUrl2,
          imageWidth,
          imageHeight
        );
      }
  
      var markup =
        '<img class="x-shelf__img has--placeloader" \n  src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" \n  data-lazy="' +
        imageUrl +
        '" \n  alt="' +
        productName +
        '" \n  title="' +
        productName +
        '" \n  width="' +
        imageWidth +
        '" \n  height="' +
        imageHeight +
        '" />\n  \n  <span class="x-hover-product-image">\n    <img class="x-shelf__img has--placeloader" \n      src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" \n      data-lazy="' +
        imageUrl2 +
        '" \n      alt="' +
        productName +
        '" \n      title="' +
        productName +
        '" \n      width="' +
        imageWidth +
        '" \n      height="' +
        imageHeight +
        '" />\n  </span>';
      $el.empty().append(markup);
    }
  
    const shelfStatic = () => {
      MRCAT.shelfStatic = new VTEX.VtexShelfProperties(
        MRCAT.vtexUtils,
        VTEX.VtexCatalog,
        shelfStaticProp,
        true
      );
      MRCAT.shelfStatic.setEventName("shelfStaticEnd");
      MRCAT.shelfStatic.setShelfContainer(".js--shelf-static");
    }
  
    const shelfStaticProp = ($el, product) => {
      // Images size:
      const imageWidth = $el.data("imageWidth");
      const imageHeight = $el.data("imageHeight");
      var imageLabelName = "1";
      var imageLabelName2 = "2";
      var productName = product.productName;
  
      var imageUrl = product.items[0].images[0].imageUrl;
      var imageLabel = {};
  
      var colors_temp = product.items.map(function (item, index) {
        return item.Cores[0];
      });
      var colors = MRCAT.globalHelpers.arrayUnique(colors_temp);
      if (imageLabelName) {
        imageLabel = MRCAT.globalHelpers.objectSearch(product, {
          imageLabel: imageLabelName,
        });
        imageUrl = imageLabel.imageUrl ? imageLabel.imageUrl : imageUrl;
      }
      if (imageLabelName2) {
        imageLabel2 = MRCAT.globalHelpers.objectSearch(product, {
          imageLabel: imageLabelName2,
        });
        imageUrl2 = imageLabel2.imageUrl ? imageLabel2.imageUrl : imageUrl;
      }
  
      if (imageWidth && imageHeight) {
        imageUrl = MRCAT.vtexHelpers.getResizedImage(
          imageUrl,
          imageWidth,
          imageHeight
        );
        imageUrl2 = MRCAT.vtexHelpers.getResizedImage(
          imageUrl2,
          imageWidth,
          imageHeight
        );
      }
  
      var markup =
        '<img class="x-shelf__img has--lazy has--placeloader js--lazy" \n  src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" \n  data-src="' +
        imageUrl +
        '" \n  alt="' +
        productName +
        '" \n  title="' +
        productName +
        '" \n  width="' +
        imageWidth +
        '" \n  height="' +
        imageHeight +
        '" />\n  \n  <span class="x-hover-product-image">\n    <img class="x-shelf__img has--lazy has--placeloader js--lazy" \n      src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" \n      data-src="' +
        imageUrl2 +
        '" \n      alt="' +
        productName +
        '" \n      title="' +
        productName +
        '" \n      width="' +
        imageWidth +
        '" \n      height="' +
        imageHeight +
        '" />\n  </span>';
      $el.empty().append(markup);
    }
  
    const shelfStaticUpdate = () => {
      // Update on search
      $(document).on("shelfStaticEnd.vtexShelfProperties", function (ev) {
        MRCAT.shelfStatic.update();
        MRCAT.lazyload.update();
      });
    }

    const lazyLoad = () => {
      shelfCarousel();
      shelfStatic();
      shelfStaticUpdate();
    };
    
    const setLazy = () => {
      MRCAT.lazyload = new LazyLoad({
        data_src: "src",
        data_srcset: "srcset",
        class_loading: "is--loading",
        class_loaded: "is--loaded",
        class_error: "has--lazy-error",
        elements_selector: ".js--lazy",
        threshold: 150,
        callback_set: function (self) {
          $(self).removeClass("has--lazy");
        },
        callback_load: function (self) {
          $(self).removeClass("has--placeloader");
        },
      });
    };

    $(document).ready(function () {
      removeHelpComplement();
      verifyShelfOldPrice();
      quickShopSkuName();
      quickShopBuy();
      
      $(".insert-sku-checklist")
        .find("input[type=checkbox]")
        .on("click", function () {
          quickShopSkuSelection(this);
        });
    });
    
    $(document).ajaxStop(function () {
      removeHelpComplement();
      verifyShelfOldPrice();
      
      setTimeout(function() {
        quickShopSkuName();
        quickShopBuy();
      
        $(".insert-sku-checklist")
          .find("input[type=checkbox]")
          .on("click", function () {
            quickShopSkuSelection(this);
          });
      }, 1000)
    });
}