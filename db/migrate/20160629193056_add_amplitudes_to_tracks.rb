class AddAmplitudesToTracks < ActiveRecord::Migration
  def change
    add_column :tracks, :amplitudes, :integer, array: true
  end
end
