class CreateImportDetails < ActiveRecord::Migration
  def change
    create_table :import_details do |t|
      t.integer :quantity, default: 0
      t.decimal :price, precision: 9, scale: 2, default: 0
      t.integer :importable_id
      t.string  :importable_type
      t.integer :import_id

      t.timestamps
    end
  end
end
