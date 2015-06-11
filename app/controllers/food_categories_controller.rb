class FoodCategoriesController < ApplicationController
  before_action :set_food_category, only: [:show, :edit, :update, :destroy]

  respond_to :html

  def index
    @food_categories = FoodCategory.all
    respond_with(@food_categories)
  end

  def show
    respond_with(@food_category)
  end

  def new
    @food_category = FoodCategory.new
    respond_with(@food_category)
  end

  def edit
  end

  def create
    @food_category = FoodCategory.new(food_category_params)
    @food_category.save
    respond_with(@food_category)
  end

  def update
    @food_category.update(food_category_params)
    respond_with(@food_category)
  end

  def destroy
    @food_category.destroy
    respond_with(@food_category)
  end

  private
    def set_food_category
      @food_category = FoodCategory.find(params[:id])
    end

    def food_category_params
      params.require(:food_category).permit(:name)
    end
end
