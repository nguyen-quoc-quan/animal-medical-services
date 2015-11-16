class ProductSpecification < ActiveRecord::Base
	has_many :products, dependent: :destroy
	belongs_to :product_specification_type
	belongs_to :capacity_type
	accepts_nested_attributes_for :product_specification_type
	validates_presence_of :capacity, :capacity_type, :product_specification_type
end
