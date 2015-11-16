class PayDetailsController < ApplicationController

	def create
		detail_params = pay_detail_params
		detail_params = detail_params.merge(pay_at: Date.today)
		pay_detail = PayDetail.new(detail_params)
		begin
      pay_detail.save
      if pay_detail.errors.messages.blank?
      	pay = pay_detail.payable.pay_details.sum(:pay)
      	owe = pay_detail.payable.amount - pay
      	success_message = "<li>Created successfully!</li>"
        render json: {messages: success_message, pay: pay, owe: owe}, status: 200
      else
        error_messages = pay_detail.errors.full_messages.map{|err| "<li>#{err}</li>"}
        render json: {messages: error_messages.join("")}, status: 422
      end
    rescue Exception => e
      error_messages = "<li>Something went swrong</li>"
      render json: {messages: error_messages}, status: 422
    end

	end

	private

		def pay_detail_params
      params.require(:pay_detail).permit(:pay, :payable_type, :payable_id)
    end

end