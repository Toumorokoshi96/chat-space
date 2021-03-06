class GroupsController < ApplicationController
  before_action :set_group, only: [:edit, :update]
  
  def index
    if current_user.groups.first then
      @group = current_user.groups.first
      @group_id = @group.id
      @group_users = @group.users
    end
    @message = Message.new
  end

  def new
    @group = Group.new
    @group.users << current_user
  end

  def create
    @group = Group.new(group_params)
    if @group.save
      redirect_to root_path, notice: 'グループを作成しました'
    else
      render :new
    end
  end

  def update
    if @group.update(group_params)
      redirect_to group_messages_path(@group), notice: 'グループを編集しました'
    else
      render :edit
    end
  end

  private
  def group_params
    params.require(:group).permit(:name, user_ids: [] )
  end

  def set_group
    if Group.find(params[:id]) then
      @group = Group.find(params[:id])
    end
  end
end