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

    ajax_ejs();


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