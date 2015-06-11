class CreateImportDetails < ActiveRecord::Migration
  def change
    create_table :import_details do |t|
      t.integer :import_id
      t.integer :product_id
      t.integer :quantity, :default => 0
      t.decimal :import_price,precision: 9, scale: 2, :default => 0

      t.timestamps
    end
  end
end
