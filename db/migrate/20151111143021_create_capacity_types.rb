class CreateCapacityTypes < ActiveRecord::Migration
  def change
    create_table :capacity_types do |t|
      t.string :name
      t.string :sign
      t.timestamps
    end
  end
end
