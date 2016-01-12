class AnswersController < ApplicationController

    def new
      @answer = Answer.new
      @question = Question.find(params[:question_id])

      @answer.question_id = params[:question_id]
    end

    def index
      @answerzes = Answer.all
      render :index
    end

    def create
      @answer = Answer.new(answer_params)
      @question = Question.find(params[:question_id])

      if @answer.save
        url_string = '/quizzes/admin_show/' + @question.quiz_id.to_s + '/'
        redirect_to url_string
      else
        render json: @answer.errors.full_messages, status: 422
      end
    end

      def show

        @answer = Answer.find(params[:id])
      end


      def destroy
       @answer = Answer.find(params[:id])
       @answer.destroy
       render :show
      end

    private

    def answer_params
      params.require(:answer).permit(
      :text, :question_id
      )
    end
end
