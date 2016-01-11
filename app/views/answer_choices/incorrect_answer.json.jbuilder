json.is_correct false
json.correct_answer_id @answer_choice.question.correct_answer_id
json.correct_answer @answer_choice.question.correct_answer
json.explanation @answer_choice.question.explanation

json.answers @answer_choice.question.answers do |answer|
  json.id answer.id
end
