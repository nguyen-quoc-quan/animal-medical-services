class Import < ActiveRecord::Base
	has_many :import_details, dependent: :destroy
end
