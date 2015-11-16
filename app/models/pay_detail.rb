class PayDetail < ActiveRecord::Base
	belongs_to :payable, polymorphic: true
end
