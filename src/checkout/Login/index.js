import "./index.scss";
import formatInput from "./formatInput";
export const Login = () => {
    const $window = $(window);
    const $document = $(document);
    const $body = $("body");
    var responseGet;

    function postInMasterDataCL(email, fields) {
        const who = {
            email: email,
        };

        const data = {
            ...who,
            ...fields,
        };

       
        var _orderFormId = vtexjs.checkout.orderFormId;
        vtexjs.checkout.getOrderForm().done((orderForm) => {
      
            try {
                fetch("/no-cache/profileSystem/getProfile")
                    .then((response) => response.json())
                    .then((response) => {
                        if (response.IsUserDefined) {
                      
                            fetch(
                                `/api/io/safedata/CL/documents/${response.UserId}`,
                                {
                                    method: "PATCH",
                                    body: JSON.stringify(data),
                                    headers: {
                                        "Content-type":
                                            "application/json; charset=UTF-8",
                                    },
                                }
                            )
                                .then((response) => response.json())
                                .then((response) => {
                                  
                                });
                        } else {
                            fetch(
                                `/api/io/safedata/CL/documents?_orderFormId=${_orderFormId}`,
                                {
                                    method: "PATCH",
                                    body: JSON.stringify(data),
                                    headers: {
                                        "Content-type":
                                            "application/json; charset=UTF-8",
                                    },
                                }
                            )
                                .then((response) => response.json())
                                .then((json) =>
                                    console.log(
                                        "adicionou o usuário que não estava logado: ",
                                        json
                                    )
                                );
                        }
                    });
            } catch (error) {
                console.log(error);
            }
        });
    }

    function bindEvents() {
        $(document).ready(function () {
     

            try {
                vtexjs.checkout.getOrderForm().done(function (orderForm) {
                
                    birthDate.apply(orderForm);
                });
            } catch (error) {
                console.error("resposta", error);
            }
        });

        $window.on("orderFormUpdated.vtex", function (evt, orderForm) {
            birthDate.blockEditing();
        });

        $window.on("load hashchange", function () {
            birthDate.init();
            birthDate.blockEditing();
            birthDate.apply(orderForm);
        });

        $document.ajaxComplete(function () {
            birthDate.appendField();
            birthDate.blockEditing();
        });

        $document.on("focus blur", "#client-birthday", (event) => {
            try {
                let $input = $(event.currentTarget);
                const profile =
                    window?.vtexjs?.checkout?.orderForm?.clientProfileData;

                if (!!$input.val() && $input.val().length === 10 && !!profile) {
                    $input.attr("readonly", true);
                }
            } catch (error) {
                console.error(error);
            }
        });
    }

    const birthDate = {
        appendField: function () {
            let $birthDate = `
          <p class="client-birthday text input pull-left">
            <label for="client-birthday" class="input pull-left text required">Data de nascimento</label>
            <input required="true"replaceholder="dd/mm/aaaa" id="client-birthday" type="tel" inputmode="numeric" autocomplete="off" class="input-small">
            <span class="messageBirthDay"><b class="message">Idade inválida.</b></span>
            <span class="messageRequired"><b class="message">Campo obrigatório.</b></span>
          </p>
        `;

            if (!$(".client-birthday").length) {
                $(".client-document:eq(0)").after($birthDate);
            }
        },

        saveData: function (date) {
            const ndate = date.split("/");
            date = `${ndate[2]}-${ndate[1]}-${ndate[0]}T00:00:00+00:00`;

            clearTimeout(timeout);

            const timeout = setTimeout(function () {
                const email =
                    $("#client-email").val() ||
                    vtexjs?.checkout?.orderForm?.clientProfileData?.email ||
                    false;
                if (email) {
                    postInMasterDataCL(email, {
                        birthDate: date,
                    });
                }
            }, 700);
        },

        checkDate: function () {
            const minBirthday = 1;

            $body.on("input", "#client-birthday", function () {
                formatInput($(this)[0], "00/00/0000");
            });

            $body.on("keyup", "#client-birthday", function () {
                $(".messageBirthDay").removeClass("error");

                const $this = $(this);

                $(".messageRequired").toggleClass("error", !$this.val().length);

                if ($this.val().length === 10) {
                    const birthday = $this.val().split("/");
                    const idade =
                        (new Date() -
                            new Date(
                                birthday[2] +
                                    "-" +
                                    birthday[1] +
                                    "-" +
                                    birthday[0]
                            )) /
                            1000 /
                            60 /
                            60 /
                            24 /
                            365 || 0;

                    window.sessionStorage.setItem(
                        "clientBirthday",
                        $this.val()
                    );
                    window.sessionStorage.setItem("clientAge", idade);

                    if (idade >= minBirthday) {
                        $this.addClass("success");
                        $(".messageBirthDay").removeClass("error");
                        $body.removeClass("ageDenied");
                        birthDate.saveData($this.val());
                    } else {
                        $body.addClass("ageDenied");
                        $(".messageBirthDay").addClass("error");
                        $this.removeClass("success");
                    }
                } else {
                    $this.removeClass("success");
                }
            });
        },

        formatDate: function (date) {
            if (!date) return;
            let fillAge = date;
            fillAge = fillAge.toString().split("T")[0].split("-");
            fillAge = fillAge[2] + "/" + fillAge[1] + "/" + fillAge[0];
            return fillAge;
        },

        apply: function (orderForm) {
            try {
                fetch("/no-cache/profileSystem/getProfile")
                    .then((response) => response.json())
                    .then((response) => {
                        if (response.IsUserDefined) {
                          
                            fetch(
                                `/api/io/safedata/CL/documents/${response.UserId}?_fields=email,birthDate,firstName`
                            )
                                .then((response) => response.json())
                                .then((response) => {
                               
                                    $("#client-birthday").val(
                                        birthDate.formatDate(response.birthDate)
                                    );
                                    $(".messageBirthDay").removeClass("error");
                                });
                        } else {
                        
                            // sessionStorage.birthDateSession
                            $("#client-birthday").val(
                                sessionStorage.clientBirthday
                            );
                            $(".messageBirthDay").removeClass("error");
                        }
                    });
            } catch (error) {
                console.log(error);
            }
        },

        blockEditing() {
            try {
                let $input = $("#client-birthday");

                if (!$input.length) return;

                const profile =
                    window?.vtexjs?.checkout?.orderForm?.clientProfileData;
                if (!!$input.val() && $input.val().length === 10 && !!profile) {
                    $input.attr("readonly", true);
                }
            } catch (error) {
                console.error(error);
            }
        },

        init: function () {
            birthDate.appendField();
            birthDate.checkDate();
            $(window).on("authenticatedUser.vtexid", () =>   {
            (!$('#client-birthday').val()) ? birthDate.apply() : ""
          
        });

        },
    };

    bindEvents();
};
