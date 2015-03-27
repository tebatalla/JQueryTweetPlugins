module ApplicationHelper
  def follows(user)
    current_user.follows?(user) ? "followed" : "unfollowed"
  end
end
