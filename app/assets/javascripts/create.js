$(document).on('turbolinks:load', function(){
  function messageHTMLgenerater(message){
    let html = `
      <div class='message' data-messageid = ${message.id}>
        <div class='message__upper-info'>
          <p class='message__upper-info__talker'>
            ${message.name}
          </p>
          <p class='message__upper-info__date'>
            ${message.date}
          </p>
        </div>
        <p class='message__text'>
          ${message.text}
        </p>
        <div class='message-content'>
          ${message.image_src}
        </div>
      </div>
    `
    return html;
  }

  $('#new_message').on('submit', function(e){
    e.preventDefault();
    let formData = new FormData(this);
    let uri = $(this).attr('action');
    $.ajax({
      url: uri,
      type: "POST",
      data: formData,
      dataType: 'json', 
      processData: false,
      contentType: false
    })
    .done(function(message){
      let messageHTML = messageHTMLgenerater(message);
      let messages = $('.messages');
      messages.append(messageHTML);

      $('form').get(0).reset();
      $('.form__submit').prop('disabled', false);

      let messagesTotalHeight = $('.messages').get(0).scrollHeight;
      $('.messages').animate({scrollTop:messagesTotalHeight});
    })
    .fail(function(){
      alert("error");
      $('.form__submit').prop('disabled', false);
    })
  })

  let reloadMessages = function() {
    //カスタムデータ属性を利用し、ブラウザに表示されている最新メッセージのidを取得
    last_message_id = $('.message:last').data('messageid');
    $.ajax({
      //ルーティングで設定した通り/groups/id番号/api/messagesとなるよう文字列を書く
      url: 'api/messages',
      //ルーティングで設定した通りhttpメソッドをgetに指定
      type: 'get',
      dataType: 'json',
      //dataオプションでリクエストに値を含める
      data: {id: last_message_id}
    })
    .done(function(messages) {
      console.log('success');
      let messagesTotalHeight = $('.messages').get(0).scrollHeight;
      $('.messages').animate({scrollTop:messagesTotalHeight});
    })
    .fail(function() {
      console.log('error');
    });
  };
  setInterval(reloadMessages, 500000);
})