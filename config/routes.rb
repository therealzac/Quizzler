Rails.application.routes.draw do
  root "static_pages#root"
  resources :admins, only: [:new, :create, :edit, :update, :destroy, :show]
  resources :quizzes,only: [:new]
  resources :quizzes,except: [:new], defaults: {format: :json} do

    collection do
      get :admin_index, defaults: {format: :html}
      get ':admin_show/:id', :to => 'quizzes#admin_show', :as => :'admin_show', defaults: {format: :html}
    end

    resources :questions, defaults: {format: :html} do
    # get :admin_show, defaults: {format: :html}
      resources :answers, defaults: {format: :html}
    end

  end
  namespace :test, defaults: {format: :json} do
    post "post_answer_choice", to: "answer_choices#create"
    # resources :answer_choices, only: [:create]
  end
end

# localhost:3000/test/post_answer_choice
