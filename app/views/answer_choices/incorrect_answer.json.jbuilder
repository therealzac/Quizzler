json.is_correct false
# json.correct_answer_id @answer_choice.question.correct_answer_id
json.correct_answer @question.correct_answer
json.explanation @question.explanation

json.answers @question.answers do |answer|
  json.id answer.id
end
