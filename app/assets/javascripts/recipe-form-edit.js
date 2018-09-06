$(function(){
  function recipeTitleForm(recipeTitle){
    var html = `<form class="titleform">
                  <input required="required" type="text" id="recipe_title" name="recipe[title]" value="${recipeTitle}">
                  <button class="editor_ok_button" type="submit">保存</button>
                  <a href="" class="editor_cancel">取消</a>`
    return html;
};
// タイトルをクリックするとフォームが現れます。
  $("#edit-recipe-title").on("click", function(){
    var recipeTitle = $("#edit-recipe-title").html();
    $("#edit-recipe-title").hide();
    var html = recipeTitleForm(recipeTitle);
    $(".recipe-title").append(html);
  });

// 取消リンクを押すと
  $(document).on("click", ".editor_cancel", function(){
    $(".titleform").remove();
    $("#edit-recipe-title").show();
  });

// 保存ボタンを押すと
  $(document).on("submit", ".titleform", function(e){
    e.preventDefault();
    // var value = $("#recipe_title").val();
    // valueではうまくいかなかった。原因を探る必要がありそう
    var formData = new FormData(this);
    var id = Number($(this).parents(".recipe-title").attr("recipeid"));
    $.ajax({
      url: "/recipes/" + id,
      type: "PATCH",
      data: formData,
      dataType: "json",
      processData: false,
      contentType: false
    })
    .done(function(recipe){
      $("#edit-recipe-title").html(recipe.title);
      $(".titleform").remove();
      $("#edit-recipe-title").show();
    })
    .fail(function(){
      alert('error');
    })
    return false;
  });
});
