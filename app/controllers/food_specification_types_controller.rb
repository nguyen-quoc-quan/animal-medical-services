class FoodSpecificationTypesController < ApplicationController
  before_action :set_food_specification_type, only: [:show, :edit, :update, :destroy]

  respond_to :html

  def index
    @food_specification_types = FoodSpecificationType.all
    respond_with(@food_specification_types)
  end

  def show
    respond_with(@food_specification_type)
  end

  def new
    @food_specification_type = FoodSpecificationType.new
    respond_with(@food_specification_type)
  end

  def edit
  end

  def create
    @food_specification_type = FoodSpecificationType.new(food_specification_type_params)
    @food_specification_type.save
    respond_with(@food_specification_type)
  end

  def update
    @food_specification_type.update(food_specification_type_params)
    respond_with(@food_specification_type)
  end

  def destroy
    @food_specification_type.destroy
    respond_with(@food_specification_type)
  end

  private
    def set_food_specification_type
      @food_specification_type = FoodSpecificationType.find(params[:id])
    end

    def food_specification_type_params
      params.require(:food_specification_type).permit(:name)
    end
end
