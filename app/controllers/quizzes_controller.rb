class QuizzesController < ApplicationController

  def new

  end

  def index
    @quizzes = Quiz.all
    render :index
  end

  def create
    @quiz = Quiz.new(quiz_params)


    if @quiz.save
      render :create
    else
      render json: @quiz.errors.full_messages, status: 422
    end
  end

    def show
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
