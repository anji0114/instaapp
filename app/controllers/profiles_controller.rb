class ProfilesController < ApplicationController
  def show
    # @profile = current_user.profile
    @account_name = current_user.account_name
  end
end