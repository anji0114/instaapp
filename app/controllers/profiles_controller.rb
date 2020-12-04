class ProfilesController < ApplicationController
  def show
    @account_name = current_user.account_name
  end
end