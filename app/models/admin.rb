class Admin < ActiveRecord::Base
  validates: :email, :password_digest, :session_token, presence: true
  validates: :email, uniqueness: true

end
