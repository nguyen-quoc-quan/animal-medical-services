class ImportsController < ApplicationController
  before_action :set_import, only: [:show, :edit, :update, :destroy]

  respond_to :html

  def index
    if request.xhr?
      search_text = params["search_text"] || ""
      imports = Import.all
      imports_count = imports.count
      imports = imports.order('import_at DESC').limit(params[:length]).offset(params[:start])
      data = []
      imports.each do |s|
        amount = s.amount
        pay = s.pay
        data << {
          id: s.id,
          date: s.import_at.strftime('%d-%m-%Y'),
          amount: amount,
          pay: pay,
          owed: amount - pay
        }
      end
      render json: {"aaData" =>  data,"iTotalRecords"=>imports_count,"iTotalDisplayRecords"=>imports_count}, status: 200
    else

    end
  end

  def show
    products = []
    @import.import_details.each do |detail|
      products << [detail, detail.importable]
    end
    render json: {:attach=>render_to_string('_view_import', :layout => false, locals:{products: products, import: @import})}, status: 200
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
    # import_params[:quantity] = 0 unless  import_params[:quantity] or !import_params[:quantity].is_a? Numeric
    # import_params[:price] = 0 unless  import_params[:price] or !import_params[:price].is_a? Numeric
    import = Import.new(import_params)
    begin
      import.save
      if import.errors.messages.blank?
        success_message = "<li>Created successfully!</li>"
        render json: {messages: success_message}, status: 200
      else
        error_messages = import.errors.full_messages.map{|err| "<li>#{err}</li>"}
        render json: {messages: error_messages.join("")}, status: 422
      end
    rescue Exception => e
      p "==============="
      p e
      error_messages = "<li>Something went swrong</li>"
      render json: {messages: error_messages}, status: 422
    end
    
  end

  def update
    begin
      @import.update(import_params)
      if @import.errors.messages.blank?
        success_message = "<li>Updated successfully!</li>"
        render json: {messages: success_message, pay: @import.pay, owe: @import.amount - @import.pay}, status: 200
      else
        error_messages = @import.errors.full_messages.map{|err| "<li>#{err}</li>"}
        render json: {messages: error_messages.join("")}, status: 422
      end
    rescue Exception => e
      p "==============="
      p e
      render json: {messages: "<li>So qua lon</li>"}, status: 500
    end
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
