class AnswerChoicesController < ApplicationController

    def create
      # debugger
      @answer_choice = AnswerChoice.new(answer_choice_params)
      @question = @answer_choice.question
      @question = Question.find(params[:question_id])
      # debugger

      if @answer_choice.save
        if @answer_choice.answer_id == @question.correct_answer_id || @answer_choice.answer_text == @question.correct_answer.text
          render :correct_answer
        else
          render :incorrect_answer
        end
      else
        render json: @answer_choice.errors.full_messages, status: 422
      end
    end


    private

    def answer_choice_params
      params.require(:answer_choice).permit(
        :user_id, :answer_id, :answer_text
      )
    end


end
