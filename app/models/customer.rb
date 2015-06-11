class Customer < ActiveRecord::Base
	has_many :animal_groups, :inverse_of => :customer, :dependent => :destroy
	has_many :bills, :inverse_of => :customer, :dependent => :destroy
end
