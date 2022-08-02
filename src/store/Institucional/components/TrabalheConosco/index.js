import './index.scss';

export const TrabalheConosco = () => {
    const trabalheConoscoV2 = () => {
        if ($("body").hasClass("trabalhe")) {
          // Variável que armazena se o formulário possui arquivo
          var hasDoc = false;
      
          // Máscara dos campos
          $("#cep").mask("00000-000");
          $("#telefoneum").mask("(00) 0 0000-0000");
          $("#telefonedois").mask("(00) 0 0000-0000");
      
          // Verifica se o arquivo é para upload é válido
          $("#cv").on("change", function () {
            var ext = $(this).val().split(".")[1];
            var fileName = $(this).val().split("fakepath\\")[1];
      
            if (ext == "jpg" || ext == "jpeg" || ext == "pdf" || ext == "docx") {
              hasDoc = true;
      
              $(".fake-upload span").text(fileName);
            } else {
              $("#cv").val("");
              $(".fake-upload span").text("Selecione um arquivo");
      
              alert("Selecione um arquivo JPG, PDF ou DOC");
            }
          });
      
          //Validação de Cep
          $("#form-trabalhe")
            .find("#cep")
            .blur(function () {
              //Nova variável "cep" somente com dígitos.
              var cep = $(this).val().replace(/\D/g, "");
      
              //Verifica se campo cep possui valor informado.
              if (cep != "") {
                //Expressão regular para validar o CEP.
                var validacep = /^[0-9]{8}$/;
      
                //Valida o formato do CEP.
                if (validacep.test(cep)) {
                  //Preenche os campos com "..." enquanto consulta webservice.
                  $("#form-trabalhe").find("#bairro").val("...");
                  $("#form-trabalhe").find("#endereco").val("...");
                  $("#form-trabalhe").find("#cidade").val("...");
                  $("#form-trabalhe").find("#estado").val("...");
      
                  //Consulta o webservice viacep.com.br/
                  $.getJSON(
                    "https://viacep.com.br/ws/" + cep + "/json/?callback=?",
                    function (dados) {
                      if (!("erro" in dados)) {
                        //Atualiza os campos com os valores da consulta.
                        $("#form-trabalhe").find("#bairro").val(dados.bairro);
                        $("#form-trabalhe").find("#endereco").val(dados.logradouro);
                        $("#form-trabalhe").find("#cidade").val(dados.localidade);
                        $("#form-trabalhe").find("#estado").val(dados.uf);
                      } //end if.
                      else {
                        //CEP pesquisado não foi encontrado.
                        alert("CEP não encontrado.");
                      }
                    }
                  );
                } //end if.
                else {
                  //cep é inválido.
                  alert("Formato de CEP inválido.");
                }
              } //end if.
              else {
                //cep sem valor, limpa formulário.
              }
            });
      
          jQuery.validator.addMethod("telefone", function (value, element) {
            value = value.replace("(", "");
            value = value.replace(")", "");
            value = value.replace("-", "");
            value = value.replace(" ", "").trim();
            if (value == "0000000000") {
              return this.optional(element) || false;
            } else if (value == "00000000000") {
              return this.optional(element) || false;
            }
            if (
              [
                "00",
                "01",
                "02",
                "03",
                ,
                "04",
                ,
                "05",
                ,
                "06",
                ,
                "07",
                ,
                "08",
                "09",
                "10",
              ].indexOf(value.substring(0, 2)) != -1
            ) {
              return this.optional(element) || false;
            }
            if (value.length < 11 || value.length > 13) {
              return this.optional(element) || false;
            }
            if (
              ["2", "3", "4", "5", "6", "7", "8", "9"].indexOf(
                value.substring(2, 3)
              ) == -1
            ) {
              return this.optional(element) || false;
            }
            return this.optional(element) || true;
          });
      
          jQuery.validator.addMethod("cep", function (value, element) {
            value = value.replace("-", "");
            if (
              value == "00000000" ||
              value == "11111111" ||
              value == "22222222" ||
              value == "33333333" ||
              value == "44444444" ||
              value == "55555555" ||
              value == "66666666" ||
              value == "77777777" ||
              value == "88888888" ||
              value == "99999999"
            ) {
              return this.optional(element) || false;
            } else {
              return this.optional(element) || true;
            }
          });
      
          jQuery("#nomecompleto").keyup(function () {
            this.value = this.value.replace(/[^a-zA-Z.]/g, " ");
          });
          jQuery("#cidade").keyup(function () {
            this.value = this.value.replace(/[^a-zA-Z.]/g, " ");
          });
          jQuery("#estado").keyup(function () {
            this.value = this.value.replace(/[^a-zA-Z.]/g, " ");
          });
      
          // Validação e envio dos dados
          $("#form-trabalhe").validate({
            rules: {
              nomecompleto: {
                required: true,
              },
      
              email: {
                email: true,
                required: true,
              },
      
              telefoneum: {
                required: true,
                telefone: true,
              },
      
              telefonedois: {
                telefone: true,
              },
      
              cep: {
                cep: true,
              },
      
              bairro: {
                required: true,
              },
      
              endereco: {
                required: true,
              },
      
              numero: {
                required: true,
              },
      
              cidade: {
                required: true,
              },
      
              estado: {
                required: true,
              },
      
              qualificacao: {
                required: true,
              },
      
              cv: {
                required: true,
              },
            },
            messages: {
              nomecompleto: {
                required: "Digite seu nome completo",
              },
      
              email: {
                email: "Digite um e-mail válido",
                required: "Digite seu e-mail",
              },
      
              telefoneum: {
                required: "Digite seu telefone",
                telefone: "Informe um número de telefone telefone válido!",
              },
      
              telefonedois: {
                telefone: "Informe um número de telefone telefone válido!",
              },
      
              cep: {
                cep: "Digite um cep válido!",
              },
      
              bairro: {
                required: "Digite seu bairro",
              },
      
              endereco: {
                required: "Digite seu endereço",
              },
      
              numero: {
                required: "Digite seu número",
              },
      
              cidade: {
                required: "Digite sua cidade",
              },
      
              estado: {
                required: "Selecione o estado",
              },
      
              qualificacao: {
                required: "Selecione sua qualificação",
              },
      
              cv: {
                required: "Insira seu currículo",
              },
            },
      
            submitHandler: function () {
              var jsonData = JSON.stringify({
                cep: $("#form-trabalhe").find("#cep").val(),
                email: $("#form-trabalhe").find("#email").val(),
                bairro: $("#form-trabalhe").find("#bairro").val(),
                cidade: $("#form-trabalhe").find("#cidade").val(),
                estado: $("#form-trabalhe").find("#estado").val(),
                numero: $("#form-trabalhe").find("#numero").val(),
                endereco: $("#form-trabalhe").find("#endereco").val(),
                telefoneum: $("#form-trabalhe").find("#telefoneum").val(),
                complemento: $("#form-trabalhe").find("#complemento").val(),
                areaatuacao: $("#form-trabalhe").find("#areaatuacao").val(),
                qualificacao: $("#form-trabalhe").find("#qualificacao:checked").val(),
                nomecompleto: $("#form-trabalhe").find("#nomecompleto").val(),
                telefonedois: $("#form-trabalhe").find("#telefonedois").val(),
                localtrabalho: $("#form-trabalhe").find("#localtrabalho").val(),
              });
      
              $.ajax({
                url: "/api/dataentities/TC/documents",
                type: "POST",
                dataType: "json",
                data: jsonData,
                headers: {
                  accept: "application/json",
                  "content-type": "application/json",
                },
                beforeSend: function () {
                  $("#form-trabalhe button").attr("disabled", true);
                  $('#form-trabalhe button[type="submit"]').text("Enviando...");
                },
                success: function (response) {
                  if (hasDoc) {
                    var id = response.DocumentId;
                    var data = new FormData(document.getElementById("form-trabalhe"));
      
                    data.append("value", $("#cv")[0].files[0]);
      
                    $.ajax({
                      url:
                        "/api/dataentities/TC/documents/" +
                        id +
                        "/curriculo/attachments",
                      type: "POST",
                      data: data,
                      cache: false,
                      contentType: false,
                      processData: false,
                      beforeSend: function () {},
                      success: function (response) {
                        alert("Dados enviados com sucesso.");
      
                        location.reload();
                      },
                      error: function (e) {
                        alert("Houve um erro. Por favor, tente novamente.");
      
                        $("#form-trabalhe button").attr("disabled", false);
                        $('#form-trabalhe button[type="submit"]').text("Enviar");
                      },
                    });
                  } else {
                    alert("Dados enviados com sucesso.");
      
                    location.reload();
                  }
                },
                error: function (e) {
                  alert("Houve um erro. Por favor, tente novamente.");
      
                  $("#form-trabalhe button").attr("disabled", false);
                  $('#form-trabalhe button[type="submit"]').text("Enviar");
                },
              });
      
              return false;
            },
          });
        }
    };

    const trabalheConosco = () => {
        var searchStr = window.location.search,
          $form = $(".x-form");
      
        if (!searchStr) return false;
        if (searchStr.slice(1) === "sucesso") {
          $(
            "<p style='font-size:20px;margin:15px 0; color: #2196f3;'> \
                  Currículo enviado! Por favor, aguarde nosso retorno. \
              </p>"
          ).insertBefore($form);
          $form.remove();
        } else {
          $(
            "<p style='font-size:20px;margin:15px 0; color: #f10a0a;'> \
                  Não foi possível receber seus dados. Tente novamente por favor. \
                 </p>"
          ).insertBefore($form);
        }
    };

    trabalheConosco();
    trabalheConoscoV2();
}