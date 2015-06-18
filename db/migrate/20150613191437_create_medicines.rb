class CreateMedicines < ActiveRecord::Migration
  def change
    create_table :medicines do |t|
      t.string :name
      t.text :description
      t.integer :quantity, default: 0
      t.integer :medicine_specification_id
      t.integer :medicine_category_id

      t.timestamps
    end
  end
end
