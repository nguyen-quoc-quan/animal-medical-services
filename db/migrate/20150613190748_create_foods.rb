class CreateFoods < ActiveRecord::Migration
  def change
    create_table :foods do |t|
      t.string :name
      t.text :description
      t.integer :quantity, default: 0
      t.integer :food_specification_id
      t.integer :food_category_id

      t.timestamps
    end
  end
end
