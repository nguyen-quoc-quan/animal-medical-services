class CreateMedicines < ActiveRecord::Migration
  def change
    create_table :medicines do |t|
      t.string :name
      t.integer :quality
      t.integer :org_price
      t.integer :sale_price

      t.timestamps
    end
  end
end
