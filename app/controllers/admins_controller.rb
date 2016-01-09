class AdminsController < ApplicationController
  before_action :require_signed_in!, only: [:create, :edit, :new]

  def show
    @admin = Admin.find(params[:id])
  end

  def index
    @admins = Admin.all
    render :index
  end

  def update
    @admin = Admin.find(params[:id])

    if @admin.update(admin_params)
      @admins = Admin.all
      render :index
    else
      flash.now[:errors] = @admin.errors.full_messages
    end
  end

  def edit
    @admin = current_admin
    render :edit
  end

  def new
    @admin = Admin.new
    render :new
  end

  def create
    @admin = Admin.new(admin_params)

    if @admin.save
      sign_in(@admin)
      redirect_to admin_url(@admin)
    else
      flash.now[:errors] = @admin.errors.full_messages
      render :new
    end
  end

  private

  def admin_params
    params.require(:admin).permit(
      :email, :password
    )
  end
end
