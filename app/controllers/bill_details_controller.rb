class BillDetailsController < ApplicationController
  before_action :set_bill_detail, only: [:show, :edit, :update, :destroy]

  respond_to :html

  def index
    @bill_details = BillDetail.all
    respond_with(@bill_details)
  end

  def show
    respond_with(@bill_detail)
  end

  def new
    @bill_detail = BillDetail.new
    respond_with(@bill_detail)
  end

  def edit
  end

  def create
    @bill_detail = BillDetail.new(bill_detail_params)
    @bill_detail.save
    respond_with(@bill_detail)
  end

  def update
    @bill_detail.update(bill_detail_params)
    respond_with(@bill_detail)
  end

  def destroy
    @bill_detail.destroy
    respond_with(@bill_detail)
  end

  private
    def set_bill_detail
      @bill_detail = BillDetail.find(params[:id])
    end

    def bill_detail_params
      params.require(:bill_detail).permit(:bill_id, :product_id, :quantity, :sale_price)
    end
end
