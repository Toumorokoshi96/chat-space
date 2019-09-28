$(function(){
  function messageHTMLgenerater(message){
    var html = `
    <div class='message' 'message_id' = id>
    <div class='message__upper-info'>
    <p class='message__upper-info__talker'>
     name
    </p>
    <p class='message__upper-info__date'>
     date
    </p>
    </div>
    <p class='message__text'>
     text
    </p>
    <div class='message-content'>
     image
    </div>
    </div>`

  return html;
  }
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
    //  var messageHTML = messageHTML(message);
     var messages = $(".messages");
     messages.append(messageHTML);
    })
    .fail(function(){
    alert.apply('error')
    })
  })
})