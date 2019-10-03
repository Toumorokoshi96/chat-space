$(document).on('turbolinks:load', function(){
  console.log('jsnya');
  $('#user-search-field').on('keyup', function(e){
    //e.preventDefault();ここでは不要、だと思う
    console.log('chakka');
    var str = "nyan";
    $.ajax({
      url: "/users",
      type: "GET",
      data: str,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(jsonResponce){
      console.log('done');
      nyan = jsonResponce.str;
      var userSearchResultTag = $('#user-search-result');
      userSearchResultTag.append(nyan);
    })
    .fail(function(){
      console.log('fail');
      alert("error");
    })
  })
})