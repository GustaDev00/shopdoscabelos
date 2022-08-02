import './index.scss';

import '../../assets/javascripts/jquery.cookie';

export const Newsletter = () => {

    const sendData = () => {
    $("body").append(
      '<div class="mask-news"><div class="modal-news"><div class="icon-close"></div><div class="content-news"></div><button>ok</button></div></div>'
    );
  
    function setMsg(msg) {
      $(".content-news ").html(msg);
      $(".mask-news").fadeIn(300, function () {
        $(".modal-news").animate(
          {
            opacity: 1,
            "margin-top": "30px",
          },
          500
        );
      });
    }
  
    function IsEmail(email) {
      var regex = /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
      if (!regex.test(email)) {
        return false;
      } else {
        return true;
      }
    }
  
    function hasEmail(email) {
      var settings = {
        url: "/api/dataentities/NW/search?email=" + email + "&_fields=email",
        method: "GET",
        timeout: 0,
      };
  
      return $.ajax(settings)
    }
  
    function sendToDataEntity() {
      var name = $("#x-form-news").find('input[name="fields[0][Nome]"]').val();
      var email = $("#x-form-news").find('input[name="fields[1][Email]"]').val();
      var jsonData = JSON.stringify({ name: name, email: email });
  
      $.ajax({
        url: "/api/dataentities/NW/documents",
        type: "POST",
        dataType: "json",
        data: jsonData,
        headers: {
          accept: "application/json",
          "content-type": "application/json",
        },
        success: function (email) {
          if (email) {
            console.warn("Ja existe um usuario cadastrado com este email");
          }
        },
        error: function () {
          $("body").show().fadeOut(5000);
        },
      });
    }
  
    $(".modal-news button").on("click", function () {
      $(".modal-news").animate(
        {
          opacity: 0,
          "margin-top": "-100%",
        },
        500,
        function () {
          $(".modal-news p").text("");
          $(".mask-news").fadeOut();
        }
      );
    });
  
    $("#x-form-news").submit(function () {
      var nomeAllIn = $(this).find('input[name="fields[0][Nome]"]').val();
      var emailAllIn = $(this).find('input[name="fields[1][Email]"]').val();
      __blc["id"] = "7503b01653d73f68b9a81b184170c735";
  
      // get
      if (IsEmail(emailAllIn) &&  nomeAllIn.length >= 3) {
        hasEmail(emailAllIn).then(function (response) {
          if (response.length == 0) {
            sendToDataEntity();
            try {
              lc.sendData({
                evento: "Novo Cadastro",
                nm_email: emailAllIn,
                vars: {
                  nome: nomeAllIn,
                },
                lista: {
                  nm_lista: "BoasVindas",
                  atualizar: "1",
                  nome: nomeAllIn,
                },
              });
              setMsg("<h3>OBRIGADO POR SE CADASTRAR!</h3> <p>Utilize o cupom <span class='cupom'>MRCATVIP</span><br>e aproveite o seu desconto.</p>");
              setTimeout(function(){ location.reload(); }, 3000);
            } catch (e) {
              setMsg("Não conseguimos cadastrar, tente novamente.");
            }
          } else {
            setMsg("Ops! Você já faz parte da família Mr.Cat.");
          }
        })
      } else {
        setMsg("Por favor, verifique o Nome e Email cadastrado e tente novamente.");
      }
  
      // if (IsEmail(emailAllIn) && nomeAllIn.length >= 3) {
      //   sendToDataEntity();
      //   try {
      //     lc.sendData({
      //       evento: "Novo Cadastro",
      //       nm_email: emailAllIn,
      //       vars: {
      //         nome: nomeAllIn,
      //       },
      //       lista: {
      //         nm_lista: "BoasVindas",
      //         atualizar: "1",
      //         nome: nomeAllIn,
      //       },
      //     });
      //     setMsg("Seus 10% de desconto estão te aguardando em seu e-mail!");
      //   } catch (e) {
      //     setMsg("Não conseguimos cadastrar, tente novamente.");
      //   }
      // } else {
      //   setMsg("`Por favor, verifique o Nome e Email cadastrado e tente novamente.");
      // }
  
      return false;
    });
    };

    const sendDataPopUpNovosCadastros = () => {
        $(".x-popup-novos-cadastros #form-popUp").submit(function () {
        var nomeAllIn = $(this).find('input[name="fields[0][Nome]"]').val();
        var emailAllIn = $(this).find('input[name="fields[1][Email]"]').val();
    
        __blc["id"] = "7503b01653d73f68b9a81b184170c735";
    
        try {
            lc.sendData({
            evento: "Novo Cadastro",
            nm_email: emailAllIn,
            vars: {
                nome: nomeAllIn,
            },
            lista: {
                nm_lista: "BoasVindas",
                atualizar: "1",
                nome: nomeAllIn,
            },
            });
            alert("Seus 10% de desconto estão te aguardando em seu e-mail!");
        } catch (e) {
            alert("Não conseguimos cadastrar, tente novamente.");
        }
    
        return false;
        });
    
        var queryString = (function () {
        var query_string = {};
        var query = window.location.search.substring(1);
        var vars = query.split("&");
    
        for (var i = 0; i < vars.length; i++) {
            var pair = vars[i].split("=");
    
            if (typeof query_string[pair[0]] === "undefined") {
            query_string[pair[0]] = decodeURIComponent(pair[1]);
            } else if (typeof query_string[pair[0]] === "string") {
            var arr = [query_string[pair[0]], decodeURIComponent(pair[1])];
    
            query_string[pair[0]] = arr;
            } else {
            query_string[pair[0]].push(decodeURIComponent(pair[1]));
            }
        }
    
        return query_string;
        })();
    
        if ($.cookie("novos-cadastros") == undefined && queryString.utm_medium !== "email") {
        $(".x-popup-novos-cadastros-transparent").fadeIn();
    
        $.cookie("novos-cadastros", "true", {
            expires: 2,
            path: "/",
        });
        }
    
        $(".x-popup-novos-cadastros__bt-close").on("click", function () {
        $(".x-popup-novos-cadastros-transparent").fadeOut();
        });
    
        $(".x-popup-novos-cadastros__welcome button").on("click", function () {
        $(".x-popup-novos-cadastros-transparent").fadeOut();
        });
    };
    



    $(document).ready(function () {
        sendData();
        sendDataPopUpNovosCadastros();

        $(".icon-close").on("click", function() {
          $(".modal-news").animate(
            {
              opacity: 0,
              "margin-top": "-100%",
            },
            500,
            function () {
              $(".modal-news p").text("");
              $(".mask-news").fadeOut();
            }
          )
        }
        );
    });
  

  
}