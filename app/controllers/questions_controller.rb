class QuizzesController < ApplicationController

  def new
    @quiz = Quiz.new
  end

# this is a custom route, to view all of the tests in a clickable fashion
  def admin_index
    @quizzes = Quiz.all
    render :admin_index

  end

  def index
    @quizzes = Quiz.all
    render :index
  end

  def create
    @quiz = Quiz.new(quiz_params)


    if @quiz.save
      redirect_to admin_index_quizzes_url
    else
      render json: @quiz.errors.full_messages, status: 422
    end
  end

    def show

      @quiz = Quiz.find(params[:id])
    end

    def admin_show
        @quiz = Quiz.find(params[:id])
    end

    def destroy
     @quiz = Quiz.find(params[:id])
     @quiz.destroy
     render :show
    end

  private

  def quiz_params
    params.require(:quiz).permit(
      :title, :day, :max_time, :number_of_questions
    )
  end
end
