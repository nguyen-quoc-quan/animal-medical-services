class AddImportableToImportDetail < ActiveRecord::Migration
  def change
    add_column :import_details, :importable_id, :integer
    add_column :import_details, :importable_type, :string
  end
end
