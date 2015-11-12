class AddCapapcityTypeToSpecification < ActiveRecord::Migration
  def change
  	add_column :medicine_specifications, :capacity_type_id, :integer
  	add_column :food_specifications, :capacity_type_id, :integer
  end
end
