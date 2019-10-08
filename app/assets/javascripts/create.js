$(document).on('turbolinks:load', function(){
  function messageHTMLgenerater(message){
    let html = `
      <div class='message' message_id = ${message.id}>
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
})