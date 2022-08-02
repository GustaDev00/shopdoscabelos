import "./index.scss";

import numeral from "numeral";

export const ProdutoGlobal = () => {
    const validateEmail = (email) => {
        var re =
            /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    };

    const notifyMeV2 = () => {
        $('#notifymeButtonOK').before(
            '<input id="fake-phone" type="text" placeholder="Telefone"><input id="fake-cep" type="text" placeholder="CEP"><span class="fake-sender">Avise-me</span>'
        );


        $('.fake-sender').on('click', function () {
            if (!$('#notifymeClientName').val().length) {
          
                $('#notifymeClientName').focus();
            } else if (!$('#notifymeClientEmail').val().length) {
             
                $('#notifymeClientEmail').focus();
            } else if (!validateEmail($('#notifymeClientEmail').val())) {
              

                $('#notifymeClientEmail').focus();
            } else if ($('#fake-phone').val().length < 8) {
          

                $('#fake-phone').focus();
            } else if ($('#fake-cep').val().length < 7) {
               

                $('#fake-cep').focus();
            } else {
                

                var date = new Date();

                var jsonData = JSON.stringify({
                    cep: $('#fake-cep').val(),
                    sku: $('.notifyme-skuid').val(),
                    data: date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear(),
                    nome: $('#notifymeClientName').val(),
                    email: $('#notifymeClientEmail').val(),
                    telefone: $('#fake-phone').val(),
                });

                $.ajax({
                    url: '/api/dataentities/AM/documents',
                    type: 'POST',
                    dataType: 'json',
                    data: jsonData,
                    headers: {
                        accept: 'application/json',
                        'content-type': 'application/json',
                    },
                    beforeSend: function () {
                        $('.fake-sender').text('Enviando...');
                    },
                    success: function () {
                        $('#notifymeButtonOK').trigger('click');
                        $('.fake-sender').text('Avise-me');
                    },
                    error: function (e) {
                        alert('Houve um erro, tente novamente');
                        $('.fake-sender').text('Avise-me');
                    },
                });
            }
        });
    };

    const addToCartProduct = () => {
        $('.buy-button').on('click', function (event) {
            event.preventDefault();
            if ($('.item-dimension-Tamanho .skuselector-specification-label').hasClass('checked')) {
                var verify = $(this).attr('href');
                var skuProduct = verify.split('sku=')[1].split('&')[0];

                vtexjs.checkout
                    .getOrderForm()
                    .then(function() {
                        let item = [
                            {
                                id: skuProduct,
                                quantity: 1,
                                seller: '1',
                            }
                        ];
                        return vtexjs.checkout.addToCart(item);
                    })
                    .done(function() {
                        window.updateCart()
                        $('.minicart__button-open').trigger('click');
                    });
            }
        });
    };

    const ameCashback = () => {
        let $ameDiscount = $('#ame_discount').text();
        let $cashbackValue = $('.plugin-preco .descricao-preco .skuBestPrice').first().text().replace(/\D/g, '') * $ameDiscount;
        let $cashbackMessage =
            '<p class="cashbackMessage"><span></span> Pague com o <strong>ame</strong> e receba ' + numeral($cashbackValue / 100).format('$0,0.00') + ' de volta</p>';

        if ($('.cashbackMessage').length == 0) {
            $('.x-price-group .plugin-preco .productPrice').append($cashbackMessage);
            $('.product-main__middle--buyBox--ame').append($cashbackMessage);
        }
    };

    $(function () {
        notifyMeV2();
        addToCartProduct();
    });

    $(window).load(function(){
        // ameCashback();
    })
};
