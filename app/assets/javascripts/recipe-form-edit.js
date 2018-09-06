$(function(){
  function recipeTitleForm(recipeTitle){
    var html = `<form class="titleform">
                  <input required="required" type="text" id="recipe_title" name="recipe[title]" value="${recipeTitle}">
                  <button class="editor_ok_button" type="submit">保存</button>`
    return html;
};

  $("#edit-recipe-title").on("click", function(){
    var recipeTitle = $("#edit-recipe-title").html();
    $("#edit-recipe-title").hide();
    var html = recipeTitleForm(recipeTitle);
    $(".recipe-title").append(html);
  });

  $(document).on("submit", ".titleform", function(e){
    e.preventDefault();
    // var value = $("#recipe_title").val();
    // var fd = new FormData($('.titleform').get(0));
    // console.log(fd);
    var formData = new FormData(this);
    var id = Number($(this).parents(".recipe-title").attr("recipeid"));
    // console.log(value);
    $.ajax({
      url: "/recipes/" + id,
      type: "PATCH",
      data: formData,
      dataType: "json",
      processData: false,
      contentType: false
    })
    .done(function(data){
      console.log(data);
      $("#edit-recipe-title").html(data);
      $(".titleform").remove();
      $("#edit-recipe-title").show();
    })
    .fail(function(){
      alert('error');
    })
    return false;
  });
});
