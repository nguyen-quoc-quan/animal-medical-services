class FoodsController < ApplicationController
  before_action :set_food, only: [:show, :edit, :update, :destroy]

  respond_to :html

  def index
    if request.xhr?
      page = params[:page].to_i || 0
      per_page = params[:per_page].to_i || 10
      foods = Food.all
      data = []
      foods.each do |m|
        data << {
          id: m.id,
          name: m.name,
          category: m.food_category.name,
          type: "#{m.food_specification.food_specification_type.name} (#{m.food_specification.capacity})",
          quantity: m.quantity
        }
      end
      total_foods =  foods.count
      render json: {"aaData" =>  data,"iTotalRecords"=>total_foods,"iTotalDisplayRecords"=>total_foods}, status: 200
    else
      @food = Food.new
      @categories_select = FoodCategory.all.collect{|c| [c.name, c.id]}
      @specifications_select = FoodSpecification.all.collect{|t| ["#{t.food_specification_type.name} (#{t.capacity})", t.id]}
      @specification_types_select = FoodSpecificationType.all.collect{|t| [t.name, t.id]}
      @specification = FoodSpecification.new
      @specification.food_specification_type = FoodSpecificationType.new
      @category = FoodCategory.new
    end
  end

  def show
    respond_with(@food)
  end

  def new
    @food = Food.new
    respond_with(@food)
  end

  def edit
  end

  def create
    food = Food.new(food_params)
    food.save
    if food.errors.messages.blank?
      success_message = "<li>Created successfully!</li>"
      render json: {messages: success_message}, status: 200
    else
      error_messages = food.errors.full_messages.map{|err| "<li>#{err}</li>"}
      render json: {messages: error_messages.join("")}, status: 422
    end
  end

  def update
    @food.update(food_params)
    respond_with(@food)
  end

  def destroy
    @food.destroy
    respond_with(@food)
  end

  private
    def set_food
      @food = Food.find(params[:id])
    end

    def food_params
      params.require(:food).permit(:name, :description, :quantity, :food_specification_id, :food_category_id)
    end
end
