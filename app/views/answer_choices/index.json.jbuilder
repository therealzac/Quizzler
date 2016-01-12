json.array! @answer_choices do |answer_choice|
  question = answer_choice.question
  json.question_id question.id

  if answer_choice.answer_id == question.correct_answer_id || answer_choice.answer_text == question.correct_answer.text
    json.is_correct true
    # json.correct_answer_id @answer_choice.question.correct_answer_id
    json.correct_answer question.correct_answer
    json.explanation question.explanation

    json.answers question.answers do |answer|
      json.id answer.id
    end
  else
    json.is_correct false
    # json.correct_answer_id @answer_choice.question.correct_answer_id
    json.correct_answer question.correct_answer
    json.explanation question.explanation

    json.answers question.answers do |answer|
      json.id answer.id
    end
  end
end
