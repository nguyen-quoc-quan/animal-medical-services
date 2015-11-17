class ProductsController < ApplicationController
  before_action :set_product, only: [:show, :edit, :update, :destroy]

  respond_to :html

  def home
    
  end

  def index
    if request.xhr?
      search_text = params[:search_text]
      products = search_text ? Product.where("name like ?", "%#{search_text}%") : Product.all
      total_products =  products.count
      products = products.order("#{params[:sort].keys.first} #{params[:sort].values.first}")
      products = products.limit(params[:length]).offset(params[:start])
      data = []
      products.each do |m|
        data << {
          id: m.id,
          product_type: m.product_type.name,
          name: m.name,
          category: m.product_category.name,
          type: "#{m.product_specification.product_specification_type.name} (#{m.product_specification.capacity} #{m.product_specification.capacity_type.sign})",
          quantity: m.quantity
        }
      end
      render json: {"aaData" =>  data,"iTotalRecords"=>total_products,"iTotalDisplayRecords"=>total_products}, status: 200
    else
      @product = Product.new
      @categories_select = ProductCategory.all.collect{|c| [c.name, c.id]}
      @specifications_select = ProductSpecification.all.collect{|t| ["#{t.product_specification_type.name} (#{t.capacity} #{t.capacity_type.sign})", t.id]}
      @specification_types_select = ProductSpecificationType.all.collect{|t| [t.name, t.id]}
      @capacity_type_select = CapacityType.all.collect{|c| [c.sign, c.id]}
      @specification = ProductSpecification.new
      @specification.product_specification_type = ProductSpecificationType.new
      @category = ProductCategory.new
      @capacity_type = CapacityType.new
      @product_types_select = ProductType.all.collect{|c| [c.name, c.id]}
    end
  end

  def show
    respond_with(@product)
  end

  def new
    @product = Product.new
    respond_with(@product)
  end

  def edit
  end

  def create
    product = Product.new(product_params)
    product.save
    if product.errors.messages.blank?
      success_message = "<li>Created successfully!</li>"
      render json: {messages: success_message}, status: 200
    else
      error_messages = product.errors.full_messages.map{|err| "<li>#{err}</li>"}
      render json: {messages: error_messages.join("")}, status: 422
    end
  end

  def update
    @product.update(product_params)
    respond_with(@product)
  end

  def destroy
    @product.destroy
    respond_with(@product)
  end

  private
    def set_product
      @product = Product.find(params[:id])
    end

    def product_params
      params.require(:product).permit(:name, :description, :quantity, :product_specification_id, :product_category_id, :capacity_type_id, :product_type_id)
    end
end
