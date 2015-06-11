class Bill < ActiveRecord::Base
	belongs_to :customer
	has_many :bill_details
end
