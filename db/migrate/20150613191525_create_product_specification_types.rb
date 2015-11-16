class CreateProductSpecificationTypes < ActiveRecord::Migration
  def change
    create_table :product_specification_types do |t|
      t.string :name

      t.timestamps
    end
  end
end
