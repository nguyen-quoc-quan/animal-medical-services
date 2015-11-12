class Food < ActiveRecord::Base
	has_many :sale_details, as: :saleable
	has_many :import_details, as: :importable
	belongs_to :food_category
	belongs_to :food_specification
	validates_presence_of :name, :description, :food_category, :food_specification
end
