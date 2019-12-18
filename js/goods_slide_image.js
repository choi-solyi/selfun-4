//設定事項-------------------------------------------------
//------------------------------------------------------

var active_img_num = 0 ; //最初に表示する画像番号(0スタート)
var slide_interval_time = 5 ; //スライドする間隔(単位：秒)
var slide_during_time = 0.5 ; //スライドするのにかかる時間(単位：秒)
var slide_fast_during_time = 0 ; //連続してスライドする時にかかる時間(単位：秒/枚)

//------------------------------------------------------
//------------------------------------------------------

//懸念事項：現在、5枚以上のみ対応



var slide_timer;
var num_of_img = 1 ; //画像の数(仮の値)
var num_of_img_tag = 1 ; //スライド内に挿入された画像の数(仮の値)
var sliding_now = false ; //更新中フラグ


//ページ読み込み時
$
(
    function()
    {

        //画像の読み込み


        $.getJSON("data/goods_slide_image.json").done
        (
            function(data)
            {
                //データを取得したら実行する

                var div_tag , a_tag , img;

                while ( $(".slider_img_wrapper").length < 5 )
                {
                    //画像が5枚以上になるまで繰り返す

                    for ( var i = 0 ; i < data["images"].length ; i++ )
                    {
                        //画像を入れる要素を作成

                        div_tag = $( "<div></div>" )
                        .addClass("slider_img_wrapper")
                        .appendTo(".slider") ;

                        a_tag = $( "<a></a>" )
                        .attr("href",data["images"][i]["href"])
                        .appendTo(div_tag) ;

                        img = $( "<img>" )
                        .attr("src",data["images"][i]["file_name"])
                        .attr("alt",data["images"][i]["alt"])
                        .appendTo(a_tag) ;
                    }
                }


                //画像の数を取得
                num_of_img_tag = $(".slider_img_wrapper").length
                num_of_img = data["images"].length ;
                active_img_num = adjust_img_num( active_img_num )["img_tags"] ;

                //最初の画像を表示する

                for ( var i = 0 ; i < num_of_img_tag ; i++ )
                {
                    $(".slider_img_wrapper").eq( adjust_img_num( active_img_num + ( Math.pow( -1 , i + 1 ) ) * Math.ceil( i / 2 )  )["img_tags"] ).css( "opacity" , 1 ) ;
                    $(".slider_img_wrapper").eq( adjust_img_num( active_img_num + ( Math.pow( -1 , i + 1 ) ) * Math.ceil( i / 2 )  )["img_tags"] ).css( "transform" , "translateX(" + ( 100 * Math.pow( -1 , i + 1 ) * Math.ceil( i / 2 ) ) + "%)" ) ;
                }


                //次の画像番号をセット
                next_img_num = adjust_img_num( active_img_num + 1 )["img_tags"] ;

                //定期的にスライドするようにタイマーを設定
//                slide_timer = setInterval( slide , slide_interval_time * 1000 ) ;

                //次へ・戻るボタンを表示

                $( "<div>＞</div>" )
                .addClass("slider_btn")
                .addClass("next_btn")
                .appendTo(".slider_objects") ;

                $( "<div>＜</div>" )
                .addClass("slider_btn")
                .addClass("prev_btn")
                .appendTo(".slider_objects") ;

                $( "<ul></ul>" )
                .addClass("slider_list_wrapper")
                .appendTo(".slider_objects") ;

                //スライドリストの書き出し

                for ( var i = 0 ; i < num_of_img ; i++ )
                {
                    $( "<li></li>" )
                    .addClass("slider_list")
                    .appendTo(".slider_list_wrapper") ;
                }


                //cssの追加設定

                $(".slider_list_wrapper li").removeClass("active_slide") ;
                $(".slider_list_wrapper li").eq( active_img_num ).addClass("active_slide") ;

                $(".slider_list").css( "transition" , slide_during_time + "s" ) ;



            }
        )



    }
) ;



//画像番号の調整

function adjust_img_num( img_num )
{

    var result = [] ;

    if ( !$.isNumeric(img_num) )
    {
        //非数の場合
        result["images"] = 0 ; //画像の数
        result["img_tags"] = 0 ; //挿入されたタグの数
    }
    else if ( img_num < 0 )
    {
        //マイナスの場合
        result["images"] = ( num_of_img + ( img_num % num_of_img )) % num_of_img ; //画像の数
        result["img_tags"] = ( num_of_img_tag + ( img_num % num_of_img_tag )) % num_of_img_tag ; //挿入されたタグの数
    }
    else
    {
        //要素数より大きい場合は余りを代入する
        result["images"] = img_num % num_of_img ; //画像の数
        result["img_tags"] = img_num % num_of_img_tag ; //挿入されたタグの数
    }

    return result ;
}



//スライド方向の調査


function search_direction( now_positon = 0 , goal_position = 0 )
{
    var i = 0 ;
    while ( true )
    {
        if ( ( goal_position % num_of_img ) == adjust_img_num(now_positon + i)["images"] )
        {
            return {
                "plus" : true ,
                "target_num" : adjust_img_num(now_positon + i)["img_tags"] ,
                "move_value" : i
            } ;
        }
        else if ( ( goal_position % num_of_img ) == adjust_img_num(now_positon - i)["images"] )
        {
            return {
                "plus" : false ,
                "target_num" : adjust_img_num(now_positon - i)["img_tags"] ,
                "move_value" : -i
            } ;
        }
        i++ ;
    }

}



//スライドする

function slide( next_img = next_img_num , duration = slide_during_time , easing = "easeInOutCubic" )
{
    $
    (
        function()
        {

            next_img = adjust_img_num( next_img )["img_tags"] ;

            if ( sliding_now )
            {
                //スライド中は新規に処理を受け付けない
                return ;
            }
            else
            {
                //スライド中判定にする
                sliding_now = true ;
            }

            //スライド先画像の情報を得る
            var target_img_info = search_direction( active_img_num , next_img ) ;

            if( Math.abs( target_img_info["move_value"] ) >= 2 )
            {
                //2枚以上スライドする時
                move_images( active_img_num + ( target_img_info["plus"] ? 1 : -1 ) , next_img , slide_fast_during_time , "linear" ) ;
            }
            else
            {
                //1枚だけスライドする時
                move_images( next_img , next_img , duration , easing ) ;
            }

            function move_images( next_img , target_img = next_img , duration = slide_during_time , easing = "swing" )
            {

                var translateX_matrix = [] ;
                $(".slider_img_wrapper").css("transition", duration + "s");



                for ( var i = 0 ; i < num_of_img_tag ; i++ )
                {
                    translateX_matrix = $(".slider_img_wrapper").eq(i).css("transform").slice(7,-1).split(",") ;
                    translateX_matrix[4] = parseInt( translateX_matrix[4] ) - ( target_img_info["move_value"] ) * parseInt($(".slider_img_wrapper").css("width")) ;
                    $(".slider_img_wrapper").eq(i).css("transform", "matrix(" + translateX_matrix.join(",") + ")" ).css("left","0%");
                }

                $(".slider_list_wrapper li").removeClass("active_slide") ;
                $(".slider_list_wrapper li").eq( target_img % num_of_img ).addClass("active_slide") ;


                setTimeout
                (
                    function()
                    {
                        active_img_num = adjust_img_num( target_img )["img_tags"] ; //今の画像番号をセット
                        next_img_num = adjust_img_num( target_img + 1 )["img_tags"] ; //次の画像番号をセット
                        $(".slider_img_wrapper").css("transition","0s");

                        for ( var i = 0 ; i < num_of_img_tag ; i++ )
                        {
                            $(".slider_img_wrapper").eq( adjust_img_num( active_img_num + Math.pow( -1 , i + 1 ) * Math.ceil( i / 2 ) )["img_tags"] ).css( "opacity" , 1 ) ;
                            $(".slider_img_wrapper").eq( adjust_img_num( active_img_num + Math.pow( -1 , i + 1 ) * Math.ceil( i / 2 ) )["img_tags"] ).css( "transform" , "translateX(" + ( 100 * Math.pow( -1 , i + 1 ) * Math.ceil( i / 2 ) ) + "%)" ) ;
                        }
                        sliding_now = false ;
                    } ,
                    duration * 1000
                ) ;

//                clearInterval( slide_timer ) ;
//                slide_timer = setInterval( slide , slide_interval_time * 1000 ) ;

            }
        }
    ) ;
}


//戻るボタンを押した時のイベント

$(".slider_objects").on
(
    "click touchend",
    ".prev_btn",
    function()
    {
        clearInterval( slide_timer ) ;
//        slide_timer = setInterval( slide , slide_interval_time * 1000 ) ;
        slide( adjust_img_num( active_img_num - 1 )["img_tags"] ) ;
    }
) ;

//次へボタンを押した時のイベント

$(".slider_objects").on
(
    "click touchend",
    ".next_btn",
    function()
    {
        clearInterval( slide_timer ) ;
//        slide_timer = setInterval( slide , slide_interval_time * 1000 ) ;
        slide( adjust_img_num( active_img_num + 1 )["img_tags"] ) ;
    }
) ;

//スライドリストが押された時の処理

$(document).on
(
    "click touchend",
    ".slider_list",
    function()
    {
        var clicked_num = $(".slider_list").index(this);
        clicked_num = search_direction( active_img_num , clicked_num )["target_num"] ;
        slide( clicked_num ) ;
    }
) ;

//スワイプ時の処理

//スワイプ開始時

document.addEventListener
(
    'touchstart',
    function(event)
    {
        if ( sliding_now )
        {
            return ;
        }
        event.preventDefault();
        touch_x1 = event.changedTouches[0].pageX ;
        move_x_percent = 0 ;
//        clearInterval( slide_timer ) ;
    } ,
    {
        passive : false
    }
) ;

//スワイプ中


document.addEventListener
(
    'touchmove',
    function(event)
    {
        if ( sliding_now )
        {
            return ;
        }
        event.preventDefault();
        touch_x2 = event.changedTouches[0].pageX ;

        //15px以上動いた時だけ反応する

        move_x_percent = (touch_x1 - touch_x2) / window.innerWidth * 100 ;

        if (false)
        {
            /* 　　前の画像 */ $(".slider_img_wrapper").eq( adjust_img_num( active_img_num - 1 )["img_tags"] ).css("left",( - move_x_percent - 100 ) + "%") ;
            /* 　　今の画像 */ $(".slider_img_wrapper").eq( active_img_num ).css("left",( - move_x_percent ) + "%") ;
            /* 　　次の画像 */ $(".slider_img_wrapper").eq( adjust_img_num( active_img_num + 1 )["img_tags"] ).css("left",( - move_x_percent + 100 ) + "%") ;
        }

        for ( var i = 0 ; i < num_of_img_tag ; i++ )
        {
            $(".slider_img_wrapper").css("left",( - move_x_percent ) + "%") ;
        }

        if ( Math.abs(move_x_percent) >= 75 )
        {
            if ( touch_x1 - touch_x2 > 0 )
            {
                //左にスライド
                slide( active_img_num + 1 , slide_fast_during_time , "easeOutQuart" ) ;
            }
            else
            {
                //右にスライド
                slide( active_img_num - 1 , slide_fast_during_time , "easeOutQuart" ) ;
            }
            touch_x1 = touch_x2 ; //現在タッチしている部分を開始地点にする
        }



    } ,
    {
        passive : false
    }
) ;

//スワイプ終了時

document.addEventListener
(
    'touchend',
    function(event)
    {
        if ( sliding_now )
        {
            return ;
        }
        event.preventDefault();
        touch_x3 = event.changedTouches[0].pageX ;

        //ある程度動いた時だけスライドする

        if ( Math.abs(move_x_percent) > 30 )
        {
            if ( touch_x1 - touch_x2 > 0 )
            {
                //左にスライド
                slide( active_img_num + 1 , slide_fast_during_time , "easeOutQuart" ) ;
            }
            else
            {
                //右にスライド
                slide( active_img_num - 1 , slide_fast_during_time , "easeOutQuart" ) ;
            }
        }
        else
        {
            //元の画像にスライド
            slide( active_img_num , slide_fast_during_time , "easeOutQuart" ) ;
        }

        move_x_percent = 0 ;

    } ,
    {
        passive : false
    }
) ;
