# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

artists = User.create!([{username: 'Gluestick (feat. Vadim Fainberg)',
                        email: 'vadim@punk.com',
                        password: 'manmythlegend'},
                       {username: 'RhythmAndJews',
                        email: 'rnj@gmail.com',
                        password: 'rhythmandjuice'},
                       {username: 'Beethoven',
                        email: 'notthedog@timemachine.org',
                        password: 'notmozart'},
                       {username: 'Chopin',
                        email: 'chopin@chopin.chopin',
                        password: 'notmozart'},
                       {username: 'Guest',
                        email: 'guest@whatever.nope',
                        password: 'iamtheguest'}])

fans = User.create!([{username: 'Kirk',
                      email: 'boldlygo@enterprise.io',
                      password: 'shatner'},
                     {username: 'Spock',
                      email: 'LLAP@enterprise.io',
                      password: 'logical'},
                     {username: 'Uhura',
                      email: 'thebest@enterprise.io',
                      password: 'clearly'}])

guest = artists[4]

rev = guest.playlists.create!(title: 'Next Level Music')

track = guest.uploaded_tracks.create!(title: 'Plane & Car: The Remix')
audio = "https://s3.amazonaws.com/soundsallaround-pro/seeds/Airplane_Taxi_Long.mp3"
track.audio = audio
track.save!
PlaylistTrack.create!(playlist_id: rev.id, track_id: track.id)

track = guest.uploaded_tracks.create!(title: 'WeeOooo')
audio = "https://s3.amazonaws.com/soundsallaround-pro/seeds/Ambulance_Drive_Siren.mp3"
track.audio = audio
track.save!
PlaylistTrack.create!(playlist_id: rev.id, track_id: track.id)

track = guest.uploaded_tracks.create!(title: 'Bowling For Poop')
audio = "https://s3.amazonaws.com/soundsallaround-pro/seeds/Bowling_pin_set.mp3"
track.audio = audio
track.save!
PlaylistTrack.create!(playlist_id: rev.id, track_id: track.id)

track = guest.uploaded_tracks.create!(title: 'This Music Is Garbage')
audio = "https://s3.amazonaws.com/soundsallaround-pro/seeds/Cans_into_Bag.mp3"
track.audio = audio
track.save!
PlaylistTrack.create!(playlist_id: rev.id, track_id: track.id)

rnj = artists[1]

rnj_pic = "https://s3.amazonaws.com/soundsallaround-pro/seeds/rnj.jpg"
rnj.image = rnj_pic
rnj.save!

cym = rnj.playlists.create!(title: 'Call Your Mother')

track = rnj.uploaded_tracks.create!(title: 'Killing Me Softly')
audio = "https://s3.amazonaws.com/soundsallaround-pro/seeds/Killing_Me_Softly.mp3"
track.audio = audio
track.image = rnj_pic
track.save!
PlaylistTrack.create!(playlist_id: cym.id, track_id: track.id)

track = rnj.uploaded_tracks.create!(title: 'Kmo Gvarim')
audio = "https://s3.amazonaws.com/soundsallaround-pro/seeds/Kmo_Gvarim.mp3"
track.audio = audio
track.image = rnj_pic
track.save!
PlaylistTrack.create!(playlist_id: cym.id, track_id: track.id)

track = rnj.uploaded_tracks.create!(title: "Ahava K'tana")
audio = "https://s3.amazonaws.com/soundsallaround-pro/seeds/Ahava+K%27tana.mp3"
track.audio = audio
track.image = rnj_pic
track.save!
PlaylistTrack.create!(playlist_id: cym.id, track_id: track.id)

track = rnj.uploaded_tracks.create!(title: "Ani V'ata")
audio = "https://s3.amazonaws.com/soundsallaround-pro/seeds/Ani+V%27ata.mp3"
track.audio = audio
track.image = rnj_pic
track.save!
PlaylistTrack.create!(playlist_id: cym.id, track_id: track.id)

track = rnj.uploaded_tracks.create!(title: "Istanbul (Not Constantinople)")
audio = "https://s3.amazonaws.com/soundsallaround-pro/seeds/Istanbul.mp3"
track.audio = audio
track.image = rnj_pic
track.save!
PlaylistTrack.create!(playlist_id: cym.id, track_id: track.id)

track = rnj.uploaded_tracks.create!(title: "Lady Madonna")
audio = "https://s3.amazonaws.com/soundsallaround-pro/seeds/Lady+Madonna.mp3"
track.audio = audio
track.image = rnj_pic
track.save!
PlaylistTrack.create!(playlist_id: cym.id, track_id: track.id)

track = rnj.uploaded_tracks.create!(title: "My Goyim Friends")
audio = "https://s3.amazonaws.com/soundsallaround-pro/seeds/My+Goyim+Friends.mp3"
track.audio = audio
track.image = rnj_pic
track.save!
PlaylistTrack.create!(playlist_id: cym.id, track_id: track.id)

track = rnj.uploaded_tracks.create!(title: "Rov Hasha'ot")
audio = "https://s3.amazonaws.com/soundsallaround-pro/seeds/Rov.mp3"
track.audio = audio
track.image = rnj_pic
track.save!
PlaylistTrack.create!(playlist_id: cym.id, track_id: track.id)

track = rnj.uploaded_tracks.create!(title: "Title of the Song")
audio = "https://s3.amazonaws.com/soundsallaround-pro/seeds/Title+Of+The+Song.mp3"
track.audio = audio
track.image = rnj_pic
track.save!
PlaylistTrack.create!(playlist_id: cym.id, track_id: track.id)

track = rnj.uploaded_tracks.create!(title: "Valerie")
audio = "https://s3.amazonaws.com/soundsallaround-pro/seeds/Valerie.mp3"
track.audio = audio
track.image = rnj_pic
track.save!
PlaylistTrack.create!(playlist_id: cym.id, track_id: track.id)

bee = artists[2]

bee_pic = "https://s3.amazonaws.com/soundsallaround-pro/seeds/beethoven.jpg"
# bee_pic = File.open('app/assets/images/beethoven.jpg')
bee.image = bee_pic
bee.save!

sym = bee.playlists.create!(title: 'My Stuff')

track = bee.uploaded_tracks.create!(title: "9th Symphony Finale")
audio = "https://s3.amazonaws.com/soundsallaround-pro/seeds/9th_Symphony_Finale.mp3"
track.audio = audio
track.image = bee_pic
track.save!
PlaylistTrack.create!(playlist_id: sym.id, track_id: track.id)

track = bee.uploaded_tracks.create!(title: 'Moonlight Sonata')
audio = "https://s3.amazonaws.com/soundsallaround-pro/seeds/Moonlight_Sonata.mp3"
track.audio = audio
track.image = bee_pic;
track.save!
PlaylistTrack.create!(playlist_id: sym.id, track_id: track.id)

track = bee.uploaded_tracks.create!(title: 'Fur Elise')
audio = "https://s3.amazonaws.com/soundsallaround-pro/seeds/Fur_Elise_by_Beethoven.mp3"
track.audio = audio
track.image = bee_pic;
track.save!
PlaylistTrack.create!(playlist_id: sym.id, track_id: track.id)

track = bee.uploaded_tracks.create!(title: 'Symphony No. 5')
audio = "https://s3.amazonaws.com/soundsallaround-pro/seeds/Symphony_No_5_by_Beethoven.mp3"
track.audio = audio
track.image = bee_pic;
track.save!
PlaylistTrack.create!(playlist_id: sym.id, track_id: track.id)

cho = artists[3]

cho_pic = "https://s3.amazonaws.com/soundsallaround-pro/seeds/Chopin.jpg"
# cho_pic = File.open('app/assets/images/Chopin.jpg')
cho.image = cho_pic
cho.save!

sym = cho.playlists.create!(title: 'Chopin')

track = cho.uploaded_tracks.create!(title: "E Minor Prelude")
audio = "https://s3.amazonaws.com/soundsallaround-pro/seeds/E_Minor_Prelude.mp3"
track.audio = audio
track.image = cho_pic;
# audio.close
track.save!
PlaylistTrack.create!(playlist_id: sym.id, track_id: track.id)

track = cho.uploaded_tracks.create!(title: "Funeral March")
audio = "https://s3.amazonaws.com/soundsallaround-pro/seeds/Funeral_March_by_Chopin.mp3"
track.audio = audio
track.image = cho_pic;
# audio.close
track.save!
PlaylistTrack.create!(playlist_id: sym.id, track_id: track.id)
