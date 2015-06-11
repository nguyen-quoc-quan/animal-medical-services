class BillDetail < ActiveRecord::Base
	belongs_to :bill
	belongs_to  :billable, :polymorphic => true
end
