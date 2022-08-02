import "./index.scss";

import Cookies from 'js-cookie';

export const Cart = () => {

    const createSelect = (edit) => {
        if (edit == true) {
            var sellers = $('div.x-sellers.js--diplay-sellers');
            sellers.html(
                '<label class="x-sellers-label"><span>Código do Vendedor</span></label><fieldset class="x-sellers-field"><input type="text" class="x-sellers-input" placeholder="Código"/><button class="x-sellers-btn">Adicionar</button> </fieldset> <p class="seller-message">Código inválido</p>'
            );
        } else {
            var sellers = document.createElement('div');
            $(sellers).attr('class', 'x-sellers js--diplay-sellers');
            $(sellers).html(
                '<label class="x-sellers-label"><span>Código do Vendedor</span></label><fieldset class="x-sellers-field"><input type="text" class="x-sellers-input" placeholder="Código"/><button class="x-sellers-btn">Adicionar</button> </fieldset> <p class="seller-message">Código inválido</p>'
            );
        }
        return sellers;
    }

    const sellerHandler = () => {
        $('.coupon-column').prepend(createSelect());

        if (Cookies.get('codeSeller')) {
            vtexjs.checkout.getOrderForm().done(function (orderForm) {
                if (orderForm.openTextField != null) {
                    $('.x-sellers-field').remove();
                    $('.x-sellers-label').append(Cookies.get('codeSeller'));
                    $('.x-sellers-label').append('<a id="removeRevendedor_corebiz">Excluir</a>');
                } else {
                    Cookies.remove('codeSeller');
                }
            });
        }

        $(document).on('click', '#removeRevendedor_corebiz', function () {
            Cookies.remove('codeSeller');
            createSelect(true);

            vtexjs.checkout.getOrderForm().then(function (orderForm) {
                var marketingdata = orderForm.marketingData;
                if (marketingdata != null) {
                    marketingdata.utmiCampaign = "null";
                    vtexjs.checkout.sendAttachment('marketingData', marketingdata);
                } else {
                    vtexjs.checkout.sendAttachment('marketingData', {
                        utmiCampaign: "null"
                    });
                }

                return vtexjs.checkout.sendAttachment('openTextField', {
                    value: ''
                });
            });
        })

        $(document).on('click', '.x-sellers-btn', function () {
            var matricula = $('body > div.container.container-main.container-cart > div.checkout-container.row-fluid.cart-active > div.cart-template.full-cart.span12.active > div.summary-template-holder > div > div.span5.totalizers.summary-totalizers.cart-totalizers.pull-right > div.forms.coupon-column.summary-coupon-wrap.text-center > div.x-sellers.js--diplay-sellers > fieldset > input').val();
            getData(matricula).then(function (response) {
                if (response.length == 0) {
                    $('.seller-message').fadeIn(500);

                    setTimeout(function () {
                        $('.seller-message').fadeOut(500);
                    }, 3000);
                } else {
                    response.map(function (item) {
                        var name = item.firstName;
                        var seller = item.sellerCod;
                        sendSeller(seller, name);
                    });
                }
            });
        });
    }

    const sendSeller = (seller, name) => {
        vtexjs.checkout.getOrderForm().then(function (orderForm) {
            var marketingdata = orderForm.marketingData;

            let sellerFirstLetter = seller.substr(0, 1).toLocaleUpperCase();
            let sellerSecondLetter = seller.substr(1, 1).toLocaleUpperCase();

            let sellerType;
            let utmi_cp;

            if (sellerFirstLetter == "G" || sellerFirstLetter == "S" || sellerFirstLetter == "V" && !isNaN(parseInt(sellerSecondLetter))) {
                utmi_cp = "SCvendedor";
                sellerType = "Vendedor";

            } else if (sellerFirstLetter == "V" && sellerSecondLetter == "A") {
                utmi_cp = "SCvendedor";
                sellerType = "Vendedor";

            } else if (sellerFirstLetter == "V" && sellerSecondLetter == "F") {
                utmi_cp = "SCfranqueado";
                sellerType = "Franqueado";

            } else {
                utmi_cp = "SCinfluenciador";
                sellerType = "Influenciador";
            }

            if (marketingdata != null) {
                marketingdata.utmiCampaign = utmi_cp;
                vtexjs.checkout.sendAttachment('marketingData', marketingdata);
            } else {
                vtexjs.checkout.sendAttachment('marketingData', {
                    utmiCampaign: utmi_cp
                });
            }

            return vtexjs.checkout.sendAttachment('openTextField', {
                value: `VENDEDOR: Nome: ${name} - Código: ${seller} - Tipo: ${sellerType}`,
            });
        });

        $('.x-sellers-field').remove();
        $('.x-sellers-label').append(name);
        $('.x-sellers-label').append('<a id="removeRevendedor_corebiz">Excluir</a>');
        if (Cookies.get('codeSeller')) {
            Cookies.remove('codeSeller');
        }
        Cookies.set('codeSeller', name, { expires: 1 });
    }

    const getData = (matricula) => {
        if (matricula) {
            const header = new Headers();
            header.append('REST-Range', 'resources=0-800');
            const myHeader = {
                method: 'GET',
                headers: header,
                mode: 'cors',
                cache: 'default',
            };
            const url = `/api/dataentities/VD/search?_fields=firstName,sellerCod&_where=sellerCod=${matricula}&an=shopdoscabelos`;
            return fetch(url, myHeader).then(function (response) {
                return response.json();
            });
        }
    }

    const clearCupom = () => {
        $(document).on('click', '#cart-coupon-remove', function () {
            window.localStorage.removeItem("cupom");
        });
    }

    const couponValue = () => {
        let vtexMessage = $('.vtex-front-messages-type-warning').last().text();
        let couponValue = vtexMessage.replace('- Cupom ', '').replace(' inválido', '').trim();

        let dig5 = couponValue.substr(4, 1);
        let dig10 = couponValue.substr(9, 1);
        let dig15 = couponValue.substr(14, 1);

        if (couponValue.length == 19 && dig5 == '-' && dig10 == '-' && dig15 == '-') {
            $('.coupon-fields').append(`<p class="coupon-message">Ops, lugar errado! Use seu vale como forma de pagamento</p>`);
        } else {
            $('.coupon-fields').append(`<p class="coupon-message">${vtexMessage}</p>`);
        }

        $('.coupon-message').fadeIn(500);

        setTimeout(function () {
            $('.coupon-message').fadeOut(500);
        }, 5000);
    }

    const stockGuaranteeBanner = () => {
        let cartActiveContainer = $('.cart-active');
        cartActiveContainer
            .prepend('<div class="stock-info"><span>O nosso carrinho não faz a reserva do produto! Finalize a sua compra para garantir o seu Mr. Cat favorito.</span></div>');
    }

    const lengthComplement = () => {
        let maxComplement = 60;
        let fieldComplement =  $(
            ".shipping-data .accordion-inner .vtex-omnishipping-1-x-address #ship-complement"
        )
        setTimeout(() => {
            fieldComplement.prop("maxlength", maxComplement)
        },200);

        fieldComplement.prop("maxlength", maxComplement);

        fieldComplement.on("focus", function() {
            fieldComplement.after(`<span class='help error'>Máximo ${maxComplement} caracteres</span>`);
        })
        fieldComplement.on("blur", function() {
            fieldComplement.next("span").remove();
        })
    }

    const removeGiftWrap = () => {
        $(document).ajaxComplete(function(){
            $('.cart-items .item-service').each(function(){
                let _this = $(this)
                let giftOption = _this.find('.item-link-remove')
                let itemId = giftOption.attr('id').slice(-5)

                _this.find('.remove-wrap').remove();

                if(giftOption.length == 1) {
                    let giftWrapInfo = _this.find('.bundle-item-name').find('span[data-bind]')
                    giftWrapInfo.attr('data-id', itemId)

                    _this.find(giftWrapInfo).append(`<span class="remove-wrap" data-id="${itemId}"><i class="icon icon-remove item-remove-ico"></i></span>`)
                    $('.remove-wrap').on('click', function(){
                        let removeId = $(this).attr('data-id');
                        let nativeRemoveWrap = _this.find('#bundle-item-remove-' + removeId)
                        nativeRemoveWrap.trigger('click')
                    })
                    giftWrapInfo.on('click', function(){
                        let removeId = $(this).attr('data-id');
                        let nativeRemoveWrap = _this.find('#bundle-item-remove-' + removeId)
                        nativeRemoveWrap.trigger('click')
                    })
                }
            })
        })
    }

    const addBoxOrientation = () => { // Há um problema com o atributo de css -webkit-box-orient-, que é removido quando o código é compilado. Pesquisarei sobre isso com calma.
        $(document).ajaxStop(function(){
            $('.product-item').each(function(){
                $(this).find('a[id^=product-name]').css('-webkit-box-orient', 'vertical');
            })
        })
    }



    $(window).load(function () {
        sellerHandler();
        clearCupom();
        stockGuaranteeBanner();
        lengthComplement();
        removeGiftWrap();
        addBoxOrientation();
    });

    var listener = function (e) {
        if (e.animationName === 'couponValue') {
            couponValue();
        }
    }

    document.addEventListener("animationstart", listener, false); // standard + firefox
    document.addEventListener("MSAnimationStart", listener, false); // IE
    document.addEventListener("webkitAnimationStart", listener, false); // Chrome + Safari
};
