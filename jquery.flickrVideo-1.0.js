/**
 * Flickr Video Plugin
 * @author Darcy Clarke
 *
 * Copyright (c) 2012 Darcy Clarke
 * Dual licensed under the MIT and GPL licenses.
 * http://darcyclarke.me/
 */

(function($){
    $.fn.flickrVideo = function(options){
        var settings = $.extend({ 
            url : '',
            height :  400,
            width : 600,
            bgcolor : '#000000',
            key : '',
            secret : ''
            }, options),
            id,
            method = 'flickr.photos.getInfo',
            format = 'json',
            collection = this,
            embed = false;
        id = settings.url.match(/\/photos\/(.*)/)[1].split('/')[1];
        $.ajax({
            url: 'http://www.flickr.com/services/rest/?method='+method+'&format='+format+'&api_key='+settings.key,
            dataType: 'jsonp',
            data: {'photo_id':id},
            type: 'GET',
            jsonpCallback: 'jsonFlickrApi',
            success: function(data){
                if(data.photo.media === 'video'){
                    collection.each(function(){
                        $(this).append('<object type="application/x-shockwave-flash" width="'+settings.width+'" height="'+settings.height+'" data="http://www.flickr.com/apps/video/stewart.swf?v=49235" classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"><param name="flashvars" value="intl_lang=en-us&amp;photo_secret='+data.photo.secret+'&amp;photo_id='+id+'"><param name="movie" value="http://www.flickr.com/apps/video/stewart.swf?v=49235"><param name="bgcolor" value="'+settings.bgcolor+'"><param name="allowFullScreen" value="true"><embed type="application/x-shockwave-flash" src="http://www.flickr.com/apps/video/stewart.swf?v=49235" bgcolor="'+settings.bgcolor+'" allowfullscreen="true" flashvars="intl_lang=en-us&amp;photo_secret='+data.photo.secret+'&amp;photo_id='+id+'" height="'+settings.height+'" width="'+settings.width+'"></object>');
                    });
                }
            }
        });
        return collection;
    };
 })(jQuery);