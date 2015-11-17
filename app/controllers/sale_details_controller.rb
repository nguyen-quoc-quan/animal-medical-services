class SaleDetailsController < ApplicationController
  before_action :set_sale_detail, only: [:show, :edit, :update, :destroy]

  respond_to :html

  def index
    @sale_details = SaleDetail.all
    respond_with(@sale_details)
  end

  def show
    respond_with(@sale_detail)
  end

  def new
    @sale_detail = SaleDetail.new
    respond_with(@sale_detail)
  end

  def edit
  end

  def create
    @sale_detail = SaleDetail.new(sale_detail_params)
    @sale_detail.save
    respond_with(@sale_detail)
  end

  def update
    @sale_detail.update(sale_detail_params)
    respond_with(@sale_detail)
  end

  def destroy
    @sale_detail.destroy
    respond_with(@sale_detail)
  end

  private
    def set_sale_detail
      @sale_detail = SaleDetail.find(params[:id])
    end

    def sale_detail_params
      params.require(:sale_detail).permit(:quantity, :price, :product_id, :sale_id)
    end
end
