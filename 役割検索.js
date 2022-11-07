// 設定値
const FIELD_CODE = "kintone役割  ";
const FIELD_CODE_NAME = "一覧表示：  ";

// 一覧表示のタイミングで実行
(function () 
{
  "use strict";
  kintone.events.on("app.record.index.show", function (event) 
  {


    // GET引数に格納された直前の検索キーワードを取得して再表示する
    var result = {};   
    var parameters = window.location.search.substring( 7 );  // URL固定部分(?query=)は無視
    // フィールドコード名と検索キーワードに分割する
    var element = parameters.split( 'like' );
    var paramName = decodeURIComponent( element[0] );
    var paramValue = decodeURIComponent( element[1] );
    
    // スペースと""をtrimして配列に格納
    result[ paramName.replace(/^\s+|\s+$/g, "") ] = paramValue.replace(/^[\s|\"]+|[\s|\"]+$/g, "");
    
    
    // 一覧ボタン
    var search_button = document.createElement('button');
    search_button.innerHTML = '一覧（すべて）';
    search_button.onclick = function () 
    {
        document.location = location.origin + location.pathname;
    };
    
    
    // 各社管理者ボタン
    var search_button1 = document.createElement('button');
    search_button1.innerHTML = '各社管理者一覧';
    search_button1.onclick = function () 
    {
        keyword_search('各社管理者');
    };
   
    // 使用者ボタン
    var search_button2 = document.createElement('button');
    search_button2.innerHTML = '使用者一覧';
    search_button2.onclick = function () 
    {
        keyword_search('使用者');
    };
   
   
    // キーワード検索の関数
    function keyword_search(keyword1)
    {
      var str_query = "";
      if(keyword1 != "")
      {
        str_query = '?query='+ FIELD_CODE +' in ("' + keyword1 + '")';
      
      // GET変数を使って、検索結果へジャンプ！
      document.location = location.origin + location.pathname + str_query;
      }
    };


    // タグLabelを作成   
    var label = document.createElement('label');
    label.appendChild(document.createElement('br'));
    label.appendChild(document.createTextNode(FIELD_CODE_NAME));

    label.appendChild(search_button);
    label.appendChild(document.createTextNode("  "));
    label.appendChild(search_button1);
    label.appendChild(document.createTextNode("  "));
    label.appendChild(search_button2);
    kintone.app.getHeaderMenuSpaceElement().appendChild(label);

    return event;
  });

})();
