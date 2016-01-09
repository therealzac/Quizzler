Rails.application.routes.draw do
  root "static_pages#root"
  resources :admins, only: [:new, :create, :edit, :update, :destroy, :show]
  resources :quizzes, defaults: {format: :json}
end
