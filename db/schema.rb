# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20160405182442) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "playlist_tracks", force: :cascade do |t|
    t.integer  "playlist_id", null: false
    t.integer  "track_id",    null: false
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
  end

  add_index "playlist_tracks", ["playlist_id"], name: "index_playlist_tracks_on_playlist_id", using: :btree
  add_index "playlist_tracks", ["track_id"], name: "index_playlist_tracks_on_track_id", using: :btree

  create_table "playlists", force: :cascade do |t|
    t.integer  "user_id",     null: false
    t.string   "title",       null: false
    t.text     "description"
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
  end

  add_index "playlists", ["title"], name: "index_playlists_on_title", using: :btree
  add_index "playlists", ["user_id"], name: "index_playlists_on_user_id", using: :btree

  create_table "tracks", force: :cascade do |t|
    t.string   "title",      null: false
    t.integer  "artist_id",  null: false
    t.integer  "album_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_index "tracks", ["album_id"], name: "index_tracks_on_album_id", using: :btree
  add_index "tracks", ["artist_id"], name: "index_tracks_on_artist_id", using: :btree
  add_index "tracks", ["title"], name: "index_tracks_on_title", using: :btree

  create_table "users", force: :cascade do |t|
    t.string   "username",           null: false
    t.string   "email",              null: false
    t.string   "password_digest",    null: false
    t.string   "session_token",      null: false
    t.datetime "created_at",         null: false
    t.datetime "updated_at",         null: false
    t.string   "image_file_name"
    t.string   "image_content_type"
    t.integer  "image_file_size"
    t.datetime "image_updated_at"
  end

end
