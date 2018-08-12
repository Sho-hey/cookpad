class CreateMyfolders < ActiveRecord::Migration[5.0]
  def change
    create_table :myfolders do |t|
      t.references :user, null: false, foreign_key: true
      t.references :recipe, null: false, foreign_key: true
      t.timestamps
    end
  end
end
