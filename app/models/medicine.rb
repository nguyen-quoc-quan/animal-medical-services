class Medicine < ActiveRecord::Base
	has_many :sale_details, as: :saleable
	has_many :import_details, as: :importable
	belongs_to :medicine_category
	belongs_to :medicine_specification

	validates_presence_of :name, :description, :medicine_category, :medicine_specification
end
