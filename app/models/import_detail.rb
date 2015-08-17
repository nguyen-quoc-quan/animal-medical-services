class ImportDetail < ActiveRecord::Base
	belongs_to :import
	belongs_to :importable, polymorphic: true

	after_create :update_product
	before_destroy :return_product
	validate :check_quantity

	def update_product
		product = self.importable
		product.update_attributes({quantity: product.quantity + self.quantity})
	end

	def return_product
		product = self.importable
		product.update_attributes({quantity: product.quantity - self.quantity})
	end

		def check_quantity
			product = self.importable
			self.errors.add("#{product.name}"," khong duoc nhap 0 san pham") if self.quantity < 1
	end
end
