class CreateMedicineSpecificationTypes < ActiveRecord::Migration
  def change
    create_table :medicine_specification_types do |t|
      t.string :name

      t.timestamps
    end
  end
end
