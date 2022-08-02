import './index.scss';

import 'sweetalert2';

export const Multimarcas = () => {

    const mountCities = (response) => {
        let allResponse = response;
        
        $('#cidade').on('focus', function(){
          
          let cities = allResponse.map(function (item) {
            return item.nome;
          });
      
          let allCities = cities.filter(function (elem, i) {
            return cities.indexOf(elem) == i;
          });
      
          allCities.sort();
      
          if($("#cidade option").length > 0){
            $("#cidade option").remove();
          }
      
          $.each(allCities, function (idx, value) {
            let valueCity = value.toLowerCase().replace(/(?:^|\s)\S/g, function (a) {
              return a.toUpperCase();
            });
            $("#cidade").append("<option value=\"".concat(valueCity, "\">").concat(valueCity, "</option>"));
          });
        });
    }
      
    const getCities = () => {
        let state = $("#multimarcas-form #estado option:selected").val()
        let settings = {
          "url": "https://servicodados.ibge.gov.br/api/v1/localidades/estados/" + state + "/municipios",
          "method": "GET",
          "timeout": 0,
        };
        
        $.ajax(settings).done(function (response) {
          mountCities(response);
        });
    }

    const selectState = () => {
        $("#multimarcas-form #estado").on("change", function(){
          getCities();
        })
    }

    const verifyRadioMultimarcas = () => {
        let radioMult;
    
        if ($("#have-store-yes").prop("checked") == true) {
          radioMult = "Possui Loja";
          // $(".input-line-two").removeClass('is-hidden');
    
        } else if ($("#have-store-no").prop("checked") == true) {
          radioMult = "Não Possui Loja";
          // $(".input-line-two").addClass('is-hidden');
    
        }
    
        return radioMult;
    };

    const sendFormMultimarcas = () => {
        const radioMult = verifyRadioMultimarcas();
    
        const contactMT = {
          name: $("#multimarcas-form  #nome").val(),
          state: $("#multimarcas-form #estado option:selected").text(),
          city: $("#multimarcas-form  #cidade").val(),
          haveStore: radioMult,
          cnpj: $("#multimarcas-form  #cnpj").val(),
          email: $("#multimarcas-form  #email").val(),
          tell: $("#multimarcas-form  #telefone").val(),
          message: $("#multimarcas-form #mensagem").val(),
        };
        $.ajax({
          url: "/api/dataentities/MT/documents/",
          type: "POST",
          cache: false,
          contentType: false,
          processData: false,
          data: JSON.stringify(contactMT),
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          success: function (response) {
            Swal.fire({
              icon: "success",
              title: "Formulario enviado com sucesso!",
            });
          },
          error: function (response) {
            Swal.fire({
              icon: "error",
              title: "Formulario não enviado",
              text: "Verifique os dados fornecidos!",
            });
          },
        });
    }

    selectState();

    $("input[name='have-store']").on("change", function() {
    
      if ($("#have-store-yes").is(":checked")) {
        $(".input-line-two").removeClass("is-hidden");
    
        return;
      }
    
      $(".input-line-two").addClass("is-hidden");
    });
    
    $(".botao-enviar").on("click", function (e) {
        e.preventDefault();
        sendFormMultimarcas();
    });
}