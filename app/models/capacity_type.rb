class CapacityType < ActiveRecord::Base
	has_many :medicine_specification, dependent: :destroy
	has_many :food_specification, dependent: :destroy
	validates_presence_of :name
end
