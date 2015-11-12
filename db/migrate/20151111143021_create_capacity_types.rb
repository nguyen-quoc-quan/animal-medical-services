class CreateCapacityTypes < ActiveRecord::Migration
  def change
    create_table :capacity_types do |t|
      t.string :name

      t.timestamps
    end
  end
end
