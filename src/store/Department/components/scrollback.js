const iOS = () => {
    return (
        [
            "iPad Simulator",
            "iPhone Simulator",
            "iPod Simulator",
            "iPad",
            "iPhone",
            "iPod",
        ].includes(navigator.platform) ||
        (navigator.userAgent.includes("Mac") && "ontouchend" in document)
    );
};

const ScrollBack = () => {
    if (!iOS()) {
        const currentPathName = window.location.pathname.toLowerCase(),
            productId = window.localStorage.getItem("productId"),
            pathName = window.localStorage.getItem("pathName");

        if ($("body").hasClass("x-departamento")) {
            // disable scroll default
            if ("scrollRestoration" in window.history) {
                window.history.scrollRestoration = "manual";
            }

            $(document).on(
                "click",
                "[id^=ResultItems] .prateleira ul li[layout]",
                function () {
                    const getProductId = $(this).find("[value]").attr("value");
                    window.localStorage.setItem("productId", getProductId);
                    window.localStorage.setItem("pathName", currentPathName);
                }
            );

            if (pathName !== null && pathName !== currentPathName) {
                window.localStorage.removeItem("productId");
                window.localStorage.removeItem("pathName");
            }
        } else if ($("body").hasClass("x-produto")) {
            if (parseInt(productId) !== skuJson.productId) {
                window.localStorage.removeItem("productId");
                window.localStorage.removeItem("pathName");
            }
        }
    }
};

export const scrollToProduct = (callback) => {
    if (!iOS()) {
        const productId = window.localStorage.getItem("productId"),
            pathName = window.localStorage.getItem("pathName");

        if (productId !== null) {
            if (pathName === window.location.pathname.toLowerCase()) {
                if ($("body").hasClass("x-departamento")) {
                    const start = new Date();
                    const $product = $(`.x-id[value='${productId}']`).parent();

                    if (!$product.length) {
                        callback();
                    } else {
                        $([document.documentElement, document.body]).animate(
                            { scrollTop: $product.offset().top },
                            0
                        );

                        const end = new Date();
                        console.info(
                            `[ScrollBack] Tempo: ${
                                (end.getTime() - start.getTime()) / 1000
                            }s`
                        );

                        window.localStorage.removeItem("productId");
                        window.localStorage.removeItem("pathName");
                    }
                }
            }
        }
    }
};

export default ScrollBack;
