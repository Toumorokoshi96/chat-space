$(document).on('turbolinks:load', function(){
  function messageHTMLgenerater(message){
    var html = `
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
    </div>`

  return html;
  }

  function scrollSelecterGenerater(message){
    var html = `
    [message_id="${message.id}"]`
    return html;
  }

  $('#new_message').on('submit', function(e){
    console.log("ok")
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
    var scrollSelecter = scrollSelecterGenerater(message);
    console.log(scrollSelecter);
    $(".messages").animate({scrollTop:$(scrollSelecter).offset().top});
    })
    .fail(function(){
    alert("error");
    })
  })
})