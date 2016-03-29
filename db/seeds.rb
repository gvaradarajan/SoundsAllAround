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
