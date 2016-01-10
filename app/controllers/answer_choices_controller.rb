class AnswerChoicesController < ApplicationController


    def create
      @answer_choice = Quiz.new(answer_choice_params)


      if @answer_choice.save
        render :return_answer
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
