class AnswerChoicesController < ApplicationController

    def create
      @answer_choice = AnswerChoice.new(answer_choice_params)
      @question = @answer_choice.question
      @question = Question.find(params[:question_id])

      if @answer_choice.save
        if @answer_choice.answer_id == @question.correct_answer_id
          render :correct_answer
        elsif @answer_choice.answer_text == @question.correct_answer.text
          @answer_choice.answer_id = @question.correct_answer.id
          @answer_choice.save
          render :correct_answer
        elsif @answer_choice.answer_id == nil
          db_answer = Answer.find_by(question_id: @question.id, text: "incorrect answer")
          @answer_choice.answer_id = db_answer.id
          @answer_choice.save
          render :incorrect_answer
        else
          render :incorrect_answer
        end
      else
        render json: @answer_choice.errors.full_messages, status: 422
      end
    end

    def index
      @answer_choices = AnswerChoice.where("user_id = ? AND created_at > ?", 1, Time.now - 3600)
    end


    private

    def answer_choice_params
      params.require(:answer_choice).permit(
        :user_id, :answer_id, :answer_text
      )
    end


end
