class SaleDetail < ActiveRecord::Base
	belongs_to :sale
	belongs_to :saleable, polymorphic: true

	after_create :update_product
	before_destroy :return_product
	validate :check_quantity

	def update_product
		product = self.saleable
		product.update_attributes({quantity: product.quantity - self.quantity})
	end

	def return_product
		product = self.saleable
		product.update_attributes({quantity: product.quantity + self.quantity})
	end

	def check_quantity
		product = self.saleable
		self.errors.add("#{product.name}","Khong du hang (#{product.quantity})") if product.quantity < 1 || product.quantity < self.quantity
		self.errors.add("#{product.name}"," khong duoc ban 0 san pham") if self.quantity < 1
	end
end
