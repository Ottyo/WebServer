$(document).ready(function () {
        var item = null;
        var timer = null;
        var current_video = null;
        var old_load_more = parseInt(limit_index);
        var new_load_more = parseInt(limit_index);
        var url_load_more_change = url_load_more;
        var counter_load_more = 1;


        $('#loadmore').click(function() {
                url_load_more_change = url_load_more_change.replace(old_load_more.toString(), new_load_more.toString());
                $.get(url_load_more_change, function(data) {
                    if (data.HTTPRESPONSE == "0") {
                        var result = jQuery.parseJSON(data.search_list);
                        var container_search = $('#innersearch');
                        container_search.append('<div id="search-' + counter_load_more + '" class="columns">');
                        for (var i = 0; i < result.length; i++) {
                            if (result[i].fields.type == 1) {
                                var bloc_img = '<div class="image fit lightboxparent">' +
                                '<a id="' + result[i].pk + '" href="' + result[i].fields.url_lq + '">' +
                                '<img src="' + result[i].fields.url_lq + '" alt="" >' +
                                '</a>' +
                                '</div>';
                                $('#search-' + counter_load_more).append(bloc_img);
                            }
                            if (result[i].fields.type == 2) {
                                if (result[i].fields.ext == '.mp4')
                                    codec = 'codecs=avc1.42E01E, mp4a.40.2';
                                else
                                    codec = 'codecs=&quot;vp8, vorbis&quot;';
                                bloc_ani = '<div class="image fit lightboxparent">' +
                                '<a id="' + result[i].pk + '" name="currentpk" class="type-video" href="' + result[i].fields.url + '">' +
                                '<video class="videomm" poster="' + result[i].fields.poster + '" preload="none">' +
                                '<source src="' + result[i].fields.url + '" type="video/' + result[i].fields.ext.substring(1, result[i].fields.ext.length) + ';' + codec + '">' +
                                '</video>' +
                                '</a>' +
                                '</div>';
                                $('.grid').append(bloc_ani);
                            }
                        }
                        container_search.append('</div>');
                        counter_load_more += 1;
                        old_load_more = new_load_more;
                        new_load_more = old_load_more + parseInt(range);
                    }
                });
        });
    });