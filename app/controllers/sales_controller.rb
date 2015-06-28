class SalesController < ApplicationController
  before_action :set_sale, only: [:show, :edit, :update, :destroy]

  respond_to :html

  def index
    if request.xhr?
      search_text = params["search_text"] || ""
      p "================"
      p params
      p search_text
      # page = params[:page].to_i || 0
      # per_page = params[:per_page].to_i || 1
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
          date: s.sale_at,
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
    @sale = Sale.new(sale_params)
    @sale.save
    respond_with(@sale)
  end

  def update
    @sale.update(sale_params)
    respond_with(@sale)
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
