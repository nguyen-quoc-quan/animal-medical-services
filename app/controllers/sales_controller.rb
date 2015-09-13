class SalesController < ApplicationController
  before_action :set_sale, only: [:show, :edit, :update, :destroy]

  respond_to :html

  def index
    if request.xhr?
      search_text = params["search_text"] || ""
      sales = Sale.joins(:customer).where("customers.last_name LIKE ? OR customers.first_name LIKE ?", "%#{search_text}%","%#{search_text}%");
      sales_count = sales.count
      sales = sales.order('sale_at DESC').limit(params[:length]).offset(params[:start])
      data = []
      sales.each do |s|
        c = s.customer
        amount = s.amount
        pay = s.pay
        data << {
          id: s.id,
          date: s.sale_at.strftime('%d-%m-%Y'),
          customer_name:c.full_name,
          customer_id: c.id,
          amount: amount,
          pay: pay,
          owed: amount - pay
        }
      end
      render json: {"aaData" =>  data,"iTotalRecords"=>sales_count,"iTotalDisplayRecords"=>sales_count}, status: 200
    else
      # @medicine = Medicine.new
      # @categories_select = MedicineCategory.all.collect{|c| [c.name, c.id]}
      # @specifications_select = MedicineSpecification.all.collect{|t| [t.medicine_specification_type.name, t.id]}
      # @specification_types_select = MedicineSpecificationType.all.collect{|t| [t.name, t.id]}
      # @specification = MedicineSpecification.new
      # @specification.medicine_specification_type = MedicineSpecificationType.new
      # @category = MedicineCategory.new
    end
  end

  def show
    products = []
    @sale.sale_details.each do |detail|
      products << [detail, detail.saleable]
    end
    render json: {:attach=>render_to_string('_view_sale', :layout => false, locals:{products: products, sale: @sale})}, status: 200
  end

  def new
    @sale = Sale.new
    @foods_select = Food.all.collect{|t| [t.name, t.id]}
    @medicines_select = Medicine.all.collect{|t| [t.name, t.id]}
    @customers_select = Customer.all.collect{|t| [t.full_name, t.id]}
    respond_with(@sale)
  end

  def edit
  end

  def create
    sale_params[:sale_details_attributes][:quantity] = 0 unless  sale_params[:sale_details_attributes][:quantity] or !sale_params[:sale_details_attributes][:quantity].is_a? Numeric
    sale_params[:sale_details_attributes][:price] = 0 unless  sale_params[:sale_details_attributes][:price] or !sale_params[:sale_details_attributes][:price].is_a? Numeric
    sale = Sale.new(sale_params)
    begin
      sale.save
      if sale.errors.messages.blank?
        success_message = "<li>Created successfully!</li>"
        render json: {messages: success_message}, status: 200
      else
        error_messages = sale.errors.full_messages.map{|err| "<li>#{err}</li>"}
        render json: {messages: error_messages.join("")}, status: 422
      end
    rescue Exception => e
      error_messages = "<li>Something went swrong</li>"
      render json: {messages: error_messages}, status: 422
    end
  end

  def update
    begin
      @sale.update(sale_params)
      if @sale.errors.messages.blank?
        success_message = "<li>Updated successfully!</li>"
        render json: {messages: success_message, pay: @sale.pay, owe: @sale.amount - @sale.pay}, status: 200
      else
        error_messages = @sale.errors.full_messages.map{|err| "<li>#{err}</li>"}
        render json: {messages: error_messages.join("")}, status: 422
      end
    rescue Exception => e
      p "==============="
      p e
      render json: {messages: "<li>So qua lon</li>"}, status: 500
    end

  end

  def destroy
    @sale.destroy
    respond_with(@sale)
  end

  private
    def set_sale
      @sale = Sale.find(params[:id])
    end

    def sale_params
      params.require(:sale).permit(:sale_at, :pay, :owe, :customer_id,
        sale_details_attributes:[
          :id, :quantity, :price, :sale_id, :saleable_id, :saleable_type
          ])
    end
end
