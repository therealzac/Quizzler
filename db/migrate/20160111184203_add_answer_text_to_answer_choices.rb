class AddAnswerTextToAnswerChoices < ActiveRecord::Migration
  def change
    add_column :answer_choices, :answer_text, :string
  end
end
