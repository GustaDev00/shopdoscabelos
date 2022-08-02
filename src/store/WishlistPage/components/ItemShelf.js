import React from 'react';
import numeral from 'numeral';

const ItemShelf = ({ items, removeItem, emptyList, addToCart }) => {

    return (
        <>
            <div className="x-group-data">
                <div className="x-wishlist-container">
                    {emptyList == true && (
                        <div className="x-no-itens x-active">
                            <p>Você não possui nenhum item adicionado à wishlist</p>
                            <a href="/">shop now</a>
                        </div>
                    )}
                    <div className="x-shelfs">
                        <ul>
                            {items.map((item, idx) =>
                                item.itemActive == true && (
                                    <li className="x-wishlist-item" key={idx}>
                                        <span
                                            className="x-wishlist-delete"
                                            onClick={() => removeItem(item.productId)}
                                            aria-label="Remover da Lista de Desejos"
                                        />
                                        <a
                                            data-id={item.productId}
                                            href={item.link}
                                            title={item.productName}
                                        >
                                            <p
                                                className="image-main"
                                                dangerouslySetInnerHTML={{
                                                    __html: item.imageTag
                                                        .replace(/\~/, '')
                                                        .replace(/#width#/gi, 415)
                                                        .replace(/#height#/gi, 629),
                                                }}
                                            />
                                            <div className='x-infos'>
                                                <h2> {item.productName}</h2>
                                                {item.price != '0' && (
                                                    <span className='x-price'> {numeral(item.price).format('$0,0.00')} </span>
                                                )}
                                                {item.price == '0' && <span className='x-price'>Produto Esgotado</span>}
                                            </div>
                                        </a>
                                    </li>
                                )
                            )}
                        </ul>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ItemShelf;
