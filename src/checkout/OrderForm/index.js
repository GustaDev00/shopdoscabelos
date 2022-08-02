import "./index.scss";

export const OrderForm = () => {
  const customPaymee = () => {
    //RETIRA A BORDA INTERNA//
    $(".accordion-body.collapse.in.payment-body").attr("style", "border:none;");

    //INSERE A BORDA EXTERNA//
    $(".pull-right.payment-data.span12").attr("style", "border:1px solid lightgray;");
    $(".accordion-toggle.collapsed.accordion-toggle-active").attr(
      "style",
      "border-bottom: 1px dotted lightgray;"
    );

    //ALTERA OS ÍCONES E IMAGENS ORIGINAIS//
    $("#payment-group-payMeePaymentGroup > .payment-group-item-text").text("Débito Bancário");
    $("#payment-group-AmeDigitalPaymentGroup > .payment-group-item-text").text("Ame Digital");
    $("#payment-group-payMeePaymentGroup > .payment-group-item-text").attr(
      "style",
      "background-image: url(https://mrcatstore.vteximg.com.br/arquivos/paymee-setas.png); background-position-x: 0; text-align: left; padding-left: 45px; color: #4d4d4d;"
    );
    $(".payment-paymee-title").attr(
      "style",
      "    background: url(https://mrcatstore.vteximg.com.br/arquivos/paymee-logo.png) right no-repeat; background-position-x: 90%; position: absolute;"
    );
    $(".payment-paymee-description-text").text("Bancos disponíveis");
    $(".payment-paymee-description-banks").attr(
      "style",
      "    background: url(https://mrcatstore.vteximg.com.br/arquivos/bandeiras-cartoes.png) 0 0 no-repeat; background-size: 71%;"
    );

    //CUSTOMIZA AS INSTRUÇÕES 1, 2 E 3//
    $(".payment-paymee-benefits.unstyled.row-fluid > li").attr("style", "max-height:168px;");
    $(
      ".payment-paymee-benefits.unstyled.row-fluid > .payment-paymee-benefit.payment-paymee-benefit-safe.span4 > .payment-paymee-benefit-title"
    )
      .text("1")
      .attr(
        "style",
        "background: none; font-size: 20px; font-weight: 600; background-color: #f2f2f2; border-radius: 50%; padding-top: 40px; position: relative; top: -45px; padding-bottom: 17px; width: 76px; left: calc(50% - 38px);"
      );
    $(
      ".payment-paymee-benefits.unstyled.row-fluid > .payment-paymee-benefit.payment-paymee-benefit-fast.span4 > .payment-paymee-benefit-title"
    )
      .text("2")
      .attr(
        "style",
        "background: none; font-size: 20px; font-weight: 600; background-color: #f2f2f2; border-radius: 50%; padding-top: 40px; position: relative; top: -45px; padding-bottom: 17px; width: 76px; left: calc(50% - 38px);"
      );
    $(
      ".payment-paymee-benefits.unstyled.row-fluid > .payment-paymee-benefit.payment-paymee-benefit-easy.span4 > .payment-paymee-benefit-title"
    )
      .text("3")
      .attr(
        "style",
        "background: none; font-size: 20px; font-weight: 600; background-color: #f2f2f2; border-radius: 50%; padding-top: 40px; position: relative; top: -45px; padding-bottom: 17px; width: 76px; left: calc(50% - 38px);"
      );

    //ALTERA O TEXTO DENTRO DAS INSTRUÇÕES 1, 2 E 3//
    $(
      ".payment-paymee-benefits.unstyled.row-fluid > .payment-paymee-benefit.payment-paymee-benefit-safe.span4 > .payment-paymee-benefit-description"
    )
      .text("Clique em finalizar compra")
      .attr("style", "padding: 1px 10px 10px; text-align: center; position: relative; top: -25px;");
    $(
      ".payment-paymee-benefits.unstyled.row-fluid > .payment-paymee-benefit.payment-paymee-benefit-fast.span4 > .payment-paymee-benefit-description"
    )
      .text("Escolha seu banco e obtenha as instruções")
      .attr("style", "padding: 1px 5px 12px;; text-align: center; position: relative; top: -25px;");
    $(
      ".payment-paymee-benefits.unstyled.row-fluid > .payment-paymee-benefit.payment-paymee-benefit-easy.span4 > .payment-paymee-benefit-description"
    )
      .text("Faça a transferência e receba a confirmação na hora")
      .attr("style", "padding: 1px 5px 6px; text-align: center; position: relative; top: -34px;");

    //MODIFICA E CUSTOMIZA OS TEXTOS ABAIXO DAS INSTRUÇÕES//
    $(".payment-paymee-help > .payment-paymee-help-text.muted")
      .text(
        "Todo processo de pagamento ocorre dentro do seu banco, a confirmação do pagamento acontece em minutos!"
      )
      .attr("style", "font-size:12px;");

    $(".payment-paymee-help > .payment-paymee-help-text.muted").prepend(
      '<p class="title-description">Uma nova forma de pagar, simples, rápida e segura</p>'
    );
    $(".payment-paymee-help > .payment-paymee-help-text.muted > .title-description").css({
      "font-size": "15px",
      "font-weight": "600",
      "font-style": "italic",
    });

    $(".payment-paymee-help > .payment-paymee-help-text.muted").append(
      '<p class="subtitle-description">Não aceitamos pagamentos de contas de terceiros, pague o valor exato.</p>'
    );
    $(".payment-paymee-help > .payment-paymee-help-text.muted > .subtitle-description").css({
      "font-size": "11px",
      "font-weight": "900",
      color: "black",
      "padding-top": "10px",
    });
  }

  //CUSTOMIZAÇÃO PAYMEE MOBILE//
  const customPaymeeMobile = () => {
    //RETIRA A BORDA INTERNA//
    $(".accordion-body.collapse.in.payment-body").attr("style", "border:none;");

    //INSERE A BORDA EXTERNA//
    $(".pull-right.payment-data.span12").attr("style", "border:1px solid lightgray;");
    $(".accordion-toggle.collapsed.accordion-toggle-active").attr(
      "style",
      "border-bottom: 1px dotted lightgray;"
    );

    //ALTERA OS ÍCONES E IMAGENS ORIGINAIS//
    $("#payment-group-payMeePaymentGroup > .payment-group-item-text").text("Débito Bancário");
    $("#payment-group-AmeDigitalPaymentGroup > .payment-group-item-text").text("Ame Digital");
    $("#payment-group-payMeePaymentGroup > .payment-group-item-text").attr(
      "style",
      "background-image: url(https://mrcatstore.vteximg.com.br/arquivos/paymee-setas.png); background-position-x: 0; text-align: left; padding-left: 50px; color: #4d4d4d;"
    );
    $(".payment-paymee-title").attr(
      "style",
      "    background: url(https://mrcatstore.vteximg.com.br/arquivos/paymee-logo.png) right no-repeat; background-position-x: 90%; position: absolute;"
    );
    $(".payment-paymee-description-text").text("Bancos disponíveis");
    $(".payment-paymee-description-banks").attr(
      "style",
      "    background: url(https://mrcatstore.vteximg.com.br/arquivos/bandeiras-cartoes.png) 0 0 no-repeat; background-size: 75%;"
    );

    //CUSTOMIZA AS INSTRUÇÕES 1, 2 E 3//
    $(".payment-paymee-benefits.unstyled.row-fluid").attr("style", "top:-25px; position: relative");
    $(".payment-paymee-benefits.unstyled.row-fluid > li").attr(
      "style",
      "max-height:60px; background-color:white; margin-bottom:15px"
    );
    $(
      ".payment-paymee-benefits.unstyled.row-fluid > .payment-paymee-benefit.payment-paymee-benefit-safe.span4 > .payment-paymee-benefit-title"
    )
      .text("1")
      .attr(
        "style",
        "    background: none; font-size: 20px; font-weight: 600; background-color: #f2f2f2; border-radius: 50%; position: relative; top: -5px; width: 70px; left: -26px; padding: 25px;}"
      );
    $(
      ".payment-paymee-benefits.unstyled.row-fluid > .payment-paymee-benefit.payment-paymee-benefit-fast.span4 > .payment-paymee-benefit-title"
    )
      .text("2")
      .attr(
        "style",
        "    background: none; font-size: 20px; font-weight: 600; background-color: #f2f2f2; border-radius: 50%; position: relative; top: -5px; width: 70px; left: -26px; padding: 25px;}"
      );
    $(
      ".payment-paymee-benefits.unstyled.row-fluid > .payment-paymee-benefit.payment-paymee-benefit-easy.span4 > .payment-paymee-benefit-title"
    )
      .text("3")
      .attr(
        "style",
        "    background: none; font-size: 20px; font-weight: 600; background-color: #f2f2f2; border-radius: 50%; position: relative; top: -5px; width: 70px; left: -26px; padding: 25px;}"
      );

    //ALTERA O TEXTO DENTRO DAS INSTRUÇÕES 1, 2 E 3//
    $(
      ".payment-paymee-benefits.unstyled.row-fluid > .payment-paymee-benefit.payment-paymee-benefit-safe.span4 > .payment-paymee-benefit-description"
    )
      .text("Clique em finalizar compra")
      .attr(
        "style",
        "padding: 0 30px; text-align: center; position: relative; top: -58px; font-size: 9px; display: inline-block; left: 9%;"
      );
    $(
      ".payment-paymee-benefits.unstyled.row-fluid > .payment-paymee-benefit.payment-paymee-benefit-fast.span4 > .payment-paymee-benefit-description"
    )
      .text("Escolha seu banco e obtenha as instruções")
      .attr(
        "style",
        "padding: 0 30px; text-align: center; position: relative; top: -58px; font-size: 9px; display: inline-block; left: 9%;"
      );
    $(
      ".payment-paymee-benefits.unstyled.row-fluid > .payment-paymee-benefit.payment-paymee-benefit-easy.span4 > .payment-paymee-benefit-description"
    )
      .text("Faça a transferência e receba a confirmação na hora")
      .attr(
        "style",
        "padding: 0 30px; text-align: center; position: relative; top: -58px; font-size: 9px; display: inline-block; left: 9%;"
      );

    //MODIFICA E CUSTOMIZA OS TEXTOS ABAIXO DAS INSTRUÇÕES//
    $(".payment-paymee-help").attr("style", "position: relative; top: -25px;");

    $(".payment-paymee-help > .payment-paymee-help-text.muted")
      .text(
        "Todo processo de pagamento ocorre dentro do seu banco, a confirmação do pagamento acontece em minutos!"
      )
      .attr("style", "font-size:9px;");

    $(".payment-paymee-help > .payment-paymee-help-text.muted").prepend(
      '<p class="title-description">Uma nova forma de pagar, simples, rápida e segura</p>'
    );
    $(".payment-paymee-help > .payment-paymee-help-text.muted > .title-description").css({
      "font-size": "13px",
      "font-weight": "600",
      "font-style": "italic",
    });
  }

  //CUSTOMIZAÇÃO PAYMEE TABLET
  function customPaymeeTablet() {
    //RETIRA A BORDA INTERNA//
    $(".accordion-body.collapse.in.payment-body").attr("style", "border:none;");

    //INSERE A BORDA EXTERNA//
    $(".pull-right.payment-data.span12").attr("style", "border:1px solid lightgray;");
    $(".accordion-toggle.collapsed.accordion-toggle-active").attr(
      "style",
      "border-bottom: 1px dotted lightgray;"
    );

    //ALTERA OS ÍCONES E IMAGENS ORIGINAIS//
    $("#payment-group-payMeePaymentGroup > .payment-group-item-text").text("Débito Bancário");
    $("#payment-group-AmeDigitalPaymentGroup > .payment-group-item-text").text("Ame Digital");
    $("#payment-group-payMeePaymentGroup > .payment-group-item-text").attr(
      "style",
      "background-image: url(https://mrcatstore.vteximg.com.br/arquivos/paymee-setas.png); background-position-x: 1%; text-align: left; padding-left: 50px; color: #4d4d4d;"
    );
    $(".payment-paymee-title").attr(
      "style",
      "    background: url(https://mrcatstore.vteximg.com.br/arquivos/paymee-logo.png) right no-repeat; background-position-x: 90%; position: absolute;"
    );
    $(".payment-paymee-description-text").text("Bancos disponíveis");
    $(".payment-paymee-description-banks").attr(
      "style",
      "    background: url(https://mrcatstore.vteximg.com.br/arquivos/bandeiras-cartoes.png) 0 0 no-repeat; background-size: 43%;"
    );

    //CUSTOMIZA AS INSTRUÇÕES 1, 2 E 3//
    $(".payment-paymee-benefits.unstyled.row-fluid").attr(
      "style",
      "display: flex; justify-content: space-between;"
    );
    $(".payment-paymee-benefits.unstyled.row-fluid > li").attr(
      "style",
      "max-height:168px; max-width: 25%;"
    );
    $(
      ".payment-paymee-benefits.unstyled.row-fluid > .payment-paymee-benefit.payment-paymee-benefit-safe.span4 > .payment-paymee-benefit-title"
    )
      .text("1")
      .attr(
        "style",
        "background: none; font-size: 20px; font-weight: 600; background-color: #f2f2f2; border-radius: 50%; padding-top: 40px; position: relative; top: -45px; padding-bottom: 17px; width: 76px; left: calc(50% - 38px);"
      );
    $(
      ".payment-paymee-benefits.unstyled.row-fluid > .payment-paymee-benefit.payment-paymee-benefit-fast.span4 > .payment-paymee-benefit-title"
    )
      .text("2")
      .attr(
        "style",
        "background: none; font-size: 20px; font-weight: 600; background-color: #f2f2f2; border-radius: 50%; padding-top: 40px; position: relative; top: -45px; padding-bottom: 17px; width: 76px; left: calc(50% - 38px);"
      );
    $(
      ".payment-paymee-benefits.unstyled.row-fluid > .payment-paymee-benefit.payment-paymee-benefit-easy.span4 > .payment-paymee-benefit-title"
    )
      .text("3")
      .attr(
        "style",
        "background: none; font-size: 20px; font-weight: 600; background-color: #f2f2f2; border-radius: 50%; padding-top: 40px; position: relative; top: -45px; padding-bottom: 17px; width: 76px; left: calc(50% - 38px);"
      );

    //ALTERA O TEXTO DENTRO DAS INSTRUÇÕES 1, 2 E 3//
    $(
      ".payment-paymee-benefits.unstyled.row-fluid > .payment-paymee-benefit.payment-paymee-benefit-safe.span4 > .payment-paymee-benefit-description"
    )
      .text("Clique em finalizar compra")
      .attr("style", "padding: 1px 10px 10px; text-align: center; position: relative; top: -25px;");
    $(
      ".payment-paymee-benefits.unstyled.row-fluid > .payment-paymee-benefit.payment-paymee-benefit-fast.span4 > .payment-paymee-benefit-description"
    )
      .text("Escolha seu banco e obtenha as instruções")
      .attr("style", "padding: 1px 5px 12px;; text-align: center; position: relative; top: -25px;");
    $(
      ".payment-paymee-benefits.unstyled.row-fluid > .payment-paymee-benefit.payment-paymee-benefit-easy.span4 > .payment-paymee-benefit-description"
    )
      .text("Faça a transferência e receba a confirmação na hora")
      .attr("style", "padding: 1px 5px 6px; text-align: center; position: relative; top: -34px;");

    //MODIFICA E CUSTOMIZA OS TEXTOS ABAIXO DAS INSTRUÇÕES//
    $(".payment-paymee-help").attr("style", "position: relative; top: 0;");

    $(".payment-paymee-help > .payment-paymee-help-text.muted")
      .text(
        "Todo processo de pagamento ocorre dentro do seu banco, a confirmação do pagamento acontece em minutos!"
      )
      .attr("style", "font-size:12px;");

    $(".payment-paymee-help > .payment-paymee-help-text.muted").prepend(
      '<p class="title-description">Uma nova forma de pagar, simples, rápida e segura</p>'
    );
    $(".payment-paymee-help > .payment-paymee-help-text.muted > .title-description").css({
      "font-size": "15px",
      "font-weight": "600",
      "font-style": "italic",
    });

    $(".payment-paymee-help > .payment-paymee-help-text.muted").append(
      '<p class="subtitle-description">Não aceitamos pagamentos de contas de terceiros, pague o valor exato.</p>'
    );
    $(".payment-paymee-help > .payment-paymee-help-text.muted > .subtitle-description").css({
      "font-size": "11px",
      "font-weight": "900",
      color: "black",
      "padding-top": "10px",
    });
  }

  var addMessage = function () {

    var $messageField = $(
      '<div class="message-field"><textarea rows="3" cols="500" name="comment" form="usrform" placeholder="Deixe aqui uma mensagem para seu pai..."></textarea><div class="submit-button">Enviar Mensagem</div></div>"'
    );

    $(".cart-more-options").append($messageField);

    $(document).on("click", ".message-field > .submit-button", function () {
      $messageContent = $(".message-field > textarea").val();
      $messageSucess = $(
        '<div class="message-sucess">Agradecemos a mensagem, seu pai adorará a surpresa!!!</div>'
      );

      vtexjs.checkout
        .getOrderForm()
        .then(function (orderForm) {
          var obs = $messageContent;
          return vtexjs.checkout.sendAttachment("openTextField", { value: obs });
        })
        .done(function (orderForm) {
          // console.log("openTextField preenchido com: ", orderForm.openTextField);
        });

      $(".message-field > textarea, .message-field > .submit-button").addClass("is-submit");
      $(".message-field").append($messageSucess);
    });
  };

  // function chooseMoreProducts() {
  //   // Botão continuar comprando
  //   $('.more.link-choose-more-products').on('click', function (e) {
  //     e.preventDefault()
  //     window.history.go(-2)
  //   });

  // };

  $(document).ajaxStop(function () {
    if (screen.width <= 450) {
      customPaymeeMobile();
    } else if (screen.width <= 768) {
      customPaymeeTablet();
    } else {
      customPaymee();
    }

    // chooseMoreProducts()
  });

  $(window).load(function () {
    // addMessage();
  })
};