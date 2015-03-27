$.UsersSearch = function(el) {
  this.$el = $(el);
  this.$input = this.$el.find('input');
  this.$ul = this.$el.find('ul');
  this.$input.on('input', this.handleInput.bind(this));
};

$.UsersSearch.prototype = {
  handleInput: function (event) {
    $.ajax({
      url: '/users/search',
      type: 'GET',
      dataType: 'json',
      data: {
        query: $(event.currentTarget).val()
      },
      success: function (response) {
        this.renderResults(response);
        console.log(response);
      }.bind(this)
    });
  },

  renderResults: function(response) {
    this.$ul.html("");
    for (var i = 0; i < response.length; i++) {
      var $li = $('<li>');
      var $a = $('<a href="/users/' + response[i].id + '">' + response[i].username + '</a>');
      var followState = (response[i].followed) ? "followed" : "unfollowed";
      var $button = $('<button class="follow-toggle" data-initial-follow-state="' + followState + '" data-user-id="' + response[i].id + '">');
      $button.followToggle();
      $li.append($a).append($button);
      this.$ul.append($li);
    }
  }
};

$.fn.usersSearch = function () {
  return this.each(function () {
    new $.UsersSearch(this);
  });
};

$(function () {
  $("div.users-search").usersSearch();
});
