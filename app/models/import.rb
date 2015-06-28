class Import < ActiveRecord::Base
	has_many :import_details, dependent: :destroy
	accepts_nested_attributes_for :import_details, allow_destroy: true
end
