class ProductSpecificationsController < ApplicationController
  before_action :set_product_specification, only: [:show, :edit, :update, :destroy]

  respond_to :html

  def index
    @product_specifications = ProductSpecification.all
    respond_with(@product_specifications)
  end

  def show
    respond_with(@product_specification)
  end

  def new
    @product_specification = ProductSpecification.new
    respond_with(@product_specification)
  end

  def edit
  end

  def create
    product_specification = ProductSpecification.new(product_specification_params)
    product_specification.save
    if product_specification.errors.messages.blank?
      success_message = "<li>Created successfully!</li>"
      render json: {messages: success_message, specification: {id: product_specification.id, name: "#{product_specification.product_specification_type.name} (#{product_specification.capacity} #{product_specification.capacity_type.sign})"}}, status: 200
    else
      error_messages = product_specification.errors.full_messages.map{|err| "<li>#{err}</li>"}
      render json: {messages: error_messages.join("")}, status: 422
    end
  end

  def update
    @product_specification.update(product_specification_params)
    respond_with(@product_specification)
  end

  def destroy
    @product_specification.destroy
    respond_with(@product_specification)
  end

  private
    def set_product_specification
      @product_specification = ProductSpecification.find(params[:id])
    end

    def product_specification_params
      params.require(:product_specification).permit(:capacity, :product_specification_type_id, :capacity_type_id, product_specification_type_attributes: [:name])
    end
end
