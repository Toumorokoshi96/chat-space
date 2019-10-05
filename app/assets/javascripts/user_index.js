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
            <p class="chat-group-user__name">${name}</p>
            <div class="user-search-add chat-group-user__btn chat-group-user__btn--remove" 
            data-user-id="${id}" data-user-name="${name}">
              削除
            </div>
          </div>`
    $('#group-members').append(html);
  }
  //function newHalfRemovedMember(halfRemovedMemberID searchedUsers){
    //"削除"ボタンで呼び出される、ボタンとの紐付けは？
    //params[:group][:user-ids][].halfRemovedMemberID.削除;
    //要素(属性data-user-idの値==halfRemovedMemberID).<-の親要素.削除;

    // もしインクリメンタルサーチの結果にそのユーザーがいたら検索結果側htmlにプラス
    // if(searchedUsers.length !== 0) { //サーチ結果有
    //   searchedUsers.forEach(function(eachSearchedUser){
    //     if (eachSearchedUser.id == halfRemovedMemberID){
    //     newsearchedRowHTML = searchedUserRowGenerater(halfRemovedMember);
    //     userSearchResultTag.append(newsearchedRowHTML);
    //     break; //if文全部ぬけるやつ
    //    }
    // }
  //}

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
      //今表示されている検索結果を削除
      $('#user-search-result').empty();
      //検索結果を書き込む
      var searchedUserRowHTML = "";
      if(users.length !== 0) {
        users.forEach(function(user){
          //現行メンバーにいないのなら
          searchedUserRowHTML = "";
          searchedUserRowGenerater(user);
        });
      }
      else {
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
    $(this).parent().remove();
  });

  $(document).on('click', '.chat-group-user__btn--remove', function(){ 
    $(this).parent().remove();
  });
})