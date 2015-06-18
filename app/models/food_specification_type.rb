class FoodSpecificationType < ActiveRecord::Base
	has_many :food_specifications, dependent: :destroy
end
