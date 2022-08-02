import './index.scss';

export const DiaDosPais2022 = () => {

    $(".videos__container .videos__content").slick({
        autoplay: false,
        infinite: false,
        arrows: true,
        centerMode: false,
        autoplaySpeed: 2500,
        pauseOnFocus: false,
        dots: false,
        slidesToShow: 1,
        slidesToScroll: 1,
        variableWidth: false,

    });



    const handleClickCollectionButton = ()=>{
        $(document).on('click','.videos__container .button__video',function(e){
            e.preventDefault();
            const defaultUrl = '/dia-dos-pais'
            vtexjs.checkout.getOrderForm().then((orderForm)=>{
                if(!orderForm.loggedIn){
                    vtexid.start({ returnUrl: defaultUrl, userEmail: '', locale: 'pt-BR', forceReload: true })
                }else{
                    window.location.href = defaultUrl
                }

            })
        })
    }

    const saveOnLocalStorage = ()=>{
        localStorage.setItem('@mrcat:diadospais2022','true')
    }

    handleClickCollectionButton();
    saveOnLocalStorage();




}
