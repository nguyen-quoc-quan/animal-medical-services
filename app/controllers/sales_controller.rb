class SalesController < ApplicationController
  before_action :set_sale, only: [:show, :edit, :update, :destroy]

  respond_to :html

  def index
    if request.xhr?
      page = params[:page].to_i || 0
      per_page = params[:per_page].to_i || 10
      sales = Sale.all
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
      total_medicines =  sales.count
      render json: {"aaData" =>  data,"iTotalRecords"=>total_medicines,"iTotalDisplayRecords"=>total_medicines}, status: 200
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
    respond_with(@sale)
  end

  def new
    @sale = Sale.new
    @foods_select = Food.all.collect{|t| [t.name, t.id]}
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
