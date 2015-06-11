class MedicineTypesController < ApplicationController
  before_action :set_medicine_type, only: [:show, :edit, :update, :destroy]

  respond_to :html

  def index
    @medicine_types = MedicineType.all
    respond_with(@medicine_types)
  end

  def show
    respond_with(@medicine_type)
  end

  def new
    @medicine_type = MedicineType.new
    respond_with(@medicine_type)
  end

  def edit
  end

  def create
    @medicine_type = MedicineType.new(medicine_type_params)
    @medicine_type.save
    respond_with(@medicine_type)
  end

  def update
    @medicine_type.update(medicine_type_params)
    respond_with(@medicine_type)
  end

  def destroy
    @medicine_type.destroy
    respond_with(@medicine_type)
  end

  private
    def set_medicine_type
      @medicine_type = MedicineType.find(params[:id])
    end

    def medicine_type_params
      params.require(:medicine_type).permit(:name)
    end
end
