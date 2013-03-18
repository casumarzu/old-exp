var data = [];

$(document).ready(function() {
//
//    var object = {};
//
//    _.extend(object, Backbone.Events);
//
//    object.on("alert", function(msg) {
//        alert("Сработало " + msg);
//    });
//
//    object.trigger("alert", "событие");

//    ajax_ejs();

    $('.for_text').bind('keyup',function(){
        beauty_words( $(this).val() )
    });


function beauty_words( counter_text ){
    counter_text = counter_text.split('');
    $('.new_counter').html('');
    for( i = 0; i < counter_text.length; i++){
        $('.new_counter').append('<div class="counter_item"><div class="counter_item_'+counter_text[i]+'"></div></div>')
    }
}


});


function ajax_ejs(){
    $.ajax({
        url: 'common/js/data/data.json',
        dataType: 'json',
        success: function(data) {
            console.log(data);
            var data = data;
            $('body').data('data',data);
            new EJS({url: 'common/js/templates/template.ejs'}).update($('#content')[0],data);
        },
        error: function(data){
            console.log('error');
        }
    });
}

$(function() {
    if (window.PIE) {
        $('.rounded').each(function() {
            PIE.attach(this);
        });
    }
});
