class Answer < ActiveRecord::Base
  validates :text, :question_id, presence: true

  belongs_to :question
  has_many :answer_choices
end
