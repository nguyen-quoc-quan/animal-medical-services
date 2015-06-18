class CreateAnimalGroups < ActiveRecord::Migration
  def change
    create_table :animal_groups do |t|
      t.integer :quantity, default: 0
      t.date :started_at
      t.integer :customer_id

      t.timestamps
    end
  end
end
