class MedicinesController < ApplicationController
  before_action :set_medicine, only: [:show, :edit, :update, :destroy]

  respond_to :html

  def home
    
  end

  def index
    if request.xhr?
      page = params[:page].to_i || 0
      per_page = params[:per_page].to_i || 10
      medicines = Medicine.all
      data = []
      medicines.each do |m|
        data << {
          id: m.id,
          name: m.name,
          category: m.medicine_category.name,
          type: m.medicine_specification.medicine_specification_type.name,
          quantity: m.quantity
        }
      end
      total_medicines =  medicines.count
      render json: {"aaData" =>  data,"iTotalRecords"=>total_medicines,"iTotalDisplayRecords"=>total_medicines}, status: 200
    else
      @medicine = Medicine.new
      @categories_select = MedicineCategory.all.collect{|c| [c.name, c.id]}
      @specifications_select = MedicineSpecification.all.collect{|t| ["#{t.medicine_specification_type.name} (#{t.capacity})", t.id]}
      @specification_types_select = MedicineSpecificationType.all.collect{|t| [t.name, t.id]}
      @specification = MedicineSpecification.new
      @specification.medicine_specification_type = MedicineSpecificationType.new
      @category = MedicineCategory.new
    end
  end

  def show
    respond_with(@medicine)
  end

  def new
    @medicine = Medicine.new
    respond_with(@medicine)
  end

  def edit
  end

  def create
    medicine = Medicine.new(medicine_params)
    medicine.save
    if medicine.errors.messages.blank?
      success_message = "<li>Created successfully!</li>"
      render json: {messages: success_message}, status: 200
    else
      error_messages = medicine.errors.full_messages.map{|err| "<li>#{err}</li>"}
      render json: {messages: error_messages.join("")}, status: 422
    end
  end

  def update
    @medicine.update(medicine_params)
    respond_with(@medicine)
  end

  def destroy
    @medicine.destroy
    respond_with(@medicine)
  end

  private
    def set_medicine
      @medicine = Medicine.find(params[:id])
    end

    def medicine_params
      params.require(:medicine).permit(:name, :description, :quantity, :medicine_specification_id, :medicine_category_id)
    end
end
