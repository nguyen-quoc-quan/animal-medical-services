class SaleDetail < ActiveRecord::Base
	belongs_to :sale
	belongs_to :saleable, polymorphic: true
end
