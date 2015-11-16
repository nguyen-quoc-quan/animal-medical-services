class CreateProducts < ActiveRecord::Migration
  def change
    create_table :products do |t|
      t.string :name
      t.text :description
      t.integer :quantity, default: 0
      t.integer :product_specification_id
      t.integer :product_category_id
      t.integer :product_type_id

      t.timestamps
    end
  end
end
