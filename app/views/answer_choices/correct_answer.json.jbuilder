json.is_correct true
# json.correct_answer_id @answer_choice.question.correct_answer_id
json.correct_answer @question.correct_answer
json.explanation @question.explanation

json.selected_answer_id @answer_choice.answer_id

json.answers @question.answers do |answer|
  json.id answer.id
end
