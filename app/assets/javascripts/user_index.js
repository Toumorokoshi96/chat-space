$(document).on('turbolinks:load', function(){
//追加候補一人分（一行）を生成
  function searchedUserRowHTMLGenerater(user){
    var html = `
            <div class="chat-group-user clearfix">
              <p class="chat-group-user__name">${user.name}</p>
              <div class="user-search-add chat-group-user__btn chat-group-user__btn--add" 
                data-user-id="${user.id}" data-user-name="${user.name}">
                  追加
                </div>
            </div>`
    return html;
  }



//検索結果の”追加”クリックで呼び出される、現メンバーリストに削除ボタン付きの行を加える
  function groupUserRowHTMLGenerater(user){
    var html = `
          <div class="chat-group-user clearfix">
            <p class="chat-group-user__name">${user.name}</p>
            <div class="user-search-add chat-group-user__btn chat-group-user__btn--remove" 
            data-user-id="${user.id}" data-user-name="${user.name}">
              削除
            </div>
          </div>`
    return html;
    //$('#groupMember').append(searchedUserRowHTML);.append.(html);
    //"削除".addEventListner('click', newHalfRemovedMember, false);
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
      //検索結果を内包する要素取得
      var userSearchResultTag = $('#user-search-result');
      //今表示されている検索結果を削除
      userSearchResultTag.empty();
      //検索結果を書き込む
      var searchedUserRowHTML = "";
      if(users.length !== 0) {
        users.forEach(function(user){
          //現行メンバーにいないのなら
          searchedUserRowHTML = "";
          searchedUserRowHTML = searchedUserRowHTMLGenerater(user);
          userSearchResultTag.append(searchedUserRowHTML);


        });
      }
      else {
         var noResultHtml = noResultHtmlGenerater();
         $('#userSearchResult').append(noResultHtml);
      }
    })
    .fail(function() {
      alert('ユーザー検索に失敗しました');
    })
  })

  $(document).on('click', $('.chat-group-user__btn--add'), function(){
    // function newCandidateMember(candidateMember) {
        console.log(this);
        ////submit時にgroupメンバーとして送信されるリストへの付加
        //params[:group][:user-ids][]<-末尾に付与(candidateMember);
        //userのidは属性data-user-idの属性値;
        //params[:group][:user-ids][] << this.('data-user-id');

        //検索結果->グループメンバー
        //要素(属性data-user-idの値 == candidateMemberID).<-の親要素.削除;
        //var newGroupUserRow = groupUserRowHTMLGenerater(candidateMember);
        //$(上のタグ).append(newGroupUserRow);
    
  });

})