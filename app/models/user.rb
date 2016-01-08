class User < ActiveRecord::Base
  validates :name, :unique_identifier, presence: true
  validates :unique_identifier, uniqueness: true

  has_many :user_quizzes
  has_many :answer_choices
  has_many :quizzes_taken,
    through: :user_quizzes,
    source: :quiz
end
