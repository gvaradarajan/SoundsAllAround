class CreatePlaylists < ActiveRecord::Migration
  def change
    create_table :playlists do |t|
      t.integer :user_id, null: false
      t.string :title, null: false
      t.text :description

      t.timestamps null: false
    end

    add_index :user_id, :title
  end
end
