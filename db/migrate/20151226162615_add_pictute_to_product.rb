class AddPictuteToProduct < ActiveRecord::Migration
  def change
    add_attachment :products, :picture, :string
  end
end
