// レシピ投稿 材料
$(document).on('turbolinks:load', function(){
  $(function(){
    var ingredient_number = $(".ingredient").length - 1;

// 新規投稿
    function newAppendIngredient(ingredient_num){
      var newHtml = `<div class="ingredient">
                       <input placeholder="材料名" class="ingredient-name" type="text" name="recipe[ingredients_attributes][${ingredient_num}][name]" >
                       <input placeholder="分量" class="ingredient-amount" type="text" name="recipe[ingredients_attributes][${ingredient_num}][amount]">
                       <a id="ingredient-delete-button" href="">削除</a>
                    </div>`
                    return newHtml;
                  };

// 編集
    function editAppendIngredient(ingredient_num){
      var editHtml = `<div class="ingredient">
                        <input placeholder="材料名" class="ingredient-name" type="text" name="recipe[ingredients_attributes][${ingredient_num}][name]" >
                        <input placeholder="分量" class="ingredient-amount" type="text" name="recipe[ingredients_attributes][${ingredient_num}][amount]">
                        <a id="ingredient-delete-button" href="">削除</a>
                        <input name="recipe[ingredients_attributes][${ingredient_num}][_destroy]" type="hidden", value="">
                        <input id="update_destroy" type="checkbox" value="" name="recipe[ingredients_attributes][${ingredient_num}][_destroy]">
                      </div>
                      `
                    return editHtml;
                  };


// 新規投稿 追加
    $("#ingredient-add-button").on("click", function(){
      ingredient_number = ingredient_number + 1
      newHtml = newAppendIngredient(ingredient_number)
      $(".ingredients").append(newHtml);
      return false;
    });

// 編集 追加
    // $("#ingredient-add-button-edit").on("click", function(){
    //   ingredient_number = ingredient_number + 1
    //   editHtml = editAppendIngredient(ingredient_number)
    //   $(".ingredients").append(editHtml);
    //   return false;
    // });


// 新規投稿 削除
    $(document).on("click", "#ingredient-delete-button", function(){
      $(this).closest(".ingredient").remove();
      return false;
    });

// 編集 削除
    // $(document).on("click", "#ingredient-delete-button-edit", function(){
    //   $(this).nextAll("input").prop("checked", true);
    //   $(this).closest(".ingredient").hide();
    //   return false;
    // });
  });
});


// 料理手順
$(function(){
  var step_number = $(".step").length;

// 新規レシピ step_numに +1してあるのは、ターボリンクスの影響でうまく作動しない時があるからです。
  function newAppendStep(step_num){
    var newStep = `<div class="step">
                  <div class="step__header">
                    <div class="step__header__left">
                      <div class="step-position">${step_num}</div>
                      <div class="step_move_higher">
                        <a href="#">←</a>
                      </div>
                      <div class="step_move_lower">
                        <a href="#">→</a>
                      </div>
                    </div>
                    <div class="step__header__right">
                      <a id="step-remove-button" href="#">削除</a>
                      <a id="step-add-button" href="#">追加</a>
                    </div>
                  </div>
                  <div class="step__main">
                    <div class="step__main_image">
                      <label for="recipe_flows_attributes_${step_num + 1}_image">
                        <img class="step_example" width="136px" src="/assets/step_blank-c36c8efecb31bebf8f7ef53a7fc4f24034c74677b0fdb521996e77d54b2962fa.png" alt="Step blank">
                        <input class="step-image" type="file" name="recipe[flows_attributes][${step_num + 1}][image]" id="recipe_flows_attributes_${step_num + 1}_image">
                      </label>
                    </div>
                    <div class="step__main_text">
                      <textarea name="recipe[flows_attributes][${step_num + 1}][text]"></textarea>
                    </div>
                  </div>
                </div>`
                return newStep;
                };

// レシピ編集ページ
  function editAppendStep(add_step_num, array_step){
    var editStep = `<div class="step">
                      <div class="step__header">
                        <div class="step__header__left">
                          <div class="step-position">${add_step_num}
                          </div>
                          <div class="step_move_higher-edit">
                            <a href="#">←</a>
                          </div>
                          <div class="step_move_lower-edit">
                            <a href="#">→</a>
                          </div>
                        </div>
                        <div class="step__header__right">
                          <a id="step-remove-button-edit" href="#">削除</a>
                          <a id="step-add-button-edit" href="#">追加</a>
                        </div>
                      </div>
                      <div class="step__main">
                        <div class="step__main_image">
                          <label for="recipe_flows_attributes_${array_step}_image">
                            <img class="step_example" width="136px" src="/assets/step_blank-c36c8efecb31bebf8f7ef53a7fc4f24034c74677b0fdb521996e77d54b2962fa.png" alt="Step blank">
                            <input class="step-image" type="file" name="recipe[flows_attributes][${array_step}][image]" id="recipe_flows_attributes_${array_step}_image">
                          </label>
                        </div>
                        <div class="step__main_text">
                          <textarea name="recipe[flows_attributes][${array_step}][text]"></textarea>
                          <input value="${add_step_num}" id="step_order" type="hidden" name="recipe[flows_attributes][${array_step}][order]">
                          <input name="recipe[flows_attributes][${array_step}][_destroy]" type="hidden" value="0">
                          <input id="update_destroy_flows" type="checkbox" value="" name="recipe[flows_attributes][${array_step}][_destroy]>"
                        </div>
                      </div>
                    </div>`
                return editStep;
                };

// 新規 編集 番号振り直し
  function addNumber(){
    $("#cooking-steps .step-position").filter(":visible").each(function(i){
      var i = i + 1;
      $(this).html( i );
    });
  };

// 編集 hidden_fieldのvalueを振り直し
  function addArrayEdit(){
    $("#cooking-steps #step_order").each(function(n){
      var n = n + 1;
      $(this).val(n);
    });
  };

// 最後の一つになったら削除ボタンを隠す
  function button(){
    if ($(".step").length == 1) {
      $("#step-remove-button").hide();
    }
    else {
      $("#step-remove-button").show();
    };
  };

// 新規 追加
  $(document).on("click", "#step-add-button", function(){
    step_number = step_number + 1
    newStep = newAppendStep(step_number);
    $(this).closest(".step").after(newStep);
    addNumber();
    button();
    return false;
  });

// 新規投稿 削除
  $(document).on("click", "#step-remove-button", function(){
      $(this).closest(".step").remove();
      addNumber();
      button();
      return false;
  });

// 編集 追加
  $(document).on("click", "#step-add-button-edit", function(){
    var now_step_number = Number($(this).parent().prev().children(".step-position").html());
    var how_many_steps = $(".step").length - 1;
    var add_step_number = now_step_number + 1;
    var array_step = how_many_steps + 1;
      editStep = editAppendStep(add_step_number, array_step);
    $(this).closest(".step").next("input").after(editStep);
    addNumber();
    addArrayEdit();
    button();
    return false;
  });

  // 編集 削除
  $(document).on("click", "#step-remove-button-edit", function(){
    if($(this).parents(".step").next("input").length) {
      $(this).parents(".step__header").next(".step__main").children(".step__main_text").children("#update_destroy_flows").prop("checked", true);
      $(this).closest(".step").hide();
    }else{
      $(this).closest(".step").remove();
    };
    addNumber();
    button();
    return false;
  });

// 新規 左に行くボタン
  $(document).on("click",".step_move_higher" , function(){
    var theStep = $(this).parents(".step");
    var beforeStep = theStep.prev(".step");
    $(theStep).insertBefore(beforeStep);
    addNumber();
    return false;
  });

// 新規 右に行くボタン
  $(document).on("click",".step_move_lower" , function(){
    var theStep = $(this).parents(".step");
    var afterStep = theStep.next(".step");
    $(theStep).insertAfter(afterStep);
    addNumber();
    return false;
  });

  // 編集 左に行くボタン
  $(document).on("click",".step_move_higher-edit" , function(){
    var theStep = $(this).parents(".step");
    // 前の.stepにinputあるかないか
    if($(theStep).prev("input").length){
      var beforeStep = theStep.prev("input").prev(".step");
      var theInput = theStep.next("input");
    }else{
      var beforeStep = theStep.prev(".step");
    }
    $(theStep).insertBefore(beforeStep);
    $(theInput).insertBefore(beforeStep);
    addNumber();
    addArrayEdit();
    return false;
  });

// 編集 右に行くボタン
  $(document).on("click",".step_move_lower-edit" , function(){
    var theStep = $(this).parents(".step");
    // .stepの下にinputがある
    if($(theStep).next("input").length){
      var theInput = theStep.next("input");
      // 次の.stepの下にinputがある
      if($(theStep).next("input").next(".step").next("input").length){
        var afterStep = theStep.next("input").next(".step").next("input");
      // 次の.stepの下にinputがない
      }else{
        var afterStep = theStep.next("input").next(".step");
      }
    // .stepの次にinputがない
    }else{
      // 次の.stepの下にinputがある
      if($(theStep).next(".step").next("input").length){
        var afterStep = theStep.next(".step").next("input");
      // 次の.stepの下にinputがない
      }else{
        var afterStep = theStep.next(".step");
      }
    }
    $(theInput).insertAfter(afterStep);
    $(theStep).insertAfter(afterStep);
    addNumber();
    addArrayEdit();
    return false;
  });

});


// レシピ投稿のサイドバー
$(document).on('turbolinks:load', function(){
// タイトルについて
  $(function(){
    $("#example_title").on("click", function(){
      $("#example_title .example_arrow_top").hide();
      $("#example_title .example_arrow_bottom").show();
      $("#example_title .example_box_yellow").show();
      return false;
    });
    $(".example_arrow_bottom").on("click", function(){
      $("#example_title .example_box_yellow").hide();
      $("#example_title .example_arrow_bottom").hide();
      $("#example_title .example_arrow_top").show();
      return false;
    });
  });

  // 写真について
  $(function(){
    $("#example_photo").on("click", function(){
      $("#example_photo .example_arrow_top").hide();
      $("#example_photo .example_arrow_bottom").show();
      $("#example_photo .example_box_yellow").show();
      return false;
    });
    $(".example_arrow_bottom").on("click", function(){
      $("#example_photo .example_box_yellow").hide();
      $("#example_photo .example_arrow_bottom").hide();
      $("#example_photo .example_arrow_top").show();
      return false;
    });
  });

  // レシピの紹介文について
  $(function(){
    $(".example_description").on("click", function(){
      $(".example_description .example_arrow_top").hide();
      $(".example_description .example_arrow_bottom").show();
      $(".example_description .example_box_yellow").show();
      return false;
    });
    $(".example_arrow_bottom").on("click", function(){
      $(".example_description .example_box_yellow").hide();
      $(".example_description .example_arrow_bottom").hide();
      $(".example_description .example_arrow_top").show();
      return false;
    });
  });

  // 材料、調味料について
  $(function(){
    $(".example_ingredients").on("click", function(){
      $(".example_ingredients .example_arrow_top").hide();
      $(".example_ingredients .example_arrow_bottom").show();
      $(".example_ingredients .example_box_yellow").show();
      return false;
    });
    $(".example_arrow_bottom").on("click", function(){
      $(".example_ingredients .example_box_yellow").hide();
      $(".example_ingredients .example_arrow_bottom").hide();
      $(".example_ingredients .example_arrow_top").show();
      return false;
    });
  });

  // 作り方について
  $(function(){
    $(".example_setup").on("click", function(){
      $(".example_setup .example_arrow_top").hide();
      $(".example_setup .example_arrow_bottom").show();
      $(".example_setup .example_box_yellow").show();
      return false;
    });
    $(".example_arrow_bottom").on("click", function(){
      $(".example_setup .example_box_yellow").hide();
      $(".example_setup .example_arrow_bottom").hide();
      $(".example_setup .example_arrow_top").show();
      return false;
    });
  });

  // コツ、ポイントについて
  $(function(){
    $(".example_advice").on("click", function(){
      $(".example_advice .example_arrow_top").hide();
      $(".example_advice .example_arrow_bottom").show();
      $(".example_advice .example_box_yellow").show();
      return false;
    });
    $(".example_arrow_bottom").on("click", function(){
      $(".example_advice .example_box_yellow").hide();
      $(".example_advice .example_arrow_bottom").hide();
      $(".example_advice .example_arrow_top").show();
      return false;
    });
  });

  // レシピの生い立ちについて
  $(function(){
    $(".example_history").on("click", function(){
      $(".example_history .example_arrow_top").hide();
      $(".example_history .example_arrow_bottom").show();
      $(".example_history .example_box_yellow").show();
      return false;
    });
    $(".example_arrow_bottom").on("click", function(){
      $(".example_history .example_box_yellow").hide();
      $(".example_history .example_arrow_bottom").hide();
      $(".example_history .example_arrow_top").show();
      return false;
    });
  });
});
