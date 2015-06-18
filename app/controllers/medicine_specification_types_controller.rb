class MedicineSpecificationTypesController < ApplicationController
  before_action :set_medicine_specification_type, only: [:show, :edit, :update, :destroy]

  respond_to :html

  def index
    @medicine_specification_types = MedicineSpecificationType.all
    respond_with(@medicine_specification_types)
  end

  def show
    respond_with(@medicine_specification_type)
  end

  def new
    @medicine_specification_type = MedicineSpecificationType.new
    respond_with(@medicine_specification_type)
  end

  def edit
  end

  def create
    @medicine_specification_type = MedicineSpecificationType.new(medicine_specification_type_params)
    @medicine_specification_type.save
    respond_with(@medicine_specification_type)
  end

  def update
    @medicine_specification_type.update(medicine_specification_type_params)
    respond_with(@medicine_specification_type)
  end

  def destroy
    @medicine_specification_type.destroy
    respond_with(@medicine_specification_type)
  end

  private
    def set_medicine_specification_type
      @medicine_specification_type = MedicineSpecificationType.find(params[:id])
    end

    def medicine_specification_type_params
      params.require(:medicine_specification_type).permit(:name)
    end
end
