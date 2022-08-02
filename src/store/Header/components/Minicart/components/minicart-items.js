import React, { useState } from "react";
import { MinicartContext } from "./minicart-context";
import numeral from "numeral";

export const MinicartItems = (params) => {
    const [cep, setCEP] = useState('');
    const [cupom, setCupom] = useState('');
    const [seller, setSellerCode] = useState('');

    return (
        <MinicartContext.Consumer>
            {context => (
                <div id="minicart__items" className="minicart__items">
                    {(context.state.listItems.length > 0 && (
                        <>
                            <div className="minicart__items_loader">
                                <i className="load-icon"></i>
                                <p>carregando...</p>
                            </div>
                            <div className="minicart__items_wrapper">
                                <button className="minicart__items_title">
                                    <span className="item-icon">
                                        <svg width="19" height="25" viewBox="0 0 19 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M16.4353 5.52383H14.0543V4.34577C14.0543 1.94959 12.1049 0 9.70834 0C7.31216 0 5.36281 1.94983 5.36281 4.34577V5.52383H3.0062C2.74341 5.52383 2.53 5.737 2.53 6.00003L0.75 24.0956C0.75 24.3582 0.963406 24.5717 1.2262 24.5717H18.2738C18.5367 24.5717 18.75 24.3582 18.75 24.0956L16.9115 6.00003C16.9115 5.737 16.6982 5.52383 16.4353 5.52383ZM6.31497 4.34553C6.31497 2.4745 7.83688 0.952159 9.7081 0.952159C11.5795 0.952159 13.1019 2.47455 13.1019 4.34553V5.52359H6.31497V4.34553ZM17.7976 23.6194H1.7024L3.4824 6.47623H5.36257V8.57326C5.13274 8.72708 4.98161 8.98853 4.98161 9.28567C4.98161 9.75885 5.36535 10.1428 5.83877 10.1428C6.31172 10.1428 6.69594 9.75885 6.69594 9.28567C6.69594 8.98853 6.54433 8.72708 6.31497 8.57326V6.47623H13.1019V8.57326C12.8722 8.72708 12.721 8.98853 12.721 9.28567C12.721 9.75885 13.1049 10.1428 13.5782 10.1428C14.0512 10.1428 14.4354 9.75885 14.4354 9.28567C14.4354 8.98853 14.2838 8.72708 14.0544 8.57326V6.47623H15.9592L17.7976 23.6194Z" fill="white"></path>
                                        </svg>
                                    </span>
                                    <div className="item-title">
                                        <strong>Carrinho</strong>
                                    </div>
                                    <div className="minicart__button-close">
                                        <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M8.32674 27.6733C7.89109 27.2376 7.89109 26.5313 8.32674 26.0956L26.0956 8.32674C26.5313 7.89109 27.2376 7.89109 27.6733 8.32674C28.1089 8.76239 28.1089 9.46872 27.6733 9.90437L9.90437 27.6733C9.46872 28.1089 8.76239 28.1089 8.32674 27.6733Z" fill="#FFF" />
                                            <path d="M8.32674 8.32674C8.76239 7.89109 9.46872 7.89109 9.90437 8.32674L27.6733 26.0956C28.1089 26.5313 28.1089 27.2376 27.6733 27.6733C27.2376 28.1089 26.5313 28.1089 26.0956 27.6733L8.32674 9.90437C7.89109 9.46872 7.89109 8.76239 8.32674 8.32674Z" fill="#FFF" />
                                        </svg>
                                    </div>
                                </button>
                                <div className="minicart__items_content">
                                    <div className="ps-minicart-items">

                                        <ul className="place-items">
                                            {context.state.listItems.map((item, index) => (
                                                <li key={index} className={item.availability}>
                                                    <img src={item.imageUrl.replace(/-548-806/g, "-53-78")} alt={item.name} />

                                                    <div className="wrap">
                                                        <div className="product-name">{item.name}</div>
                                                        <div className="sku-name">
                                                            <span>Tam: {item.skuName.split('/')[1]}</span>
                                                            <span>Cor: {item.skuName.split('/')[0]}</span>
                                                        </div>
                                                        {
                                                            (item.availability == 'withoutStock' && (
                                                                <div className="best-price">
                                                                    Indisponível
                                                                </div>
                                                            )) ||
                                                            (item.price > item.sellingPrice && (
                                                                <div className="product-price">
                                                                    <div className="list-price">
                                                                        <s>
                                                                            {numeral(item.price / 100).format(
                                                                                "$0,0.00"
                                                                            )}
                                                                        </s>
                                                                    </div>
                                                                    <div className="best-price">
                                                                        {numeral(item.sellingPrice / 100).format("$0,0.00")}
                                                                    </div>
                                                                </div>
                                                            )) || (
                                                                <div className="product-price">
                                                                    <div className="best-price">
                                                                        {numeral(item.sellingPrice / 100).format("$0,0.00")}
                                                                    </div>
                                                                </div>
                                                            )
                                                        }

                                                    </div>

                                                    <div className="wrap-quantity">
                                                        <button
                                                            aria-label="Remover produto do carrinho"
                                                            className="product-item-remove"
                                                            onClick={() => context.removeItem(index, context)}>
                                                            <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 729.8 729.8" xmlSpace="preserve"><path d="M589.2,185c0-6.7,5.1-12.2,11.4-12.2S612,178.3,612,185v468.5c0,20.7-7.9,39.5-20.7,53.2c-12.7,13.6-30.3,22.1-49.7,22.1H188.2c-19.3,0-36.9-8.5-49.7-22.1c-12.7-13.6-20.7-32.5-20.7-53.2V185c0-6.7,5.1-12.2,11.4-12.2c6.3,0,11.4,5.5,11.4,12.2v468.5c0,13.9,5.4,26.7,14,35.9c8.6,9.2,20.5,15,33.5,15h353.5c13,0,24.9-5.8,33.5-15c8.6-9.2,14-22,14-35.9L589.2,185L589.2,185z"></path><path d="M279.9,622c0,6.7-5.1,12.2-11.4,12.2s-11.4-5.5-11.4-12.2V188.2c0-6.7,5.1-12.2,11.4-12.2s11.4,5.5,11.4,12.2V622z"></path><path d="M376.3,622c0,6.7-5.1,12.2-11.4,12.2s-11.4-5.5-11.4-12.2V188.2c0-6.7,5.1-12.2,11.4-12.2s11.4,5.5,11.4,12.2V622z"></path><path d="M472.8,622c0,6.7-5.1,12.2-11.4,12.2c-6.3,0-11.4-5.5-11.4-12.2V188.2c0-6.7,5.1-12.2,11.4-12.2c6.3,0,11.4,5.5,11.4,12.2V622L472.8,622z"></path><path d="M273.2,104.2c0,6.3-5.1,11.4-11.4,11.4c-6.3,0-11.4-5.1-11.4-11.4c0-19.4,7.9-36.9,20.6-49.7c12.7-12.7,30.3-20.6,49.7-20.6h88.4c19.3,0,36.9,7.9,49.7,20.7c12.7,12.7,20.7,30.4,20.7,49.7c0,6.3-5.1,11.4-11.4,11.4s-11.4-5.1-11.4-11.4c0-13-5.4-24.9-14-33.5c-8.6-8.6-20.5-14-33.5-14h-88.4c-13,0-24.9,5.4-33.5,14C278.6,79.3,273.2,91.1,273.2,104.2z"></path><path d="M99.8,102.1h530.3c11.2,0,21.4,4.6,28.8,12l0,0c7.4,7.4,12,17.6,12,28.8v29.5c0,6.3-5.1,11.4-11.4,11.4h-0.3H70.3c-6.3,0-11.4-5.1-11.4-11.4v-0.3V143c0-11.2,4.6-21.4,12-28.8l0,0C78.4,106.7,88.6,102.1,99.8,102.1L99.8,102.1z M630.1,124.9H99.8c-5,0-9.5,2-12.7,5.3l0,0c-3.3,3.2-5.3,7.7-5.3,12.7V161h566.4V143c0-5-2-9.5-5.3-12.7l0,0C639.5,126.9,635,124.9,630.1,124.9z"></path>
                                                            </svg>
                                                        </button>
                                                        <div className="product-quantity">
                                                            <button
                                                                aria-label="Diminuir quantidade do produto no carrinho"
                                                                className="product-quantity-minus"
                                                                onClick={() =>
                                                                    context.updateItem(
                                                                        index,
                                                                        "dec",
                                                                        item.quantity
                                                                    )
                                                                }
                                                                disabled={
                                                                    item.quantity >
                                                                        1
                                                                        ? false
                                                                        : true
                                                                }
                                                            >
                                                                -
                                                            </button>
                                                            <input
                                                                className="product-quantity-input"
                                                                type="text"
                                                                value={
                                                                    item.quantity
                                                                }
                                                                readOnly
                                                            />
                                                            <button
                                                                aria-label="Aumentar quantidade do produto no carrinho"
                                                                className="product-quantity-plus"
                                                                onClick={() =>
                                                                    context.updateItem(
                                                                        index,
                                                                        "inc",
                                                                        item.quantity
                                                                    )
                                                                }
                                                            >
                                                                +
                                                            </button>
                                                        </div>
                                                    </div>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>

                                <div className="minicart__items_footer">
                                    <div className="place-subtotal">
                                        <span className="key">Subtotal</span>
                                        <span className="value">{numeral(context.state.subtotalCart / 100).format("$0,0.00")}</span>
                                    </div>
                                    <div className="place-actions">
                                        <div className={context.state.shippingCart >= 0 || context.state.shippingCart == 'invalid' ? `shipping-calculate active` : `shipping-calculate`}>
                                            <form onSubmit={e => { e.preventDefault(); context.updateShippingCart(cep) }}>
                                                <input
                                                    type="text"
                                                    autoComplete="off"
                                                    maxLength="8"
                                                    id="cep"
                                                    placeholder="Calcular frete"
                                                    aria-label="Calcular frete"
                                                    inputMode="numeric"
                                                    value={cep}
                                                    onChange={e => !e.target.validity.patternMismatch ? setCEP(e.target.value) : null} />

                                                <button className="btn shipping" type="submit">Calcular</button>
                                            </form>
                                            {(context.state.shippingCart >= 0 || context.state.shippingCart == 'invalid') && (
                                                <div className="shipping-result">

                                                    <div className="shipping-result-content">
                                                        <span className="key">Frete</span>
                                                        <span className="value">
                                                            <b>{context.state.cep}</b>
                                                            {
                                                                context.state.shippingCart == 'invalid' ? 'CEP inválido' : context.state.shippingCart > 0 ? context.state.shippingEstimate + ' | ' + numeral(context.state.shippingCart / 100).format("$0,0.00") : context.state.shippingEstimate + ' | ' + 'Grátis'
                                                            }
                                                        </span>
                                                    </div>

                                                    <button className="btn-clear" onClick={e => context.clearCEP()}>
                                                        <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M5.22872 18.7713C4.92376 18.4663 4.92376 17.9719 5.22872 17.6669L17.6669 5.22873C17.9719 4.92378 18.4663 4.92378 18.7713 5.22873C19.0762 5.53369 19.0762 6.02812 18.7713 6.33307L6.33306 18.7713C6.0281 19.0762 5.53367 19.0762 5.22872 18.7713Z" fill="#897E82" />
                                                            <path d="M5.51917 5.22872C5.82412 4.92376 6.31856 4.92376 6.62351 5.22872L18.7713 17.3765C19.0762 17.6814 19.0762 18.1759 18.7713 18.4808C18.4663 18.7858 17.9719 18.7858 17.6669 18.4808L5.51917 6.33306C5.21421 6.0281 5.21421 5.53367 5.51917 5.22872Z" fill="#897E82" />
                                                        </svg>
                                                    </button>
                                                </div>
                                            )}
                                        </div>

                                        <div className={context.state.cupom != "" ? `cupom-calculate active` : `cupom-calculate`}>
                                            <form onSubmit={e => { e.preventDefault(); context.updateCupomCart(cupom) }}>
                                                <input
                                                    id="cupom"
                                                    autoComplete="off"
                                                    placeholder="Adicionar cupom"
                                                    aria-label="Adicionar cupom"
                                                    value={cupom}
                                                    onChange={e => setCupom(e.target.value)} />

                                                <button className="btn cupom" type="submit">Adicionar</button>
                                                <span className="invalid">Cupom Inválido</span>
                                            </form>


                                            {context.state.cupom != "" && (
                                                <div className="cupom-result">

                                                    <div className="cupom-result-content">
                                                        <span className="key">Cupom</span>
                                                        <span className="value">{context.state.cupom}</span>
                                                    </div>

                                                    <button className="btn-clear" onClick={e => context.clearCupom()}>
                                                        <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M5.22872 18.7713C4.92376 18.4663 4.92376 17.9719 5.22872 17.6669L17.6669 5.22873C17.9719 4.92378 18.4663 4.92378 18.7713 5.22873C19.0762 5.53369 19.0762 6.02812 18.7713 6.33307L6.33306 18.7713C6.0281 19.0762 5.53367 19.0762 5.22872 18.7713Z" fill="#897E82" />
                                                            <path d="M5.51917 5.22872C5.82412 4.92376 6.31856 4.92376 6.62351 5.22872L18.7713 17.3765C19.0762 17.6814 19.0762 18.1759 18.7713 18.4808C18.4663 18.7858 17.9719 18.7858 17.6669 18.4808L5.51917 6.33306C5.21421 6.0281 5.21421 5.53367 5.51917 5.22872Z" fill="#897E82" />
                                                        </svg>
                                                    </button>
                                                </div>
                                            )}
                                        </div>

                                        <div className={context.state.sellerCode != "" ? `seller-calculate active` : `seller-calculate`}>
                                            <form onSubmit={e => { e.preventDefault(); context.updateSellerCode(seller) }}>
                                                <input
                                                    id="seller"
                                                    autoComplete="off"
                                                    placeholder="Código do vendedor"
                                                    aria-label="Código do vendedor"
                                                    value={seller}
                                                    onChange={e => setSellerCode(e.target.value)} />

                                                <button className="btn seller" type="submit">Adicionar</button>
                                                <span className="invalid">Código Inválido</span>
                                            </form>


                                            {context.state.seller != "" && (
                                                <div className="seller-result">

                                                    <div className="seller-result-content">
                                                        <span className="key">Código</span>
                                                        <span className="value">{context.state.seller}</span>
                                                    </div>

                                                    <button className="btn-clear" onClick={e => context.clearSellerCode()}>
                                                        <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M5.22872 18.7713C4.92376 18.4663 4.92376 17.9719 5.22872 17.6669L17.6669 5.22873C17.9719 4.92378 18.4663 4.92378 18.7713 5.22873C19.0762 5.53369 19.0762 6.02812 18.7713 6.33307L6.33306 18.7713C6.0281 19.0762 5.53367 19.0762 5.22872 18.7713Z" fill="#897E82" />
                                                            <path d="M5.51917 5.22872C5.82412 4.92376 6.31856 4.92376 6.62351 5.22872L18.7713 17.3765C19.0762 17.6814 19.0762 18.1759 18.7713 18.4808C18.4663 18.7858 17.9719 18.7858 17.6669 18.4808L5.51917 6.33306C5.21421 6.0281 5.21421 5.53367 5.51917 5.22872Z" fill="#897E82" />
                                                        </svg>
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    <div className="place-totalizers">
                                        <div className="place-discounts">
                                            <span className="key">Desconto:</span>
                                            <span className="value">{numeral(context.state.discountsCart / 100).format("$0,0.00")}</span>
                                        </div>
                                        <div className="place-total">
                                            <span className="key">Total:</span>
                                            <span className="value">{numeral(context.state.totalCart / 100).format("$0,0.00")}</span>
                                        </div>

                                    </div>
                                    <div className="place-installment">
                                        <span>Em até <strong>{context.state.installments.totalInstallments}x</strong> de <strong>{numeral((context.state.totalCart / context.state.installments.totalInstallments) / 100).format("$0,0.00")}</strong> sem juros</span>
                                    </div>
                                    <a className="btn-to-checkout" href="/checkout#/cart" title="Finalizar Compra">
                                        Finalizar Compra
                                    </a>
                                </div>
                            </div>
                        </>
                    )) || (
                            <div className="minicart__items_wrapper empty">
                                <button className="minicart__items_title">
                                    <span className="item-icon">
                                        <svg width="19" height="25" viewBox="0 0 19 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M16.4353 5.52383H14.0543V4.34577C14.0543 1.94959 12.1049 0 9.70834 0C7.31216 0 5.36281 1.94983 5.36281 4.34577V5.52383H3.0062C2.74341 5.52383 2.53 5.737 2.53 6.00003L0.75 24.0956C0.75 24.3582 0.963406 24.5717 1.2262 24.5717H18.2738C18.5367 24.5717 18.75 24.3582 18.75 24.0956L16.9115 6.00003C16.9115 5.737 16.6982 5.52383 16.4353 5.52383ZM6.31497 4.34553C6.31497 2.4745 7.83688 0.952159 9.7081 0.952159C11.5795 0.952159 13.1019 2.47455 13.1019 4.34553V5.52359H6.31497V4.34553ZM17.7976 23.6194H1.7024L3.4824 6.47623H5.36257V8.57326C5.13274 8.72708 4.98161 8.98853 4.98161 9.28567C4.98161 9.75885 5.36535 10.1428 5.83877 10.1428C6.31172 10.1428 6.69594 9.75885 6.69594 9.28567C6.69594 8.98853 6.54433 8.72708 6.31497 8.57326V6.47623H13.1019V8.57326C12.8722 8.72708 12.721 8.98853 12.721 9.28567C12.721 9.75885 13.1049 10.1428 13.5782 10.1428C14.0512 10.1428 14.4354 9.75885 14.4354 9.28567C14.4354 8.98853 14.2838 8.72708 14.0544 8.57326V6.47623H15.9592L17.7976 23.6194Z" fill="white"></path>
                                        </svg>
                                    </span>
                                    <div className="item-title">
                                        <strong>Carrinho</strong>
                                    </div>
                                    <div className="minicart__button-close">
                                        <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M8.32674 27.6733C7.89109 27.2376 7.89109 26.5313 8.32674 26.0956L26.0956 8.32674C26.5313 7.89109 27.2376 7.89109 27.6733 8.32674C28.1089 8.76239 28.1089 9.46872 27.6733 9.90437L9.90437 27.6733C9.46872 28.1089 8.76239 28.1089 8.32674 27.6733Z" fill="#FFF" />
                                            <path d="M8.32674 8.32674C8.76239 7.89109 9.46872 7.89109 9.90437 8.32674L27.6733 26.0956C28.1089 26.5313 28.1089 27.2376 27.6733 27.6733C27.2376 28.1089 26.5313 28.1089 26.0956 27.6733L8.32674 9.90437C7.89109 9.46872 7.89109 8.76239 8.32674 8.32674Z" fill="#FFF" />
                                        </svg>
                                    </div>
                                </button>

                                <div className="minicart__items_content empty">
                                    <svg width="18" height="25" viewBox="0 0 18 25" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M15.6853 5.52383H13.3043V4.34577C13.3043 1.94959 11.3549 0 8.95834 0C6.56216 0 4.61281 1.94983 4.61281 4.34577V5.52383H2.2562C1.99341 5.52383 1.78 5.737 1.78 6.00003L0 24.0956C0 24.3582 0.213406 24.5717 0.476199 24.5717H17.5238C17.7867 24.5717 18 24.3582 18 24.0956L16.1615 6.00003C16.1615 5.737 15.9482 5.52383 15.6853 5.52383ZM5.56497 4.34553C5.56497 2.4745 7.08688 0.952159 8.9581 0.952159C10.8295 0.952159 12.3519 2.47455 12.3519 4.34553V5.52359H5.56497V4.34553ZM17.0476 23.6194H0.952398L2.7324 6.47623H4.61257V8.57326C4.38274 8.72708 4.23161 8.98853 4.23161 9.28567C4.23161 9.75885 4.61535 10.1428 5.08877 10.1428C5.56172 10.1428 5.94594 9.75885 5.94594 9.28567C5.94594 8.98853 5.79433 8.72708 5.56497 8.57326V6.47623H12.3519V8.57326C12.1222 8.72708 11.971 8.98853 11.971 9.28567C11.971 9.75885 12.3549 10.1428 12.8282 10.1428C13.3012 10.1428 13.6854 9.75885 13.6854 9.28567C13.6854 8.98853 13.5338 8.72708 13.3044 8.57326V6.47623H15.2092L17.0476 23.6194Z" fill="black"></path>
                                    </svg>
                                    <p>
                                        Carrinho vazio, continue navegando e adicione produtos aqui!
                                    </p>
                                    <button className="minicart__button-close keep-buying">Continuar Compra</button>
                                </div>
                            </div>
                        )}
                </div>
                // </Swipe>
            )}
        </MinicartContext.Consumer>
    )
};