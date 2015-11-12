class FoodSpecification < ActiveRecord::Base
	has_many :foods, dependent: :destroy
	belongs_to :food_specification_type
	belongs_to :capacity_type
	accepts_nested_attributes_for :food_specification_type
	
	validates_presence_of :capacity, :capacity_type, :food_specification_type
end
