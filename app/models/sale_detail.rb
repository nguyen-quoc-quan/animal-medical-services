class SaleDetail < ActiveRecord::Base
	belongs_to :sale
	belongs_to :product

	after_create :update_product
	before_destroy :return_product
	validate :check_quantity

	def update_product
		product = self.product
		product.update_attributes({quantity: product.quantity - self.quantity})
	end

	def return_product
		product = self.product
		product.update_attributes({quantity: product.quantity + self.quantity})
	end

	def check_quantity
		product = self.product
		self.errors.add("San pham"," khong duoc trong") and return unless product
		self.errors.add("#{product.name}"," khong duoc ban 0 san pham") and return unless self.quantity and self.quantity >= 1
		self.errors.add("#{product.name}","Khong du hang (#{product.quantity})") if product.quantity < 1 || product.quantity < self.quantity
	end
end
