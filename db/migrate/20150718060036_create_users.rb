class CreateUsers < ActiveRecord::Migration
  def change
    create_table :users do |t|
      t.string :username
      t.string :password_digest
      t.boolean :status
      t.string :avatar
      t.string :first_name
      t.string :last_name

      t.timestamps
    end
  end
end
