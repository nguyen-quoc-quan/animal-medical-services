class CustomersController < ApplicationController
  before_action :set_customer, only: [:show, :edit, :update, :destroy]

  respond_to :html

  def index
    if request.xhr?
      search_text = params["search_text"] || ""
      customers = Customer.where("last_name LIKE ? OR first_name LIKE ?", "%#{search_text}%","%#{search_text}%");
      customers_count = customers.count
      customers = customers.order(first_name: :desc, last_name: :desc).limit(params[:length]).offset(params[:start])
      data = []
      customers.each do |c|
        data << {
          id: c.id,
          full_name:c.full_name,
          phone_number: c.phone,
          address: c.address,
          url: customer_url(c)
        }
      end
      render json: {"aaData" =>  data,"iTotalRecords"=>customers_count,"iTotalDisplayRecords"=>customers_count}, status: 200
    else
      @customer = Customer.new
    end
  end

  def show
    if request.xhr?
      search_text = params["search_text"] || ""
      sales = @customer.sales
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
      respond_with(@customer)
    end
  end

  def new
    @customer = Customer.new
    respond_with(@customer)
  end

  def edit
    render json: {:attach=>render_to_string('_view_customer', :layout => false, locals:{customer: @customer})}, status: 200
  end

  def create
    customer = Customer.new(customer_params)
    begin
      customer.save
      if customer.errors.messages.blank?
        success_message = "<li>Created successfully!</li>"
        render json: {messages: success_message}, status: 200
      else
        error_messages = customer.errors.full_messages.map{|err| "<li>#{err}</li>"}
        render json: {messages: error_messages.join("")}, status: 422
      end
    rescue Exception => e
      error_messages = "<li>Something went swrong</li>"
      render json: {messages: error_messages}, status: 422
    end
  end

  def update
    begin
      @customer.update(customer_params)
      if @customer.errors.messages.blank?
        success_message = "<li>Updated successfully!</li>"
        render json: {messages: success_message, full_name: @customer.full_name, phone: @customer.phone, address: @customer.address}, status: 200
      else
        error_messages = @customer.errors.full_messages.map{|err| "<li>#{err}</li>"}
        render json: {messages: error_messages.join("")}, status: 422
      end
    rescue Exception => e
      p "==============="
      p e
      render json: {messages: "<li>So qua lon</li>"}, status: 500
    end
  end

  def destroy
    @customer.destroy
    respond_with(@customer)
  end

  private
    def set_customer
      @customer = Customer.find(params[:id])
    end

    def customer_params
      params.require(:customer).permit(:first_name, :last_name, :address, :phone)
    end
end
