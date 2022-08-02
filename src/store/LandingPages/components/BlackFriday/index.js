import './index.scss';
import './components/Counter';
import { updateCounter } from './components/Counter';

import mask from 'jquery-mask-plugin';
import Swal from 'sweetalert2';

export const BlackFriday = () => {

    const collapseHints = () => {
        $('.hints__collapsible').click(function() {
            $(this).children('.hints__content').toggleClass('x-active');
            $(this).children('i').toggleClass('x-active');
        })
    }

    const verifyNewsletter = (email) => {
        $.ajax({
            headers: {
                Accept: 'application/vnd.vtex.ds.v10+json',
                'Content-Type': 'application/json'
            },
            type: 'GET',
            url: `/api/dataentities/VP/search?_fields=email&_where=email=${email}&an=mrcatstore`,
            success: function (res) {
                if (res.length > 0) {
                    Swal.fire({
                        text: 'Email já cadastrado',
                        confirmButtonColor: '#000000',
                        footer: '<i class="swal-mrcat-ico"></i>'
                    });
                } else {
                    submitNewsletter();
                }
            }
        });
    }

    const submitNewsletter = () => {

        let gender;
        document.getElementById("M").checked ? gender = 'Masculino' : gender = 'Feminino';

        var dados = {
            name: $('.newsletter-bf__form #name').val(),
            email: $('.newsletter-bf__form #email').val(),
            birthdate: $('.newsletter-bf__form #birthdate').val(),
            gender: `${gender}`
        };

        $.ajax({
            headers: {
                Accept: 'application/vnd.vtex.ds.v10+json',
                'Content-Type': 'application/json'
            },
            data: JSON.stringify(dados),
            type: 'POST',
            url: '/api/dataentities/VP/documents/?an=mrcatstore',
            success: function (data) {
                Swal.fire({
                    text: 'Cadastro efetuado com sucesso!',
                    confirmButtonColor: '#000000',
                    footer: '<i class="swal-mrcat-ico"></i>'
                });
            },
            error: function (error) {
                Swal.fire({
                    text: 'Dados não enviados. Por favor verifique suas informações e tente novamente',
                    confirmButtonColor: '#000000',
                    footer: '<i class="swal-mrcat-ico"></i>'
                });
            }
        });
    }

    $('.newsletter-bf__form .form__send').on('click', function (e) {
        e.preventDefault();

        let name = $('.newsletter-bf__form #name').val();
        let email = $('.newsletter-bf__form #email').val();
        let birthdate = $('.newsletter-bf__form #birthdate').val();
        let date_regex = /(((0[1-9]|[12][0-9]|3[01])([-./])(0[13578]|10|12)([-./])(\d{4}))|(([0][1-9]|[12][0-9]|30)([-./])(0[469]|11)([-./])(\d{4}))|((0[1-9]|1[0-9]|2[0-8])([-./])(02)([-./])(\d{4}))|((29)(\.|-|\/)(02)([-./])([02468][048]00))|((29)([-./])(02)([-./])([13579][26]00))|((29)([-./])(02)([-./])([0-9][0-9][0][48]))|((29)([-./])(02)([-./])([0-9][0-9][2468][048]))|((29)([-./])(02)([-./])([0-9][0-9][13579][26])))/;

        if (name != '' && email != '' && birthdate != '') {

            if (date_regex.test(birthdate)) {
                verifyNewsletter(email);
            } else {
                Swal.fire({
                    text: 'Preencha sua data de aniversário corretamente',
                    confirmButtonColor: '#000000',
                    footer: '<i class="swal-mrcat-ico"></i>'
                });
            }

        } else {
            Swal.fire({
                text: 'Preencha todos os campos',
                confirmButtonColor: '#000000',
                footer: '<i class="swal-mrcat-ico"></i>'
            });
        }
    });

    collapseHints();
    setInterval(updateCounter,1000);
}