import React from 'react';
import { render } from 'react-dom';
import WishlistApp from './components/index';

export const WishlistPage = () => {
    render(<WishlistApp />, document.querySelector('#wishlist'));
};
