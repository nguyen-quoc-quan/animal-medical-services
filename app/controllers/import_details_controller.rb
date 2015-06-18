class ImportDetailsController < ApplicationController
  before_action :set_import_detail, only: [:show, :edit, :update, :destroy]

  respond_to :html

  def index
    @import_details = ImportDetail.all
    respond_with(@import_details)
  end

  def show
    respond_with(@import_detail)
  end

  def new
    @import_detail = ImportDetail.new
    respond_with(@import_detail)
  end

  def edit
  end

  def create
    @import_detail = ImportDetail.new(import_detail_params)
    @import_detail.save
    respond_with(@import_detail)
  end

  def update
    @import_detail.update(import_detail_params)
    respond_with(@import_detail)
  end

  def destroy
    @import_detail.destroy
    respond_with(@import_detail)
  end

  private
    def set_import_detail
      @import_detail = ImportDetail.find(params[:id])
    end

    def import_detail_params
      params.require(:import_detail).permit(:quantity, :price, :importable_id, :importable_type, :import_id)
    end
end
