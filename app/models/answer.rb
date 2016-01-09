class Answer < ActiveRecord::Base
  validates :text, :question_id, presence: true

  belongs_to :question
end
