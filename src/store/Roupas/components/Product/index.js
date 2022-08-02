import './index.scss';

import '../../../../assets/javascripts/jquery.elevatezoom';

export const ProdutoRoupas = () => {

    const scrollTopBuyButton = () => {
        if ($(window).width() < 1024) {
            var scrollCondition = $('.buy-button').attr('href');
            $(".buy-button").on("click", function() {
                if($('.buy-button').attr('href') == scrollCondition ) {
                    var body = $('html, body');
                    $(body).animate({scrollTop:500}, 1200, 'swing');
                }
            });
        }
    }

    const buyButtonPosition = () => {
        // Only mobile function
        
        if ($(window).width() < 1024) {
            $(window).scroll(function() {
                if ($(this).scrollTop() > 475) {
                  $('.product-main__middle--buyBox--buttonArea').addClass('fixed');
                } else {
                  $('.product-main__middle--buyBox--buttonArea').removeClass('fixed');
                }
            });
        }
    }

    const showStuffInfo = () => {
        $('.product-main__middle--buyBox--extraInfos__btn-verify').on('click', function(){
            $(this).toggleClass('active');
        });
    }

    const wishListActive = () => {
        $('.x-icon-wishlist').on('click', function(){
            $('<svg class="unselected" width="124.06px" height="124.06px" enable-background="new 0 0 124.065 124.065" version="1.1" viewBox="0 0 124.065 124.065" xml:space="preserve" xmlns="http://www.w3.org/2000/svg"><path d="m12.532 77.057c7.7 10.2 17.7 18.4 28.1 25.801 0 0 12.4 8.6 18.1 12.6 2.1 1.4 4.799 1.4 6.799 0 5.7-4 18-12.6 18-12.6 10.4-7.4 20.2-15.5 28-25.801 6.601-8.8 11.5-19.2 12.4-30.2 1.6-20-11.3-39.2-32.7-39.2-12.5 0-23.5 6.8-29.1 16.9-5.8-10.2-16.7-17-29.2-17-21.3 0-34.4 19.2-32.8 39.2 0.901 11 5.701 21.5 12.401 30.3z"></path></svg>').insertAfter(this);
            $(this).hide();
        });
    }

    const shelfCores = () => {
        $('.x-produtos-similares ul').slick({
            slidesToShow: 3,
            arrows: true,
            dots: false
        });
    }

    const shelf = () => {
        if ($(window).width() < 1024) {
            $('.x-shelf ul').slick({
                slidesToShow: 2,
                arrows: true,
                dots: false
            });
        } else {
            $('.x-shelf ul').slick({
                slidesToShow: 4,
                arrows: true,
                dots: false
            });            
        }
    }

    const showTabContent = () => {
        const descAct = document.querySelector('.product-main__middle--buyBox--navs__desc h3');
        const descTamanho = document.querySelector('.product-main__middle--buyBox--navs__tamanhos h3');
        const descMaterial = document.querySelector('.product-main__middle--buyBox--navs__material h3');

        descAct.onclick = function(){
            $('.product-main__middle--buyBox--navs__desc').toggleClass('active')
        }

        descTamanho.onclick = function(){
            $('.product-main__middle--buyBox--navs__tamanhos').toggleClass('active')
        }

        descMaterial.onclick = function(){
            $('.product-main__middle--buyBox--navs__material').toggleClass('active')
        }
    }

    const productImage = () => {
        if ($(window).width() < 1024) {
            var idProd = $('#___rc-p-id').attr("value");
            var data = "/api/catalog_system/pub/products/search/?fq=productId:"+idProd+"";
            
            $.getJSON(data, function(data) {
                $.each(data, function(key, val) {

                    var myImages = val.items[0].images;
                    
                    $(".product-main__middle--image ul").attr('style', 'display: flex; height: 570px; justify-content: center; align-items: center; margin: 0 auto; overflow: hidden;');

                    $(myImages).each(function(key, val){
                        var normalWidth = '435-653';
                        var imageId = val.imageId;
                        var imageText = val.imageText;
                        $('<li class="' +imageId+ '"><img src="/arquivos/ids/' +imageId+ "-"+normalWidth+"/" +imageText+ '.jpg" /></li>').appendTo(".product-main__middle--image ul");
                    });
                    
                    $('<span class="prev-slick-out" style="position: absolute; top: 50%; left: 0; width: 50px; padding: 10px 0; height: 50px;"> <svg style="transform: rotate(180deg);" width="30" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 490.8 490.8" style="enable-background:new 0 0 490.8 490.8;" xml:space="preserve"><path style="fill:#F44336;" d="M135.685,3.128c-4.237-4.093-10.99-3.975-15.083,0.262c-3.992,4.134-3.992,10.687,0,14.82 l227.115,227.136L120.581,472.461c-4.237,4.093-4.354,10.845-0.262,15.083c4.093,4.237,10.845,4.354,15.083,0.262 c0.089-0.086,0.176-0.173,0.262-0.262l234.667-234.667c4.164-4.165,4.164-10.917,0-15.083L135.685,3.128z"/><path d="M128.133,490.68c-5.891,0.011-10.675-4.757-10.686-10.648c-0.005-2.84,1.123-5.565,3.134-7.571l227.136-227.115 L120.581,18.232c-4.171-4.171-4.171-10.933,0-15.104c4.171-4.171,10.933-4.171,15.104,0l234.667,234.667 c4.164,4.165,4.164,10.917,0,15.083L135.685,487.544C133.685,489.551,130.967,490.68,128.133,490.68z"/><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g></svg> </span>').insertBefore('.product-main__middle--image ul');
                    $('<span class="next-slick-out" style="position: absolute; top: 50%; right: 0; width: 50px; padding: 10px 0; height: 50px;"> <svg width="30" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 490.8 490.8" style="enable-background:new 0 0 490.8 490.8;" xml:space="preserve"><path style="fill:#F44336;" d="M135.685,3.128c-4.237-4.093-10.99-3.975-15.083,0.262c-3.992,4.134-3.992,10.687,0,14.82 l227.115,227.136L120.581,472.461c-4.237,4.093-4.354,10.845-0.262,15.083c4.093,4.237,10.845,4.354,15.083,0.262 c0.089-0.086,0.176-0.173,0.262-0.262l234.667-234.667c4.164-4.165,4.164-10.917,0-15.083L135.685,3.128z"/><path d="M128.133,490.68c-5.891,0.011-10.675-4.757-10.686-10.648c-0.005-2.84,1.123-5.565,3.134-7.571l227.136-227.115 L120.581,18.232c-4.171-4.171-4.171-10.933,0-15.104c4.171-4.171,10.933-4.171,15.104,0l234.667,234.667 c4.164,4.165,4.164,10.917,0,15.083L135.685,487.544C133.685,489.551,130.967,490.68,128.133,490.68z"/><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g></svg> </span>').insertAfter('.product-main__middle--image ul');

                    $('.prev-slick-out').on('click', function(){
                        $('.product-main__middle--image ul li:first-child').insertBefore('.product-main__middle--image ul li:last-child');
                    });

                    $('.next-slick-out').on('click', function(){
                        $('.product-main__middle--image ul li:last-child').insertBefore('.product-main__middle--image ul li:first-child');
                    });

                    if($('.value-field.Video').length > 0){
                        var video = $(".value-field.Video").html();
                        $('.product-main__middle--image li:last').after("<li class='video'>"+video +"</li>");
                        $(".value-field.Video").remove();
                    }

                    $('.product-main__middle--image ul li').removeClass('.slick-slide');
                    $('.product-main__middle--image ul li').removeClass('.slick-cloned');

                    $('.product-main__middle--image li').on('click', function(){

                        $('.modal-box.zoom-images ul').remove();
                        $('.modal-box.zoom-images span').remove();

                        var me = $(this).attr('class');

                        $('body').addClass('no-scrolling');
                        $('.modal-box.zoom-images').addClass('active');

                        $('<ul></ul>').appendTo('.modal-box.zoom-images .modal-container');
                        $('<span class="prev-slick"> <svg style="transform: rotate(180deg);" width="60" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 490.8 490.8" style="enable-background:new 0 0 490.8 490.8;" xml:space="preserve"><path style="fill:#F44336;" d="M135.685,3.128c-4.237-4.093-10.99-3.975-15.083,0.262c-3.992,4.134-3.992,10.687,0,14.82 l227.115,227.136L120.581,472.461c-4.237,4.093-4.354,10.845-0.262,15.083c4.093,4.237,10.845,4.354,15.083,0.262 c0.089-0.086,0.176-0.173,0.262-0.262l234.667-234.667c4.164-4.165,4.164-10.917,0-15.083L135.685,3.128z"/><path d="M128.133,490.68c-5.891,0.011-10.675-4.757-10.686-10.648c-0.005-2.84,1.123-5.565,3.134-7.571l227.136-227.115 L120.581,18.232c-4.171-4.171-4.171-10.933,0-15.104c4.171-4.171,10.933-4.171,15.104,0l234.667,234.667 c4.164,4.165,4.164,10.917,0,15.083L135.685,487.544C133.685,489.551,130.967,490.68,128.133,490.68z"/><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g></svg> </span>').insertBefore('.modal-box.zoom-images ul');
                        $('<span class="next-slick"> <svg width="60" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 490.8 490.8" style="enable-background:new 0 0 490.8 490.8;" xml:space="preserve"><path style="fill:#F44336;" d="M135.685,3.128c-4.237-4.093-10.99-3.975-15.083,0.262c-3.992,4.134-3.992,10.687,0,14.82 l227.115,227.136L120.581,472.461c-4.237,4.093-4.354,10.845-0.262,15.083c4.093,4.237,10.845,4.354,15.083,0.262 c0.089-0.086,0.176-0.173,0.262-0.262l234.667-234.667c4.164-4.165,4.164-10.917,0-15.083L135.685,3.128z"/><path d="M128.133,490.68c-5.891,0.011-10.675-4.757-10.686-10.648c-0.005-2.84,1.123-5.565,3.134-7.571l227.136-227.115 L120.581,18.232c-4.171-4.171-4.171-10.933,0-15.104c4.171-4.171,10.933-4.171,15.104,0l234.667,234.667 c4.164,4.165,4.164,10.917,0,15.083L135.685,487.544C133.685,489.551,130.967,490.68,128.133,490.68z"/><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g></svg> </span>').insertAfter('.modal-box.zoom-images ul');

                        $(myImages).each(function(key, val){
                            var fullWidth = '1920-2885';
                            var imageId = val.imageId;
                            var imageText = val.imageText;
                            $('<li class="' +imageId+ '"><img src="/arquivos/ids/' +imageId+ "-"+fullWidth+"/" +imageText+ '.jpg" /></li>').appendTo(".modal-box.zoom-images ul");
                        });

                        if($('.product-main__middle--image li.video').length == 1){
                            var yes = $('.product-main__middle--image li.video').clone();
                            $(yes).insertAfter(".modal-box.zoom-images ul li:last-child");
                        }
                        
                        if($('.modal-box.zoom-images li:first-child').attr('class') == me ) {
                        } else if ($('.modal-box.zoom-images li:last-child').attr('class') == me ){
                            $('.modal-box.zoom-images li:last-child').insertBefore('.modal-box.zoom-images li:first-child');
                        } else {
                            $('.modal-box.zoom-images li.'+me+'').insertBefore('.modal-box.zoom-images li:first-child');
                        }

                        $('.prev-slick').on('click', function(){
                            $('.modal-box.zoom-images ul li:first-child').insertBefore('.modal-box.zoom-images ul li:last-child');
                        });

                        $('.next-slick').on('click', function(){
                            $('.modal-box.zoom-images ul li:last-child').insertBefore('.modal-box.zoom-images ul li:first-child');
                        });
                    });

                    $('.modal-box.zoom-images .modal-close').on('click', function(){
                        $('.modal-box.zoom-images ul').remove();
                        $('body').removeClass('no-scrolling');
                        $('.modal-box.zoom-images').removeClass('active');
                    });
                });
            });
        } else {
            var idProd = $('#___rc-p-id').attr("value");
            var data = "/api/catalog_system/pub/products/search/?fq=productId:"+idProd+"";
            
            $.getJSON(data, function(data) {
                $.each(data, function(key, val) {

                    var myImages = val.items[0].images;
                    
                    $(myImages).each(function(key, val){
                        var normalWidth = '435-653';
                        var imageId = val.imageId;
                        var imageText = val.imageText;
                        $('<li class="' +imageId+ '"><img src="/arquivos/ids/' +imageId+ "-"+normalWidth+"/" +imageText+ '.jpg" /></li>').appendTo(".product-main__middle--image ul");
                    });

                    if($('.value-field.Video').length > 0){
                        var video = $(".value-field.Video").html();
                        $('.product-main__middle--image li:last').after("<li class='video'>"+video +"</li>");
                        $(".value-field.Video").remove();
                    }

                    $('.product-main__middle--image li').on('click', function(){

                        $('.modal-box.zoom-images ul').remove();
                        $('.modal-box.zoom-images span').remove();

                        var me = $(this).attr('class');

                        $('body').addClass('no-scrolling');
                        $('.modal-box.zoom-images').addClass('active');

                        $('<ul></ul>').appendTo('.modal-box.zoom-images .modal-container');
                        $('<span class="prev-slick"> <svg style="transform: rotate(180deg);" width="60" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 490.8 490.8" style="enable-background:new 0 0 490.8 490.8;" xml:space="preserve"><path style="fill:#F44336;" d="M135.685,3.128c-4.237-4.093-10.99-3.975-15.083,0.262c-3.992,4.134-3.992,10.687,0,14.82 l227.115,227.136L120.581,472.461c-4.237,4.093-4.354,10.845-0.262,15.083c4.093,4.237,10.845,4.354,15.083,0.262 c0.089-0.086,0.176-0.173,0.262-0.262l234.667-234.667c4.164-4.165,4.164-10.917,0-15.083L135.685,3.128z"/><path d="M128.133,490.68c-5.891,0.011-10.675-4.757-10.686-10.648c-0.005-2.84,1.123-5.565,3.134-7.571l227.136-227.115 L120.581,18.232c-4.171-4.171-4.171-10.933,0-15.104c4.171-4.171,10.933-4.171,15.104,0l234.667,234.667 c4.164,4.165,4.164,10.917,0,15.083L135.685,487.544C133.685,489.551,130.967,490.68,128.133,490.68z"/><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g></svg> </span>').insertBefore('.modal-box.zoom-images ul');
                        $('<span class="next-slick"> <svg width="60" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 490.8 490.8" style="enable-background:new 0 0 490.8 490.8;" xml:space="preserve"><path style="fill:#F44336;" d="M135.685,3.128c-4.237-4.093-10.99-3.975-15.083,0.262c-3.992,4.134-3.992,10.687,0,14.82 l227.115,227.136L120.581,472.461c-4.237,4.093-4.354,10.845-0.262,15.083c4.093,4.237,10.845,4.354,15.083,0.262 c0.089-0.086,0.176-0.173,0.262-0.262l234.667-234.667c4.164-4.165,4.164-10.917,0-15.083L135.685,3.128z"/><path d="M128.133,490.68c-5.891,0.011-10.675-4.757-10.686-10.648c-0.005-2.84,1.123-5.565,3.134-7.571l227.136-227.115 L120.581,18.232c-4.171-4.171-4.171-10.933,0-15.104c4.171-4.171,10.933-4.171,15.104,0l234.667,234.667 c4.164,4.165,4.164,10.917,0,15.083L135.685,487.544C133.685,489.551,130.967,490.68,128.133,490.68z"/><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g></svg> </span>').insertAfter('.modal-box.zoom-images ul');                        

                        $(myImages).each(function(key, val){
                            var fullWidth = '1920-2885';
                            var imageId = val.imageId;
                            var imageText = val.imageText;
                            $('<li class="' +imageId+ '"><img src="/arquivos/ids/' +imageId+ "-"+fullWidth+"/" +imageText+ '.jpg" /></li>').appendTo(".modal-box.zoom-images ul");
                        });

                        if($('.product-main__middle--image li.video').length == 1){
                            var yes = $('.product-main__middle--image li.video').clone();
                            $(yes).insertAfter(".modal-box.zoom-images ul li:last-child");
                        }
                        
                        if($('.modal-box.zoom-images li:first-child').attr('class') == me ) {
                        } else if ($('.modal-box.zoom-images li:last-child').attr('class') == me ){
                            $('.modal-box.zoom-images li:last-child').insertBefore('.modal-box.zoom-images li:first-child');
                        } else {
                            $('.modal-box.zoom-images li.'+me+'').insertBefore('.modal-box.zoom-images li:first-child');
                        }

                        $('.prev-slick').on('click', function(){
                            $('.modal-box.zoom-images ul li:first-child').insertBefore('.modal-box.zoom-images ul li:last-child');
                        });

                        $('.next-slick').on('click', function(){
                            $('.modal-box.zoom-images ul li:last-child').insertBefore('.modal-box.zoom-images ul li:first-child');
                        });
                    });

                    $('.modal-box.zoom-images .modal-close').on('click', function(){
                        $('.modal-box.zoom-images ul').remove();
                        $('body').removeClass('no-scrolling');
                        $('.modal-box.zoom-images').removeClass('active');
                    });
                });
            });
        }
    }

    const cep = () => {
        $('.shipping-value').trigger('click');
        $(document).ajaxSuccess(function(){
            $('#btnFreteSimulacao').attr('value', 'CALCULAR');
            $('#txtCep').attr('placeholder', 'Digite seu CEP');
        });
    }

    const buyButton = () => {
        $('.product-main__middle--buyBox--buttonArea .buy-button').text('selecione o tamanho');
        
        $('.skuList.item-dimension-Tamanho label').on('click', function(){
            $('.product-main__middle--buyBox--buttonArea .buy-button').addClass('active');
            $('.product-main__middle--buyBox--buttonArea .buy-button').text('adicionar ao carrinho');
        });
    }

    const modalCuide = () => {
        $('.product-main__middle--takeCare__btn').on('click', function(){
            $('.modal-box.take-care-modal').addClass('active');
            $('body').addClass('no-scrolling');
        });

        $('.modal-box.take-care-modal .modal-close').on('click', function(){
            $('.modal-box.take-care-modal').removeClass('active');
            $('body').removeClass('no-scrolling');
        });

        $('.modal-box.take-care-modal .modal-opacity').on('click', function(){
            $('.modal-box.take-care-modal').removeClass('active');
            $('body').removeClass('no-scrolling');
        });
    }

    const modalGuia = () => {
        $('.product-main__middle--buyBox--tamanhos__btn').on('click', function(){
            $('.modal-box.guia-de-tamanhos').addClass('active');
            $('body').addClass('no-scrolling');
        });

        $('.modal-box.guia-de-tamanhos .modal-close').on('click', function(){
            $('.modal-box.guia-de-tamanhos').removeClass('active');
            $('body').removeClass('no-scrolling');
        });

        $('.modal-box.guia-de-tamanhos .modal-opacity').on('click', function(){
            $('.modal-box.guia-de-tamanhos').removeClass('active');
            $('body').removeClass('no-scrolling');
        });
    }

    const modalShare = () => {
        // Opening
        $('.product-main__top--share-share svg').on('click', function(){
            $('.modal-share').addClass('active');
        });

        // Close
        $('.modal-share-close').on('click', function(){
            $('.modal-share').removeClass('active');
        });        
    }

  document.addEventListener('DOMContentLoaded', () => {
    shelfCores();
    shelf();
    showTabContent();
    productImage();
    cep();
    buyButton();
    modalGuia();
    modalCuide();
    modalShare();
    wishListActive();
    showStuffInfo();
    buyButtonPosition();
    scrollTopBuyButton();
  })
}