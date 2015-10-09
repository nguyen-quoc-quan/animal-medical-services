class Customer < ActiveRecord::Base
	has_many :animal_groups, dependent: :destroy
	has_many :sales, dependent: :destroy
	validates_presence_of :last_name
	validates_presence_of :first_name
	validates_presence_of :phone
	validates_presence_of :address

	def full_name
		"#{self.last_name} #{self.first_name}"
	end
end
