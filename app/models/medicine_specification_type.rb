class MedicineSpecificationType < ActiveRecord::Base
	has_many :medicine_specifications, dependent: :destroy
	validates_presence_of :name
end
