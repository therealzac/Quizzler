Rails.application.routes.draw do
  root "static_pages#root"
  resources :admins, only: [:new, :create, :edit, :update, :destroy, :show]
  resources :quizzes, defaults: {format: :json}

  resources :answer_choices, only: [:create]

  namespace :test, defaults: {format: :json} do
    post "post_answer_choice", to: "answer_choices#create"
    # resources :answer_choices, only: [:create]
  end
end

# localhost:3000/test/post_answer_choice
