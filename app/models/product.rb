class Product < ActiveRecord::Base
	belongs_to :product_type
	has_many :sale_details
	has_many :import_details
	belongs_to :product_category
	belongs_to :product_specification

	validates_presence_of :name, :description, :product_category, :product_specification
end
