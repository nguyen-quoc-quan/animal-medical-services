class CreatePayDetails < ActiveRecord::Migration
  def change
    create_table :pay_details do |t|
      t.string :payable_type
      t.integer :payable_id
      t.integer :pay, default: 0
      t.date :pay_at

      t.timestamps
    end
  end
end
