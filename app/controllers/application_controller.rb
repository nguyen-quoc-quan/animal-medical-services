class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  before_filter :authenticate_user!
  layout :layout_by_resource

  protected

  def layout_by_resource
    if devise_controller?
      "empty"
    else
      "application"
    end
  end
end
