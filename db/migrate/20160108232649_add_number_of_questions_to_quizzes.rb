class AddNumberOfQuestionsToQuizzes < ActiveRecord::Migration
  def change
    add_column :quizzes, :number_of_questions, :integer, null: false
  end
end
