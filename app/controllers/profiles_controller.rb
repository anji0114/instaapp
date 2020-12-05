class ProfilesController < ApplicationController
  def show
    @account_name = current_user.account_name
  end

  def edit
    @profile = current_user.prepare_profile
  end

  def update
    @profile = current_user.prepare_profile
    @profile.assign_attributes(profile_params)
    if @profile.save
      redirect_to profile_path, notice: 'プロフィール更新'
    else
      flash.now[:error] = '更新できませんでした'
      render :edit
    end
  end

  private
  def profile_params
    params.permit(:avatar)
  end
end