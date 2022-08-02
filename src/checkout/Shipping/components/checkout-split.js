import "./checkout-split.scss";
import "../../../assets/javascripts/slick";
import "../../../assets/stylesheets/slick-checkout.css";

const SplitShipping = () => {
    let packages = [];
    let cepSeted = false;

    function bindEvents() {
        $(window).on("orderFormUpdated.vtex", (event, orderForm) => {
            splitProducts(orderForm);
            packages.length !== 1 && carousel();
        });

        $("body").on(
            "click",
            ".alerta-frete-modal, .alerta-frete-modal .js-close-frete-warning",
            function (e) {
                $(".alerta-frete-modal").css("display", "none");
            }
        );

        $("body").on("click", ".js-open-frete-warning", function (e) {
            $(".alerta-frete-modal").css("display", "flex");
        });
    }

    async function splitProducts(form) {
        const orderForm = await form;
        //   console.log(orderForm)
        const { address } = orderForm.shippingData;
        cepSeted = !!address;

        if (
            $("body").hasClass("body-cart") &&
            !$("body").hasClass("cart-is-empty") &&
            $(".cart-items tr.unavailable").length === 0
        ) {
            if (!$(".packages-container").length) {
                $(".body-cart .cart-links.cart-links-bottom").after(
                    "<div class='split-container'></div>"
                );
                $(".body-cart .split-container")
                    .append(`<div class="split-info js-open-frete-warning">
              <span>Seu pedido foi dividido em <b class="packnumber"></b> pacotes</span>
            </div>
          
            `);
                $(".split-container").append(
                    "<div class='packages-container'></div>"
                );
            } else {
                $(".packages-container").remove();
                $(".split-container").append(
                    "<div class='packages-container'></div>"
                );
            }
        } else {
            $(".packages-container").remove();
            $(".split-container").remove();
        }

        const items = orderForm.items?.map((item) => {
            return {
                productId: item?.productId,
                sku: item.id,
                imageUrl: item?.imageUrl,
                quantity: item?.quantity,
                seller: item.sellerChain[item.sellerChain.length - 1],
            };
        });

        const shippingItems = orderForm?.shippingData?.logisticsInfo;
        const shippings = shippingItems?.map((item) => ({
            itemIndex: item?.itemIndex,
            estimate: item?.slas[0]?.shippingEstimate,
            price: item?.slas[0]?.price,
            courier: item?.slas[0]?.deliveryIds[0]?.courierId,
            warehouse: item?.slas[0]?.deliveryIds[0]?.warehouseId,
        }));

        const itemsFull = items.map((item, index) => {
            const selected = shippings?.find((one) => one?.itemIndex === index);

            return {
                ...item,
                ...selected,
            };
        });
        //   console.log("itemsFull",itemsFull);

        const groupBySeller = _.groupBy(itemsFull, "seller");
        //   console.log("groupBySeller",groupBySeller)

        const groupByCourier = _.groupBy(itemsFull, "courier");
        //   console.log("groupByCourier",groupByCourier)

        const groupByWarehouse = _.groupBy(itemsFull, "warehouse");
        //   console.log("groupByWarehouse",groupByWarehouse)

        const groups = [groupBySeller, groupByCourier, groupByWarehouse];

        const lengths = [
            {
                index: 0,
                length: 3,
            },
            {
                index: 1,
                length: 2,
            },
            {
                index: 2,
                length: 1,
            },
        ];

        const lengthDesc = orderLength(lengths);
        const greatnessGroup = groups[lengthDesc[0].index];

        packages = Object.values(greatnessGroup);
        packages.map(renderCard);

        if (packages.length === 1) {
            $(".split-info").hide();
        }

        setTimeout(() => {
            packages.length !== 1 && carousel();
        }, 600);
    }

    function carousel() {
        const $slide = $(".packages-container");
        if (!$(".package-card").length) {
            return;
        }

        if ($slide.hasClass("slick-initialized")) {
            try {
                $slide.slick("unslick");
            } catch (error) {
                console.error(error);
            }
        }
        try {
            $slide?.slick({
                arrows: true,
                dots: true,
                slidesToShow: 1,
                swipeToSlide: true,
                infinite: true,
                adaptiveHeight: true,
                responsive: [
                    {
                        breakpoint: 768,
                        settings: {
                            arrows: false,
                            centerMode: true,
                            centerPadding: "40px",
                        },
                    },
                ],
            });
        } catch (error) {
            console.error(error);
        }
    }

    function orderLength(array) {
        return array.sort((a, b) => (a.length > b.length ? -1 : 1));
    }

    function renderCard(items, index) {
        const photos = items?.map((item) => item?.imageUrl);
        const prices = items?.map((item) => item?.price);
        const price = prices?.reduce(
            (acumulator, actual) => acumulator + actual
        );

        const packageId = index + 1;
        const numberOfPackages = packages?.length;

        const PHOTO_WIDTH = 60;
        const MIN_CARD_WIDTH = 225;

        const photosWidth = photos.length * PHOTO_WIDTH;
        const minWidth =
            photosWidth > MIN_CARD_WIDTH ? photosWidth : MIN_CARD_WIDTH;

        const _price = price > 0 ? getPrice(price) : "Grátis";
        const messageShippingOnePackage = `Frete: ${
            cepSeted ? _price : "a calcular"
        }`;
        const messageShippingMultiPackage = `Frete ${packageId}/${numberOfPackages}: ${
            cepSeted ? _price : "a calcular"
        }`;

        $(".packnumber").html(numberOfPackages);

        $(".packages-container").on(
            "click",
            `.index-${index} .remove`,
            function () {
                const remove = items.map((item) => ({
                    index: item.itemIndex,
                    quantity: item.quantity,
                }));

                vtexjs.checkout.removeItems(remove).then((orderForm) => {
                    //const form = await vtexjs.checkout.getOrderForm();
                    splitProducts(orderForm);
                    packages.length !== 1 && carousel();
                });
            }
        );

        // console.log("Numero de Pacotes", numberOfPackages);

        if (numberOfPackages > 1) {
            $(".body-cart .packages-container")
                .append(`<div class="package-card index-${index}">
          <a class="remove"><img src="/arquivos/closePk.svg"/></a>
          <span class="package-card__title"><img width="20px" height="20px" src="/arquivos/packagePK.svg"/>
            ${
                numberOfPackages > 1
                    ? messageShippingMultiPackage
                    : messageShippingOnePackage
            }
          </span>
    
          <div class="package-card__images">
            ${photos
                .map(
                    (photo) =>
                        `<img src="${photo.replace('130-190', '80-120')}" />`
                )
                .join("")}
          </div>
    
          ${
              cepSeted
                  ? `<div class="package-card__prazo">Prazos variados para entrega, clique em Finalizar Compra</div>`
                  : ""
          }
    
        </div>`);
        }
    }

    function getPrice(price) {
        return (price / 100).toLocaleString("pt-BR", {
            currency: "BRL",
            style: "currency",
        });
    }

    $(document).ready(function () {
        $(window).on("hashchange popstate", (event) => {
            $(".packages-container").remove();
            $(".split-container").remove();
            if ($("body").hasClass(".body-cart")) {
                try {
                    vtexjs.checkout.getOrderForm().then(function (orderForm) {
                        splitProducts(orderForm);
                    });
                } catch (error) {
                    console.error(error);
                }
            }
        });

        vtexjs.checkout.getOrderForm().then(function (orderForm) {
            splitProducts(orderForm);
        });
        setTimeout(() => {
            bindEvents();
        }, 1000);
    });
};

export default SplitShipping;
