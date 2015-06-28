class ImportsController < ApplicationController
  before_action :set_import, only: [:show, :edit, :update, :destroy]

  respond_to :html

  def index
    @imports = Import.all
    respond_with(@imports)
  end

  def show
    respond_with(@import)
  end

  def new
    @import = Import.new
    @foods_select = Food.all.collect{|t| [t.name, t.id]}
    @medicines_select = Medicine.all.collect{|t| [t.name, t.id]}
    respond_with(@import)
  end

  def edit
  end

  def create
    @import = Import.new(import_params)
    @import.save
    respond_with(@import)
  end

  def update
    @import.update(import_params)
    respond_with(@import)
  end

  def destroy
    @import.destroy
    respond_with(@import)
  end

  private
    def set_import
      @import = Import.find(params[:id])
    end

    def import_params
      params.require(:import).permit(:import_at, :pay, :owe,
                                    import_details_attributes:[
                                      :id, :quantity, :price, :import_id, :importable_id, :importable_type
                                    ])
    end
end
