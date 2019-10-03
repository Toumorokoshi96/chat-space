$(document).on('turbolinks:load', function(){
  console.log('jsnya');
  $('#user-search-field').on('keyup', function(e){
    let input = $("#user-search-field").val();
    console.log(input);

    $.ajax({
      url: "/users",
      type: "GET",
      data: {keyword: input},//
      dataType: 'json',
      // processData: false,
      // contentType: false
    })
    .done(function(users){
      //$(".listview.js-lazy-load-images").empty();
      if (users.length !== 0) {
        users.forEach(function(user){
          console.log(user.name);
        });
      }
      else {
        // appendErrMsgToHTML("一致するユーザーはいません");
      }
      var userSearchResultTag = $('#user-search-result');
      userSearchResultTag.append(users.name);
    })
    .fail(function() {
      alert('エラーです');
    })

  })
})