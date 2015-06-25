class CreateSaleDetails < ActiveRecord::Migration
  def change
    create_table :sale_details do |t|
      t.integer :quantity, default: 0
      t.decimal :price, precision: 9, scale: 2, default: 0
      t.integer :saleable_id
      t.string  :saleable_type
      t.integer :sale_id

      t.timestamps
    end
  end
end