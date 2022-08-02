import './index-store.scss';

import numeral from "numeral";

numeral.register("locale", "pt-br", {
    delimiters: {
        thousands: ".",
        decimal: ",",
    },
    currency: {
        symbol: "R$ ",
    },
});

numeral.locale("pt-br");

import { Header } from './store/Header';
import { Footer } from './store/Footer';
import { Newsletter } from './store/Newsletter';
import { Shelf } from './store/Shelf';
import { Flags } from './store/Flags';
import { Wishlist } from './store/Wishlist';
import { LandingPages } from './store/LandingPages';

import { Home } from './store/Home';
import { Department } from './store/Department';
import { Product } from './store/Product';
import { ProdutoGlobal } from './store/ProdutoGlobal'
import { Roupas } from './store/Roupas';

import { Institucional } from './store/Institucional';
import { Politicas } from './store/Politicas';
import { Lojas } from './store/Lojas';
import { Account } from './store/Account';
import { Search } from './store/Search';
import { WishlistPage } from './store/WishlistPage';

Header();
Footer();
Newsletter();
Shelf();
Flags();
Wishlist();
LandingPages();


$('body').hasClass('blackfriday') && SpecialFriday();
$('body').hasClass('x-home') && Home();
$('body').hasClass('x-home-homolog') && Home();
$('body').hasClass('x-departamento') && Department();
$('body').hasClass('x-produto') && Product();
$('body').hasClass('x-produto-global') && ProdutoGlobal();
$('body').hasClass('x-roupas') && Roupas();

$('body').hasClass('x-institucional') && Institucional();
$('body').hasClass('x-politicas') && Politicas();
$('body').hasClass('x-lojas') && Lojas();
$('body').hasClass('x-account') && Account();
$('body').hasClass('busca') && Search();
$('body').hasClass('x-wishlist') && WishlistPage();
