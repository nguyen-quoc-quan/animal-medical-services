class AddCapapcityTypeToSpecification < ActiveRecord::Migration
  def change
  	add_column :product_specifications, :capacity_type_id, :integer
  end
end
