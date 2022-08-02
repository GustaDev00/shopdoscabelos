import './index.scss';

import '../../assets/javascripts/jquery.elevatezoom';
import Swal from 'sweetalert2';

export const Product = () => {
    // Variavel global para pegar o vídeo na tabela de especificação do Produto
    let videoFrame = $('#tab-2 .x-tab-body #caracteristicas table td.Video').html();

    const checkProduct = () => {
        var product_id = '';
        if (skuJson_0 != undefined) product_id = skuJson_0.productId;
        else if (skuJson != undefined) product_id = skuJson.productId;
        // var slide = $(".x-product-top-main .x-photo-product .x-images .thumbs").append('<li class="x-video">'
        // + '<span> Video </span> </li>');
    };

    const verifySelectedSKU = () => {
        window.alert = function (msg) {
            // Verifica se o SKU foi selecionado
            var regex_fail = /selecione/gi;
            if (regex_fail.test(msg)) {
                Swal.fire({
                    type: 'info',
                    title: 'Ops!',
                    text: 'Você esqueceu de selecionar o tamanho.',
                    confirmButtonColor: '#000000',
                });
            }
        };
    };

    const sliderPhotos = () => {
        var options = {
            infinite: false,
            slidesToShow: 1,
            slidesToScroll: 1,
            draggable: false,
            arrows: true,
            dots: true,
        };

        checkProduct();
        var slide = $('.x-product-top-main .x-photo-product .x-images .thumbs').slick(options);

        $('.sku-selector-container').on('change', function () {
            $('#show > ul').removeClass('slick-initialized slick-slider slick-dotted').addClass('x-loading');

            // setTimeout(function () {
            checkProduct();
            slide.slick(options);
            slide.slick('resize');
            // videoProduct();
            $('#show > ul').removeClass('x-loading');
            makeSliderWithDots();
            showShippingData();
            window.scrollTo(0, 0);
            // }, 500);
        });
    };

    const textOutOfStock = () => {
       
        for(let i = 1;i < skuJson.skus.length; i++){
         
            if(skuJson.skus[i].available == false){
                
                let $wrapper = document.querySelector('.exchange-info'),
                // Pega a string do conteúdo atual
                HTMLTemporario = $wrapper.innerHTML,
      
                HTMLNovo = '<p class="info-stock"> <b style="font-weight: 700">Seu número está esgotado?</b> Selecione ele e preencha os dados para ser avisado. </br> </br>';
    
                HTMLTemporario = HTMLNovo + HTMLTemporario;
             
          
            $wrapper.innerHTML = HTMLTemporario;
            break;
            }
        }
    };

    const avisoEstoque = () => {
        for (var i = 0; i < skuJson.skus.length; i++) {
            let sku = skuJson.skus[i];

            1 == sku.available &&
                sku.availablequantity < 6 &&
                $('.skuespec_Tamanho_opcao_' + sku.dimensions.Tamanho).attr('rel-stock', sku.availablequantity);
        }

        $('.sku-selector-container .Tamanho .skuList span')
            .children('label')
            .each(function () {
                if ($(this).attr('rel-stock') != undefined) {
                    var stockElement = '';

                    if ($(this).attr('rel-stock') == 1) {
                        stockElement = 'Resta 1 unidade';
                    } else {
                        stockElement = 'Restam ' + $(this).attr('rel-stock') + ' unidades';
                    }

                    $(this).append('<span class="aviso-estoque">' + stockElement + '</span>');
                }
            });
    };

    const makeSliderWithDots = () => {
        var large_window = $(document).width();

        var $slider = $('.x-photo-product .x-images .thumbs');
        var $dots = $('.x-photo-product .x-images .thumbs .slick-dots li button');
        var $imgs = $slider.find('li img');

        if (large_window > 1080) {
            $imgs.each(function (i) {
                $dots.eq(i).append($(this).clone());
            });

            // const videoFrame = this.videoFrame;
            if (videoFrame != undefined) {
                if ($('.container-video iframe').length > 0) {
                    var youtube_video_id = videoFrame.match(/youtube\.com.*(\?v=|\/embed\/)(.{11})/).pop();
                    var video_thumbnail = $('<img src="//img.youtube.com/vi/' + youtube_video_id + '/2.jpg">');
                    $('ul.slick-dots li:last-child button').append('<img src=' + video_thumbnail[0].src + '></img>');
                }
                if ($('.container-video video').length > 0 && $('.container-video iframe').length == 0) {
                    var srcVideo = $('.container-video video').attr('src');
                    $('ul.slick-dots li:last-child button').append(
                        '<video src="' +
                            srcVideo +
                            '" type="video/mp4" muted="" style="width: 100%;" autoplay="" loop="" name="media"></video>'
                    );
                }
            }
        }
    };

    var similarProduct = {
        init: function () {
            this.removeShelf();
            this.setProcuct();
        },

        removeShelf: function () {
            $('.x-who-buy-who-also .x-product-list').html('');
        },

        setProcuct: function () {
            var categoriesIds;

            // Get categoriesIds
            $.ajax({
                async: true,
                url: '/api/catalog_system/pub/products/search/?fq=productId:' + skuJson.productId,
                method: 'GET',
                headers: {
                    accept: 'application/vnd.vtex.ds.v10+json',
                    'content-type': 'application/json',
                },
            }).done(function (response) {
                categoriesIds = response[0].categoriesIds[0];

                // Get products
                $.ajax({
                    async: true,
                    url: '/api/catalog_system/pub/products/search/?fq=C:' + categoriesIds,
                    method: 'GET',
                    headers: {
                        accept: 'application/vnd.vtex.ds.v10+json',
                        'content-type': 'application/json',
                    },
                }).done(function (response) {
                    var productList = '';

                    response.forEach(function (item) {
                        if (item.productId != skuJson.productId) productList += 'fq=productId:' + item.productId + '&';
                    });

                    $.ajax(
                        '/buscapagina?' +
                            productList +
                            'PS=' +
                            10 +
                            '&sl=' +
                            '3f57a87b-795f-494d-a713-61e4ecad47b0' +
                            '&cc=100&sm=0&PageNumber=1'
                    )
                        .done(function (data) {
                            $('.x-who-buy-who-also .x-product-list').html(data);

                            similarProduct.startSlider();
                        })
                        .fail(function (err) {
                            console.log(err);
                        });
                });
            });
        },

        startSlider: function () {
            var large_window = $(document).width();
            var qtdImg;
            var _shelf = $('.x-who-buy-who-also .prateleira ul');

            if (large_window <= 1080) {
                //tablet
                qtdImg = 2;
            } else if (large_window > 1080) {
                // desktop
                qtdImg = 3;
            }

            var options = {
                infinite: true,
                centerMode: true,
                slidesToShow: qtdImg,
                centerPadding: '0px',
                focusOnSelect: false,
                touchMove: false,
                cssEase: 'linear',
            };

            _shelf.slick(options);
        },
    };

    const orderInfoProduct = () => {
        //  order sku tamanho after colors
        var skucontainer = $('.x-info-product .x-skus-group .sku-selector-container');
        skucontainer.append(skucontainer.find('.Tamanho'));
    };

    const variationsColor = () => {
        // add colors thumbs product
        $('.x-info-product .sku-selector-container .Cores .item-dimension-Cores label').each(function () {
            var color = $.trim($(this).text().toLowerCase());
            color = color.replace(/ /g, '-').replace('/', '');
            $(this).append('<img src="/arquivos/' + color + '.jpg" border="0" alt=""/>');
        });
    };

    const popupHowCare = () => {
        $('.tabs li:nth-child(4)').click(function () {
            $('.x-popup-how-care').fadeIn(100);
        });

        $('.x-popup-how-care .x-icon-close').click(function () {
            $('.x-popup-how-care').fadeOut(100);
        });

        $('.x-popup-how-care .x-overlay').click(function () {
            $('.x-popup-how-care').fadeOut(100);
        });
    };

    const btnRenameAviseme = () => {
        $('.x-info-product .x-call-to-action .portal-notify-me-ref .notifyme-form .btn-ok').val('Avise-me');
    };

    const zoomProduct = () => {
        var imgProduct = $('.x-photo-product .x-images .thumbs .slick-track li img');

        imgProduct.each(function (index) {
            var srcImg = $(this).attr('src').replace('-728-728', '-1200-1200');
            $(this).attr('data-zoom-image', srcImg);
        });

        imgProduct.elevateZoom({
            zoomType: 'inner',
            cursor: 'crosshair',
            zoomWindowFadeIn: 100,
            zoomWindowFadeOut: 100,
        });
    };

    const LoadzoomProduct = () => {
        $('.x-product-top-main .x-info-product .x-skus-group .skuList label').click(function () {
            // reconstroi zoom product
            $('html body .zoomContainer').remove();
            setTimeout(function () {
                zoomProduct();
            }, 1500);
        });
    };

    const quickViewCategory = () => {
        if (!$('.x-show-quickview').length) {
            $('.x-product-list .prateleira ul li').each(function () {
                $(this)
                    .find('.x-quickViewLink')
                    .click(function (e) {
                        e.preventDefault();
                        e.stopPropagation();
                        var url = $(this).attr('href');
                        $('#x-popup-product').show();
                        $('.x-quickView-iframe iframe').attr('src', url);
                    });
            });
            $('#x-popup-product .x-close-all, .x-quickView-iframe .x-close-popup').click(function () {
                $('.x-quickView-iframe iframe').attr('src', '');
                $('#x-popup-product').hide();
            });
        }
    };

    const verifyHowToCare = () => {
        var categoryName = dataLayer[0].productCategoryName;
        var btnCare = $('.x-call-to-action .x-how-care');

        if (categoryName != 'Polos') {
            btnCare.show();
        }
    };

    const setTotalInCart = () => {
        vtexjs.checkout.getOrderForm().done(function (orderForm) {
            var cartQtdItems = orderForm.items.length;
            $('#x-itens-in-cart').text(cartQtdItems);
        });
    };

    var compreJunto = {
        init: function () {
            this.setCurrent();
            this.start();
            this.selectSize();
            this.selectColor();
            this.addToCart();
            this.setPrices($('.x-extra-product .prateleira ul.slick-slider li.slick-active'));
            this.changeActive();
        },

        start: function () {
            $('.x-extra-product .prateleira > ul').slick({
                infinite: false,
                slidesToShow: 1,
                dots: false,
            });

            var nameProduct1, nameProduct2;
            var $vitrine = $('.x-extra-product .prateleira ul.slick-slider li.slick-active');

            nameProduct1 = $('.x-current-product .x-name-product').text();
            nameProduct2 = $('.x-extra-product .prateleira .slick-slider li.slick-active .product-name').text();

            var $list = $('.x-group-price-together .x-group-infos');
            $list.find('.x-name1').text(nameProduct1);
            $list.find('.x-name2').text(nameProduct2);

            $('.x-extra-product .prateleira .slick-slider li.slick-active .x-sizes li').on('click', function () {
                compreJunto.setPrices($vitrine);
                compreJunto.setAddToCart();
            });

            if (!$vitrine.length) {
                $('.x-buy-together').hide();
                return;
            }
            $vitrine.each(function () {
                var id = $(this).find('.x-id-produto-input').val();
                var produtoJSON = compreJunto.getInfo(id);
                var $vitrineAtual = $(this);
                compreJunto.setExtraObj(produtoJSON, id, $vitrineAtual);
            });
        },

        getInfo: function (id) {
            var json;

            $.ajax({
                url: '/api/catalog_system/pub/products/variations/' + id,
                dataType: 'json',
                async: false,
                success: function (data) {
                    json = data;
                },
            });

            return json;
        },

        setCurrent: function () {
            var img;

            $.ajax({
                url: '/api/catalog_system/pub/products/search/?fq=productId:' + skuJson_0.productId,
                async: false,
                success: function (data) {
                    var imgData = data[0].items[0].images[0];
                    var imgID = imgData.imageId;
                    var imgText = imgData.imageText;
                    img = '/arquivos/ids/' + imgID + '-600-600/' + imgText + '.jpg';
                },
                error: function () {
                    img = $('#image-main').attr('src');
                },
            });

            var name = $('.x-product-descriptions .x-name-product .productName').text();
            var listPrice = $('.x-info-product .x-price-group .valor-de .skuListPrice').text();
            var bestPrice = $('.x-info-product .x-price-group .valor-por .skuBestPrice').text();
            var installments = $('.x-info-product .x-price-group .valor-dividido').text();

            var $div = $('.x-shelf-together .x-current-product');

            $div.find('.x-id-produto-input').val(skuJson_0.productId);
            $div.find('.x-image').append('<img src="' + img + '" />');
            $div.find('.x-name-product').append(name);
            $div.find('.x-price').append('<span class="x-bestPrice"><strong>' + bestPrice + '</strong></span>');

            var json = compreJunto.getInfo(skuJson_0.productId);
            compreJunto.setVariation(json, skuJson_0.productId);
        },

        setVariation: function (obj, id) {
            var product = {};
            var $current = $('.x-current-product');

            product.id = id;
            product.colors = obj.dimensionsMap.Cores;
            product.sizes = obj.dimensionsMap.Tamanho;

            // lis de cores do produto da pagina atual
            var $colors = product.colors.map(function (cor) {
                var classThumb = cor.replace(/s+/g, '').toLowerCase();
                classThumb = 'skuespec_Cor_opcao_' + classThumb.charAt(0).toUpperCase() + classThumb.slice(1);
                return $('<li class="x-cor ' + cor + ' ' + classThumb + '" data-color="' + cor + '">').text(cor);
            });

            // lis de tamanhos do produto da pagina atual
            var $sizes = product.sizes.map(function (size) {
                return $('<li class="' + size + '" data-size="' + size + '">').text(size);
            });

            // preenchendo uls com as lis dos skus do produto da pagina atual
            $colors.forEach(function (elem) {
                $current.find('.x-colors ul').append(elem);
            });

            $sizes.forEach(function (elem) {
                $current.find('.x-sizes ul').append(elem);
            });
        },

        setExtraObj: function (obj, id, vitrine) {
            var product = {};
            var $extra = vitrine;

            product.id = id;
            product.colors = obj.dimensionsMap.Cores;
            product.sizes = obj.dimensionsMap.Tamanho;

            compreJunto.setVariationExtra(product, $extra);
        },

        setVariationExtra: function (product, $li) {
            // lis de cores
            var $colors = product.colors.map(function (cor) {
                var classThumb = cor.replace(/s+/g, '').toLowerCase();
                classThumb = 'skuespec_Cor_opcao_' + classThumb.charAt(0).toUpperCase() + classThumb.slice(1);
                return $('<li class="x-cor ' + cor + ' ' + classThumb + '" data-color="' + cor + '">').text(cor);
            });

            // lis de tamanhos
            var $sizes = product.sizes.map(function (size) {
                return $('<li class="' + size + '" data-size="' + size + '">').text(size);
            });

            // preenchendo uls com as lis dos skus
            $colors.forEach(function (elem) {
                $li.find('.x-colors ul').append(elem);
            });

            $sizes.forEach(function (elem) {
                $li.find('.x-sizes ul').append(elem);
            });
        },

        selectColor: function () {
            $('.x-extra-product').on('click', '.x-colors li', function () {
                $(this).closest('ul').find('li').removeClass('x-active');
                var id = $('.x-extra-product .prateleira > ul li.slick-active').find('.x-id-produto-input').val();
                var color = $(this).data('color');
                var list = $(this).parent().parent().parent().find('.x-sizes ul');
                $(this).addClass('x-active');
                compreJunto.updateSizes(id, color, list);
            });

            $('.x-current-product').on('click', '.x-colors li', function () {
                $(this).closest('ul').find('li').removeClass('x-active');
                var id = $('.x-current-product').find('.x-id-produto-input').val();
                var color = $(this).data('color');
                var list = $(this).parent().parent().parent().find('.x-sizes ul');
                $(this).addClass('x-active');
                compreJunto.updateSizes(id, color, list);
            });
        },

        updateSizes: function (id, color, list) {
            var product = compreJunto.getInfo(id);
            var color = color;
            var skus = product.skus;
            var sizes = [];

            skus.forEach(function (item) {
                var currentColor = item.dimensions.Cores;
                var available = item.available;

                if (color == currentColor) {
                    var currentSize = item.dimensions.Tamanho;
                    if (available) {
                        sizes.push({
                            size: currentSize,
                            available: available,
                            availableClass: 'x-disponivel',
                            sku: item.sku,
                        });
                    } else {
                        sizes.push({
                            size: currentSize,
                            available: available,
                            availableClass: 'x-indisponivel',
                            sku: item.sku,
                        });
                    }
                }
            });

            var $list = $(list);
            $list.html('');
            for (var index in sizes) {
                if (sizes.hasOwnProperty(index)) {
                    var $li = $(
                        '<li data-size="' +
                            sizes[index].size +
                            '" data-sku="' +
                            sizes[index].sku +
                            '" data-available="' +
                            sizes[index].available +
                            '"class="' +
                            sizes[index].availableClass +
                            '">'
                    ).text(sizes[index].size);
                    $list.append($li);
                }
            }
        },

        selectSize: function () {
            $('.x-shelf-together').on('click', '.x-sizes li', function () {
                $(this).closest('ul').find('li').removeClass('x-active');
                var available = $(this).data('available');
                var btn = $(this).closest('ul').closest('li').find('.x-buy-item');

                if (!!available) {
                    $(this).addClass('x-active');
                    compreJunto.setAddToCart();
                } else {
                    alert('Selecione uma das opções disponíveis');
                }
            });
        },

        setAddToCart: function () {
            var skus = [];
            var buy = false;
            $('.x-extra-product .prateleira .slick-slider li.slick-active').each(function () {
                var codSku = $(this).find('.x-sizes li.x-active').data('sku');
                if (codSku) {
                    skus.push(+codSku);
                }
            });

            var skuCurrentProdutc = $('.x-current-product .x-variations-group .x-sizes li.x-active').data('sku');
            if (skuCurrentProdutc != undefined) {
                skus.push(skuCurrentProdutc);
            } else {
                return;
            }

            if (skus.length > 1) {
                $('.x-group-price-together .x-buy a').attr('data-skus', skus.join('-'));
            }
        },

        addToCart: function () {
            $('.x-group-infos').on('click', '.x-buy a', function () {
                var skus = $(this).data('skus');
                var btn = $(this);

                if (!skus) {
                    alert('Por favor: Selecione a cor e o tamanho dos produtos.');
                    return false;
                } else {
                    skus = skus.split('-');
                    if (skus.length < 2) {
                        alert('Por favor: Selecione a cor e o tamanho dos produtos.');
                        return false;
                    }
                }

                var skusToAdd = [];
                skus.forEach(function (sku) {
                    skusToAdd.push({
                        id: sku,
                        quantity: 1,
                        seller: 1,
                    });
                });

                $(btn).text('Adicionando...');

                vtexjs.checkout.getOrderForm().done(function (orderForm) {
                    vtexjs.checkout
                        .addToCart(skusToAdd)
                        .fail(function () {
                            alert('Não foi possível adicionar esse produto, tente novamente!');
                        })
                        .done(function (orderForm) {
                            setTotalInCart();
                            $(btn).removeClass('x-adicionando').addClass('x-adicionado');
                            $(btn).text('Produtos adicionados');

                            window.location.href = '/checkout';
                            //jQuery.vtex_quick_cart(optionsMiniCart);
                        });
                });

                return false;
            });
        },

        setPrices: function () {
            var prices = [];
            var precoProdutoAtual = $('.x-current-product .x-price strong').text();

            function pushToPrices(text) {
                var float = +text.replace('R$', '').replace(/\s+/g, '').replace('.', '').replace(',', '.');
                prices.push(float);
            }

            pushToPrices(precoProdutoAtual);

            // var precoProdutoCombinado = $('.x-extra-product .prateleira .slick-slider li.slick').find('.price .best-price').text();
            var precoProdutoCombinado = $('.x-extra-product .prateleira ul.slick-slider li')
                .find('.price .best-price')
                .text();
            pushToPrices(precoProdutoCombinado);

            function upDatePrice() {
                var total = prices.reduce(function (prev, current) {
                    return prev + current;
                }, 0);

                var installments = 10;
                var parcel = total / 10;
                parcel = floatToCurrency(parcel);
                total = floatToCurrency(total);

                var stringIntallments = ' ou <strong>' + installments + 'x</strong> de <strong>' + parcel + '</strong>';

                if (prices.length > 1) {
                    $('.x-group-price-together .x-price').html('<strong>' + total + '</strong>');
                    $('.x-group-price-together .x-installment').html('<span>' + stringIntallments + '</span>');
                    $('.x-group-price-together .x-buy a').addClass('x-active').text('comprar');
                } else {
                    $('.x-group-price-together .x-price').html('');
                    $('.x-group-price-together .x-installment').html('');
                    $('.x-group-price-together .x-buy a').removeClass('x-active').text('Selecione um produto');
                }
            }
            upDatePrice();
        },

        changeActive: function () {
            $('.x-extra-product .prateleira .slick-slider .slick-next').on('click', function () {
                $('.x-extra-product .prateleira .x-variations-group ul li').removeClass('x-active');

                var nameProduct1, nameProduct2;

                nameProduct1 = $('.x-current-product .x-name-product').text();
                nameProduct2 = $('.x-extra-product .prateleira .slick-slider li.slick-active .product-name').text();

                var $list = $('.x-group-price-together .x-group-infos');
                $list.find('.x-name1').text(nameProduct1);
                $list.find('.x-name2').text(nameProduct2);

                compreJunto.setPrices();
            });

            $('.x-extra-product .prateleira .slick-slider .slick-prev').on('click', function () {
                $('.x-extra-product .prateleira .x-variations-group ul li').removeClass('x-active');

                var nameProduct1, nameProduct2;

                nameProduct1 = $('.x-current-product .x-name-product').text();
                nameProduct2 = $('.x-extra-product .prateleira .slick-slider li.slick-active .product-name').text();

                var $list = $('.x-group-price-together .x-group-infos');
                $list.find('.x-name1').text(nameProduct1);
                $list.find('.x-name2').text(nameProduct2);

                compreJunto.setPrices();
            });
        },
    };

    //Inserindo thumb com vídeo
    const videoProduct = () => {
        var product_id = '';

        if (skuJson_0 != undefined) product_id = skuJson_0.productId;
        else if (skuJson != undefined) product_id = skuJson.productId;

        $.ajax('/api/catalog_system/pub/products/search/?fq=productId:' + product_id, {
            type: 'GET',
            dataType: 'json',

            error: function (jqXHR, textStatus, errorThrown) {
                console.log('AJAX Error: ' + textStatus);
            },

            success: function (data, textStatus, jqXHR) {
                skus = data;
                var videoProduct = skus[0].Video;

                if (videoProduct != undefined) {
                    $('.x-images .thumbs .slick-dots').append(
                        '<li class="x-product_video" data-video="' + videoProduct + '"></li>'
                    );
                }
            },
        });
    };

    //Modal do vídeo
    const videoModal = () => {
        var modalTemplate =
            '<div class="modal-overlay">' +
            '<div class="modal-video">' +
            '<i class="modal-close">X</i>' +
            '<iframe frameborder="0" allowfullscreen="allowfullscreen"></iframe>';
        ('</div>');
        ('</div>');

        $('.x-general').append(modalTemplate);

        $('body').on('click', '.x-product_video', function () {
            var urlVideo = $(this).data('video');

            $('.modal-video iframe').attr('src', urlVideo + '?autoplay=1&rel=0');
            $('.modal-overlay').addClass('active');
        });

        $('body').on('click', '.modal-close', function () {
            $('.modal-overlay').removeClass('active');
            $('.modal-video iframe').removeAttr('src');
        });
    };

    var addToCart = function () {
        $('.buy-button').on('click', function (event) {
            var verify = $(this).attr('href');
            var sku = verify.split('sku=')[1].split('&')[0];

            verifySelectedSKU();
        })

        // only number input text
        if ($('.x-kit-promotion div').length) {
            $('.buy-button').click(function (event) {
                event.preventDefault();
                var quantity = $('.buy-button-amount').val();
                var verify = $(this).attr('href');
                var sku = verify.split('sku=')[1].split('&')[0];
                var product = {
                    id: sku,
                    quantity: quantity,
                    seller: 1,
                };

                vtexjs.checkout.addToCart([product]).done(function (orderForm) {
                    jQuery.vtex_quick_cart(optionsMiniCart);
                    $('.minicart_v2 .ico--bag').trigger('click');
                });

                $('.x-kit-promotion').show();
                return false;
            });

            $('.x-kit-promotion .x-CTA-kitPromotion').click(function (e) {
                e.preventDefault();
                var quantity = 1;
                var sku = $(this).val();
                if (sku == '') {
                    alert('Escolha a numeração');
                }
                var product = {
                    id: sku,
                    quantity: quantity,
                    seller: 1,
                };

                vtexjs.checkout.addToCart([product]).done(function (orderForm) {
                    $('.x-kit-promotion').hide();
                    jQuery.vtex_quick_cart(optionsMiniCart);
                    $('.x-item-cart').eq(0).addClass('x-active');
                });

                return false;
            });
        }
    };

    const kitPromotion = () => {
        if ($('.x-kit-promotion div').length) {
            var kitContent = $('.x-kit-promotion');
            kitContent.show();
            var productId = kitContent.find('.x-id').val();
            kitContent.find('.price').after('<div class="x-sizes"><div>TAMANHO </div></div>');

            var oldImg = $('.thumbs .slick-slide a').eq(0).html();
            var oldName = $('.productName').eq(0).text();
            var oldPrice = $('.skuBestPrice').text();
            $('.x-box__product')
                .eq(0)
                .prepend(
                    oldImg +
                        '<div class="x-box__bottom"><span>' +
                        oldName +
                        '</span><span class="price">' +
                        oldPrice +
                        '</span>'
                );

            $('.x-kit-promotion .price').each(function () {
                var valor = $(this).text().replace('R$', '').replace('.', '').replace(',', '.');
                valor = parseFloat(valor);
                if (valor > 100) {
                    var novoValor = (valor - 100).toFixed(2);
                    novoValor = novoValor.toString().replace('.', ',');
                    $(this).text('R$ ' + novoValor);
                }
            });

            vtexjs.catalog.getProductWithVariations(productId).done(function (product) {
                dataProduct = product.skus;
                var sizeQtd = dataProduct.length;
                for (i = 0; i < sizeQtd; i++) {
                    if (dataProduct[i].dimensions.Tamanho != 'UN') {
                        kitContent
                            .find('.x-sizes')
                            .append(
                                '<span value="' +
                                    dataProduct[i].sku +
                                    '">' +
                                    dataProduct[i].dimensions.Tamanho +
                                    '</span>'
                            );
                    } else {
                        kitContent.find('.x-CTA-kitPromotion').attr('value', dataProduct[i].sku);
                        kitContent.find('.x-sizes').remove();
                    }
                }
                kitContent.find('.x-sizes span').click(function () {
                    kitContent.find('.x-sizes span').removeClass('active');
                    kitContent.find('.x-CTA-kitPromotion').attr('value', $(this).attr('value'));
                    $(this).addClass('active');
                });
            });

            kitContent.find('.x-kit-close').click(function () {
                kitContent.hide();
            });
        }
        $('.x-kit-promotion').hide();
    };

    const notifyMe = () => {
        $('.skuList').on('change', function () {
            var selecionado = $(this).find('label.checked');
            if (selecionado.hasClass('item_unavailable')) {
                $('.notifyMe').fadeIn();
            } else {
                $('.notifyMe').hide();
            }
        });
        $('#formNotifyMe').on('submit', function (e) {
            e.preventDefault();

            var apiName = $('#notifymeName').val();
            var apiEmail = $('#notifymeEmail').val();
            var apiSku = $('input[name="notifymeIdSku"]').val();
            var productId = skuJson.productId;
            var department = vtxctx.departmentName;

            $('#notifymeOK').val('ENVIANDO...');
            var json_inviter = {
                unique: 'Email',
                'fields[0][Email]': apiEmail,
                'fields[1][nome]': apiName,
                'fields[2][sku]': apiSku,
                'fields[3][idProduto]': productId,
                'fields[4][sexo]': department,
                'fields[5][Source]': 'Avise-Me',
            };
            $.ajax({
                type: 'POST',
                url: 'https://landfy.smartcampaign.com.br/landfy/api/4bea688b-2b84-11e8-8ad3-0e7eae3ca056',
                data: json_inviter,
            })
                .done(function (response) {
                    var resposta = response.response;
                    if (resposta == 0) {
                        alert('Ocorreu um erro. Por favor verifique o email e tente novamente');
                        $('#notifymeOK').val('AVISE-ME');
                    } else {
                        $('.x-notsuccess').fadeIn();
                        $('#formNotifyMe').fadeOut();
                    }
                })
                .fail(function () {
                    alert('Ocorreu um erro. Por favor verifique o email e tente novamente');
                    $('#notifymeOK').val('AVISE-ME');
                });
        });
    };

    const share_link = () => {
        var components = {
            facebook: '.x-step__btn--facebook',
            twitter: '.x-step__btn--twitter',
            whatsapp: '.x-step__btn--whatsapp',
            email: '.x-step__btn--email',
            pinterest: '.x-step__btn--pinterest',
        };
        var product = skuJson.name;
        var page = window.location.href;
        $(components.facebook).on('click', function () {
            var url = 'https://www.facebook.com/sharer/sharer.php?u=' + page;

            return window.open(url, '', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=300,width=600'), !1;
        });
        $(components.twitter).on('click', function () {
            var url = 'http://twitter.com/share?text=' + product + '&url=' + page;

            return window.open(url, '', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=300,width=600'), !1;
        });
        $(components.whatsapp).on('click', function () {
            // var url = "whatsapp://send?text=" + page;
            var url = 'http://api.whatsapp.com/send?text=' + product + '%0A' + page;

            return window.open(url, '', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=300,width=600'), !1;
        });
        $(components.email).on('click', function () {
            var url =
                'mailto:?subject=Novidades Mr. Cat!&body=Veja você também!%0D%0A%0D' +
                product +
                '%0D%0A%0D' +
                page +
                '%0D%0A%0D';

            return (window.location.href = url);
        });
        $(components.pinterest).on('click', function () {
            var url = 'https://pinterest.com/pin/create/link/?url=' + page + '&amp;description=' + product;

            return window.open(url, '', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=300,width=600'), !1;
        });
    };

    const tabsDescriptionProduct = () => {
        var tabTitle = $('.x-tab-header');

        tabTitle.click(function () {
            tabTitle.not(this).removeClass('x-active');
            $(this).toggleClass('x-active');
            tabTitle.not(this).next().slideUp('fast');
            $(this).next().slideToggle('fast');
        });
    };

    const buyBySize = () => {
        $.get('/api/catalog_system/pub/products/search?fq=productId:' + skuJson.productId).done(function (response) {
            if (response[0].Material) {
                var mat = response[0].Material;
                $('.x-material').html(mat.join('<br>'));
            } else {
                $('.x-material').closest('.x-tab-info-product').remove();
            }
            if (/UN/i.test(response[0].items[0].Tamanho) == true) {
                $('.x-buy-size').remove();
            }
        });
    };

    const productsKit = () => {
        if ($('.kits-list').length) {
            var prodId = $('#___rc-p-id').val();

            $('.kit').each(function () {
                var prodView = $(this).data('products');

                if (prodView.indexOf(prodId) > -1) {
                    var prodKitTitle = $(this).find('.kit-infos').data('title');
                    var prodKitProducts = $(this).find('.kit-products').data('product-ids').split(',');
                    var prodKitListPrice = $(this).find('.kit-infos').data('listprice');
                    var prodKitBestPrice = $(this).find('.kit-infos').data('bestprice');

                    $('.select.skuList.item-dimension-Tamanho').after(
                        '<ul class="product-kit"><h2>Monte seu kit: ' +
                            prodKitTitle +
                            '</h2><h3>DE: <strong>' +
                            prodKitListPrice +
                            '</strong> Por: <strong>' +
                            prodKitBestPrice +
                            '</strong></h3></ul>'
                    );

                    for (var i = 0; i < prodKitProducts.length; i++) {
                        $.get('/api/catalog_system/pub/products/search?fq=productId:' + prodKitProducts[i]).done(
                            function (response) {
                                if (response[0] != undefined) {
                                    $('.product-kit').append(
                                        '<li><a href="' +
                                            response[0].link +
                                            '"><img src="' +
                                            response[0].items[0].images[0].imageUrl +
                                            '" alt="' +
                                            response[0].productName +
                                            '"><h4>' +
                                            response[0].productName +
                                            '</h4></a></li>'
                                    );
                                }
                            }
                        );
                    }
                }
            });
        }
    };

    const currentPostalCode = (postalCode) => {
        var divPostalCodeRegion = $('#postalCode-region'),
            msgIsPostalCode = $(
                '<p class="cepteste">O CEP selecionado para entrega é: <strong>' + postalCode + '</strong> </p>'
            );

        if (postalCode != undefined && postalCode != '') {
            divPostalCodeRegion.prepend(msgIsPostalCode);
        }

        if ($('#postalCode-region .cepteste').length > 0) {
            $('#postalCode-region .regionMsg').text('Se desejar consultar outro cep, digite novamente abaixo:');
        }
    };

    const testeFunctionRegion = () => {
        var postalCode = $('#postalCode-input').val(),
            json = {
                public: {
                    country: {
                        value: 'BRA',
                    },
                    postalCode: {
                        value: postalCode,
                    },
                },
            },
            jsonData = JSON.stringify(json);

        if (postalCode.length == '9') {

            //Adicionando no orderform o Cep
            vtexjs.checkout.getOrderForm()
            .then(function(orderForm) {
              var postalCode_order = postalCode;
              var country = 'BRA';
              var address = {
                "postalCode": postalCode_order,
                "country": country
              };
              return vtexjs.checkout.calculateShipping(address)
            })
            .done(function(orderForm) {
            });

            $.ajax({
                url: '/api/sessions',
                type: 'POST',
                dataType: 'json',
                data: jsonData,
                headers: {
                    accept: 'application/json',
                    'content-type': 'application/json',
                },
                processData: false,
                beforeSend: function () {
                    $('#submit-button').text('Calculando...');
                    $('#submit-button').addClass('is-disable');
                },
                success: function (response) {
                    location.reload();
                },
                error: function (e) {
                    console.error('Requisição falha');
                },
            });
        } else {
            if ($('.cepError').length == 0) {
                $('.postalCode-field').append($('<p class="cepError">CEP inválido</p>'));
            }
        }
    };

    const regionPostalCode = () => {
        $('#postalCode-input').mask('99999-999');

        var settings = {
            url: '/api/sessions?items=public.postalCode',
            method: 'GET',
            timeout: 0,
        };

        $.ajax(settings).done(function (response) {
            if (response.namespaces.public.postalCode != undefined && response.namespaces.public.postalCode != '') {
                currentPostalCode(response.namespaces.public.postalCode.value);
                showShippingData();
            } else {
                console.warn('Postal code ainda não está definido');
            }
        });

        $(document).on('click', '#submit-button', function () {
            testeFunctionRegion();
        });

        jQuery(function ($) {
            $('#postalCode-input').on('keypress', function (e) {
                if (e.keyCode == 13) {
                    testeFunctionRegion();
                }
            });
        });
    };

    const tabsDescription = () => {
        $('ul.tabs li').click(function () {
            var tab_id = $(this).attr('data-tab');

            $('ul.tabs li').removeClass('current');
            $('.tab-content').removeClass('current');

            $(this).addClass('current');
            $('#' + tab_id).addClass('current');
        });
    };

    const showShippingData = function () {
        if ($('#postalCode-region > p > strong').length > 0) {
            $('#popupCalculoFreteWrapper > a').click();
            setTimeout(function () {
                $('#txtCep').val($('#postalCode-region > p > strong').text());
                $('#btnFreteSimulacao').click();
            }, 500);
        }
    };

    const shareProduct = () => {
        var $btnShare = $('.section-share .img-share'),
            $btnWpp = $('.section-share .img-wpp');

        $btnShare.on('click', function () {
            navigator
                .share({
                    title: 'Mr. Cat',
                    text: 'Gostaria de compartilhar com você um produto que vi na Mr Cat',
                    url: location.href,
                })
                .then(function (_) {
                    return console.log('Yay, you shared it :)');
                })
                .catch(function (error) {
                    return console.log("Oh noh! You couldn't share it! :'(\n", error);
                });
        });

        $btnWpp.on('click', function () {
            window.open('https://whts.co/MrCat', '_blank');
        });
    };

    // Função para adicionar o vídeo no carrossel
    const addThumbVideo = function () {
        // const videoFrame = this.videoFrame;

        if (
            (videoFrame != undefined &&
                $('#tab-2 .x-tab-body #caracteristicas table td.Video').find('iframe').length > 0) ||
            (videoFrame != undefined &&
                $('#tab-2 .x-tab-body #caracteristicas table td.Video').find('video').length > 0)
        ) {
            $('ul.thumbs').append('<li><div class="container-video">' + videoFrame + '</div></li>');
        } else {
            if (videoFrame != undefined) {
                $('ul.thumbs').append(
                    "<li><div class='container-video'><video src=" +
                        videoFrame +
                        " class='x-shelf__video'  muted loop autoplay type='video/mp4'></video></div></li>"
                );
            }
        }
    };

    // Função para remover o vídeo da Tab tamanhos na especificação do produto
    const rmVideoProduto = function () {
        // const videoFrame = this.videoFrame;
        if (videoFrame != undefined) {
            // Remove o vídeo das especificações do produto
            $('#tab-2 .x-tab-body #caracteristicas table tr').each(function () {
                if ($(this).find('td').hasClass('Video')) {
                    $(this).closest('tr').remove();
                }
            });
        }
    };

    //SLICK-SLIDER PRODUTOS SIMILARES//
    function slideSimilar() {
        $('.x-call-to-action > .x-produtos-similares ul').slick({
            infinite: false,
            slidesToShow: 4,
            slidesToScroll: 1,
            draggable: false,
            arrows: true,
            dots: false,
        });

        $('.slick-next.slick-arrow').text('');
        $('.slick-prev.slick-arrow').text('');
    }

    const Shipping_product = () => {
        var Skus = skuJson.skus;
        let freeShippingValue = parseInt($('.cmcFreeShipping').text());
        $(Skus).each(function () {
            if (this.available == true) {
                if (this.bestPrice > freeShippingValue) {
                    $('.flag-shipping-free').addClass('active');
                }
            }
        });
    };

    $(document).ready(function () {
        textOutOfStock()
        addThumbVideo();
        Shipping_product();
        sliderPhotos();
        makeSliderWithDots();
        rmVideoProduto();
        //Evento para montar corretamente as imagens e o vídeo quando alterado o SKU
        $('.skuList').on('change', function () {
            if (videoFrame != undefined) {
                addThumbVideo();
                sliderPhotos();
            }
        });
        // similarProduct.init();
        // variationsColor();
        // videoProduct();
        // videoModal();
        popupHowCare();
        // btnRenameAviseme();
        zoomProduct();
        LoadzoomProduct();
        verifyHowToCare();
        // compreJunto.init();
        avisoEstoque();
        addToCart();
        // kitPromotion();
        // share_link();
        tabsDescriptionProduct();
        buyBySize();
        productsKit();
        slideSimilar();
        regionPostalCode();
        currentPostalCode();
        tabsDescription();
        shareProduct();
        verifySelectedSKU();
    });

    $(document).ajaxStop(function () {
        // quickViewCategory();
    });

    $(window).load(function () {
        // orderInfoProduct();
        showShippingData();
        console.log('<<<<<<<<<<<<<<<<<< cheguei na pdp')
    });
};