class CreateQuestions < ActiveRecord::Migration
  def change
    create_table :questions do |t|
      t.string :type
      t.integer :quiz_id
      t.string :text
      t.integer :correct_answer_id
      t.text :explanation

      t.timestamps null: false
    end
    add_index :questions, :quiz_id
    add_index :questions, :correct_answer_id
  end
end
