class CreateSales < ActiveRecord::Migration
  def change
    create_table :sales do |t|
      t.date :sale_at
      t.integer :pay, default: 0
      t.integer :owe, default: 0
      t.integer :customer_id

      t.timestamps
    end
  end
end
