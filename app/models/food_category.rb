class FoodCategory < ActiveRecord::Base
	has_many :foods, dependent: :destroy
	validates_presence_of :name
end
