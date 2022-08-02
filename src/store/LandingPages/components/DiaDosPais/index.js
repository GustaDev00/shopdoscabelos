import "./index.scss";

export const DiaDosPais = () => {
    const validateLogin = () => {
        vtexjs.checkout.getOrderForm().then((orderForm) => {
            if (!orderForm.loggedIn) {
                vtexid.start({
                    locale: "pt-BR",
                    forceReload: true,
                });
            }
        });
    };

    validateLogin();

    $(".carousel .carousel__container").slick({
        autoplay: true,
        infinite: false,
        arrows: true,
        autoplaySpeed: 4000,
        dots: false,
        slidesToShow: 3,
        slidesToScroll: 3,
    });

    // let video = document.getElementById('video-pais');

    // video.addEventListener('click', unmute);

    // function unmute() {
    //     video.muted = !video.muted;
    // }

    // $('#btn-tenis').on('click', function() {
    //     console.log('fooooooooooo');
    // });

    const btnDepartament = () => {
        const btnTenis = document.querySelector("#btn-tenis");
        const btnSapatos = document.querySelector("#btn-sapatos");
        const btnAcessorios = document.querySelector("#btn-acessorios");
        const btnRoupas = document.querySelector("#btn-roupas");

        const containerTenis = document.querySelector(".tenis");
        const containerSapatos = document.querySelector(".sapatos");
        const containerAcessorios = document.querySelector(".acessorios");
        const containerRoupas = document.querySelector(".roupas");

        btnTenis.addEventListener("click", () => {
            containerTenis.style.display = "flex";
            containerSapatos.style.display = "none";
            containerAcessorios.style.display = "none";
            containerRoupas.style.display = "none";
        });
        btnSapatos.addEventListener("click", () => {
            containerTenis.style.display = "none";
            containerSapatos.style.display = "flex";
            containerAcessorios.style.display = "none";
            containerRoupas.style.display = "none";
        });
        btnAcessorios.addEventListener("click", () => {
            containerTenis.style.display = "none";
            containerSapatos.style.display = "none";
            containerAcessorios.style.display = "flex";
            containerRoupas.style.display = "none";
        });
        btnRoupas.addEventListener("click", () => {
            containerTenis.style.display = "none";
            containerSapatos.style.display = "none";
            containerAcessorios.style.display = "none";
            containerRoupas.style.display = "flex";
        });
    };

    const saveUserAccessOnMd = () => {
        vtexjs.checkout.getOrderForm().then((orderForm) => {
            const { loggedIn, clientProfileData } = orderForm;
            const { firstName, lastName, email } = clientProfileData;
            const userSavedPreviously = localStorage.getItem(
                "@mrcat:colecoes-dia-dos-pais-md"
            );
            if (loggedIn && !userSavedPreviously) {
                try {
                    const masterDataPayload = {
                        name: firstName,
                        lastName,
                        email,
                    };
                    $.ajax({
                        url: `/api/dataentities/DD/documents/`,
                        type: "POST",
                        headers: {
                            Accept: "application/vnd.vtex.ds.v10+json",
                            "Content-Type": "application/json",
                        },
                        data: JSON.stringify(masterDataPayload),
                        success: function () {
                            localStorage.setItem(
                                "@mrcat:colecoes-dia-dos-pais-md",
                                "true"
                            );
                        },
                    });
                } catch (error) {
                    console.log(error);
                }
            }
        });
    };

    btnDepartament();
};
