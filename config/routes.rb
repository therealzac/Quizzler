Rails.application.routes.draw do
  resources :admins, only: [:new, :create, :edit, :update, :destroy, :show]
end
