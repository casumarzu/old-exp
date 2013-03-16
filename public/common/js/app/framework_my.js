function paginator ( all_pages, page_number, count_visible_pages ){

                $('.paginator').append('<span class="paging_all"></span>');
                $('.paging_all').before('<a class="prev_page">prev</a>');
                $('.paging_all').after('<a class="next_page">next</a>');
                $('.paginator').append('<input class="total_ideas" style="display: none" value="'+all_pages+'">');

                paginator_wrap = $('.paging_all');

                paginator_wrap.html('');

                all_paging_wrap = $('.paginator');

                total_pages = all_pages;

                if(total_pages <= 1){
                    $('.paginator .next_page, .paginator .prev_page, .paginator .paging_all').hide();
                }else{
                    $('.paginator .next_page, .paginator .prev_page, .paginator .paging_all').css('display','inline');
                }

                if( total_pages == 0 )total_pages = 1;

                if( total_pages < count_visible_pages )middle_page = count_visible_pages;

                if( total_pages >= count_visible_pages )middle_page = count_visible_pages;

                if( page_number < middle_page ) start_page = 1;

                else if( total_pages - page_number < middle_page ) start_page = total_pages - count_visible_pages + 1;

                else start_page = page_number - middle_page + 1;

                if( total_pages < count_visible_pages ) count_pages = total_pages;

                else count_pages = count_visible_pages;

                paginator_wrap.attr('total_ideas', total_pages);

                for(f = 0 ; f < count_pages; f++){
                    paginator_wrap.append('<a page="' + (start_page + f) + '" href="#" class="pagin_number" >' + (start_page + f) + '</a>');
                }

                paginator_wrap.find('a[page="' + page_number + '"]').addClass('current');


                 

                $('.paginator .prev_page').bind('click',function(){
                    if( page_number > 1 ){
                        page_number = page_number - 1;
                        ideas();
                    }
                });

                $('.paginator .next_page').bind('click',function(){
                    if(page_number < all_pages){
                        page_number = page_number + 1;
                        ideas();
                    }
                });


            }


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
// Обработка GET-запросов
    var tmp = new Array();    // два вспомогательных
    var tmp2 = new Array();  // массива
    get = new Array();

    var url = location.search;    // строка GET запроса
    if(url != '') {
        tmp = (url.substr(1)).split('&');   // разделяем переменные
        for(var i=0; i < tmp.length; i++) {
            tmp2 = tmp[i].split('=');     // массив param будет содержать
            get[tmp2[0]] = tmp2[1];       // пары ключ(имя переменной)->значение
        }
    }
}

Number.prototype.toCookTime = function(){

    var seconds = this;
    var minutes = Math.floor( (seconds / 60) - Math.floor(seconds/3600)*60 );
    var hours = Math.floor((seconds / 3600), 10);
    var hours_name = plural_str(hours, "час","часа","часов");
    var minutes_name = plural_str(minutes, "минута","минуты","минут");

    if(hours > 0){
        return hours +' '+ hours_name +' '+ minutes +' '+ minutes_name+'';
    }else{
        return minutes +' '+ minutes_name+'' ;
    }
};


    function preload(arrayOfImages) {
            var preload_counter = 0;
            var total_counter = arrayOfImages.length;
            var preload_counter_text = $('#preloader_text')

            $(arrayOfImages).each(function(){
                //$('<img/>')[0].src = this;
                // Alternatively you could use:
                // (new Image()).src = this;
                $.get(this, function() {
                    preload_counter++;

                    preload_counter_text.text(parseInt(preload_counter * 100 / total_counter));

                    if( preload_counter == total_counter ) {
                        $('.preloader').hide(0, function(){
                            $('.main_page_day_idea, .main_day_question, .main_page_galery, .main_page_most_ideable, .main_page_whats_new').fadeIn(1000);
                        });
                        $('.main_page_whats_new_content').mCustomScrollbar('update');
                    }
                });
            });

        }


        // preload([
        //         'common/img/about_benefit_button_bg.png',
        //         'common/img/active_contests_arrow_bg.png',
        //         'common/img/active_contests_button_bg.png',
        //         'common/img/search_for_recipes_videorecipes_right.jpg'
        // ]);