class CreateImports < ActiveRecord::Migration
  def change
    create_table :imports do |t|
      t.date :import_at
      t.decimal :pay, precision: 9, scale: 2, default: 0
      t.decimal :owe, precision: 9, scale: 2, default: 0

      t.timestamps
    end
  end
end
