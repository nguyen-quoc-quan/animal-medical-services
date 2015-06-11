class MedicineCategoriesController < ApplicationController
  before_action :set_medicine_category, only: [:show, :edit, :update, :destroy]

  respond_to :html

  def index
    @medicine_categories = MedicineCategory.all
    respond_with(@medicine_categories)
  end

  def show
    respond_with(@medicine_category)
  end

  def new
    @medicine_category = MedicineCategory.new
    respond_with(@medicine_category)
  end

  def edit
  end

  def create
    @medicine_category = MedicineCategory.new(medicine_category_params)
    @medicine_category.save
    respond_with(@medicine_category)
  end

  def update
    @medicine_category.update(medicine_category_params)
    respond_with(@medicine_category)
  end

  def destroy
    @medicine_category.destroy
    respond_with(@medicine_category)
  end

  private
    def set_medicine_category
      @medicine_category = MedicineCategory.find(params[:id])
    end

    def medicine_category_params
      params.require(:medicine_category).permit(:name)
    end
end
