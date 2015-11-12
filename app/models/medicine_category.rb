class MedicineCategory < ActiveRecord::Base
	has_many :medicines, dependent: :destroy
	validates_presence_of :name
end
