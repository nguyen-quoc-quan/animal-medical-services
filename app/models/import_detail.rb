class ImportDetail < ActiveRecord::Base
	belongs_to :import
	belongs_to  :importable, :polymorphic => true
end
