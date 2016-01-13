class QuestionsController < ApplicationController

  def new
    @question = Question.new

    @question.quiz_id = params[:quiz_id]
  end
  def edit
      @question = Question.find(params[:id])
  end

  def index
    @questions = Question.all
    render :index
  end

  def create
    @question = Question.new(question_params)


    if @question.save
      url_string = '/quizzes/admin_show/' + @question.quiz_id.to_s + '/'
      redirect_to url_string
    else
      render json: @question.errors.full_messages, status: 422
    end
  end

    def show

      @question = Question.find(params[:id])
    end

    def update
      @question = Question.find(params[:id])

      if @question.update(question_params)
        redirect_to '/quizzes/admin_show/' + @question.quiz_id.to_s + '/'
      else
        render :edit
      end
    end


    def destroy
     @question = Question.find(params[:id])
     @question.destroy
     redirect_to '/quizzes/admin_show/' + @question.quiz_id.to_s + '/'
    end

  private

  def question_params
    params.require(:question).permit(
      :question_type, :quiz_id, :text, :correct_answer_id, :explanation
    )
  end
end
