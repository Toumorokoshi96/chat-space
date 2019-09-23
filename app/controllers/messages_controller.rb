class MessagesController < ApplicationController
  def index
    @group_id = params[:group_id]
    @group = Group.find(@group_id)
    @group_users = @group.users
  end
end