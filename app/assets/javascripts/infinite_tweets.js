$.InfiniteTweets = function(el) {
  this.$el = $(el);
  this.$el.on('click', '.fetch-more', this.fetchTweets.bind(this));
  this.maxCreatedAt = null;
  this.$tweetTemplate = this.$el.find('script');
};

$.InfiniteTweets.prototype = {
  fetchTweets: function(event) {
    var data = {};
    if (this.maxCreatedAt != null) {
       data.max_created_at = this.maxCreatedAt;
    }
    $.ajax({
      url: '/feed',
      dataType: 'json',
      data: data,
      type: 'GET',
      success: function (response) {
        this.insertTweets(response);
        this.maxCreatedAt = response[response.length - 1].created_at;
        if (response.length < 20) {
          this.$el.find('.fetch-more').replaceWith('<h2 class="no-more-tweets">No more tweets</h2>');
        }
      }.bind(this)
    });
  },

  insertTweets: function(response) {
    var tweets = response;
    var compiledFn = _.template(this.$tweetTemplate.html());
    var rendered = compiledFn({ tweets: tweets });
    this.$el.find('#feed').append(rendered);
  }
};

$.fn.infiniteTweets = function () {
  return this.each(function () {
    new $.InfiniteTweets(this);
  });
};
