class MessagesController < ApplicationController
  before_action :set_group

  def index
    redirect_to new_user_session_path unless user_signed_in?
    @message = Message.new
    @group_users = @group.users
    @messages = @group.messages
  end

  def create
    @message = @group.messages.new(message_params)
      if @message.save
        respond_to do |format|
          # format.html
          format.json 
        end
      else
        respond_to do |format|
        #  format.html {@messages = @group.messages.includes(:user)
        #               flash.now[:alert] = 'メッセージを入力してください。'
        #               render :index}
         format.json
        end
      end
  end

  def message_params
    params.require(:message).permit(:content, :image).merge(user_id: current_user.id)
  end

  def set_group
    @group = Group.find(params[:group_id])
  end
end