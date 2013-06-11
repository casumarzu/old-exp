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

function browser(){
    var ua = navigator.userAgent;

    if (ua.search(/MSIE/) > 0) return 'Internet Explorer';
    if (ua.search(/Firefox/) > 0) return 'Firefox';
    if (ua.search(/Opera/) > 0) return 'Opera';
    if (ua.search(/Chrome/) > 0) return 'Google Chrome';
    if (ua.search(/Safari/) > 0) return 'Safari';
    if (ua.search(/Konqueror/) > 0) return 'Konqueror';
    if (ua.search(/Iceweasel/) > 0) return 'Debian Iceweasel';
    if (ua.search(/SeaMonkey/) > 0) return 'SeaMonkey';

    // Браузеров очень много, все вписывать смысле нет, Gecko почти везде встречается
    if (ua.search(/Gecko/) > 0) return 'Gecko';

    // а может это вообще поисковый робот
    return 'Search Bot';
}

function popup_overflow( wrapper, popup ){
    if( wrapper.height() <= popup.height()){
        popup.css('margin-top','0px').css('top','0px');
    }else{
        popup.css('margin-top','-' + popup.height() / 2 + 'px').css('top','50%');
    }
}

function paginator( total, page, paginator_wrapper, prev, next, all_pages, middle_page){

    paginator_wrapper.html('');

    var to_page, start_page;
    // где :
    // to_page - конечная видимая страница,
    // start_page - стартовая страница,
    // all_pages - количество видимых страниц,
    // middle_page - серединная видимая страница,
    // total - общее количество страниц,
    // page - текущая страница;

    if( total <= 1 ){
        paginator_wrapper.hide();
        prev.hide();
        next.hide();
    }else{
        paginator_wrapper.show();
        prev.show();
        next.show();
    }

    if( total == 0){
        total = 1;
    }

    if( all_pages <= total ){
        if(page >= 1 && page < middle_page){
            start_page = 1;
            to_page = all_pages + 1;
        }else if(page == middle_page){
            start_page = page - (all_pages - middle_page);
            to_page = page + all_pages - middle_page + 1;
        }else if( page > middle_page && total - page >= middle_page ){
            start_page = page - (all_pages - middle_page);
            to_page = page + (all_pages - middle_page) + 1;
        }else if(total - page < middle_page){
            start_page = total - all_pages + 1;
            to_page = total + 1;
        }
    }else{
        start_page = 1;
        to_page = total + 1;
    }
    for( i = start_page; i < to_page; i++ ){
        paginator_wrapper.append('<a class="paginator" page="'+ i +'">'+ i +'</a>');
    }
    paginator_wrapper.find('.paginator[page="'+page+'"]').addClass('current');

};

function plural_str(i, str1, str2, str3) {
    function plural (a) {
        if ( a % 10 == 1 && a % 100 != 11 ) return 0
        else if ( a % 10 >= 2 && a % 10 <= 4 && ( a % 100 < 10 || a % 100 >= 20)) return 1
        else return 2;
    }

    switch (plural(i)) {
        case 0: return str1;
        case 1: return str2;
        default: return str3;
    }
}

function parseGET() {
    var tmp = new Array();
    var tmp2 = new Array();
    get = new Array();

    var url = location.search;
    if(url != '') {
        tmp = (url.substr(1)).split('&');
        for(var i=0; i < tmp.length; i++) {
            tmp2 = tmp[i].split('=');
            get[tmp2[0]] = tmp2[1];
        }
    }
}

Number.prototype.toCookTime = function(){
    var seconds = this;
    var minutes = Math.floor( (seconds / 60) - Math.floor(seconds/3600)*60 );
    var hours = Math.floor((seconds / 3600), 10);
    var hours_name = 'ч';
    var minutes_name = 'мин';

    if(hours > 0){
        return hours +''+ hours_name +' '+ minutes +''+ minutes_name+'';
    }else{
        return minutes +''+ minutes_name+'' ;
    }
};

function urldecode(str) {
    return decodeURIComponent((str+'').replace(/\+/g, '%20'));
}

function placeholder(el,text){
    el.blur(function(){
        if(this.value == '' || this.value==text){
            this.value = text;
            $(this).addClass('myPlaceHolder');
        }
    }).focus(function(){
        if(this.value == text){
            this.value = "";
        }
    }).blur();
    el.keydown(function(){
        $(this).removeClass('myPlaceHolder');
    });
}

function vote( container, element, el_class, hover_class ){

    /*
        container - контейнер
        element - элемент
        el_class - класс элемента
        hover_class - класс ховера
    */

    $(''+container+'').on(
        'click',
        ''+element+'',
        function(){
            $(this).addClass(''+el_class+'');
            for( i = 0; i < $(this).index(); i++){
                $(' '+container+' '+element+'').eq(i).addClass(''+el_class+'');
            }
            for( j = $(this).index() + 1; j < $(' '+container+' '+element+'').size(); j++){
                $(' '+container+' '+element+'').eq(j).removeClass(''+el_class+'');
            }
        }
    );

    $(''+container+'').on(
        'mouseover',
        ''+element+'',
        function(){
            $(this).addClass(''+hover_class+'');
            for( i = 0; i < $(this).index(); i++){
                $(' '+container+' '+element+'').eq(i).addClass(''+hover_class+'');
            }
            for( j = $(this).index() + 1; j < $(' '+container+' '+element+'').size(); j++){
                $(' '+container+' '+element+'').eq(j).removeClass(''+hover_class+'');
            }
        }
    );

    $(''+container+'').on(
        'mouseout',
        ''+element+'',
        function(){
            $(' '+container+' '+element+'').removeClass(''+hover_class+'');
        }
    );

    $(''+container+'').on(
        'dblclick',
        'div',
        function(){
            $(' '+container+'  '+element+'').removeClass(''+el_class+'');
        }
    );
}

