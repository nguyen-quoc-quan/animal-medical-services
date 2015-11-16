class ProductSpecificationType < ActiveRecord::Base
	has_many :product_specifications, dependent: :destroy
	validates_presence_of :name
end
