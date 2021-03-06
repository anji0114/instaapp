class ProfilesController < ApplicationController
  def show
    @account_name = current_user.account_name
    @profile = current_user.prepare_profile
  end

  def update
    @profile = current_user.prepare_profile
    @profile.assign_attributes(profile_params)
    if @profile.save
      redirect_to profile_path, notice: 'プロフィール更新'
    else
      flash.now[:error] = '更新できませんでした'
    end
  end

  private
  def profile_params
    params.require(:profile).permit(:avatar)
  end
end