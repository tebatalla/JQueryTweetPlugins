$.FollowToggle = function (el) {
  this.$el = $(el);
  this.userId = this.$el.data("user-id");
  this.followState = this.$el.data("initial-follow-state");
  this.render();
  this.$el.on('click', this.handleClick.bind(this));
};

$.FollowToggle.prototype = {
  render: function () {
    if (this.followState === "unfollowed") {
      return this.$el.html("Follow!").prop("disabled", false);
    } else if (this.followState === "followed") {
      return this.$el.html("Unfollow!").prop("disabled", false);
    } else if (this.followState === "following") {
      return this.$el.html("Following....").prop("disabled", true);
    } else if (this.followState === "unfollowing") {
      return this.$el.html("Unfollowing....").prop("disabled", true);
    }
  },

  handleClick: function (event) {
    event.preventDefault();
    var url = '/users/' + this.userId + '/follow';
    var options = {
      url: url,
      type: this.followState === "followed" ? "DELETE" : "POST",
      dataType: 'json',
      success: function(response) {
        if (this.followState === "unfollowing") {
          this.followState = "unfollowed";
        } else if (this.followState === "following") {
          this.followState = "followed";
        }
        this.render();
      }.bind(this)
    };

    if (this.followState === "followed" || this.followState === "unfollowed") {
      $.ajax(options);
    }

    if (this.followState === "followed") {
      this.followState = 'unfollowing';
      this.render();
    }
    else if (this.followState === "unfollowed") {
      this.followState = 'following';
      this.render();
    }

  }
};

$.fn.followToggle = function () {
  return this.each(function () {
    new $.FollowToggle(this);
  });
};

$(function () {
  $("button.follow-toggle").followToggle();
});
