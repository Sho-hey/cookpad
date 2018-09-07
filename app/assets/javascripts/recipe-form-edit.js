$(function(){
  function recipeTitleForm(recipeTitle){
    var html = `<form class="titleform">
                  <input required="required" type="text" id="recipe_title" name="recipe[title]" value="${recipeTitle}">
                  <button class="editor_ok_button" type="submit">保存</button>
                  <a href="" class="editor_cancel">取消</a>
                  </form>`
    return html;
};

function recipeCatchCopyForm(recipeCatchCopy){
    var html = `<form class="catch_copy_form">
                  <textarea class="disable_invalid_character" name="recipe[catch_copy]">${recipeCatchCopy}</textarea>
                  <br>
                  <button class="editor_ok_button-catch_copy" type="submit">保存</button>
                  <a href="" class="editor_cancel-catch_copy">取消</a>
                </form>`
    return html;
  };
// レシピのタイトルをクリックするとフォームが現れます。
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
    var id = Number($(this).parents(".recipe-main").attr("recipeid"));
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

  // レシピのキャッチコピー
  $(".catchphrase").on("click", function(){
    var recipeCatchCopy = "";
    if($(".recipe-catch_copy-edit").length){
      var recipeCatchCopy = $(".recipe-catch_copy-edit").html();
    };
    $(".catchphrase").hide();
    var html = recipeCatchCopyForm(recipeCatchCopy);
    $(".catchphrase").before(html);
  });

// 取消ボタンを押すと
  $(document).on("click", ".editor_cancel-catch_copy", function(){
    $(".catch_copy_form").remove();
    $(".catchphrase").show();
  });

// 保存ボタンを押すと
  $(document).on("submit", ".catch_copy_form", function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var id = Number($(this).parents(".recipe-main").attr("recipeid"));
    $.ajax({
      url: "/recipes/" + id,
      type: "PATCH",
      data: formData,
      dataType: "json",
      processData: false,
      contentType: false
    })
    .done(function(recipe){
      if($(".recipe-catch_copy-edit").length){
        $(".recipe-catch_copy-edit").html(recipe.catch_copy);
      }
      else{
        $(".catchphrase").append(`<div class="recipe-catch_copy-edit">`);
        $(".recipe-catch_copy-edit").html(recipe.catch_copy);
        $(".edit-image").remove();
        $(".exaple-catch_copy").remove();
      };
      $(".catch_copy_form").remove();
      $(".catchphrase").show();
    })
    .fail(function(){
      alert('error');
    })
    return false;
  })
});
