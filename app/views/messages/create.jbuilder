json.id  @message.id
json.name  @message.user.name
json.text  @message.content # htmlで使われてる言葉（クラス名）はNG??
json.image  ＠message.image.url # 色がおかしいのが気になる。。どういうルールなのか
json.date  @message.created_at.strftime("%Y/%m/%d %H:%M") # ここでいけるのか？