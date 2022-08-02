import React, { useState, useEffect } from 'react';
import md5 from 'blueimp-md5';
import axios from 'axios';
import ItemShelf from './ItemShelf';

const WishlistApp = () => {
    const [emptyList, setEmptyList] = useState(false);
    const [itemsId, setItemsId] = useState([]);
    const [listProducts, setListProducts] = useState([]);

    function getListProducts(items){
        axios({
            method: 'get',
            url: `/api/catalog_system/pub/products/search?fq=${items}`,
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
        }).then(function (response) {
            let $arrItems = response.data.map(item => {
                response.data.map(item => {
                    item.items.map(function (sku, skuIdx) {
                        if (sku.sellers[0].commertialOffer.AvailableQuantity == 0 && skuIdx + 1 < item.items.length) {
                            delete item.items[skuIdx];
                        }
                        item.items = item.items.filter(val => val);
                    });
                });

                let listPrice = item.items.length > 0 ? item.items['0'].sellers['0'].commertialOffer.ListPrice : 0;
                let price = item.items.length > 0 ? item.items['0'].sellers['0'].commertialOffer.Price : 0;
                let installments = item.items.length > 0 ? item.items['0'].sellers['0'].commertialOffer.Installments : 0;
                let discount = listPrice > price ? parseInt(((listPrice - price) / listPrice) * 100) : 0;
                let flagDiscount = '';
                // let brand = item.brand;

                function numInstallments() {
                    if (installments.length) {
                        return installments.reduce(
                            (max, parcel) =>
                                parcel.NumberOfInstallments > max && parcel.InterestRate == 0
                                    ? parcel.NumberOfInstallments
                                    : max,
                            installments[0].NumberOfInstallments
                        );
                    }
                }

                function parcelValue() {
                    if (installments.length) {
                        return installments.reduce(
                            (min, parcel) => (parcel.Value < min && parcel.InterestRate == 0 ? parcel.Value : min),
                            installments[0].Value
                        );
                    }
                }

                return {
                    itemActive: true,
                    productName: item.productName,
                    imageTag: item.items.length > 0 ? item.items['0'].images['0'].imageTag : '',
                    imageTagOver:
                        item.items.length > 0
                            ? item.items['0'].images
                                .map(function (item) {
                                    if (item.imageLabel == 'ImageOver') {
                                        return item.imageTag;
                                    }
                                })
                                .join('')
                            : '',
                    listPrice: listPrice,
                    price: price,
                    installments: numInstallments(),
                    parcelValue: parcelValue(),
                    discount: discount,
                    flagDiscount: flagDiscount,
                    link: item.link,
                    productId: item.productId,
                    itemId: item.items['0'].itemId
                    // brand: item.brand
                };
            });
            setListProducts($arrItems);
        })
    }

    function removeItemList(elem){
        let oldState = itemsId;
        let idx = oldState.indexOf(elem);
        let $data = {
            id: '',
            userId: '',
            products: '',
        };
        let options = {
            method: 'patch',
            url: '/api/dataentities/WS/documents',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
            data: $data,
        };

        if (idx != -1) {
            oldState.splice(idx, 1);
        }

        $data.id = $('body').data('user');
        $data.userId = $('body').data('user');
        $data.products = oldState + '';

        options.data = $data;

        axios(options).then(function (response) {
            let newList = listProducts.map(item => {
                if (item.productId == elem) {
                    item.itemActive = false;
                }

                return item;
            });

            setListProducts(newList);
            setEmptyList(
                newList.filter(function (item, index) {
                    return item.itemActive == true;
                }).length > 0
                    ? false
                    : true
            )
        });
    }

    useEffect(() => {
        vtexjs.checkout.getOrderForm().done(function (orderForm) {
            if (orderForm.loggedIn) {
                $('body')
                .attr('data-user', md5(orderForm.clientProfileData.email))
                .addClass('is-logged');

                axios({
                    method: 'get',
                    url: `/api/dataentities/WS/search?userId=${md5(
                        orderForm.clientProfileData.email
                    )}&_fields=products`,
                    headers: {
                        'Content-Type': 'application/json',
                        Accept: 'application/json',
                        'REST-Range': `resources=0-${Math.floor(Math.random() * (1000 - 1 + 1)) + 1}`,
                    },
                }).then(function (response){
                    let $data = response.data.length > 0 ? response.data[0].products.match(/\w+/g) : [];
                    let $arrGet =
                        $data != null
                            ? $data
                                .map(item => {
                                    return `productId:${parseInt(item)}`;
                                })
                                .join(',')
                            : [];
                    setItemsId($data);
                    if ($arrGet.length > 0) {
                        getListProducts($arrGet);
                    } else {
                        setEmptyList(true);
                    }
                    $("body").addClass("x-active");
                });
            }
        });
    }, [])

    return (
        <ItemShelf
            items={listProducts}
            removeItem={removeItemList}
            emptyList={emptyList}
        />
    )
}

export default WishlistApp;
