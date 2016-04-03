# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

test_users = User.create!([{username: 'Kirk',
                            email: 'boldlygo@enterprise.io',
                            password: 'shatner'},
                           {username: 'Spock',
                            email: 'LLAP@enterprise.io',
                            password: 'logical'},
                           {username: 'Uhura',
                            email: 'thebest@enterprise.io',
                            password: 'clearly'}])


scotty = User.create!({username: 'Scotty',
                       email: 'beamMeup@enterprise.io',
                       password: 'allshesgot'})

scotty.playlists.create!({title: 'Music of the Highlanders',
                          description: 'The music of my people'})
scotty.playlists.create!({title: 'People Yelling Things'})


spock = test_users[1]
kirk = test_users[0]
uhura = test_users[2]

spock.playlists.create!({title: 'Sounds that Volcanoes Make'})

scotty.playlists.tracks.create!([{title: 'Loch Lomond'},
                                {title: 'Whoa Nessie'}])

kirk.uploaded_tracks.create!([{title: 'Alien Strange'},
                              {title: 'I Shatnered Myself'}])

uhura.uploaded_tracks.create!([{title: 'Zoe Saldana is Overrated'}])
