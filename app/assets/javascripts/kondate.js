$(document).on('click','#kondate-modal-open',function(e){
  e.preventDefault();
  $(this).blur() ;
  if($("#modal-overlay")[0]) $("#modal-overlay").remove() ;
  $("body").append('<div id="modal-overlay"></div>');
  $("#modal-overlay").fadeIn("slow");
  $("#modal-overlay").append(makeKondateModalContents())
  $("#modal-content").fadeIn("slow");
});

$(document).on("click","#modal-overlay,#modal-close",function(){
  $("#modal-content,#modal-overlay").fadeOut("slow",function(){
  //フェードアウト後、[#modal-overlay]をHTML(DOM)上から削除
  $("#modal-overlay").remove();
  });
});


function makeKondateModalContents() {
  html =
  `
  <div id="modal-content">
    <p>「閉じる」か「背景」をクリックするとモーダルウィンドウを終了します。</p>
    <p><a id="modal-close" class="button-link">閉じる</a></p>
  </div>
  `


  return html;
}






function centeringModalSyncer(){

  //画面(ウィンドウ)の幅を取得し、変数[w]に格納
  var w = $(window).width();

  //画面(ウィンドウ)の高さを取得し、変数[h]に格納
  var h = $(window).height();

  //コンテンツ(#modal-content)の幅を取得し、変数[cw]に格納
  var cw = $("#modal-content").outerWidth({margin:true});

  //コンテンツ(#modal-content)の高さを取得し、変数[ch]に格納
  var ch = $("#modal-content").outerHeight({margin:true});

  //コンテンツ(#modal-content)を真ん中に配置するのに、左端から何ピクセル離せばいいか？を計算して、変数[pxleft]に格納
  var pxleft = ((w - cw)/2);

  //コンテンツ(#modal-content)を真ん中に配置するのに、上部から何ピクセル離せばいいか？を計算して、変数[pxtop]に格納
  var pxtop = ((h - ch)/2);

  //[#modal-content]のCSSに[left]の値(pxleft)を設定
  $("#modal-content").css({"left": pxleft + "px"});

  //[#modal-content]のCSSに[top]の値(pxtop)を設定
  $("#modal-content").css({"top": pxtop + "px"});

}
