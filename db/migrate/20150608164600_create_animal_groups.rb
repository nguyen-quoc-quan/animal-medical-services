class CreateAnimalGroups < ActiveRecord::Migration
  def change
    create_table :animal_groups do |t|
      t.integer :customer_id
      t.integer :quantity, default: 0
      t.date :begin_date

      t.timestamps
    end
  end
end
