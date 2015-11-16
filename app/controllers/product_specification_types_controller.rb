class ProductSpecificationTypesController < ApplicationController
  before_action :set_product_specification_type, only: [:show, :edit, :update, :destroy]

  respond_to :html

  def index
    @product_specification_types = ProductSpecificationTypesController.all
    respond_with(@product_specification_types)
  end

  def show
    respond_with(@product_specification_type)
  end

  def new
    @product_specification_type = ProductSpecificationTypesController.new
    respond_with(@product_specification_type)
  end

  def edit
  end

  def create
    @product_specification_type = ProductSpecificationTypesController.new(product_specification_type_params)
    @product_specification_type.save
    respond_with(@product_specification_type)
  end

  def update
    @product_specification_type.update(product_specification_type_params)
    respond_with(@product_specification_type)
  end

  def destroy
    @product_specification_type.destroy
    respond_with(@product_specification_type)
  end

  private
    def set_product_specification_type
      @product_specification_type = ProductSpecificationTypesController.find(params[:id])
    end

    def product_specification_type_params
      params.require(:product_specification_type).permit(:name)
    end
end
