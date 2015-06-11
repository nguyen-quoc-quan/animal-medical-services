class Food < ActiveRecord::Base
	has_many :bill_details, as: :billable
	has_many :import_details, as: :importable
	belongs_to :food_category
	belongs_to :food_type
end
