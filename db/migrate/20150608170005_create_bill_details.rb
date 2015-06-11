class CreateBillDetails < ActiveRecord::Migration
  def change
    create_table :bill_details do |t|
      t.integer :bill_id
      t.integer :product_id
      t.integer :quantity, :default => 0
      t.decimal :sale_price,precision: 9, scale: 2, :default => 0

      t.timestamps
    end
  end
end
