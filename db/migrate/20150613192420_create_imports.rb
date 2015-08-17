class CreateImports < ActiveRecord::Migration
  def change
    create_table :imports do |t|
      t.date :import_at
      t.integer :pay, default: 0
      t.integer :owe, default: 0

      t.timestamps
    end
  end
end
