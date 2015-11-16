class ProductCategoriesController < ApplicationController
  before_action :set_product_category, only: [:show, :edit, :update, :destroy]

  respond_to :html

  def index
    @product_categories = ProductCategory.all
    respond_with(@product_categories)
  end

  def show
    respond_with(@product_category)
  end

  def new
    @product_category = ProductCategory.new
    respond_with(@product_category)
  end

  def edit
  end

  def create
    product_category = ProductCategory.new(product_category_params)
    product_category.save
    if product_category.errors.messages.blank?
      success_message = "<li>Created successfully!</li>"
      render json: {messages: success_message, category: product_category}, status: 200
    else
      error_messages = product_category.errors.full_messages.map{|err| "<li>#{err}</li>"}
      render json: {messages: error_messages.join("")}, status: 422
    end
  end

  def update
    @product_category.update(product_category_params)
    respond_with(@product_category)
  end

  def destroy
    @product_category.destroy
    respond_with(@product_category)
  end

  private
    def set_product_category
      @product_category = ProductCategory.find(params[:id])
    end

    def product_category_params
      params.require(:product_category).permit(:name)
    end
end
