
function popup_cm(button){
    var el = $(''+button.attr('href')+'').addClass('cm_popup').clone();
    $('body').addClass('overflow_cm').css('overflow','hidden').append('<div id="cm_wrapper"></div>');
    $('#cm_wrapper').append(el).fadeIn(500);
    $('#cm_wrapper > '+button.attr('href')+'').show();

    products_popup_overflow( $('#cm_wrapper'), $('.cm_popup'));

    if( $('body.overflow_cm') ){
        $(window).resize(function(){
            products_popup_overflow( $('#cm_wrapper'), $('.cm_popup') );
        });
    }

}

function products_popup_overflow( wrapper, popup ){

    if( wrapper.height() <= popup.height()){
        popup.css('margin-top','0px').css('top','0px');
    }else{
        popup.css('margin-top','-' + popup.height() / 2 + 'px').css('top','50%');
    }

    if( wrapper.width() <= popup.width()){
        popup.css('margin-left','0px').css('left','0px');
    }else{
        popup.css('left','50%').css('margin-left','-' + popup.width() / 2 + 'px');
    }

}

$(document).ready(function() {

    $(document).on('click', '#cm_wrapper', function(){
        $(this).fadeOut(500);
    });

    $('.popup_cm').on('click', function(){
        popup_cm($(this));
    });

    $(document).on('click', '#cm_wrapper', function(){
        $(this).fadeOut(500, function(){
            $(this).remove();
            $('body').removeAttr('style');
        });
    });


});