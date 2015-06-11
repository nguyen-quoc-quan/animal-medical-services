class CreateBills < ActiveRecord::Migration
  def change
    create_table :bills do |t|
      t.integer :customer_id
      t.date :sale_date
      t.decimal :pay,precision: 9, scale: 2, :default => 0
      t.decimal :owe,precision: 9, scale: 2, :default => 0

      t.timestamps
    end
  end
end
