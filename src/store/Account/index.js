import './index.scss'

export const Account = () => {

    const ChangeResolution = () => {
        $('.vtex-account__page-body .w-100 table > tbody > tr img').each(function(){
            $(this).attr('src', $(this).attr('src').replace('-50-50', '-380-380'));
        });
    }

    const returnBtn = () => {
        $('.x-account-nav span').on('click', function(){
            window.history.back();
            $('.x-account-nav a.active').removeClass('active');
        });
    }
    
    const accountNav = () => {
        $('.x-account-nav a').on('click', function(){
            $('.x-account-nav a.active').removeClass('active');
            $(this).addClass('active');
        });
    }
    
    const setOrderId = () => {
        var orderId = $('.vtex-pageHeader__title').text().split('Pedido ')[1];
    
        $('time .custom-id').remove();
    
        if ($('.vtex-account__order-details').length) {
            $('.vtex-account__page-body time').prepend('<h3 class="custom-id">Pedido nº'+ orderId +'</h3>');
        }
    }
    
    const setClientName = () => {
        $.ajax({
            type: 'GET',
            url: '/no-cache/profileSystem/getProfile',
    
            success: function(data) {            
                let firstName = data.FirstName;
                let userEmail = data.Email;
    
                if (data.FirstName == null) {
                    $('.x-say-hello span').append(userEmail);
                } else {
                    $('.x-say-hello span').append(firstName);
                }
    
                $('.x-say-hello').show();
            }
        });
    }
    
    $(document).ready(function(){
        returnBtn();
        accountNav();
        setOrderId();
    });
    
    $(document).ajaxStop(function(){
        setOrderId();
        ChangeResolution();
    });
    
    $(window).on('load', function(){
        setOrderId();
        setClientName();
    });
    
    $(window).on('hashchange', function(){
        setOrderId();
    });

}