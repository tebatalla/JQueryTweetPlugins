$.TweetCompose = function(el) {
  this.$el = $(el);
  this.$inputs = this.$el.find(":input");
  this.$el.on('submit', this.submit.bind(this));
  this.$el.on('input', 'textarea', this.charsRemaining.bind(this));
  this.$el.on('click', '.add-mentioned-user', this.addMentionedUser.bind(this));
  this.$el.on('click', '.remove-mentioned-user', this.removeMentionedUser.bind(this));
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

  removeMentionedUser: function(event) {
    $(event.currentTarget).parent().remove();
  },

  addMentionedUser: function(event) {
    var $template = $('#template');
    var $div = $('.mentioned-users');
    $div.append($template.html());
  },

  charsRemaining: function(event) {
    var remaining = 140 - $(event.currentTarget).val().length;
    this.$el.find('.chars-left').text(remaining);
  },

  clearInput: function() {
    this.$inputs.val("");
    this.$el.find('.mentioned-users').empty();
  },

  handleSuccess: function(response) {
    this.clearInput();
    this.$inputs.prop("disabled", false);
    var $li = $('<li>');
    $li.append(JSON.stringify(response));
    var id = this.$el.data('tweets-ul');
    $(id).prepend($li);
  }
};

$.fn.tweetCompose = function () {
  return this.each(function () {
    new $.TweetCompose(this);
  });
};
