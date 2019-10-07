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
      var groupUsers = $("input[id='group_user_ids']");

        users.forEach(function(user){
          alreadyMember = 0;
          groupUsers.each(function(index, groupUser){
            var groupUserIn = $(groupUser).attr('value');
            if(user.id == groupUserIn){
              alreadyMember = 1;
              // break;
            }
          });
          if (alreadyMember == 0){
            searchedUserRowGenerater(user);
          }
        });

      if($('.chat-group-user__btn--add').length === 0) {
        noResultRowGenerater(); 
      }
      //console.log($('.chat-group-user__btn--add').length);
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