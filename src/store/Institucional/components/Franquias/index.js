import "./index.scss";

export const Franquias = () => {


    const verifyRadioCapital = () => {
      let radio;
 
        if ($("#opcao1_1").prop("checked") === true) return radio = "R$ 300 A R$ 500 MIL";
        if ($("#opcao1_2").prop("checked") === true) return radio = "ACIMA DE R$ 500 MIL";
        if (($("#opcao1_1").prop("checked") === false) && ($("#opcao1_1").prop("checked") === false)) return radio = "campo não preenchido";

   
    };

    const verifyRadioInteresse = () => {
        let radio;
        if ($("#opcao2_1").prop("checked") == true) return radio = "Nova loja";
        if ($("#opcao2_2").prop("checked") == true) return radio = "Repasse";
        if ($("#opcao2_3").prop("checked") == true) return radio = "Revenda Multimarca";
        if (($("#opcao2_1").prop("checked") == false)&&($("#opcao2_2").prop("checked") == false)&&($("#opcao2_3").prop("checked") == false)) return radio = "campo não preenchido";
    };

    const verifyRadioPontoComercial = () => {
        let radio;
        if ($("#opcao_sim").prop("checked") == true) return radio = "Possui ponto comercial";
        if ($("#opcao_nao").prop("checked") == true) return radio = "Não Possui ponto comercial";
        if (($("#opcao_sim").prop("checked") == false)&&($("#opcao_nao").prop("checked") == false)) return radio = "campo não preenchido";
    };

    const verifyRadioLojista = () => {
        let radio;
        if ($("#opcao_lojista_sim").prop("checked") == true) return radio = "Já é Lojista";
        if ($("#opcao_lojista_nao").prop("checked") == true)  return radio = "Não é Lojista";
        if (($("#opcao_lojista_sim").prop("checked") == false) && ($("#opcao_lojista_nao").prop("checked") == false)) return radio = "campo não preenchido";
    };

    const verifyRadioFormaContato = () => {
        let radio;
        if ($("#ligacao").prop("checked") == true) return radio = "Contato por Ligação";
        if ($("#whats").prop("checked") == true) return radio = "Contato por Whatsapp";
        if ($("#email_2").prop("checked") == true) return radio = "Contato por E-mail";
        if (($("#ligacao").prop("checked")==  false)&&($("#whats").prop("checked") == false)&&($("#email_2").prop("checked") == false)) return radio = "campo não preenchido";
    };

    const verifyRadioTermos = () => {
        let radio;
        if ($("#termos").prop("checked") == true) return radio = "Aceita os termos e politica privacidade";
        if ($("#termos").prop("checked") == false) return radio = "campo não preenchido";
 
    };

    const SendFormFranquias = (e) => {
        const radioInteresse = verifyRadioInteresse();

        const radioCapital = verifyRadioCapital();

        const radioPontoComercial = verifyRadioPontoComercial();

        const radioLojista = verifyRadioLojista();

        const radioContato = verifyRadioFormaContato();

        const radioTermos = verifyRadioTermos();

        const contact = {
            aceita_termos: radioTermos,
            capital: radioCapital,
            cidade: $(".franqueadoContainer_new  #cidade").val(),
            email: $(".franqueadoContainer_new  #email").val(),
            endereco: $("#endereco").val(),
            estado: $(".franqueadoContainer_new #estado option:selected").text(),
            forma_contato: radioContato,
            instagram: $("#instagram").val(),
            logista: radioLojista,
            marca_segmento: $("#marca").val(),
            negocio_interesse: radioInteresse,
            nome: $(".franqueadoContainer_new  #nome").val(),
            ponto_comercial: radioPontoComercial,
            telefone: $(".franqueadoContainer_new  #telefone").val(),
        };

        const campooff = "campo não preenchido"; // campo para realizar a verificação se algum campo não esta preenchido
  
        // Validação para ver se os campos então preenchidos
        if((contact.aceita_termos != campooff && contact.capital != campooff && contact.forma_contato != campooff && contact.logista != campooff && contact.negocio_interesse != campooff && contact.ponto_comercial != campooff) && (contact.cidade != "" && contact.email != "" && contact.endereco != "" && contact.instagram != "" && contact.marca_segmento != "" && contact.nome != "" && contact.telefone != "")){
            $.ajax({
                url: "/api/dataentities/SF/documents/",
                type: "POST",
                cache: false,
                contentType: false,
                processData: false,
                data: JSON.stringify(contact),
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
                success: function (response) {
                    // console.log("Sucesso no envio: ", response);
                    Swal.fire({
                        icon: "success",
                        title: "Formulario enviado com sucesso!",
                    });
                },
                error: function (response) {
                    // console.log("Erro no envio", response);
                    Swal.fire({
                        icon: "error",
                        title: "Formulario não enviado",
                        text: "Verifique os dados fornecidos!",
                    });
                },
            });
        }else{
            Swal.fire({
                icon: "error",
                title: "Formulario não enviado",
                html:
                'Ops, existem campos em branco, revise e preencha todos eles! <br/> <br/>' +
                'Finalize em: Quero ser um franqueado'
            
            });
        }
       

    };

    $(".enviarFormFranquias").on("click", function (e) {
        e.preventDefault();
        SendFormFranquias();
    });
};
