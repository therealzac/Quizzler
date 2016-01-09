class UserQuiz < ActiveRecord::Base
  validates :user_id, :quiz_id, presence: true
  validates :user_id, uniqueness: { scope: [:quiz_id] }

  belongs_to :user
  belongs_to :quiz
end
