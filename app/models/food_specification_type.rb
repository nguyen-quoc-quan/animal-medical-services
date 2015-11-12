class FoodSpecificationType < ActiveRecord::Base
	has_many :food_specifications, dependent: :destroy
	validates_presence_of :name
end
