# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

# test_users = User.create!([{username: 'Kirk',
#                             email: 'boldlygo@enterprise.io',
#                             password: 'shatner'},
#                            {username: 'Spock',
#                             email: 'LLAP@enterprise.io',
#                             password: 'logical'},
#                            {username: 'Uhura',
#                             email: 'thebest@enterprise.io',
#                             password: 'clearly'}])
#
#
# scotty = User.create!({username: 'Scotty',
#                        email: 'beamMeup@enterprise.io',
#                        password: 'allshesgot'})
#
# scotty.playlists.create!({title: 'Music of the Highlanders',
#                           description: 'The music of my people'})
# scotty.playlists.create!({title: 'People Yelling Things'})
#
# scotPlay = scotty.playlists.first
#
# spock = test_users[1]
# kirk = test_users[0]
# uhura = test_users[2]
#
# spock.playlists.create!({title: 'Sounds that Volcanoes Make'})
#
# scotty.uploaded_tracks.create!([{title: 'Loch Lomond'},
#                                 {title: 'Whoa Nessie'}])
#
#
# kirk.uploaded_tracks.create!([{title: 'Alien Strange'},
#                               {title: 'I Shatnered Myself'}])
#
# uhura.uploaded_tracks.create!([{title: 'Zoe Saldana is Overrated'}])
#
# PlaylistTrack.create!(playlist_id: scotty.playlists.first.id,
#   track_id: scotty.uploaded_tracks.first.id)
#
# PlaylistTrack.create!(playlist_id: scotty.playlists.first.id,
#   track_id: scotty.uploaded_tracks.second.id)

artists = User.create!([{username: 'Gluestick (feat. Vadim Fainberg)',
                        email: 'vadim@punk.com',
                        password: 'manmythlegend'},
                       {username: 'RhythmAndJews',
                        email: 'rnj@gmail.com',
                        password: 'rhythmandjuice'},
                       {username: 'Lee Rosevere',
                        email: 'somedude@synth.io',
                        password: 'electro'}])

fans = User.create!([{username: 'Kirk',
                      email: 'boldlygo@enterprise.io',
                      password: 'shatner'},
                     {username: 'Spock',
                      email: 'LLAP@enterprise.io',
                      password: 'logical'},
                     {username: 'Uhura',
                      email: 'thebest@enterprise.io',
                      password: 'clearly'}])

kirk = fans[0]
kirk_pic = File.open('app/assets/images/captain-kirk1.jpg')
kirk.image = kirk_pic
kirk.save!

gluestick = artists[0]
glue_cover = File.open('app/assets/images/gluestick.jpg')
gluestick.image = glue_cover
gluestick.save!

# glue = gluestick.playlists.create!(title: '[gluestick]')
#
# track = gluestick.uploaded_tracks.create!(title: 'Nevereverever')
# audio = File.open('app/assets/seeds/gluestickADollarMakesMeSayYeah_05_Nevereverever.mp3')
# track.audio = audio
# track.image = glue_cover
# audio.close
# track.save!
# PlaylistTrack.create!(playlist_id: glue.id, track_id: track.id)
#
# track = gluestick.uploaded_tracks.create!(title: '641')
# audio = File.open('app/assets/seeds/gluestickADollarMakesMeSayYeah_06_641.mp3')
# track.audio = audio
# track.image = glue_cover
# audio.close
# track.save!
# PlaylistTrack.create!(playlist_id: glue.id, track_id: track.id)
#
# track = gluestick.uploaded_tracks.create!(title: 'False Holds')
# audio = File.open('app/assets/seeds/gluestickADollarMakesMeSayYeah_01_False_Holds.mp3')
# track.audio = audio
# track.image = glue_cover
# audio.close
# track.save!
# PlaylistTrack.create!(playlist_id: glue.id, track_id: track.id)
#
# track = gluestick.uploaded_tracks.create!(title: 'Film Score')
# audio = File.open('app/assets/seeds/gluestickADollarMakesMeSayYeah_02_Film_Score.mp3')
# track.audio = audio
# track.image = glue_cover
# audio.close
# track.save!
# PlaylistTrack.create!(playlist_id: glue.id, track_id: track.id)
#
# track = gluestick.uploaded_tracks.create!(title: 'Rattlesnakes')
# audio = File.open('app/assets/seeds/gluestickADollarMakesMeSayYeah_03_Rattlesnakes.mp3')
# track.audio = audio
# track.image = glue_cover
# audio.close
# track.save!
# PlaylistTrack.create!(playlist_id: glue.id, track_id: track.id)
#
# track = gluestick.uploaded_tracks.create!(title: 'Kidnappings')
# audio = File.open('app/assets/seeds/gluestickADollarMakesMeSayYeah_04_Kidnappings.mp3')
# track.audio = audio
# track.image = glue_cover
# audio.close
# track.save!
# PlaylistTrack.create!(playlist_id: glue.id, track_id: track.id)

glue_cover.close

rnj = artists[1]

cym = rnj.playlists.create!(title: 'Call Your Mother')

track = rnj.uploaded_tracks.create!(title: "Ahava K'tana")
audio = File.open('app/assets/seeds/AhavaKtana.mp3')
track.audio = audio
audio.close
track.save!
PlaylistTrack.create!(playlist_id: cym.id, track_id: track.id)

track = rnj.uploaded_tracks.create!(title: "Ani V'ata")
audio = File.open('app/assets/seeds/AniVata.mp3')
track.audio = audio
audio.close
track.save!
PlaylistTrack.create!(playlist_id: cym.id, track_id: track.id)

track = rnj.uploaded_tracks.create!(title: 'Killing Me Softly')
audio = File.open('app/assets/seeds/Killing_Me_Softly.mp3')
track.audio = audio
audio.close
track.save!
PlaylistTrack.create!(playlist_id: cym.id, track_id: track.id)

track = rnj.uploaded_tracks.create!(title: 'Title of the Song')
audio = File.open('app/assets/seeds/Title_Of_The_Song.mp3')
track.audio = audio
audio.close
track.save!
PlaylistTrack.create!(playlist_id: cym.id, track_id: track.id)

track = rnj.uploaded_tracks.create!(title: 'Lady Madonna')
audio = File.open('app/assets/seeds/Lady_Madonna.mp3')
track.audio = audio
audio.close
track.save!
PlaylistTrack.create!(playlist_id: cym.id, track_id: track.id)

track = rnj.uploaded_tracks.create!(title: 'Kmo Gvarim')
audio = File.open('app/assets/seeds/Kmo_Gvarim.mp3')
track.audio = audio
audio.close
track.save!
PlaylistTrack.create!(playlist_id: cym.id, track_id: track.id)

lee = artists[2]

track = lee.uploaded_tracks.create!(title: "Star Song")
audio = File.open('app/assets/seeds/Lee_RosevereStar_Song.mp3')
track.audio = audio
audio.close
track.save!

track = lee.uploaded_tracks.create!(title: "Telecom")
audio = File.open('app/assets/seeds/Lee_RosevereTelecom.mp3')
track.audio = audio
audio.close
track.save!

track = lee.uploaded_tracks.create!(title: "User Friendly (Future Mix)")
audio = File.open('app/assets/seeds/Lee_RosevereUser_Friendly_future_mix.mp3')
track.audio = audio
audio.close
track.save!
