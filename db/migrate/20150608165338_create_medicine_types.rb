class CreateMedicineTypes < ActiveRecord::Migration
  def change
    create_table :medicine_types do |t|
      t.string :name

      t.timestamps
    end
  end
end
