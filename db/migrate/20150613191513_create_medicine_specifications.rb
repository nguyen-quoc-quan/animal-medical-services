class CreateMedicineSpecifications < ActiveRecord::Migration
  def change
    create_table :medicine_specifications do |t|
      t.float :capacity, default: 0
      t.integer :medicine_specification_type_id

      t.timestamps
    end
  end
end
