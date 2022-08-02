import "./index.scss";

export const SpecialFriday = () => {
    var $soldValue = parseInt($(".sold-value").text().replace(/\D/g, ""));
    var $missingValue = $(".missing-value");
    var $meta = parseInt($(".meta").text().replace(/\D/g, ""));

    var calculateGoal = function () {
        if ($soldValue < $meta) {
            $missingValue.text($meta - $soldValue);
            $(".missing-value").text(
                parseFloat($(".missing-value").text()).toLocaleString("pt-br", {
                    minimumFractionDigits: 2,
                })
            );
        } else {
            $missingValue.html("DESAFIO <span>&#10003;</span>");
            $(".section-missing").addClass("desafio-completo");
        }

        $(".sold-value").text(
            parseFloat($(".sold-value").text()).toLocaleString("pt-br", {
                minimumFractionDigits: 2,
            })
        );
        $(".meta").text(
            parseFloat($(".meta").text()).toLocaleString("pt-br", {
                minimumFractionDigits: 2,
            })
        );
    };

    $(document).ready(function () {
        calculateGoal();
        // $('.sold-value').text(parseFloat($('.sold-value').text()).toLocaleString('pt-br', {minimumFractionDigits: 2}));
        // $('.missing-value').text(parseFloat($('.missing-value').text()).toLocaleString('pt-br', {minimumFractionDigits: 2}));
        // $(".meta").text(parseFloat($(".meta").text()).toLocaleString('pt-br', {minimumFractionDigits: 2}));

        setTimeout(function () {
            location.reload(true);
        }, 10000);

        // com R$
        // $('.missing-value').text(parseFloat($('.missing-value').text()).toLocaleString('pt-br',{style: 'currency', currency: 'BRL'}));
        // sem R$
    });
};
