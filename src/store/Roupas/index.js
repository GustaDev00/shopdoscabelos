import { HomeRoupas } from './components/Home/index';
import { DepartamentoRoupas } from './components/Department/index';
import { ProdutoRoupas } from './components/Product/index';

export const Roupas = () => {
    $('body').hasClass('x-roupas') && HomeRoupas();

    $('body').hasClass('is--product') && ProdutoRoupas();

    $('body').hasClass('is--department') && DepartamentoRoupas();
}