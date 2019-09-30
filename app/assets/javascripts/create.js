$(function(){
  function messageHTMLgenerater(message){
    var html = `
    <div class='message' 'message_id' = ${message.id}>
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
    <img class="message__image" src="${message.image_src}" />
    </div>
    </div>`

  return html;
  }
  // function getPostedPart(message){
  //   return $(${message.id});
  // }
  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var uri = $(this).attr('action');
    $.ajax({
      url: uri,
      type: "POST",
      data: formData,
      dataType: 'json', 
      processData: false,
      contentType: false
    })
    .done(function(message){
    var messageHTML = messageHTMLgenerater(message);
    var messages = $(".messages");
    messages.append(messageHTML);
    $('.form__submit').prop('disabled', false);
    console.log('hoge')
    // getPostedPart(message).scrollIntoView(true);
    })
    .fail(function(){
    alert.apply('error')
    })
  })
})