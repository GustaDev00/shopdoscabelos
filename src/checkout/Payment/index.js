import "./index.scss";

export const Payment = () => {
    var couponPriceShow = function (orderForm) {
        var formatCurrency = function (value) {
            
            var tmp = value + '';
          
            tmp = tmp.replace(/([0-9]{2})$/g, ",$1");

            if (
                (tmp.length > 6 && tmp.substring(0, 1) !== "-") ||
                tmp.length > 7
            ) {
                tmp = tmp.replace(/([0-9]{3}),([0-9]{2}$)/g, ".$1,$2");
            }
            return "R$ " + tmp;
        };

        var valley = 0;
        if (orderForm.paymentData.giftCards.length) {
            $.each(orderForm.paymentData.giftCards, function (idx, giftCards) {
                valley = valley + giftCards.value;
            });
        }

        if (valley > 0) {
            if (!$(".summary-totalizers .totalizers-list .Valley").length) {
                $(
                    '<tr class="Valley">' +
                        '<td class="info">Vale </td>' +
                        '<td class="space"></td>' +
                        '<td class="monetary">' +
                        formatCurrency((valley * -1).toString()) +
                        "</td>" +
                        '<td class="empty"></td>' +
                        "</tr>"
                ).insertAfter(".summary-totalizers .totalizers-list .Items");
            }
            $(".summary-totalizers .totalizers-list .Valley .monetary").text(
                formatCurrency((valley * -1).toString())
            );
            $(
                "#payment-data > div > div.accordion-body.collapse.in.payment-body > div > div.box-step > div.box-step-content > form.form-step.box-new.row-fluid > fieldset"
            ).addClass("active");
        } else {
            $(".summary-totalizers .totalizers-list .Valley").remove();
            $(
                "#payment-data > div > div.accordion-body.collapse.in.payment-body > div > div.box-step > div.box-step-content > form.form-step.box-new.row-fluid > fieldset"
            ).removeClass("active");
        }

        var total = orderForm.value - valley;
        total = total == 0 ? "000" : total;
        $(".summary-totalizers .shipping-calculate")
            .next("tfoot")
            .find(".monetary")
            .text(formatCurrency(total.toString()))
            .show();
    };

    var openPixModal = function (event) {
        // if (event.animationName === "openPix") {
        //     let value = $(".VTEX-PIX_footer-value").text().replace("R$ ", "");
        //     let OldPix = parseInt(value.replace(",", ""));

        //     vtexjs.checkout.getOrderForm().done(function(orderForm) {
        //         var totalVal = ((OldPix) - (orderForm.paymentData.giftCards[0].value))
        //     });
        // }
        if (event.animationName === "openPix") {
            var newPrice = $(
                ".container-order-form .orderform-active .orderform-template .mini-cart .summary-template-holder .summary .summary-totalizers .accordion-group .accordion-body .accordion-inner .table tfoot tr td.monetary"
            ).text();
            $(".VTEX-PIX_footer-value").text(newPrice);
        }
    };

    const GiftCardBanner = () => {
        let steps = $('.form-step .steps-view');
        
        let html = `<div class="payment-method" id="payment-giftcard">
        <div class="payment-giftcard-bg">
        <fieldset class="box-payment-option box-payment-giftcard">
        <h3>O que é vale compras?</h3>
        <p>O vale-compras é um crédito disponibilizado no site da Mr. Cat em caso de trocas ou devoluções.</p>
        <h3>Como usar seu vale compras?</h3>
        <ol style="list-style: decimal;">
        <li style="list-style: decimal;">Digite o código de 19 dígitos que você recebeu por email.</li>
        <li style="list-style: decimal;">Clique em adicionar.</li>
        </ol>
        <p>Caso o valor do seu pedido seja MAIOR que o vale, você pode escolher outras forma de pagamento para realizar o pagamento da diferença.</p>
        <h3>Regras de uso</h3>
        <ul style="list-style: disc;">
        <li style="list-style: disc;">Cada vale-compras é de uso único e associado ao CPF.</li>
        <li style="list-style: disc;">Caso o valor do seu pedido seja MENOR que o valor do vale, não será possível resgatar a diferença.</li>
        <li style="list-style: disc;">Para consultar a validade do seu vale-compras, entre em contato com <span>online@mrcat.com.br</span></li>
        </ul>
        </fieldset>
        </div>
        </div>`;
        
        steps.prepend(html);
    };

    const displayPaymentBlocks = () => {

        $('p.link-gift-card').on('click', function () {
            $('label[for=payment-discounts-code]').html("vale compras");

            // Show GiftCard Banner
            $('#payment-giftcard').addClass('x-active');
            
            // Hide other Payment Methods Banner
            $('.payment-group-item').removeClass('active');
            $('.payment-method').not('.x-active').hide();
            
        });
    
        $('a.payment-group-item').on('click', function () {
            // Hide GiftCard Banner
            $('#payment-giftcard').removeClass('x-active');

            //Activate payment option and payment-method block
            let idPaymentOption = $(this).attr('id');
            $(`#${idPaymentOption}`).addClass('active');
            console.log($(`#${idPaymentOption}`));
        });

        // if (idPaymentOption === 'payment-group-creditCardPaymentGroup'){
        //     $($('.payment-method')[1]).css('display','block');
        // }else if (idPaymentOption === 'payment-group-payMeePaymentGroup'){
        //     $($('.payment-method')[8]).css('display','block');
        // }else if (idPaymentOption === 'payment-group-AmeDigitalPaymentGroup'){
        //     $($('.payment-method')[5]).css('display','block');
        // }else if (idPaymentOption === 'payment-group-instantPaymentPaymentGroup'){
        //     $($('.payment-method')[6]).css('display','block');
        // }else if (idPaymentOption === 'payment-group-picPayPaymentGroup'){
        //     $($('.payment-method')[7]).css('display','block');
        // }
    }

    document.addEventListener("animationstart", openPixModal, false); // standard + firefox
    document.addEventListener("MSAnimationStart", openPixModal, false); // IE
    document.addEventListener("webkitAnimationStart", openPixModal, false); // Chrome + Safari

    $(window).on("orderFormUpdated.vtex", function (evt, orderForm) {
        $(document).ajaxComplete(function () {
            couponPriceShow(orderForm);
        });
    });

    $(window).load(function() {
        GiftCardBanner();
        displayPaymentBlocks();
    })
    window.addEventListener('popstate', function (event) {
        GiftCardBanner();
        displayPaymentBlocks();
    })
};
