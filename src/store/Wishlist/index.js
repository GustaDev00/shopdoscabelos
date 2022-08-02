import URI from 'urijs';
import md5 from 'blueimp-md5';
import Swal from 'sweetalert2';
const axios = require('axios');

import './index.scss';

const getAllProducts = request => {
    vtexjs.checkout.getOrderForm().done(function (orderForm) {
        if (orderForm.loggedIn) {
            $('body').attr('data-user', md5(orderForm.clientProfileData.email)).addClass('is-logged');
            var $products = [];
            axios({
                method: 'get',
                async: false,
                url: `/api/dataentities/WS/search?userId=${md5(orderForm.clientProfileData.email)}&_fields=products`,
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                    'REST-Range': `resources=0-${Math.floor(Math.random() * (1000 - 1 + 1)) + 1}`,
                },
            }).then(function (response) {
                $products =
                    response.data[0] != undefined && response.data[0].products != ''
                        ? response.data[0].products.match(/\w+/g)
                        : [];
                if (request == 'onlyShelf') {
                    loadIntoShelf($products);
                } else {
                    loadIntoShelf($products);
                    eventButtonAdd($products);
                }
            });
        }
    });

    if (request != 'onlyShelf') {
        $(document).ajaxStop(function () {
            if (!$('body').hasClass('is-logged')) {
                if (!$('body').hasClass('btnWTapp')) {
                    eventButtonAdd();
                    $('body').addClass('btnWTapp');
                }
            }
        });
    }

};

const loadIntoShelf = products => {
    $('.x-btn-wishlist, .x-icon-wishlist').each(function () {
        if (!$(this).hasClass('x-active')) {
            let itemId = $(this).next().data('product-id') || $(this).data('id');
            let _self = $(this);

            $(this).addClass('enabled');

            products != null && products.map(item => item == itemId && _self.addClass('x-active'));
        }
    });
};

const eventButtonAdd = $products => {
    $(document).on('click', '.x-btn-wishlist, .x-icon-wishlist', function (e) {
        e.preventDefault();
        let URL = URI.parse(window.location.href);
        let productId =  $(this).next().data('product-id') || $(this).data('id');
        let userId = $('body').data('user');
        let _self = $(this);

        if (!$('body').hasClass('is-logged')) {
            Swal.fire({
                title: 'É preciso fazer login para adicionar produtos a sua lista de desejos :)',
                text: 'Deseja fazer o login?',
                customClass: 'modalWishlist',
                showCancelButton: true,
                confirmButtonText: 'Sim',
                cancelButtonText: 'Não',
            }).then(result => {
                if (result.value == true) {
                    $('html, body').animate({ scrollTop: 0 }, 1000);
                    vtexid.start({
                        returnUrl: URL.query != undefined ? URL.path + '?' + URL.query : URL.path,
                        userEmail: '',
                        locale: 'pt-BR',
                        forceReload: false,
                    });
                } else if (result.dismiss === Swal.DismissReason.cancel) {
                    Swal.fire({
                        text:
                            'Você optou em não fazer o login, nesse caso não poderemos adicionar o produto na lista de desejos =/',
                        customClass: 'modalWishlist',
                    });
                }
            });
        } else {
            let $data = {
                id: '',
                userId: '',
                products: '',
            };
            let options = {
                method: 'patch',
                url: '/api/dataentities/WS/documents',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                },
                data: $data,
            };

            if (_self.hasClass('x-active')) {
                let idx = $products.indexOf(productId + '');
                if (idx != -1) {
                    $products.splice(idx, 1);
                }

                $data.id = userId;
                $data.userId = userId;
                $data.products = $products + '';

                options.data = $data;

                axios(options);
                _self.removeClass('x-active').siblings();

                $('.x-btn-wishlist, .x-icon-wishlist').filter(function (index, elem) {
                    return ($(elem).next().data('product-id') || $(elem).data('id')) == (_self.next().data('product-id') || _self.data('id'));
                }).removeClass('x-active');

            } else {
                $products.push(productId);
                $data.id = userId;
                $data.userId = userId;
                $data.products = $products + '';

                options.data = $data;

                axios(options);
                _self.addClass('x-active');
                $('.x-btn-wishlist, .x-icon-wishlist')
                    .filter(function (index, elem) {
                        return ($(elem).next().data('product-id') || $(elem).data('id')) == (_self.next().data('product-id') || _self.data('id'));
                    })
                    .addClass('x-active');
            }
        }
    });
};

export const Wishlist = () => {
    if ($('.x-btn-wishlist').length || $('.x-icon-wishlist').length) {

        if ($('body').hasClass('x-produto')) {
            $('.x-icon-wishlist').attr('data-id', skuJson.productId)
        }

        $(document).ready(function () {
            getAllProducts();
        });

        document.addEventListener('mrcat--on-change-shelf', function(ev){
            const haveProducts = $('.x-product-list .prateleira > ul > li:not([id^="helperComplement"])').length

            if(haveProducts) {
                getAllProducts('onlyShelf');
            }
        })
    }
};
