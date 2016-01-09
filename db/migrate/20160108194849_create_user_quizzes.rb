class CreateUserQuizzes < ActiveRecord::Migration
  def change
    create_table :user_quizzes do |t|
      t.integer :user_id
      t.integer :quiz_id
      t.date :finished_time

      t.timestamps null: false
    end
  end
end
