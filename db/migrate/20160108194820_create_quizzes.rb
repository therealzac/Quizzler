class CreateQuizzes < ActiveRecord::Migration
  def change
    create_table :quizzes do |t|
      t.string :title
      t.string :day
      t.integer :max_time

      t.timestamps null: false
    end
  end
end
