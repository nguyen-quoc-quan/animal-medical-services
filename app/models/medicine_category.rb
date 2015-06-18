class MedicineCategory < ActiveRecord::Base
	has_many :medicines, dependent: :destroy
end
