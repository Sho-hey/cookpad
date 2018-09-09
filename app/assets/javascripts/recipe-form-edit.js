$(function(){
  // レシピのタイトル
  function recipeTitleForm(recipeTitle){
    var html = `<form class="titleform">
                  <input required="required" type="text" id="recipe_title" name="recipe[title]" value="${recipeTitle}">
                  <button class="editor_ok_button" type="submit">保存</button>
                  <a href="" class="editor_cancel">取消</a>
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
    return false;
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
  function recipeCatchCopyForm(recipeCatchCopy){
    var html = `<form class="catch_copy_form">
                  <textarea class="disable_invalid_character" name="recipe[catch_copy]">${recipeCatchCopy}</textarea>
                  <br>
                  <button class="editor_ok_button-catch_copy" type="submit">保存</button>
                  <a href="" class="editor_cancel-catch_copy">取消</a>
                </form>`
    return html;
  };
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
    return false;
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



// レシピのコツ
  function recipeTipsForm(recipeTips){
    var html = `<form class="tips_form">
                  <textarea class="disable_invalid_character" name="recipe[tips]">${recipeTips}</textarea>
                  <br>
                  <button class="editor_ok_button-tips" type="submit">保存</button>
                  <a href="" class="editor_cancel-tips">取消</a>
                </form>`
    return html;
  };
  $(".recipe-tips-edit").on("click", function(){
    var recipeTips = "";
    if($(".recipe-tips-edit-present").length){
      var recipeTips = $(".recipe-tips-edit-present").html();
    };
    $(".recipe-tips-edit").hide();
    var html = recipeTipsForm(recipeTips);
    $(".recipe-tips-edit").before(html);
  });
// 取消ボタン
  $(document).on("click", ".editor_cancel-tips", function(){
    $(".tips_form").remove();
    $(".recipe-tips-edit").show();
    return false;
  });
// 保存ボタン
  $(document).on("submit", ".tips_form", function(e){
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
      if($(".recipe-tips-edit-present").length){
        $(".recipe-tips-edit-present").html(recipe.tips);
      }
      else{
        $(".recipe-tips-edit").append(`<div class="recipe-tips-edit-present">`);
        $(".recipe-tips-edit-present").html(recipe.tips);
        $(".example-tips").remove();
        $(".edit-image").remove();
      };
      $(".tips_form").remove();
      $(".recipe-tips-edit").show();
    })
    .fail(function(recipe){
      alert('error');
    });
    return false;
  });


// レシピの生い立ち
  function recipeBackgroundForm(recipeBackground){
    var html = `<form class="background_form">
                  <textarea class="disable_invalid_character" name="recipe[background]" style="width: 290px; height: 100px;">${recipeBackground}</textarea>
                  <br>
                  <button class="editor_ok_button-background" type="submit">保存</button>
                  <a href="" class="editor_cancel-background">取消</a>
                </form>`
    return html;
  };
  $(".recipe-background-edit").on("click", function(){
    var recipeBackground = "";
    if($(".recipe-background-edit-present").length){
      var recipeBackground = $(".recipe-background-edit-present").html();
    };
    $(".recipe-background-edit").hide();
    var html = recipeBackgroundForm(recipeBackground);
    $(".recipe-background-edit").before(html);
  });
// 取消ボタン
  $(document).on("click", ".editor_cancel-background", function(){
    $(".background_form").remove();
    $(".recipe-background-edit").show();
    return false;
  });
// 保存ボタン
  $(document).on("submit",".background_form", function(e){
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
      if($(".recipe-background-edit-present").length){
        $(".recipe-background-edit-present").html(recipe.background);
      }
      else{
        $(".recipe-background-edit").append(`<div class="recipe-background-edit-present">`);
        $(".recipe-background-edit-present").html(recipe.history);
        $(".recipe-background-edit").remove();
      };
      $(".background_form").remove();
      $(".recipe-background-edit").show();
    })
    .fail(function(recipe){
      alert('error');
    });
    return false;
  });



  // レシピの材料
  function recipeIngredientsForm(){
    // var html = `<div class="ingredients_wrapper">
    //               <div class="ingredients-title">
    //                 <h3 class="ingredients_title">
    //                   <div class="content">
    //                     <span>材料</span>
    //                     <span class="serving_for">（１～２人分）</span>
    //                   </div>
    //                 </h3>
    //               </div>
    //               <form class="ingredients">
    //                 <div class="ingredient">
    //                   <input placeholder="材料名" class="ingredient-name" type="text" name="recipe[ingredients_attributes][][name]" >
    //                   <input placeholder="分量" class="ingredient-amount" type="text" name="recipe[ingredients_attributes][][amount]">
    //                   <a id="ingredient-delete-button" href="">削除</a>
    //                   <input name="recipe[ingredients_attributes][][_destroy]" type="hidden", value="">
    //                   <input id="update_destroy" type="checkbox" value="" name="recipe[ingredients_attributes][][_destroy]">
    //                 </div>
    //               </form>
    //               <div class="add-save">
    //                 <a href="" id="ingredient-add-button-edit">追加</a>
    //                 <button class="editor_ok_button-ingredients" type="submit">保存</button>
    //               </div>
    //             </div>`
    var html = `<div class="ingredients_wrapper">
                  <div class="ingredients-title">
                    <h3 class="ingredients_title">
                      <div class="content">
                        <span>材料</span>
                        <span class="serving_for">（１～２人分）</span>
                      </div>
                    </h3>
                  </div>
                  <form class="ingredients">
                    <div class="ingredient">
                      <input placeholder="材料名" class="ingredient-name" type="text" name="ingredients[][name]">
                      <input placeholder="分量" class="ingredient-amount" type="text" name="ingredients[][name]">
                      <a id="ingredient-delete-button" href="">削除</a>
                    </div>
                  </form>
                  <div class="add-save">
                    <a href="" id="ingredient-add-button-edit">追加</a>
                    <button class="editor_ok_button-ingredients" type="submit">保存</button>
                  </div>
                </div>`
    return html;
  };
  $("#ingredients-image-edit").on("click", function(){
    $("#ingredients-image-edit").hide();
    var html = recipeIngredientsForm();
    $(".ingredients").append(html);
    return false;
  })
});
