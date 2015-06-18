class CreateFoodSpecifications < ActiveRecord::Migration
  def change
    create_table :food_specifications do |t|
      t.float :capacity, default: 0
      t.integer :food_specification_type_id

      t.timestamps
    end
  end
end
