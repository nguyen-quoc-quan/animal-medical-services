class CreateImportDetails < ActiveRecord::Migration
  def change
    create_table :import_details do |t|
      t.integer :quantity, default: 0
      t.integer :price, default: 0
      t.integer :product_id
      t.integer :import_id

      t.timestamps
    end
  end
end
