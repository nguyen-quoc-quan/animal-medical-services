class CreateImports < ActiveRecord::Migration
  def change
    create_table :imports do |t|
      t.date :import_date

      t.timestamps
    end
  end
end
