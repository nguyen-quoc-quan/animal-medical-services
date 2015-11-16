class CreateProductSpecifications < ActiveRecord::Migration
  def change
    create_table :product_specifications do |t|
      t.float :capacity, default: 0
      t.integer :product_specification_type_id

      t.timestamps
    end
  end
end
