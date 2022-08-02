import React, { Component } from "react";
import { MinicartProvider } from "./components/minicart-context";
import { MinicartItems } from "./components/minicart-items";
import MinicartButton from "./components/minicart-button";

import "./index.scss";

export class MinicartApp extends Component {

    constructor() {
        super();

        var x = false;

        // open minicart with click
        $(document).on('click', '.minicart__button-open', function () {
            $('#minicart__items').addClass('open-minicart');
            $('#overlay').addClass('active');
        });

        // open minicart with hover
        $(".cart.minicart").on('mouseenter', '.minicart__button-open', function () {
            if (!x) {
                $('#minicart__items').addClass('open-minicart');
                $('#overlay').addClass('active');
            }
        });

        // close minicart
        $(document).on('click', '.minicart__button-close, #overlay', function () {
            $('#minicart__items').removeClass('open-minicart');
            $('#overlay').removeClass('active');

            x = true;
            setTimeout(function () {
                x = false;
            }, 2500);
        });

        // loading
        $(document).on('click', '.place-actions .btn, .place-actions .btn-clear', function () {

            $('.minicart__items_loader').addClass('active');

            setTimeout(function() {
                $('.minicart__items_loader').removeClass('active');
            }, 3000)
        })

        $(document).on('click', '.product-item-remove', function () {
            $('.minicart__items_loader').addClass('active');

            setTimeout(function() {
                $('.minicart__items_loader').removeClass('active');
            }, 500)
        })

        // validate giftcard inserction
        $(document).on('click', '.cupom-calculate button', function () {
            let couponValue = $('.cupom-calculate input').val();

            let dig5 = couponValue.substr(4, 1);
            let dig10 = couponValue.substr(9, 1);
            let dig15 = couponValue.substr(14, 1);

            if (couponValue.length == 19 && dig5 == '-' && dig10 == '-' && dig15 == '-') {
                $('.cupom-calculate .invalid').text('Ops, lugar errado! Use seu vale como forma de pagamento')
            } else {
                $('.cupom-calculate .invalid').text('Cupom Inválido')
            }
        });

        // maskCepValue
        const maskCepValue = function () {

            var cepValue = $('.shipping-result-content span.value b');
            var cepValueText = cepValue.text();

            cepValueText = cepValueText.replace(/\D/g, '');
            cepValueText = cepValueText.replace(/^(\d{5})(\d)/, '$1-$2');

            $(cepValue).text(cepValueText);
        };

        var listener = function (e) {
            if (e.animationName === 'cepValue') {
                maskCepValue();
            }
        }

        document.addEventListener("animationstart", listener, false); // standard + firefox
        document.addEventListener("MSAnimationStart", listener, false); // IE
        document.addEventListener("webkitAnimationStart", listener, false); // Chrome + Safari
    }

    render() {
        return (
            <MinicartProvider>
                <MinicartItems />
                <MinicartButton />
            </MinicartProvider>
        );
    }
}