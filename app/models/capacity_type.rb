class CapacityType < ActiveRecord::Base
	has_many :product_specification, dependent: :destroy
	validates_presence_of :name
end
