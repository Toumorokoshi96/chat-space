$(document).on('turbolinks:load', function(){

function userRowGenerater(user){
  var html = `
          <div class="chat-group-user clearfix">
          <p class="chat-group-user__name">${user.name}</p>
          <div class="user-search-add chat-group-user__btn chat-group-user__btn--add" 
          data-user-id="${user.id}" data-user-name="${user.name}">追加</div>
          </div>`
  return html;
}
//$('.chat-group-user__btn--add').addEventListener('click', function() {
//  data-user-id="${user.id}
//  params[]=
//  
//}, false);

function noResultHtmlGenerater(){
  var html = `
          <div class="chat-group-user clearfix">
          <p class="chat-group-user__name">一致するユーザーはいません</p>
          </div>`
  return html;
}

  $('#user-search-field').on('keyup', function(e){
    let input = $("#user-search-field").val();

    $.ajax({
      url: "/users",
      type: "GET",
      data: {keyword: input},
      dataType: 'json',
    })
    .done(function(users){
      var userSearchResultTag = $('#user-search-result');
      userSearchResultTag.empty();
      var userRowHTML;
      if (users.length !== 0) {
        users.forEach(function(user){
          userRowHTML = "";
          userRowHTML = userRowGenerater(user);
          userSearchResultTag.append(userRowHTML);
        });
      }
      else {
        var noResultHtml = noResultHtmlGenerater();
        userSearchResultTag.append(noResultHtml);
      }
      
    })
    .fail(function() {
      alert('ユーザー検索に失敗しました');
    })

  })
})