class CreateAnswerChoices < ActiveRecord::Migration
  def change
    create_table :answer_choices do |t|
      t.integer :user_id
      t.integer :answer_id

      t.timestamps null: false
    end
    add_index :answer_choices, :user_id
    add_index :answer_choices, :answer_id
  end
end
