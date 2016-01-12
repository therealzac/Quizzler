class UserQuizzesController < ApplicationController
  def create
    @user_quiz = UserQuiz.create!(quiz_id: params[:quiz_id], user_id: 1);

    render json: @user_quiz
  end

  def index
    puts params
    @user_quiz = UserQuiz.where(quiz_id: params[:quiz_id], user_id: 1).first;

    render json: @user_quiz
  end

end
