class FoodSpecificationsController < ApplicationController
  before_action :set_food_specification, only: [:show, :edit, :update, :destroy]

  respond_to :html

  def index
    @food_specifications = FoodSpecification.all
    respond_with(@food_specifications)
  end

  def show
    respond_with(@food_specification)
  end

  def new
    @food_specification = FoodSpecification.new
    respond_with(@food_specification)
  end

  def edit
  end

  def create
    food_specification = FoodSpecification.new(food_specification_params)
    food_specification.save
    if food_specification.errors.messages.blank?
      success_message = "<li>Created successfully!</li>"
      render json: {messages: success_message, specification: {id: food_specification.id, name: food_specification.food_specification_type.name}}, status: 200
    else
      error_messages = food_specification.errors.full_messages.map{|err| "<li>#{err}</li>"}
      render json: {messages: error_messages.join("")}, status: 422
    end
  end

  def update
    @food_specification.update(food_specification_params)
    respond_with(@food_specification)
  end

  def destroy
    @food_specification.destroy
    respond_with(@food_specification)
  end

  private
    def set_food_specification
      @food_specification = FoodSpecification.find(params[:id])
    end

    def food_specification_params
      params.require(:food_specification).permit(:capacity, :food_specification_type_id, :capacity_type_id, food_specification_type_attributes: [:name])
    end
end
