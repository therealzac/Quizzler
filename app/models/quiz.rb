class Quiz < ActiveRecord::Base
  validates :title, :day, :number_of_questions, presence: true

  has_many :questions
  has_many :user_quizzes
  has_many :users, through: :user_quizzes
end
