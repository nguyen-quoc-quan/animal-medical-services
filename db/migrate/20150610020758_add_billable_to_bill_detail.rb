class AddBillableToBillDetail < ActiveRecord::Migration
  def change
    add_column :bill_details, :billable_id, :integer
    add_column :bill_details, :billable_type, :string
  end
end
