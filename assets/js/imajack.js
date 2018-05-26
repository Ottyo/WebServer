var isMobile = false; //initiate as false
// device detection
if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0, 4))) isMobile = true;

$(window).load(function() {
  if (isMobile) {
    $('video').remove();
    $("#preload").delay(350).fadeOut(600);
  } else {
    var vid = $('.thevideo');
    var i = 0;
    //  console.log(vid.length);
    vid.each(function() {
      this.load();
      this.oncanplay = function() {
        i++;
        if (i >= vid.length) {
          $('#main_logo').addClass('loaded');
          $('.spinner').fadeOut(500);
          $("#preload").delay(650).fadeOut(750);

        }
        // $("#preload").fadeOut(600);
        // console.log("Can start playing video " + i);
      };
    });
  }
  var urlFilter = GetURLParameter('filter');
  if (urlFilter) {
    ScrolltoElement('#portfolio');
    $('.filter_options').val(urlFilter);
    disableOptions('.client_options');
    style = urlFilter;
    client = $('.client_options').val();
    filterVideos(style, client);
    disableOptions('.client_options', out_client);
  }
  var urlVideo = GetURLParameter('vid');
  if(urlVideo){
     $('#showreel').attr('src', 'https://player.vimeo.com/video/'+urlVideo+'?autoplay=1');
     $('#showreel').load();
 }
});

$(document).ready(function() {
  if (navigator.userAgent.toLowerCase().indexOf('firefox') > -1) {
    // Do Firefox-related activities
    $('#main_logo svg .circle').addClass('firefox_sa_mere');
  }

  $('.nav_panel').hover(function() {
    $('.nav_panel').not(this).toggleClass('iddle');
    $(this).toggleClass('nav_hover');
  });
  $('#toggle_menu').click(function() {
    $.scrollLock();
    $(this).toggleClass('menu_open');
    $('nav').toggleClass('nav_reveal');
    $('body').toggleClass('nav_open');
  });
  if (!isMobile) {
    $('footer .mail').hover(function() {
      $('footer li').not(this).hide();
    }, function() {
      $('footer li').not(this).show();
    });
  }

  var figure = $(".nav_panel").hover(hoverVideo, hideVideo);


  $('.portfolio_data').click(function() {
    var video_src = $(this).data('link');
    window.history.replaceState( {} , 'Imajack :: Des Vidéos', '/videos?vid='+$(this).parent().data('id') );
    console.log(video_src);
    $('html, body').animate({
      scrollTop: $('#id_259').offset().top
    }, 250);
    $('#showreel').attr('src', video_src);
    $('#showreel').load();
  });

  var portfolio_item = $('.video_item');
   portfolio_item.each(function() {
      var vimeoVideoID = $(this).data('id');
      // console.log(vimeoVideoID);
      $.getJSON('http://www.vimeo.com/api/v2/video/' + vimeoVideoID + '.json?callback=?', {format: "json"}, function(data) {
          var thumb = data[0].thumbnail_large;
         //  console.log(thumb);
         var vid_thumb = $('.'+vimeoVideoID+'_thumb');
         vid_thumb.attr("src", thumb);
      });
   });

  $('.bts .fancybox').fancybox({
    openEffect: 'fade',
    closeEffect: 'fade',
    prevEffect: 'fade',
    nextEffect: 'fade',
    padding: 0,
    arrows: true
  });

  $('.cyclimse').fancybox({
    maxWidth: 1920,
    maxHeight: 1080,
    fitToView: false,
    width: '90%',
    height: '90%',
    autoSize: false,
    padding: 0,
    helpers: {
      overlay: {
        css: {
          'background': 'rgba(0, 0, 0, 0.8)'
        }
      }
    }
  });
  $('.contact_infos .mail').click(function() {
    window.location.href = "mailto:info@imajack.ch";
  });


  var style = $('.filter_options');
  var client = $('.client_options');
  var out_client =   [];
  var out_styles =   [];
  style.change(function() {
    disableOptions('.client_options');
    style = $('.filter_options').val();
    client = $('.client_options').val();
    filterVideos(style, client);
    disableOptions('.client_options', out_client);
  });
  client.change(function() {
    disableOptions('.filter_options');
    style = $('.filter_options').val();
    client = $('.client_options').val();
    filterVideos(style, client);
    disableOptions('.filter_options', out_styles);
  });

  $('.clear').click(function() {
    disableOptions('.filter_options');
    disableOptions('.client_options');
    if (urlFilter) {
      // window.location.href = window.location.href.split("?")[0];
      window.history.replaceState( {} , 'Imajack :: Des Vidéos', '/videos' );
    }
    $('.filter_options option').prop('selected', function() {
      return this.defaultSelected;
    });
    $('.client_options option').prop('selected', function() {
      return this.defaultSelected;
    });
    $('.video_item').fadeIn(400);

  });

  var urlFilter = GetURLParameter('filter');
  if (urlFilter) {
    ScrolltoElement('#portfolio');
    $('.filter_options').val(urlFilter);
    disableOptions('.client_options');
    style = urlFilter;
    client = $('.client_options').val();
    filterVideos(style, client);
    disableOptions('.client_options', out_client);
  }



  var references = $('.references .carousel_container');

  $(references).slick({
    dots: true,
    arrows: false,
    infinite: true,
    speed: 300,
    autoplay: true,
    autoplaySpeed: 1500,
    swipeToSlide: true,
    rows: 3,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [{
      breakpoint: 1024,
      settings: {
        rows: 2,
        slidesToShow: 3,
        slidesToScroll: 1,
      }
    }, {
      breakpoint: 600,
      settings: {
        rows: 2,
        slidesToShow: 2,
        slidesToScroll: 1
      }
    }, {
      breakpoint: 480,
      settings: {
        rows: 2,
        slidesToShow: 2,
        slidesToScroll: 1
      }
    }]
  });


  // var carousel = $('.crea_carousel .carousel_container');
  // var isPaused = false;
  // carousel.children('.slide').hide();
  // carousel.children('.active').fadeIn(500);
  //
  //
  // setInterval(function() {
  //   if (!isPaused) {
  //     loop(carousel);
  //   }
  // }, 5000);
  //
  //
  //
  // $('.bullet').click(function(e) {
  //   isPaused = !isPaused;
  //   switchSlide(this);
  // });

  $.scrollLock = (function scrollLockClosure() {
    'use strict';

    var $html = $('html'),
      // State: unlocked by default
      locked = false,
      // State: scroll to revert to
      prevScroll = {
        scrollLeft: $(window).scrollLeft(),
        scrollTop: $(window).scrollTop()
      },
      // State: styles to revert to
      prevStyles = {},
      lockStyles = {
        'overflow-y': 'scroll',
        'position': 'fixed',
        'width': '100%'
      };

    // Instantiate cache in case someone tries to unlock before locking
    saveStyles();

    // Save context's inline styles in cache
    function saveStyles() {
      var styleAttr = $html.attr('style'),
        styleStrs = [],
        styleHash = {};

      if (!styleAttr) {
        return;
      }

      styleStrs = styleAttr.split(/;\s/);

      $.each(styleStrs, function serializeStyleProp(styleString) {
        if (!styleString) {
          return;
        }

        var keyValue = styleString.split(/\s:\s/);

        if (keyValue.length < 2) {
          return;
        }

        styleHash[keyValue[0]] = keyValue[1];
      });

      $.extend(prevStyles, styleHash);
    }

    function lock() {
      var appliedLock = {};

      // Duplicate execution will break DOM statefulness
      if (locked) {
        return;
      }

      // Save scroll state...
      prevScroll = {
        scrollLeft: $(window).scrollLeft(),
        scrollTop: $(window).scrollTop()
      };

      // ...and styles
      saveStyles();

      // Compose our applied CSS
      $.extend(appliedLock, lockStyles, {
        // And apply scroll state as styles
        'left': -prevScroll.scrollLeft + 'px',
        'top': -prevScroll.scrollTop + 'px'
      });

      // Then lock styles...
      $html.css(appliedLock);

      // ...and scroll state
      $(window)
        .scrollLeft(0)
        .scrollTop(0);

      locked = true;
    }

    function unlock() {
      // Duplicate execution will break DOM statefulness
      if (!locked) {
        return;
      }

      // Revert styles
      $html.attr('style', $('<x>').css(prevStyles).attr('style') || '');

      // Revert scroll values
      $(window)
        .scrollLeft(prevScroll.scrollLeft)
        .scrollTop(prevScroll.scrollTop);

      locked = false;
    }

    return function scrollLock(on) {
      // If an argument is passed, lock or unlock depending on truthiness
      if (arguments.length) {
        if (on) {
          lock();
        } else {
          unlock();
        }
      }
      // Otherwise, toggle
      else {
        if (locked) {
          unlock();
        } else {
          lock();
        }
      }
    };
  }());

});
function hoverVideo(e) {
  $('video', this).get(0).play();
}

function hideVideo(e) {
  $('video', this).get(0).pause();
}
function GetURLParameter(sParam) {
  var sPageURL = window.location.search.substring(1);
  var sURLVariables = sPageURL.split('&');
  for (var i = 0; i < sURLVariables.length; i++) {
    var sParameterName = sURLVariables[i].split('=');
    if (sParameterName[0] == sParam) {
      return sParameterName[1];
    }
  }
}
function disableOptions(list, params) {
  $(list + ' option').attr('disabled', false);
  if (params) {
    for (var i = 0; i < params.length; i++) {
      $(list + " option[value='" + params[i] + "']").attr('disabled', true);

    }
  }
  $("option[value='placeholder']").attr('disabled', true);
}

function ScrolltoElement(el) {
  $('html, body').animate({
    scrollTop: $(el).offset().top - 100
 }, 500);
}

function filterVideos(s, c) {
  out_styles = [];
  out_client = [];
  var effect = function(el) {
    return $(el).fadeOut(400);
  };
  var si = $('.video_item');
  if (s != 'placeholder' && s != 'all' && s != null) {
    si = si.filter('[data-style=' + s + ']');

  }
  if (c != 'placeholder' && c != 'all' && c != null) {
    si = si.filter('[data-client=' + c + ']');
  }
  var ri = $('.video_item').not(si);
  var rem_s = [];
  var rem_c = [];
  si.each(function() {
    rem_s.push($(this).data('style'));
    rem_c.push($(this).data('client'));
  });
  ri.each(function() {
    if ($(this).data('style') != s) {
      out_styles.push($(this).data('style'));

    }
    if ($(this).data('client') != c) {
      out_client.push($(this).data('client'));
    }
  });
  out_client = jQuery.unique(out_client);
  out_styles = jQuery.unique(out_styles);
  rem_s = jQuery.unique(rem_s);
  rem_c = jQuery.unique(rem_c);


  for (var i = 0; i < rem_s.length; i++) {
    out_styles = jQuery.grep(out_styles, function(value) {
      return value != rem_s[i];
    });
  }
  for (var i = 0; i < rem_c.length; i++) {
    out_client = jQuery.grep(out_client, function(value) {
      return value != rem_c[i];
    });
  }

  $.when(effect(ri)).done(function() {
    si.fadeIn(400, function() {});
  });
}
function loop(carousel) {
  carousel.each(function() {
    var items = carousel.children();
    var current = carousel.children('.active');
    if (current.data('slide') == 2) {
      var i = items.first();
    } else {
      var i = current.next();
    }
    switchSlide(i);
  });
}
function switchSlide(s) {
  var current = $('.carousel_container .active').data('slide');
  var next = $(s).data('slide');
  if (next != current) {
    $('.carousel_container .active').fadeOut(500, function() {
      $('.carousel_container *[data-slide="' + next + '"]').fadeIn(500).addClass('active');
    }).removeClass('active');
    $('.bullets *[data-slide="' + current + '"]').removeClass('active');
    $('.bullets *[data-slide="' + next + '"]').addClass('active');
  }
}
