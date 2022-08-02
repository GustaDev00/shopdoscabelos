import './index.scss';

export const DiaDosPaisGame = async () => {
    $('.modal_password_box_main--input input').mask("(00) 00000-0000", {placeholder: "(00) 00000-0000"});
    const attInfo = {
        openModal: function(){
            const $bodyPage = document.querySelector('.diadospais-2022');
            if(!$bodyPage) return

            const modalHTML = this.modalHtml();
            $bodyPage.classList.add('active-modal')
            $bodyPage.innerHTML += modalHTML;
        },
        modalHtml: function(){
            const html = `
            <div class="modal_password">
                <div class="modal_password_box">
                <button class="modal_password_box--close" style="display:none">
                X
                </button>
                <div class="modal_password_box_header">
                    <svg xmlns="http://www.w3.org/2000/svg" width="39.563" height="39.562" viewBox="0 -3.001 39.563 39.562"><g data-name="Grupo 10" transform="translate(0 -3)" clip-path="url(&quot;#a&quot;)"><path d="M18.586 22.732c0 .898-.025 1.733.008 2.565.026.622.561 1.082 1.183 1.097.625.014 1.206-.423 1.24-1.032.045-.868.01-1.74.01-2.63h-2.44Z" fill="#1a1818" fill-rule="evenodd" data-name="Caminho 10"/><path d="M39.558 20.857c0-.205-.038-.42-.107-.605-.311-.844-.626-1.685-.94-2.527-.442-1.18-.899-2.4-1.338-3.602a1.274 1.274 0 0 1-.004-.829l.258-.712c.58-1.597 1.18-3.246 1.833-4.847.29-.708.34-1.436.156-2.29-.508-2.366-1.998-4.125-4.558-5.38-.12-.057-.302-.063-.462-.063C24.64-.002 14.886-.002 5.13.001c-.14 0-.29 0-.379.044C2.238 1.266.749 2.965.198 5.238.074 5.756-.07 6.51.116 7.081c.461 1.402.995 2.808 1.511 4.168.264.694.528 1.387.783 2.085.082.222.08.516-.005.747-.386 1.054-.778 2.105-1.17 3.157-.36.964-.72 1.926-1.073 2.892-.1.273-.154.554-.155.81C-.001 25.938 0 30.934 0 35.931v2.68c0 .772.175.95.935.95H38.71c.636 0 .852-.217.852-.858v-.458c0-5.796.001-11.592-.005-17.388m-2.081-2.053.436 1.17h-.28l-.468.002-.438.001c-.293 0-.58-.002-.868-.014-.143-.006-.277-.112-.422-.334a4.822 4.822 0 0 0-1.727-1.6c-.234-.131-.358-.26-.391-.406-.265-1.174-.862-2.097-1.879-2.903l-.442-.35h1.437c1.038 0 2.018 0 2.994.01.18.001.433.14.502.321a563.286 563.286 0 0 1 1.546 4.103m-14.924 3.928c.021.896.044 1.822-.047 2.723-.143 1.408-1.264 2.35-2.759 2.35a3.03 3.03 0 0 1-.22-.008c-1.357-.081-2.469-1.23-2.53-2.615-.038-.831-.03-1.65-.02-2.515.004-.378.008-.763.008-1.151v-.196h5.549v.196c0 .407.01.818.019 1.216M5.698 19.956l.012-.208c.035-.642.325-1.206.798-1.545.463-.335 1.046-.428 1.64-.265.718.197.904.106 1.172-.57.383-.967 1.281-1.428 2.29-1.174.37.094.636.08.79-.04.16-.122.24-.385.244-.783.004-.557.27-1.083.73-1.445a1.853 1.853 0 0 1 1.571-.366l.067.017c.051.01.103.02.153.036.617.176.848.063 1.077-.53.312-.81.977-1.3 1.78-1.314.815-.014 1.502.48 1.826 1.316.231.599.462.712 1.074.525.648-.198 1.238-.087 1.805.341.43.325.617.325 1.056.004.57-.416 1.201-.546 1.781-.368.581.18 1.033.647 1.268 1.314.207.58.468.707 1.074.523.98-.298 1.953-.182 2.737.324.786.508 1.294 1.35 1.427 2.373.061.474.25.727.653.873a3.4 3.4 0 0 1 .647.347c.085.055.173.11.26.16l.155.09-.169.365H5.698ZM1.555 6.063l.036-.226A5.133 5.133 0 0 1 2.718 3.36a9.78 9.78 0 0 1 1.187-1.187c.679-.586 1.431-.849 2.374-.854 5.927.023 11.953.024 17.78.025 3.264.002 6.526.002 9.789.007.333 0 .703.1.99.268 1.597.932 2.628 2.225 3.062 3.846.021.077.033.158.048.245.005.039.012.079.02.12l.042.232H23.94l-.047-.129c-.814-2.24-2.175-3.329-4.158-3.329h-.037c-1.879.014-3.27 1.164-4.024 3.327l-.046.13H1.555Zm20.875-.078-.213.06a.39.39 0 0 1-.144.03l-3.77.001H17.1l.076-.251c.337-1.106 1.409-1.876 2.606-1.876h.004c1.192 0 2.282.778 2.59 1.846l.055.19ZM2.314 9.194 1.83 7.91a1.236 1.236 0 0 1-.04-.14l-.02-.085-.061-.244h36.198l-1.23 3.277a105.47 105.47 0 0 0-.696 1.876c-.11.308-.293.44-.613.44h-.004c-1.221-.004-2.441-.005-3.662-.005-1.444-.002-2.886-.003-4.33-.01-.198 0-.428-.085-.616-.229-.999-.757-2.019-.846-3.121-.27-.272.143-.497.14-.774-.008-.588-.316-1.148-.42-1.713-.32-.222.039-.476-.153-.578-.295-.545-.76-1.125-1.2-1.821-1.388-1.185-.318-2.33.148-3.136 1.28-.213.297-.425.456-.873.394-.667-.096-1.322.096-2.056.603-.21.145-.469.232-.692.233-1.693.01-3.385.01-5.078.01l-2.654.002c-.21 0-.524 0-.675-.417-.415-1.143-.85-2.3-1.272-3.42m.39 7.96.26-.69c.207-.541.42-1.103.617-1.657.11-.31.292-.442.609-.442h.005c1.477.008 2.953.007 4.43.007h1.64c.038 0 .077.004.148.013.036.006.083.011.146.02l1.013.116-.984.266c-.876.237-1.532.724-2.067 1.532a.583.583 0 0 1-.49.233c-.953-.106-1.853.15-2.534.722-.683.571-1.093 1.416-1.156 2.38-.001.025-.006.05-.013.086l-.039.21H1.66l1.046-2.797ZM1.376 38.205V35.38l.228.038c1.18.197 2.278 1.293 2.552 2.552l.052.237H1.375Zm32.553-.162-.036.151H5.671l-.035-.15c-.533-2.255-1.881-3.603-4.126-4.12l-.15-.035V21.354h14.275v.344c0 .11-.001.224.001.337.008.395.004.799 0 1.188-.008.86-.016 1.75.106 2.598.304 2.105 2.275 3.527 4.585 3.313 1.97-.184 3.584-2.003 3.598-4.056.006-.802.004-1.604.003-2.415l-.001-1.12v-.196h14.27V33.89l-.151.035c-2.246.525-3.593 1.872-4.118 4.12m4.27.148h-2.78l.015-.21c.082-1.116 1.315-2.364 2.538-2.567l.227-.038v2.815Z" fill="#1a1818" fill-rule="evenodd" data-name="Caminho 9"/></g><defs><clipPath id="a"><path d="M0 0h39.563v39.562H0V0z" data-name="Retângulo 9"/></clipPath></defs></svg>
                    <h3>Oba!</h3>
                </div>
                <form class="modal_password_box--formInput">
                <div class="modal_password_box_main">
                    <div class="modal_password_box_main--paragraph">
                        <p>O seu tesouro está logo ali!</p>
                        <p>Para desbloquear, digite o código secreto.</p>
                    </div>
                    <div class="modal_password_box_main--input">
                        <input type="text" name="passwordBox" id="passwordBox" />
                    </div>
                    <p class="modal_password_box_main--paragraph-last">
                        Dica: a senha é o telefone de quem mais ama!
                    </p>
                </div>
                <div class="modal_password_box_footer">
                    <button class="modal_password_box_footer--btnEnvia">ENVIAR</button>
                </div>
                </form>
                </div>
                <div class="modal_password_blackout"></div>
            </div>
            `;

            return html

        },
        handleSubmitForm: function(){
            const $formPassword = document.querySelector('.modal_password_box--formInput')
            if(!$formPassword) return

            $formPassword.addEventListener('submit', async (e)=>{
                e.preventDefault();

                const valueInput = $('#passwordBox').val();
                if(!valueInput) return

                let response, last;
                try {
                    const parsedValuePassword = valueInput.replace(/\D/gm,'')
                    const timestamp = Date.now()
                    response = await $.ajax({
                        url: `/api/dataentities/PA/search?phoneBought=55${parsedValuePassword}&_fields=phoneBought,fatherMessage,fatherName,productsBought,sonName,video&_v=${timestamp}`,
                        type: 'GET',
                        headers: {
                            'Accept': 'application/vnd.vtex.ds.v10+json',
                            'Content-Type': 'application/json',
                            'REST-Range': 'resources=0-100'
                        },
                    })
                    if(response.length){
                        last = response.length - 1;
                        console.log(response[last])
                        this.writeValues(response[last]);
                    }

                    if(!response.length){
                        response = await $.ajax({
                            url: `/api/dataentities/PA/search?phoneBought=${parsedValuePassword}&_fields=phoneBought,fatherMessage,fatherName,productsBought,sonName,video&_v=${timestamp}`,
                            type: 'GET',
                            headers: {
                                'Accept': 'application/vnd.vtex.ds.v10+json',
                                'Content-Type': 'application/json',
                                'REST-Range': 'resources=0-100'
                            },
                        })
                        if(response.length){
                            last = response.length - 1;
                            console.log(response[last])
                            this.writeValues(response[last]);
                        }

                        if(!response.length){
                        alert('Senha inválida!')

                        }

                    }
                }catch(e){
                    alert('Senha inválida!')
                }

            })
        },
        valuesTemplates: function(){
            const fieldFatherName = document.querySelector('.congratulation__name');
            const fieldSonName = document.querySelector('.dedication__name')
            const htmlVideo = document.querySelector('.video')
            const fieldDescription = document.querySelector('.text-banner__description')
            const fieldProduct = document.querySelector('.products')

            const fixMensage = `Nesse Dia dos Pais, preparamos novidades exclusivas para presentear pais, aqueles que inspiram, vibram e torcem com as conquistas dos filhos, como você !
            Desejamos um ótimo dia e esperamos que aproveite todo o lançamento com modelos em edições limitadas especialmente para pais e filhos usarem juntos.`

            const fixBanner = `<img class="video__img" src="https://mrcatstore.vteximg.com.br/arquivos/ids/368219/banner_desktop_video.jpg?v=637941186379530000" alt="Banner dia dos Pais">`;

            return {fieldFatherName, fieldSonName, fieldDescription ,fieldProduct, htmlVideo, fixMensage, fixBanner}
        },
        closeModal: function(){
            const $bodyPage = document.querySelector('.diadospais-2022');
            console.log($bodyPage)
            if(!$bodyPage) return

            $bodyPage.classList.remove('active-modal')
        },
        writeValues: function(resp){
            const data = resp;
            console.log('response: ', resp)
            const dataPage = this.valuesTemplates();

            if(data?.fatherName){
                dataPage.fieldFatherName.innerHTML = data.fatherName
            }

            if(data?.sonName){
                dataPage.fieldSonName.innerHTML = data.sonName
            }

            if(data?.fatherMessage){
                dataPage.fieldDescription.innerHTML = data.fatherMessage
            }else{
                dataPage.fieldDescription.innerHTML = dataPage.fixMensage
            }

            if(data?.video){
                console.log('>>>>>>>>>>>>>>', data.video);
                dataPage.htmlVideo.innerHTML = `<video src="${data.video}" autoplay="true" controls></video>`
            }else{
                dataPage.htmlVideo.innerHTML = dataPage.fixBanner
            }

            console.log('teste')

            if(data?.productsBought.length){
                console.log('asdasd', )
                data?.productsBought.forEach(element => {
                    const product = `
                    <div class="products__information"><img src="${element.img.replace(/50-50$/g,'200-350')}"></div>
                    `;
                    console.log('Produto: ', dataPage.fieldProduct)
                    dataPage.fieldProduct.innerHTML += product
                });

            }

            this.closeModal();
        },
        init: function(){
            this.openModal();
            this.handleSubmitForm();
        }
    }

    attInfo.init();

}
