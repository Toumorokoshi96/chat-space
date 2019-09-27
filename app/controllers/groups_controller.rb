class GroupsController < ApplicationController
  before_action :set_group, only: [:edit, :update]
  
  def index
    @group = current_user.groups.first #どこのグループにも属していないユーザーへの対応必要
    @group_id = @group.id
    @group_users = @group.users
    @message = Message.new #ビュー表示で、form_forの引数として必要
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
    @group = Group.find(params[:id])
  end
end
