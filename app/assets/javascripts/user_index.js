$(document).on('turbolinks:load', function(){
  function searchedUserRowGenerater(user){
    var html = `
            <div class="chat-group-user clearfix">
              <p class="chat-group-user__name">${user.name}</p>
              <div class="user-search-add chat-group-user__btn chat-group-user__btn--add" 
                data-user-id="${user.id}" data-user-name="${user.name}">
                  追加
                </div>
            </div>`
    $('#user-search-result').append(html);
  }
  function groupUserRowGenerater(id, name){
    var html = `
          <div class="chat-group-user clearfix">
            <div class="chat-group-form__field--left">
              <p class="chat-group-user__name">${name}</p>
            </div>
            <div class="chat-group-form__field--right">
              <input value = "${id}" name = "group[user_ids][]" type="hidden" id="group_user_ids">
              <div class="user-search-add chat-group-user__btn chat-group-user__btn--remove" 
              data-user-id="${id}" data-user-name="${name}">
                削除
              </div>
            </div>
          </div>`
    $('#group-members').append(html);
  }

  function noResultRowGenerater(){
    var html = `
            <div class="chat-group-user clearfix">
            <p class="chat-group-user__name">一致するユーザーはいません</p>
            </div>`
    $('#user-search-result').append(html);
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
    $('#user-search-result').empty();
    //$(group-member-id).split();現行グループのid配列取得
      users.forEach(function(user){
        //if (user.idはgroup-member-id[]のどれとも一致しない){
          searchedUserRowGenerater(user);
        //}
      });
      if($('#user-search-result')[0]) {
        noResultRowGenerater(); 
      }
    })
    .fail(function() {
      alert('ユーザー検索に失敗しました');
    })
  })

  $(document).on('click', '.chat-group-user__btn--add', function(){
    var id = $('.user-search-add').data('user-id');
    var name = $('.user-search-add').data('user-name');
    groupUserRowGenerater(id, name);
    $(this).closest('.chat-group-user').remove();
  });

  $(document).on('click', '.chat-group-user__btn--remove', function(){ 
    $(this).closest('.chat-group-user').remove();
  });
})