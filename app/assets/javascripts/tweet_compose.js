$.TweetCompose = function(el) {
  this.$el = $(el);
  this.$inputs = this.$el.find(":input");
  this.$el.on('submit', this.submit.bind(this));
  this.$el.on('input', 'textarea', this.charsRemaining.bind(this));
};

$.TweetCompose.prototype = {
  submit: function (event) {
    event.preventDefault();
    $.ajax({
      url: '/tweets',
      type: 'POST',
      dataType: 'json',
      data: this.$el.serialize(),
      success: function(response) {
        this.handleSuccess(response);
      }.bind(this)
    });

    this.$inputs.prop("disabled", true);
  },

  charsRemaining: function(event) {
    var remaining = 140 - $(event.currentTarget).val().length;
    this.$el.find('.chars-left').text(remaining);
  },

  clearInput: function() {
    this.$inputs.val("");
  },

  handleSuccess: function(response) {
    this.clearInput();
    this.$inputs.prop("disabled", false);
    var $li = $('<li>');
    $li.append(JSON.stringify(response));
    var id = this.$el.data('tweets-ul');
    $(id).append($li);
  }
};

$.fn.tweetCompose = function () {
  return this.each(function () {
    new $.TweetCompose(this);
  });
};
