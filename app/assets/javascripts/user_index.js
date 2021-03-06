$(document).on('turbolinks:load', function(){
  function searchedUserRowGenerater(user){
    let html = `
      <div class="chat-group-user clearfix">
        <p class="chat-group-user__name">${user.name}</p>
        <div class="user-search-add chat-group-user__btn chat-group-user__btn--add" 
          data-user-id="${user.id}" data-user-name="${user.name}">
            追加
        </div>
      </div>
      `
    $('#user-search-result').append(html);
  }

  function groupUserRowGenerater(id, name){
    let html = `
      <div class='chat-group-user clearfix'>
        <input value = "${id}" name = "group[user_ids][]" type="hidden" id="group_user_ids">
        <p class="chat-group-user__name">
          ${name}
        </p>
        <div class="user-search-add chat-group-user__btn chat-group-user__btn--remove" 
        data-user-id="${id}" data-user-name="${name}">
          削除
        </div>
      </div>
      `
    $('#group-members').append(html);
  }

  function noResultRowGenerater(){
    let html = `
            <div class="chat-group-user clearfix">
            <p class="chat-group-user__name">一致するユーザーはいません</p>
            </div>`
    $('#user-search-result').append(html);
  }

  let groupUsers = $("input[id='group_user_ids']");

  $('#user-search-field').on('keyup', function(e){
    let input = $("#user-search-field").val();
    if (input !== ""){
      $.ajax({
        url: "/users",
        type: "GET",
        data: {keyword: input},
        dataType: 'json',
      })
      .done(function(users){
        $('#user-search-result').empty();

          users.forEach(function(user){
            alreadyMemberFlag = false;
            groupUsers.each(function(index, groupUser){
              let groupUserID = $(groupUser).attr('value');
              if(user.id == groupUserID){
                alreadyMemberFlag = true;
                return true;
              }
            });
            if (alreadyMemberFlag == false){
              searchedUserRowGenerater(user);
            }
          });

        if($('.chat-group-user__btn--add').length === 0) {
          noResultRowGenerater(); 
        }
      })
      .fail(function() {
        alert('ユーザー検索に失敗しました');
      })
    }
  })

  $(document).off('click'); //clickイベントの多重化防止
  $(document).on('click', '.chat-group-user__btn--add', function(){
    let id = $('.user-search-add').data('user-id');
    let name = $('.user-search-add').data('user-name');
    $(this).closest('.chat-group-user').remove();
    groupUserRowGenerater(id, name);
  });

  $(document).on('click', '.chat-group-user__btn--remove', function(){ 
    $(this).closest('.chat-group-user').remove();
    //groupMemberから除去＝次のkeyonイベントからは検索対象
    //もし今のsearchedUsersに含まれているのなら復活
  });
})