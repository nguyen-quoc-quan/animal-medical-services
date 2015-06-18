class CreateSales < ActiveRecord::Migration
  def change
    create_table :sales do |t|
      t.date :sale_at
      t.decimal :pay, precision: 9, scale: 2, default: 0
      t.decimal :owe, precision: 9, scale: 2, default: 0
      t.integer :customer_id

      t.timestamps
    end
  end
end
