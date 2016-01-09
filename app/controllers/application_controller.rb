class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception

  helper_method :current_admin, :signed_in?

 private
 def current_admin
   @current_admin ||= Admin.find_by_session_token(session[:token])
 end

 def signed_in?
   !!current_admin
 end

 def sign_in(admin)
   @current_admin = admin
   session[:token] = admin.reset_session_token!
 end

 def sign_out
   current_admin.try(:reset_session_token!)
   session[:token] = nil
 end

 def require_signed_in!
   redirect_to new_session_url unless signed_in?
 end

 def require_signed_out!
   redirect_to admin_url(current_admin) if signed_in?
 end

end
