class Question < ActiveRecord::Base
  # validation on correct_answer_id was removed in order to make
  # creating questions possible   :correct_answer_id,
  validates :question_type, :quiz_id, :text, :explanation, presence: true

  has_many :answers
  belongs_to :quiz
  belongs_to :correct_answer,
    class_name: "Answer",
    foreign_key: :correct_answer_id,
    primary_key: :id
end
