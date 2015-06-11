class Import < ActiveRecord::Base
	has_many :import_details, as: :productable
end
