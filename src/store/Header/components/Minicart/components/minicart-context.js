import React, { useState, useEffect } from 'react';
import axios from "axios";
import Cookies from 'js-cookie';

const MinicartContext = React.createContext();

const MinicartProvider = props => {

    const [state, setState] = useState({ // create the app state
        orderFormId: "",
        totalItems: 0,
        listItems: [],
        subtotalCart: 0,
        showMinicart: false,
        totalCart: 0,
        discountsCart: 0,
        shippingCart: -1,
        freeFreight: 0,
        installments: {},
        cep: "",
        cupom: "",
        seller: ""
    });

    useEffect(() => { // init the app getting data in master data
        async function init() {
            let $getInfoCart = await new vtexjs.Checkout();
            $getInfoCart
                .getOrderForm()
                .then(function (orderForm) {
                    return orderForm;
                })
                .done(function (data) {
                    if (data.shippingData?.address?.postalCode != undefined) {
                        window.localStorage.setItem("cep", data.shippingData.address.postalCode);
                    }
                    if (data.marketingData?.coupon != undefined) {
                        window.localStorage.setItem("cupom", data.marketingData.coupon);
                    }
                    
                    let totalItems = data.items.reduce(function (prevVal, elem) {
                        return prevVal + elem.quantity;
                    }, 0);

                    let Items =
                        data.totalizers.filter(item => item.id === "Items")[0] !=
                            undefined
                            ? data.totalizers.filter(item => item.id === "Items")[0]
                                .value
                            : data.items.reduce((sum, item) => { return sum + item.price }, 0);

                    let Discounts =
                        data.totalizers.filter(
                            item => item.id === "Discounts"
                        )[0] != undefined
                            ? data.totalizers.filter(
                                item => item.id === "Discounts"
                            )[0].value
                            : 0;

                    let Shipping =
                        data.totalizers.filter(item => item.id === "Shipping")[0] !=
                            undefined
                            ? data.totalizers.filter(
                                item => item.id === "Shipping"
                            )[0].value
                            : 'invalid';

                    let slas =
                        data.shippingData?.logisticsInfo[0] != undefined
                            ? data.shippingData?.logisticsInfo[0]?.slas[0]?.shippingEstimate.replace('bd', '')
                            : '';

                    let ShippingEstimate =
                        slas != ''
                            ? 'Até ' + slas + ' dias úteis'
                            : '';
                            
                    setState({
                        ...state,
                        orderFormId: data.orderFormId,
                        totalItems: totalItems,
                        listItems: data.items,
                        totalCart: data.value,
                        subtotalCart: Items,
                        discountsCart: Discounts,
                        shippingCart:
                            window.localStorage.getItem("cep") != null
                                ? Shipping
                                : -1,
                        shippingEstimate: ShippingEstimate,
                        cep:
                            window.localStorage.getItem("cep") != null
                                ? window.localStorage.getItem("cep")
                                : "",
                        cupom:
                            window.localStorage.getItem("cupom") != null
                                ? window.localStorage.getItem("cupom")
                                : "",
                        seller:
                            Cookies.get('codeSeller') != null
                                ? Cookies.get('codeSeller')
                                : ""
                    });
                })
                .fail(() => {
                    console.info("Impossível se conectar ao orderform");
                });
        }
        init();
    }, [])



    useEffect(() => {
        installments(state.listItems);
    }, [state.listItems])

    const removeItem = (index, oldContext) => {
        let $removeItemCart = new vtexjs.Checkout();
        $removeItemCart
            .getOrderForm()
            .then(function (orderForm) {
                var itemsToRemove = [
                    {
                        index: index,
                        quantity: 0
                    }
                ];
                return $removeItemCart.removeItems(itemsToRemove);
            })
            .done(function (data) {
                let totalItems = data.items.reduce(function (prevVal, elem) {
                    return prevVal + elem.quantity;
                }, 0);

                let Items =
                    data.totalizers.filter(item => item.id === "Items")[0] !=
                        undefined
                        ? data.totalizers.filter(item => item.id === "Items")[0]
                            .value
                        : data.items.reduce((sum, item) => { return sum + item.price }, 0);

                let Discounts =
                    data.totalizers.filter(
                        item => item.id === "Discounts"
                    )[0] != undefined
                        ? data.totalizers.filter(
                            item => item.id === "Discounts"
                        )[0].value
                        : 0;

                let Shipping =
                    data.totalizers.filter(item => item.id === "Shipping")[0] !=
                        undefined
                        ? data.totalizers.filter(
                            item => item.id === "Shipping"
                        )[0].value
                        : 'invalid';

                let slas =
                    data.shippingData?.logisticsInfo[0] != undefined
                        ? data.shippingData?.logisticsInfo[0]?.slas[0]?.shippingEstimate.replace('bd', '')
                        : '';

                let ShippingEstimate =
                    slas != ''
                        ? 'Até ' + slas + ' dias úteis'
                        : '';

                setState({
                    ...state,
                    orderFormId: data.orderFormId,
                    totalItems: totalItems,
                    listItems: data.items,
                    totalCart: data.value,
                    subtotalCart: Items,
                    discountsCart: Discounts,
                    shippingCart:
                        window.localStorage.getItem("cep") != null
                            ? Shipping
                            : -1,
                    shippingEstimate: ShippingEstimate
                });
            });
    };

    const updateItem = (index, type, itemQuantity) => {
        let $updateItemCart = new vtexjs.Checkout();

        $updateItemCart.getOrderForm()
            .then(function (orderForm) {
                return $updateItemCart.clearMessages();
            })
            .then(function (orderForm) {

                var itemsToUpdate;

                if (type == "inc") {
                    itemsToUpdate = [
                        {
                            index: index,
                            quantity: itemQuantity + 1
                        }
                    ];
                }

                if (type == "dec") {
                    itemsToUpdate = [
                        {
                            index: index,
                            quantity: itemQuantity - 1
                        }
                    ];
                }

                return $updateItemCart.updateItems(itemsToUpdate, false);
            })
            .done(function (data) {
                let totalItems = data.items.reduce(function (prevVal, elem) {
                    return prevVal + elem.quantity;
                }, 0);

                let Items =
                    data.totalizers.filter(item => item.id === "Items")[0] !=
                        undefined
                        ? data.totalizers.filter(item => item.id === "Items")[0]
                            .value
                        : data.items.reduce((sum, item) => { return sum + item.price }, 0);

                let Discounts =
                    data.totalizers.filter(
                        item => item.id === "Discounts"
                    )[0] != undefined
                        ? data.totalizers.filter(
                            item => item.id === "Discounts"
                        )[0].value
                        : 0;

                let Shipping =
                    data.totalizers.filter(item => item.id === "Shipping")[0] !=
                        undefined
                        ? data.totalizers.filter(
                            item => item.id === "Shipping"
                        )[0].value
                        : 'invalid';

                let slas =
                    data.shippingData?.logisticsInfo[0] != undefined
                        ? data.shippingData?.logisticsInfo[0]?.slas[0]?.shippingEstimate.replace('bd', '')
                        : '';

                let ShippingEstimate =
                    slas != ''
                        ? 'Até ' + slas + ' dias úteis'
                        : '';

                setState({
                    ...state,
                    orderFormId: data.orderFormId,
                    totalItems: totalItems,
                    listItems: data.items,
                    totalCart: data.value,
                    subtotalCart: Items,
                    discountsCart: Discounts,
                    shippingCart:
                        window.localStorage.getItem("cep") != null
                            ? Shipping
                            : -1,
                    shippingEstimate: ShippingEstimate
                });
            });
    };

    const updateShippingCart = postalCode => {
        let $updateShippingCart = new vtexjs.Checkout();
        window.localStorage.setItem("cep", postalCode);
        vtexjs.checkout
            .getOrderForm()
            .then(function (orderForm) {
                let country = "BRA";

                let address = {
                    postalCode: postalCode,
                    country: country
                };

                return vtexjs.checkout.calculateShipping(address);
            })
            .done(function (data) {

                let Items =
                    data.totalizers.filter(
                        item => item.id === "Items"
                    )[0] != undefined
                        ? data.totalizers.filter(
                            item => item.id === "Items"
                        )[0].value
                        : data.items.reduce((sum, item) => { return sum + item.price }, 0);

                let Discounts =
                    data.totalizers.filter(
                        item => item.id === "Discounts"
                    )[0] != undefined
                        ? data.totalizers.filter(
                            item => item.id === "Discounts"
                        )[0].value
                        : 0;

                let Shipping =
                    data.totalizers.filter(
                        item => item.id === "Shipping"
                    )[0] != undefined
                        ? data.totalizers.filter(
                            item => item.id === "Shipping"
                        )[0].value
                        : 'invalid';

                let slas =
                    data.shippingData?.logisticsInfo[0] != undefined
                        ? data.shippingData?.logisticsInfo[0]?.slas[0]?.shippingEstimate.replace('bd', '')
                        : '';

                let ShippingEstimate =
                    slas != ''
                        ? 'Até ' + slas + ' dias úteis' : '';

                setState({
                    ...state,
                    cep: postalCode,
                    totalCart: data.value,
                    listItems: data.items,
                    subtotalCart: Items,
                    discountsCart: Discounts,
                    shippingCart:
                        window.localStorage.getItem("cep") != null
                            ? Shipping
                            : -1,
                    shippingEstimate: ShippingEstimate
                });
            });
    };

    const clearCEP = () => {
        vtexjs.checkout
            .getOrderForm()
            .then(function (orderForm) {
                return vtexjs.checkout.calculateShipping(null);

            })
            .done(function (data) {
                
                let Items =
                    data.totalizers.filter(
                        item => item.id === "Items"
                    )[0] != undefined
                        ? data.totalizers.filter(
                            item => item.id === "Items"
                        )[0].value
                        : data.items.reduce((sum, item) => { return sum + item.price }, 0);

                let Discounts =
                    data.totalizers.filter(
                        item => item.id === "Discounts"
                    )[0] != undefined
                        ? data.totalizers.filter(
                            item => item.id === "Discounts"
                        )[0].value
                        : 0;

                setState({
                    ...state,
                    // cupom: window.localStorage.getItem("cupom") || '',
                    totalCart: data.value,
                    listItems: data.items,
                    subtotalCart: Items,
                    discountsCart: Discounts,
                    cep: "",
                    shippingCart: -1
                });
            })
        window.localStorage.removeItem("cep");

        // window.localStorage.removeItem("cep");
        // setState({
        //     ...state,
        //     cep: "",
        //     shippingCart: -1
        // });
    };

    const updateCupomCart = async cupom => {
        vtexjs.checkout
            .getOrderForm()
            .then(function (orderForm) {
                return vtexjs.checkout.addDiscountCoupon(cupom);
            })
            .done(function (data) {
                cupom = cupom.trim();

                // if the coupon is invalid, it will return an array of string(s)
                let couponRegex = new RegExp(`\\b${cupom}\\b`, 'gi');
                let isCouponInvalid = data.messages.filter(messages => messages.text.match(couponRegex)).length;

                if (!isCouponInvalid) {
                    window.localStorage.setItem("cupom", cupom);

                    let Items =
                        data.totalizers.filter(
                            item => item.id === "Items"
                        )[0] != undefined
                            ? data.totalizers.filter(
                                item => item.id === "Items"
                            )[0].value
                            : data.items.reduce((sum, item) => { return sum + item.price }, 0);

                    let Discounts =
                        data.totalizers.filter(
                            item => item.id === "Discounts"
                        )[0] != undefined
                            ? data.totalizers.filter(
                                item => item.id === "Discounts"
                            )[0].value
                            : 0;

                    let Shipping =
                        data.totalizers.filter(
                            item => item.id === "Shipping"
                        )[0] != undefined
                            ? data.totalizers.filter(
                                item => item.id === "Shipping"
                            )[0].value
                            : 'invalid';

                    let slas =
                        data.shippingData?.logisticsInfo[0] != undefined
                            ? data.shippingData?.logisticsInfo[0]?.slas[0]?.shippingEstimate.replace('bd', '')
                            : '';

                    let ShippingEstimate =
                        slas != ''
                            ? 'Até ' + slas + ' dias úteis'
                            : '';

                    setState({
                        ...state,
                        cupom: window.localStorage.getItem("cupom"),
                        totalCart: data.value,
                        listItems: data.items,
                        subtotalCart: Items,
                        discountsCart: Discounts,
                        shippingCart:
                            window.localStorage.getItem("cep") != null
                                ? Shipping
                                : -1,
                        shippingEstimate: ShippingEstimate

                    });
                } else {
                    setTimeout(function() {
                        $('#minicart__items .cupom-calculate form span.invalid').css('display', 'inline');
                    }, 1000)

                    setTimeout(function() {
                        $('#minicart__items .cupom-calculate form span.invalid').fadeOut(500);
                        $("#cupom").attr('value', '');
                    }, 5000)
                };
            });


    };

    const clearCupom = async () => {
        vtexjs.checkout.getOrderForm()
            .then(function (orderForm) {
                return vtexjs.checkout.removeDiscountCoupon();
            }).done(function (data) {

                let Items =
                    data.totalizers.filter(
                        item => item.id === "Items"
                    )[0] != undefined
                        ? data.totalizers.filter(
                            item => item.id === "Items"
                        )[0].value
                        : data.items.reduce((sum, item) => { return sum + item.price }, 0);

                let Discounts =
                    data.totalizers.filter(
                        item => item.id === "Discounts"
                    )[0] != undefined
                        ? data.totalizers.filter(
                            item => item.id === "Discounts"
                        )[0].value
                        : 0;

                let Shipping =
                    data.totalizers.filter(
                        item => item.id === "Shipping"
                    )[0] != undefined
                        ? data.totalizers.filter(
                            item => item.id === "Shipping"
                        )[0].value
                        : 'invalid';

                let slas =
                    data.shippingData?.logisticsInfo[0] != undefined
                        ? data.shippingData?.logisticsInfo[0]?.slas[0]?.shippingEstimate.replace('bd', '')
                        : '';

                let ShippingEstimate =
                    slas != ''
                        ? 'Até ' + slas + ' dias úteis'
                        : '';

                setState({
                    ...state,
                    cupom: "",
                    totalCart: data.value,
                    listItems: data.items,
                    subtotalCart: Items,
                    discountsCart: Discounts,
                    shippingCart:
                        window.localStorage.getItem("cep") != null
                            ? Shipping
                            : -1,
                    shippingEstimate: ShippingEstimate
                });
                window.localStorage.removeItem("cupom");
            });

    };

    const updateSellerCode = (seller) => {
        axios({
            method: 'GET',
            url: `/api/dataentities/VD/search?_fields=firstName,sellerCod&_where=sellerCod=${seller}&an=mrcatstore`,
            headers: {
                'REST-Range': 'resources=0-1000'
            },
        }).then(function (response) {

            let isSellerValid = response.data.length == 0 ? false : true;

            if (isSellerValid) {

                var name = response.data[0].firstName;
                var seller = response.data[0].sellerCod;

                vtexjs.checkout.getOrderForm()
                    .then(function (orderForm) {
                        var marketingdata = orderForm.marketingData;

                        let sellerFirstLetter = seller.substr(0, 1).toLocaleUpperCase();
                        let sellerSecondLetter = seller.substr(1, 1).toLocaleUpperCase();

                        let sellerType;
                        let utmi_cp;

                        if (sellerFirstLetter == "G" || sellerFirstLetter == "S" || sellerFirstLetter == "V" && !isNaN(parseInt(sellerSecondLetter))) {
                            utmi_cp = "SCvendedor";
                            sellerType = "Vendedor";

                        }
                        else if (sellerFirstLetter == "V" && sellerSecondLetter == "A") {
                            utmi_cp = "SCvendedor";
                            sellerType = "Vendedor";

                        } else if (sellerFirstLetter == "V" && sellerSecondLetter == "F") {
                            utmi_cp = "SCfranqueado";
                            sellerType = "Franqueado";

                        } else {
                            utmi_cp = "SCinfluenciador";
                            sellerType = "Influenciador";
                        }

                        if (marketingdata != null) {
                            marketingdata.utmiCampaign = utmi_cp;
                            vtexjs.checkout.sendAttachment('marketingData', marketingdata);
                        } else {
                            vtexjs.checkout.sendAttachment('marketingData', {
                                utmiCampaign: utmi_cp
                            });
                        }

                        Cookies.set('codeSeller', name, { expires: 1 });

                        return vtexjs.checkout.sendAttachment('openTextField', {
                            value: `VENDEDOR: Nome: ${name} - Código: ${seller} - Tipo: ${sellerType}`,
                        });
                    })
                    .done(function (data) {

                        let Items =
                            data.totalizers.filter(
                                item => item.id === "Items"
                            )[0] != undefined
                                ? data.totalizers.filter(
                                    item => item.id === "Items"
                                )[0].value
                                : data.items.reduce((sum, item) => { return sum + item.price }, 0);

                        let Discounts =
                            data.totalizers.filter(
                                item => item.id === "Discounts"
                            )[0] != undefined
                                ? data.totalizers.filter(
                                    item => item.id === "Discounts"
                                )[0].value
                                : 0;

                        let Shipping =
                            data.totalizers.filter(
                                item => item.id === "Shipping"
                            )[0] != undefined
                                ? data.totalizers.filter(
                                    item => item.id === "Shipping"
                                )[0].value
                                : 'invalid';

                        let slas =
                            data.shippingData?.logisticsInfo[0] != undefined
                                ? data.shippingData?.logisticsInfo[0]?.slas[0]?.shippingEstimate.replace('bd', '')
                                : '';

                        let ShippingEstimate =
                            slas != ''
                                ? 'Até ' + slas + ' dias úteis'
                                : '';

                        if (data.openTextField != null) {
                            setState({
                                ...state,
                                seller: Cookies.get('codeSeller'),
                                totalCart: data.value,
                                listItems: data.items,
                                subtotalCart: Items,
                                discountsCart: Discounts,
                                shippingCart:
                                    window.localStorage.getItem("cep") != null
                                        ? Shipping
                                        : -1,
                                shippingEstimate: ShippingEstimate
                            });
                        } else {
                            Cookies.remove('codeSeller');
                        }

                    });
            } else {
                setTimeout(function() {
                    $('#minicart__items .seller-calculate form span.invalid').css('display', 'inline');
                }, 1000)

                setTimeout(function() {
                    $('#minicart__items .seller-calculate form span.invalid').fadeOut(500);
                    $("#seller").attr('value', '');
                }, 5000)
            }
        })
    }

    const clearSellerCode = () => {
        Cookies.remove('codeSeller');
        vtexjs.checkout.getOrderForm()
            .then(function (orderForm) {
                var marketingdata = orderForm.marketingData;
                if (marketingdata != null) {
                    marketingdata.utmiCampaign = "null";
                    vtexjs.checkout.sendAttachment('marketingData', marketingdata);
                } else {
                    vtexjs.checkout.sendAttachment('marketingData', {
                        utmiCampaign: "null"
                    });
                }

                return vtexjs.checkout.sendAttachment('openTextField', {
                    value: ''
                });
            }).done(function (data) {
                let Items =
                    data.totalizers.filter(
                        item => item.id === "Items"
                    )[0] != undefined
                        ? data.totalizers.filter(
                            item => item.id === "Items"
                        )[0].value
                        : data.items.reduce((sum, item) => { return sum + item.price }, 0);

                let Discounts =
                    data.totalizers.filter(
                        item => item.id === "Discounts"
                    )[0] != undefined
                        ? data.totalizers.filter(
                            item => item.id === "Discounts"
                        )[0].value
                        : 0;

                let Shipping =
                    data.totalizers.filter(
                        item => item.id === "Shipping"
                    )[0] != undefined
                        ? data.totalizers.filter(
                            item => item.id === "Shipping"
                        )[0].value
                        : 'invalid';

                let slas =
                    data.shippingData?.logisticsInfo[0] != undefined
                        ? data.shippingData?.logisticsInfo[0]?.slas[0]?.shippingEstimate.replace('bd', '')
                        : '';

                let ShippingEstimate =
                    slas != ''
                        ? 'Até ' + slas + ' dias úteis'
                        : '';

                setState({
                    ...state,
                    seller: "",
                    totalCart: data.value,
                    listItems: data.items,
                    subtotalCart: Items,
                    discountsCart: Discounts,
                    shippingCart:
                        window.localStorage.getItem("cep") != null
                            ? Shipping
                            : -1,
                    shippingEstimate: ShippingEstimate
                });
            });
    }

    const installments = async items => {
        if (items.length > 0) {
            let $data = { items: items.map(item => { return { id: item.id, quantity: item.quantity, seller: item.seller } }), country: 'BRA' };
            let request = await axios({
                method: 'post',
                url: '/api/checkout/pub/orderforms/simulation',
                data: $data,
            }).then(function (response) {
                let $installments = response.data.paymentData.installmentOptions
                    .filter(item => {
                        return item.paymentGroupName == 'creditCardPaymentGroup';
                    })
                    .map(item => {
                        return item.installments;
                    })
                    .reduce((prev, curr) => {
                        return curr.length > prev.length ? curr : prev;
                    }, []);
                let result = {
                    totalInstallments: $installments[$installments.length - 1].count,
                    valueInstallments: $installments[$installments.length - 1].value,
                };
                return result;
            });
            setState({
                ...state,
                installments: request
            });
        }

    }

    window.updateCart = function () {
        let $update = new vtexjs.Checkout();
        $update
            .getOrderForm()
            .then(function (orderForm) {
                return orderForm
            })
            .done(function (data) {
                let totalItems = data.items.reduce(function (prevVal, elem) {
                    return prevVal + elem.quantity;
                }, 0);

                let Items =
                    data.totalizers.filter(
                        item => item.id === "Items"
                    )[0] != undefined
                        ? data.totalizers.filter(
                            item => item.id === "Items"
                        )[0].value
                        : data.items.reduce((sum, item) => { return sum + item.price }, 0);

                let Discounts =
                    data.totalizers.filter(
                        item => item.id === "Discounts"
                    )[0] != undefined
                        ? data.totalizers.filter(
                            item => item.id === "Discounts"
                        )[0].value
                        : 0;

                let Shipping =
                    data.totalizers.filter(
                        item => item.id === "Shipping"
                    )[0] != undefined
                        ? data.totalizers.filter(
                            item => item.id === "Shipping"
                        )[0].value
                        : 'invalid';

                let slas =
                    data.shippingData?.logisticsInfo[0] != undefined
                        ? data.shippingData?.logisticsInfo[0]?.slas[0]?.shippingEstimate.replace('bd', '')
                        : '';

                let ShippingEstimate =
                    slas != ''
                        ? 'Até ' + slas + ' dias úteis'
                        : '';
                setState({
                    ...state,
                    totalItems: totalItems,
                    listItems: data.items,
                    totalCart: data.value,
                    subtotalCart: Items,
                    discountsCart: Discounts,
                    shippingCart:
                        window.localStorage.getItem("cep") != null
                            ? Shipping
                            : -1,
                    shippingEstimate: ShippingEstimate
                });
            });
    };

    return (
        <MinicartContext.Provider value={{
            state: state,
            updateCupomCart: updateCupomCart,
            clearCupom: clearCupom,
            removeItem: removeItem,
            updateItem: updateItem,
            clearCEP: clearCEP,
            updateShippingCart: updateShippingCart,
            updateSellerCode: updateSellerCode,
            clearSellerCode: clearSellerCode
        }}>
            {props.children}
        </MinicartContext.Provider>
    );
}

export { MinicartProvider, MinicartContext };