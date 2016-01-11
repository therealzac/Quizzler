class AnswerChoicesController < ApplicationController

    def create
      @answer_choice = AnswerChoice.new(answer_choice_params)
      @question = @answer_choice.question

      if @answer_choice.save
        if @answer_choice.answer_id == @question.correct_answer_id
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
        :user_id, :answer_id
      )
    end


end
