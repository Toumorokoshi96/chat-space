$(document).on('turbolinks:load', function(){

  function messageHTMLgenerater(message){
    let messageHTML = `
      <div class='message' data-messageid = ${message.id}>
        <div class='message__upper-info'>
          <p class='message__upper-info__talker'>
            ${message.user_name}
          </p>
          <p class='message__upper-info__date'>
            ${message.created_at}
          </p>
        </div>`
      if(message.content){
        messageHTML = messageHTML +
        `<p class='message__text'>
          ${message.content}
        </p>`}

      if (message.image.url){
        messageHTML = messageHTML +
        `<div class='message-content'>
          <img class='message__image' src='${message.image.url}' />
        </div>`
        }
        messageHTML = messageHTML +
      `</div>`
    let messages = $('.messages');
    messages.append(messageHTML);
    return messageHTML;
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
      messageHTMLgenerater(message);

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
    if(document.URL.match(/groups\/\d+\/messages/)){
      last_message_id = $('.message:last').data('messageid');
      $.ajax({
        url: 'api/messages',
        type: 'get',
        dataType: 'json',
        data: {id: last_message_id}
      })
      .done(function(messages) {
        messages.forEach (function (message) {
          messageHTMLgenerater(message);
        });
        let messagesTotalHeight = $('.messages').get(0).scrollHeight;
        $('.messages').animate({scrollTop:messagesTotalHeight});
      })
      .fail(function() {
        alert('メッセージの自動更新に失敗しました');
      });
    }
  };

  setInterval(reloadMessages, 5000);

})