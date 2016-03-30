class CreateTracks < ActiveRecord::Migration
  def change
    create_table :tracks do |t|
      t.string :title, null: false
      t.integer :artist_id, null: false
      t.integer :album_id


      t.timestamps null: false
    end
    add_index :tracks, :title
    add_index :tracks, :artist_id
    add_index :tracks, :album_id
  end
end
