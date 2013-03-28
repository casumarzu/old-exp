var data = [];

$(document).ready(function() {

    var Movie = Backbone.Model.extend({});

    matrix = new Movie({
        title: 'The Matrix',
        format: 'dvd'
    });

    horror = new Movie({
        title: 'The horror',
        format: 'hd'
    });

    matrix.set({
        year: '1999'
    });

    matrix.get('year');

    var MovieList = Backbone.Collection.extend({
        model: Movie
    });

    var library = new MovieList();

    library.add({
        title: "The Big Lebowski",
        format: "VHS"
    });

    var ItemView = Backbone.View.extend({
        tagName: 'li'
    });

    var BodyView = Backbone.View.extend({
        el: 'body'
    });

    var item = new ItemView();
    var body = new BodyView();

//    alert(item.el + ' ' + body.el);


    isLocalStorageAvailable();

//    localStorage.setItem('foo', 'bar');
//    var foo = localStorage.getItem('foo');
//    alert(foo); //bar

/*
     try {
     localStorage.setItem('foo', 'bar');
     } catch (e) {
     if (e == QUOTA_EXCEEDED_ERR) {
     alert('Локальное хранилище переполнено');
     }
     }

     localStorage.removeItem('foo'); //удалит элемент объекта
     localStorage.clear(); //удалит все элементы
    var foo = {1: [1, 2, 3]};
    localStorage.setItem('foo', JSON.stringify(foo));
    var fooFromLS = JSON.parse(localStorage.getItem('foo'));
*/

    $('.for_text').bind('keyup',function(){
        beauty_words( $(this).val() )
    });

//    $('.coord_block').bind('mousemove', function(event){
//        var x = event.pageX;
//        var y = event.pageY;
//        $('.coord_block').text('X = '+event.pageX+', Y = '+event.pageY);
//    });

});

function isLocalStorageAvailable() {
    try {
        return 'localStorage' in window && window['localStorage'] !== null;
    } catch (e) {
        return false;
    }
}


function beauty_words( counter_text ){
    counter_text = counter_text.split('');
    $('.new_counter').html('');
    for( i = 0; i < counter_text.length; i++){
        $('.new_counter').append('<div class="counter_item"><div class="counter_item_'+counter_text[i]+'"></div></div>')
    }
}
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