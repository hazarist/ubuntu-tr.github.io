(function($) {
  $.extend({
    jGFeed: function(url, fnk, num, key) {
      // Make sure url to get is defined
      if (url == null) return false;
      // Build Google Feed API URL
      var gurl = "//ajax.googleapis.com/ajax/services/feed/load?v=1.0&callback=?&q=" + url;
      if (num != null) gurl += "&num=" + num;
      if (key != null) gurl += "&key=" + key;
      // AJAX request the API
      $.getJSON(gurl, function(data) {
        if (typeof fnk == 'function')
          fnk.call(this, data.responseData.feed);
        else
          return false;
      });
    }
  });
})(jQuery);

$.jGFeed('https://forum.ubuntu-tr.net/index.php?action=.xml;type=rss', function(feeds) {
  if (!feeds) {
    return false;
  }
  $.each(feeds.entries, function(index, value) {
    $('#rssForum').append('<li><a href="'+value.link+'" class="baslik">'+value.title+'</a></li>');
  });
}, 5);

$( document ).ready(function() {
  if(window.innerWidth < 500) {
    $('label[for=g0], label[for=g1]').css('display', 'none');
    $('label[for=g2]').click();
  }
});