class MedicineSpecificationType < ActiveRecord::Base
	has_many :medicine_specifications, dependent: :destroy
end
