class FoodCategory < ActiveRecord::Base
	has_many :foods, dependent: :destroy
end
