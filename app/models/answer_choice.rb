class AnswerChoice < ActiveRecord::Base
  validates :user_id, presence: true
  validates :user_id, uniqueness: { scope: [:answer_id] }

  belongs_to :user
  belongs_to :answer
  has_one :question, through: :answer
  has_one :quiz, through: :question
end
