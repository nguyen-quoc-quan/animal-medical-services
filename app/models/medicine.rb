class Medicine < ActiveRecord::Base
	has_many :bill_details, as: :billable
	has_many :import_details, as: :importable
	belongs_to :medicine_category
	belongs_to :medicine_type
end
