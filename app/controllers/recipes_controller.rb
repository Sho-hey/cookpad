class RecipesController < ApplicationController
   impressionist :actions=> [:show]

  def index
    @recipes = Recipe.all.order(created_at: "DESC").limit(8)
    @tsukurepos = Tsukurepo.all.order(created_at: "DESC").limit(8)
  end

  def new
    @recipe = Recipe.new
    @recipe.flows.build
    @recipe.ingredients.build
  end

  def create
    @recipe = Recipe.create(recipe_params)
    redirect_to root_path
  end

  def edit
    @recipe = Recipe.find(params[:id])
    # attributes使わずに保存できればもっと簡単に処理できるよね
    # @ingredients = @recipe.ingredients
  end

  def update
    @recipe = Recipe.find(params[:id])
    if @recipe.update(recipe_params)
      respond_to do |format|
      format.html {redirect_to root_path, notice: "レシピを編集しました"}
      format.json
      end
    else
      render :edit
    end
  end

  def show
    @recipe = Recipe.find(params[:id])
    @recipes = Recipe.all
    @ingredients = @recipe.ingredients.includes(:recipe)
    @flows = @recipe.flows.order(order: "ASC").includes(:recipe)

    @comment = Comment.new
    @comments = @recipe.comments.includes(:user)
    @tsukurepos = @recipe.tsukurepos.includes(:user)

    impressionist(@recipe, nil, unique: [:session_hash])
    @pv = @recipe.impressionist_count
    @today = @recipe.impressionist_count(start_date: Date.today)
    @history = @recipe.register_to_history(current_user)
    respond_to do |format|
      format.html
      format.json
    end
  end


  def list
    @user = User.find(params[:id])
    @recipes = @user.recipes.includes(:ingredients)
    if params[:keyword].present?
      @recipes = Recipe.find(Recipe.select_target_recipe_id(params[:keyword],@user.id))
    end
    respond_to do |format|
      format.html
      format.json{@recipes}
    end
  end

  def destroy
    @recipe = Recipe.find(params[:id])
    if @recipe.destroy
      redirect_to action: "list", id: current_user.id
    else
      flash.now[:error] = "レシピの削除に失敗しました"
      render action: "list", id: current_user.id
    end
  end
  def recipe_rankings
  end

  def save
  end

  private
  def recipe_params
    params.require(:recipe).permit(
      :title,
      :catch_copy,
      :image,
      :tips,
      :background,
      :user_id,
      { ingredients_attributes: [:id, :recipe_id, :name , :amount, :_destroy ] },
      { flows_attributes: [:id, :recipe_id, :image, :text, :order, :_destroy ] }
      ).merge(user_id: current_user.id)
  end
end
