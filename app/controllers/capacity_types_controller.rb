class CapacityTypesController < ApplicationController
  before_action :set_capacity_type, only: [:show, :edit, :update, :destroy]

  respond_to :html

  def index
    @capacity_types = CapacityType.all
    respond_with(@capacity_types)
  end

  def show
    respond_with(@capacity_type)
  end

  def new
    @capacity_type = CapacityType.new
    respond_with(@capacity_type)
  end

  def edit
  end

  def create
    capacity_type = CapacityType.new(capacity_type_params)
    capacity_type.save
    if capacity_type.errors.messages.blank?
      success_message = "<li>Created successfully!</li>"
      render json: {messages: success_message, capacity_type: capacity_type}, status: 200
    else
      error_messages = capacity_type.errors.full_messages.map{|err| "<li>#{err}</li>"}
      render json: {messages: error_messages.join("")}, status: 422
    end
  end

  def update
    @capacity_type.update(capacity_type_params)
    respond_with(@capacity_type)
  end

  def destroy
    @capacity_type.destroy
    respond_with(@capacity_type)
  end

  private
    def set_capacity_type
      @capacity_type = CapacityType.find(params[:id])
    end

    def capacity_type_params
      params.require(:capacity_type).permit(:name)
    end
end
