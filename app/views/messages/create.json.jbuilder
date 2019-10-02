json.id     @message.id
json.name   @message.user.name
json.text   @message.content 
json.date   @message.created_at.strftime("%Y/%m/%d %H:%M")
json.image_src "<img class='message__image' src='#{@message.image.url}' />" unless @message.image.nil?