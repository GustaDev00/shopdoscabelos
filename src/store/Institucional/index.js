import './index.scss';

import { Sobre } from './components/Sobre/index';
import { Franquias } from './components/Franquias/index';
import { Multimarcas } from './components/Multimarcas/index';
import { TrabalheConosco } from './components/TrabalheConosco/index';
import { ComoCuidar } from './components/ComoCuidar/index';
import { FaleCom } from './components/FaleCom/index';
import { RegrasDePromos } from './components/RegrasDePromos/index';

export const Institucional = () => {
    
    $('body').hasClass('x-sobre') && Sobre();
    $('body').hasClass('x-seja-franqueado') && Franquias();
    $('body').hasClass('x-multimarcas') && Multimarcas();
    $('body').hasClass('x-trabalhe-conosco') && TrabalheConosco();
    $('body').hasClass('x-como-cuidar') && ComoCuidar();
    $('body').hasClass('x-fale-conosco') && FaleCom();
    $('body').hasClass('x-regras-de-promos') && RegrasDePromos();

    const menuSidebar = () => {
        var path = window.location.pathname,
          $links = $(".x-menu-group > ul > li a");
      
        $links.each(function (index, elem) {
          if ($(elem).attr("href") === path) $(elem).addClass("x-active");
        });
    };
    
    menuSidebar();
}