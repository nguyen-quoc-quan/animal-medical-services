class MedicineSpecificationsController < ApplicationController
  before_action :set_medicine_specification, only: [:show, :edit, :update, :destroy]

  respond_to :html

  def index
    @medicine_specifications = MedicineSpecification.all
    respond_with(@medicine_specifications)
  end

  def show
    respond_with(@medicine_specification)
  end

  def new
    @medicine_specification = MedicineSpecification.new
    respond_with(@medicine_specification)
  end

  def edit
  end

  def create
    medicine_specification = MedicineSpecification.new(medicine_specification_params)
    medicine_specification.save
    if medicine_specification.errors.messages.blank?
      success_message = "<li>Created successfully!</li>"
      render json: {messages: success_message, specification: {id: medicine_specification.id, name: medicine_specification.medicine_specification_type.name}}, status: 200
    else
      error_messages = medicine_specification.errors.full_messages.map{|err| "<li>#{err}</li>"}
      render json: {messages: error_messages.join("")}, status: 422
    end
  end

  def update
    @medicine_specification.update(medicine_specification_params)
    respond_with(@medicine_specification)
  end

  def destroy
    @medicine_specification.destroy
    respond_with(@medicine_specification)
  end

  private
    def set_medicine_specification
      @medicine_specification = MedicineSpecification.find(params[:id])
    end

    def medicine_specification_params
      params.require(:medicine_specification).permit(:capacity, :medicine_specification_type_id, :capacity_type_id, medicine_specification_type_attributes: [:name])
    end
end
