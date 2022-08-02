import './index.scss';

import React from "react";
import { render } from "react-dom";

import { BiggySearch } from './components/BiggySearch/index';
import { Login } from './components/Login/index';
import { MinicartApp } from './components/Minicart/index';
import { SalesForce } from './components/SalesForce/index';
import { PosHeader } from './components/PosHeader';

export const Header = () => {

  const headerFixed = () => {

    const fatherDays2022OpenTextField = ()=>{
        const isUserParticipant = localStorage.getItem('@mrcat:diadospais2022');
        console.log(isUserParticipant)
        if(isUserParticipant){
            vtexjs.checkout
            .getOrderForm()
            .then(function() {
                var obs = "DIA-DOS-PAIS-2022"
                return vtexjs.checkout.sendAttachment("openTextField", { value: obs })
            })
            .done(function(orderForm) {
                console.log("openTextField filled with: ", orderForm.openTextField)
            })
        }
    }


    fatherDays2022OpenTextField();

    $(window).on("scroll", function () {
      if ($(this).scrollTop() >= 80) {
        $(".new-header").addClass("is--fixed");
      } else {
        $(".new-header").removeClass("is--fixed");
      }
    });
  }

  const SearchClick = () => {
    $(document).on('click', '.x-search__form', function() {
      $('.new-header__search, .x-search__close').addClass('x-active');
    })

    $(document).on('click', '.x-search__close', function() {
      $('.new-header__search, .x-search__close').removeClass('x-active');
    })
  }

  headerFixed();
  PosHeader();
  // BiggySearch();
  Login();
  SalesForce();
  SearchClick();

  if ($('[data-js="minicart"]').length) {
    render(<MinicartApp />, document.querySelector('[data-js="minicart"]'));
  }
}
