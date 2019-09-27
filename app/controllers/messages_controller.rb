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
      redirect_to group_messages_path(@group), notice: 'メッセージが送信されました'
    else
      @messages = @group.messages.includes(:user)
      flash.now[:alert] = 'メッセージを入力してください。'
      # flashはページ切り替えに伴う簡易メッセージを表示するメソッド
      #他にflash.keepやflash[:noticeなどがある]
      render :index
    end
  end

  def message_params
    params.require(:message).permit(:content, :image).merge(user_id: current_user.id)
  end

  def set_group
    @group = Group.find(params[:group_id])
  end
end