# API Endpoints

## HTML API

### Root

- `GET /` - loads React web app, goes to BeforeSignIn


### Session

- `GET /session/new`
- `POST /session`
- `DELETE /session`

### Users

- `GET /users/new`
- `GET /users/:id`
- `POST /users`
- `PATCH /users`

## JSON API


### AllTracks

- `GET /api/tracks`
- Tracks index/search
- accepts pagination params (if I get there)
- `POST /api/tracks`
- `GET /api/tracks/:id`
- `PATCH /api/tracks/:id`
- `DELETE /api/tracks/:id`

***** The following are based on the current user *****

### FollowedUsers

- `GET /followedusers`
- `GET /followedusers/:id`
  - links to a user's profile
- `POST /followedusers`
	- creates a new follow
- `DELETE /followedusers/:id`
	- unfollows


### LikedTracks

- `GET /likedtracks`
  - uses likes table to find tracks
  - accepts pagination params (if I get there)
- `POST /likedtracks`
	- creates a new like
- `DELETE /likedtracks/:id`

### FollowedTracks

- `GET /followedtracks`
	- Uses has_many_through association of current user to followed users to followed user's tracks
	- accepts pagination params (if I get there)


### UploadedTracks

- `GET /uploadedtracks`
	- accepts pagination params (if I get there)
- `POST /uploadedtracks`
- `DELETE /uploadedtracks/:id`

### Playlists

- `GET /playlists`
- `POST /playlists`
- `GET /playlists/:id`
- `PATCH /playlists/:id`
- `DELETE /playlists/:id`
- `GET /playlists/:id/tracks`
- index of all tracks for a playlist
- accepts pagination params (if I get there)
