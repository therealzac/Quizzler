class Question < ActiveRecord::Base
  validates :question_type, :quiz_id, :text, :correct_answer_id, :explanation, presence: true

  has_many :answers
  belongs_to :quiz
  belongs_to :correct_answer,
    class_name: "Answer",
    foreign_key: :correct_answer_id,
    primary_key: :id
end
