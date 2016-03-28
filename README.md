# SoundsAllAround

[Heroku link][heroku] **NB:** This should be a link to your production site

[heroku]: http://www.herokuapp.com

## Minimum Viable Product

SoundsAllAround is a web application inspired by SoundCloud built using Ruby on Rails and React.js.

SoundsAllAround allows users to:

<!-- This is a Markdown checklist. Use it to keep track of your
progress. Put an x between the brackets for a checkmark: [x] -->

- [ ] Create an account
- [ ] Log in / Log out
- [ ] Create, edit, view, and delete playlists of tracks
- [ ] Follow other users
- [ ] Like tracks
- [ ] Upload tracks

## Design Docs
* [View Wireframes][views]
* [React Components][components]
* [Flux Stores][stores]
* [API endpoints][api-endpoints]
* [DB schema][schema]

[views]: ./docs/views.md
[components]: ./docs/components.md
[stores]: ./docs/stores.md
[api-endpoints]: ./docs/api-endpoints.md
[schema]: ./docs/schema.md

## Implementation Timeline

### Phase 1: Backend setup and User Authentication (0.5 days)

**Objective:** Functioning rails project with Authentication

- [ ] create new project
- [ ] create `User` model
- [ ] authentication
- [ ] user signup/signin pages
- [ ] blank landing page after signin

### Phase 2: Playlists and Tracks (Models, API) (2 days)

**Objective:** Playlists can be created, read, edited and destroyed through
the API. Tracks can be added to playlists.

- [ ] create `Playlist` and `Track` model
- [ ] seed the database with a small amount of test data
- [ ] CRUD API for playlists (`NotesController`)
- [ ] jBuilder views for playlists and tracks
- [ ] setup Webpack & Flux scaffold
- [ ] setup `APIUtil` to interact with the API
- [ ] test out API interaction in the console.

### Phase 3: Flux Architecture and Router (2 days)

**Objective:** Playlists can be created, read, edited and destroyed with the
user interface.

- [ ] setup the flux loop with skeleton files
- [ ] setup React Router
- implement each Playlist and Track component, building out the flux loop as needed.
  - [ ] `PlaylistIndex`
  - [ ] `PlaylistIndexItem`
  - [ ] `PlaylistForm`
  - [ ] `AllTrackIndex`
  - [ ] `TrackIndexItem`
  - [ ] `LandscapeTrackItem`
- setup simple belongs_to/has_many association between playlists and tracks for testing purposes


### Phase 4: Basic Styling (0.5 days)

**Objective:** Existing pages (including signup/signin) will look good.

- [ ] create a basic style guide
- [ ] position elements on the page
- [ ] add basic colors & styles

### Phase 5: tracks_of_playlists, follows and likes (1 day)

**Objective:** Playlists have many tracks, tracks can be on many playlists. Users can follow other users, and like tracks. Tracks and playlists can be searched

- [ ] create `follows` and `likes` joins tables and concerns
- [ ] do the same for tracks_of_playlists, replacing previous playlist-track associations
- build out API, Flux loop, and components for:
  - [ ] `follow` and `like` CRUD
  - [ ] `FollowedTracksIndex`
  - [ ] `LikedTrackIndex`
  - [ ] `SearchIndex`
  - [ ] `LandscapeTrackItem` (preliminary, to be finished later)
	- [ ] searching for tracks and playlists
- Use CSS to style new views
- create more seed data

### Phase 6: Sound (1.5 days)

**Objective:** Tracks and Playlists can be played

- [ ] give tracks a sound_url column, to which a `GET` request can be made for playing sound (using Web Audio API, or that's how I hope it works)
- build out API, Flux loop, and components for:
  - [ ] playing a track
  - [ ] playing a playlist


### Phase 7: Advanced Styling (0.5 days)

**objective:** Make more prettier. (Users have profile pictures, tracks have photos and waveform visuals)

- [ ] add photo_url column for track and user
- [ ] use wavesurfer.js to produce waveform visualization
- [ ] Style all of the new elements

### Phase 8: Styling Cleanup and Seeding (1 day)

**objective:** Make the site feel more cohesive and awesome.

- [ ] Get feedback on my UI from others
- [ ] Refactor HTML classes & CSS rules
- [ ] Add modals, transitions, and other styling flourishes.
- [ ] possible animations

### Bonus Features (TBD)
- [ ] Pagination / infinite scroll
- [ ] Users can record sound to upload as tracks
- [ ] Multiple Sessions
- [ ] Implement an algorithm for track suggestions (I have an idea for this).

[phase-one]: ./docs/phases/phase1.md
[phase-two]: ./docs/phases/phase2.md
[phase-three]: ./docs/phases/phase3.md
[phase-four]: ./docs/phases/phase4.md
[phase-five]: ./docs/phases/phase5.md
