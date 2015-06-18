class MedicineSpecification < ActiveRecord::Base
	has_many :medicines, dependent: :destroy
	belongs_to :medicine_specification_type
	accepts_nested_attributes_for :medicine_specification_type
end
