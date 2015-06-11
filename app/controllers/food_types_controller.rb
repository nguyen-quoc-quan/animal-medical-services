class FoodTypesController < ApplicationController
  before_action :set_food_type, only: [:show, :edit, :update, :destroy]

  respond_to :html

  def index
    @food_types = FoodType.all
    respond_with(@food_types)
  end

  def show
    respond_with(@food_type)
  end

  def new
    @food_type = FoodType.new
    respond_with(@food_type)
  end

  def edit
  end

  def create
    @food_type = FoodType.new(food_type_params)
    @food_type.save
    respond_with(@food_type)
  end

  def update
    @food_type.update(food_type_params)
    respond_with(@food_type)
  end

  def destroy
    @food_type.destroy
    respond_with(@food_type)
  end

  private
    def set_food_type
      @food_type = FoodType.find(params[:id])
    end

    def food_type_params
      params.require(:food_type).permit(:name)
    end
end
