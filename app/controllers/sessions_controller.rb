class SessionsController < ApplicationController
  # before_action :require_signed_out!, only: [:new, :create]
  # before_action :require_signed_in!, only: [:destroy]

  def new
    @admin = User.new

    render :new
  end

  def create


    @admin = User.find_by_credentials(
      params[:admin][:email],
      params[:admin][:password]
    )

    if @admin
      sign_in(@admin)
      redirect_to root_url
    else
      flash.now[:errors] = ["Invalid username or password."]
      render :new
    end
  end

  def destroy
    sign_out
    # redirect_to new_session_url
    render json: { response: "Logged out" }
  end
end
