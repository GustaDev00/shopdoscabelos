import './index.scss';

export const Login = () => {

    const closeLogin = () => {
      $("#vtexIdContainer button.close").removeClass("ng-hide");
      $("#vtexIdContainer button.close").on("click", function () {
        // window.location.href = "/";
        window.history.back(-1);
      });
    }

    const actionUser = () => {
      $.ajax({
        type: "GET",
        url: "/no-cache/profileSystem/getProfile",
        success: function (data) {
          if (data.IsUserDefined == true) {
            var nameUser;
    
            if (data.FirstName == null) {
              nameUser = data.Email;
            } else {
              nameUser = data.FirstName;
            }
            $("#xHeaderDesk .x-menu-account .x-item-user .x-menu-user").prepend(
              '<div class="x-title-user">Olá <strong class="x-name-user">' +
                nameUser +
                "</strong></div>"
            );
            $("#xHeaderDesk .x-menu-account .x-item-user .x-items-user").append(
              '<li class="x-logout"><a href="/no-cache/user/logout" title="Sair">Sair</a></li>'
            );
            $(
              "#xHeaderDesk .x-menu-account .x-item-user .x-items-user .x-login"
            ).hide();
          }
        },
      });
    }

    const logoutHeader = () => {
      $.ajax({
        type: "GET",
        url: "/no-cache/profileSystem/getProfile",
        success: function (data) {
          if (data.IsUserDefined == true) {
            var nameUser;
    
            if (data.FirstName == null) {
              nameUser = data.Email;
            } else {
              nameUser = data.FirstName;
            }
    
            if ($(".x-name-user").length == 0 && $("#logoutHeader").length == 0) {
              $(
                ".new-header__col.col--right .icons__item.has--children:nth-child(2) .children__content"
              ).prepend(
                '<div class="x-title-user">Olá, <strong class="x-name-user">' +
                  nameUser +
                  "</strong></div>"
              );
    
              $(
                ".new-header__col.col--right .icons__item.has--children:nth-child(2) .children__content .content__title"
              ).text("Acesse Sua Conta !");
    
              $(
                ".new-header__col.col--right .icons__item.has--children:nth-child(2) .children__content .content-list.not--icons"
              ).append(
                '<li id="wishlistlink" class="list__item"><a href="/_secure/account/wishlist" title="Wishlist">Wishlist</a></li>'
              );
    
              $(
                ".new-header__col.col--right .icons__item.has--children:nth-child(2) .children__content .content-list.not--icons"
              ).append(
                '<li id="logoutHeader" class="list__item"><a href="/no-cache/user/logout" title="Sair">Sair</a></li>'
              );
            }
          }
        },
      });
    }


    const changeTextFieldEmail = () => {
      const containerLogin = document.querySelector('#vtexIdContainer');
      const contentTextEmail = document.querySelector('.vtexIdUI-send-email');

      if (containerLogin) {
        contentTextEmail.textContent = 'Receber chave de acesso por e-mail';
      }
    }


    $(window).load(function () {
      closeLogin();
      changeTextFieldEmail();
    });

    logoutHeader();
    // actionUser();
}