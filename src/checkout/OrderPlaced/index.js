import "./index.scss";

import Cookies from 'js-cookie';

export const OrderPlaced = () => {
    const clearMinicartInputs = () => {

        window.localStorage.removeItem("cep");

        window.localStorage.removeItem("cupom");

        Cookies.remove('codeSeller');
    }

    const fatherDayFunctions = {
        methods: {
            verifyUrlConditions: ()=>{
                const currentSearchParams = new URLSearchParams(window.location.search);
                const byUploadVideo = currentSearchParams.get('uploadVideo');
                const byNewRegistration = currentSearchParams.get('diadospais');
                const byHomologation = currentSearchParams.get('homolog');
                const byLandingPage = localStorage.getItem('@mrcat:diadospais2022')

                let newUser = false;
                let openModal = false;

                if(byUploadVideo || byLandingPage || byNewRegistration){
                    openModal = true;
                }

                return {
                    newUser,
                    openModal
                }

            },
            modalHtml: function(){
                const html = `
                <div class="pais-modal-2022">
                    <div class="pais-modal-2022__background">
                        <img src="/arquivos/fundo-mapa-modal-dia-dos-pais.png" alt="Plano de fundo mapa de piratas Mr.Cat" class="pais-modal-2022__background--image"/>
                    </div>
                    <div class="pais-modal-2022__content">
                        <div class="pais-modal-2022__header">
                            <div><img src="/arquivos/logo-mr-cat-modal-3x.png" alt="Logo da loja"></div>
                            <div>
                                <p class="pais-modal-2022__header--bold">Presenteie seu pai com uma</p>
                                <p class="pais-modal-2022__header--text-highlight"> mensagem personalizada em vídeo*.</p>
                            </div>
                            <div>
                                <p class="pais-modal-2022__header--paragraph">Envie para ele o link que você receber por</p>
                                <p class="pais-modal-2022__header--paragraph">e-mail e ele desvendará os enigmas para receber</p>
                                <p class="pais-modal-2022__header--paragraph">sua mensagem e ganhará R$100**.</p>
                            </div>
                            <button type="button" class="pais-modal-2022__header--close">X</button>
                        </div>

                        <form class="pais-modal-2022__form">
                            <div class="pais-modal-2022__input">
                                <label for="fatherName">Nome do pai</label>
                                <input type="text" name="nome do pai" id="fatherName" required>
                            </div>
                            <div class="pais-modal-2022__textarea">
                                <label for="mensagem">Deixe sua mensagem para ele</label>
                                <textarea name="mensagem" id="mensagem" required></textarea>
                            </div>
                            <div class="pais-modal-2022__fileupload">
                                <label for="video">
                                    <span class="pais-modal-2022__fileupload--info">
                                        <i class="pais-modal-2022__fileupload--icon"></i>
                                        <span>Anexe um vídeo para seu pai</span>
                                    </span>
                                    <span class="pais-modal-2022__fileupload--megabytes">Até 100MB</span>
                                </label>
                                <input type="file" name="file" id="video" accept="video/*">
                            </div>
                            <p class="pais-modal-2022__form--paragraph">
                               *Vídeo de até 30 segundos e 100mb.
                               **Em compras acima de 399. Válido até 31.08.22
                            </p>
                            <input type="hidden" id="pais-modal-2022__form--id"/>
                            <button type="submit">Enviar</button>
                        </form>
                    </div>
                </div>
                `

                return html

            },
            appendModal:function(){
                const { openModal } = this.verifyUrlConditions();
                if(!$('.pais-modal-2022').length){
                    if(openModal){
                        const modal = this.modalHtml();
                        $('body').append(modal);
                        this.editModeModal();
                        this.closeModal();
                    }
                }
            },
            closeModal: function(){
                const btnClose = document.querySelector('.pais-modal-2022__header--close');
                const btnBackground = document.querySelector('.pais-modal-2022__background');

                if(!btnClose || !btnBackground) return

                btnClose.addEventListener('click', ()=>{$('.pais-modal-2022').remove()})
                btnBackground.addEventListener('click', ()=>{$('.pais-modal-2022').remove()})
            },
            editModeModal: async function(){
                const currentSearchParams = new URLSearchParams(window.location.search);
                const orderId = currentSearchParams.get('og');
                console.log('HELLO')
                try {
                    const timestamp = Date.now()
                    const response = await $.ajax({
                        url: `/api/dataentities/PA/search?orderNumber=${orderId}&_fields=fatherMessage,fatherName,id&_v=${timestamp}`,
                        type: 'GET',
                        headers: {
                            'Accept': 'application/vnd.vtex.ds.v10+json',
                            'Content-Type': 'application/json',
                            'REST-Range': 'resources=0-100'
                        },
                    })

                    if(response.length){
                        const { fatherName,fatherMessage,id } = response[0];
                        $('.pais-modal-2022__input input').val(fatherName);
                        $('.pais-modal-2022__textarea textarea').val(fatherMessage);
                        $('#pais-modal-2022__form--id').val(id);
                    }


                } catch (error) {
                    console.error('Catch error', error)
                }
            },
            defaultVideoValidation: function(files){
                const convertBytesToMb = (bytes)=>{
                    return (bytes / (1024*1024))
                }
                if(files.length){
                    const {type,size,name} = files[0];
                    const convertedBytesToMb = convertBytesToMb(size);

                    const isValidSize = convertedBytesToMb <= 100;
                    if(isValidSize){
                        const parsedMb = convertedBytesToMb.toFixed(2);
                        $('.pais-modal-2022__fileupload--info span').text(name);
                        $('.pais-modal-2022__fileupload--megabytes').text(`${parsedMb} MB`);
                        return true
                    }

                    $('.pais-modal-2022__fileupload--info span').text('Anexe um vídeo para seu pai');
                    $('.pais-modal-2022__fileupload--megabytes').text(`Até 100 MB`);
                    $('.pais-modal-2022__fileupload input').val('');
                    alert('O limite ou o formato do arquivo é inválido');
                    return false;
                }
            },
            verifyFileInput: function(){
                const that = this


                $(document).on('change', '#video',function(e){
                    const files = e.target.files
                    that.defaultVideoValidation(files)
                })
            },
            sendVideo: async function(video){
                try {
                    const form = new FormData();
                    form.append("file", video[0].files[0]);
                    const options = {
                      method: 'POST',
                    };

                    options.body = form;

                    const result = await fetch('https://mrcat.corebiz.ag/upload', options)
                    .then(response => response.json())
                    .catch(err => console.error(err));
                    console.log('Resultado: ', result)
                    return result
                } catch (error) {
                    console.error(`Problemas ao enviar o vídeo:${e}` )
                }
                return formData
            },
            sendToMasterData: async function(payload){
                const video = $('.pais-modal-2022__fileupload input');
                const isValidVideo = this.defaultVideoValidation(video[0].files);
                console.log('video true',isValidVideo)
                const id = $('#pais-modal-2022__form--id').val();

                let videoUrl = ''

                if(isValidVideo){
                    videoUrl = await this.sendVideo(video)
                }
                console.log('resultado: ', videoUrl)

                const masterDataPayload = {
                    ...payload,
                    video:videoUrl.url,
                }
                console.log('HELLO', id)
                console.log(masterDataPayload)
                try {
                    const result = await $.ajax({
                        url: `/api/dataentities/PA/documents/${id}`,
                        type: 'PATCH',
                        headers: {
                            'Accept': 'application/vnd.vtex.ds.v10+json',
                            'Content-Type': 'application/json'
                        },
                        data: JSON.stringify(masterDataPayload)
                    })
                    localStorage.removeItem('@mrcat:diadospais2022');
                    alert('Cadastrado com sucesso!')
                    $('.pais-modal-2022').remove()
                } catch (error) {
                    console.log(error)
                }


            },
            handleOnSubmitForm: function(){
                const that = this
                $(document).on('submit','.pais-modal-2022__form',async function(e){
                    e.preventDefault()
                    const fatherName = $('.pais-modal-2022__input input').val();
                    const fatherMessage = $('.pais-modal-2022__textarea textarea').val();
                    const emailBought = $('.cconf-client-email').text();
                    const phoneBought = $('.cconf-address .mb0').text().replace('+', '');
                    const currentSearchParams = new URLSearchParams(window.location.search);
                    const orderNumber = currentSearchParams.get('og');
                    let productsBought = []
                    $('.cconf-product-table tbody tr').map(( index,element )=>{
                        productsBought.push({link: $(".cconf-product div a").attr('href'), img: $(".cconf-product img").attr('src')})
                    })

                    const orderForm = await $.ajax({
                        url: `/api/checkout/pub/orderForm/`,
                        type: 'GET',
                        headers: {
                            'Accept': 'application/vnd.vtex.ds.v10+json',
                            'Content-Type': 'application/json'
                        },
                    })

                    const sonName = orderForm?.clientProfileData?.firstName;
                    // const video = $('.pais-modal-2022__fileupload input').val();

                    console.log('Produtos: ', productsBought)

                    if(!fatherName || !fatherMessage){
                        alert('É obrigatório preencher todos os campos obrigatórios')
                        return
                    }
                    that.sendToMasterData({
                        fatherName,
                        fatherMessage,
                        orderNumber,
                        productsBought,
                        emailBought,
                        phoneBought,
                        sonName
                    });


                })
            }
        },
        init: function(){
            this.methods.appendModal();
            this.methods.verifyFileInput();
            this.methods.handleOnSubmitForm();
        }
    }





    jQuery(function() {
        fatherDayFunctions.init();
    })

    clearMinicartInputs();
};
