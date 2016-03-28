# API Endpoints

## HTML API

### Root

- `GET /` - loads React web app, goes to BeforeSignIn


### Session

- `GET /session/new`
- `POST /session`
- `DELETE /session`

## JSON API

### Users

- `GET /users/new`
- `GET /users/:id`
- `POST /users`
- `PATCH /users`

### FollowedUsers

- `GET /users/:id/followedusers`
- `GET /users/:id/followedusers/:id`
- `POST /users/:id/followedusers`
	- creates a new follow
- `DELETE /users/:id/followedusers/:id`
	- unfollows


### LikedTracks

- `GET /api/users/:id/likedtracks`
  - uses likes table to find tracks
  - accepts pagination params (if I get there)
- `POST /api/users/:id/likedtracks`
	- creates a new like
- `GET /api/users/:id/likedtracks/:id`
- `PATCH /api/users/:id/likedtracks/`
- `DELETE /api/users/:id/likedtracks/:id`

### FollowedTracks

- `GET /api/users/:id/followedtracks`
	- Uses has_many_through association of current user to followed users to followed user's tracks
	- accepts pagination params (if I get there)
- `GET /api/users/:id/followedtracks/:id`


### UploadedTracks

- `GET /api/users/:id/uploadedtracks`
	- accepts pagination params (if I get there)
- `POST /api/users/:id/uploadedtracks`
- `GET /api/users/:id/uploadedtracks/:id`
- `PATCH /api/users/:id/uploadedtracks/`
- `DELETE /api/users/:id/uploadedtracks/:id`


### AllTracks

- `GET /api/tracks`
- Tracks index/search
- accepts pagination params (if I get there)
- `POST /api/tracks`
- `GET /api/tracks/:id`
- `PATCH /api/tracks/:id`
- `DELETE /api/tracks/:id`

### Playlists

- `GET /api/users/:id/playlists`
- `POST /api/users/:id/playlists`
- `GET /api/users/:id/playlists/:id`
- `PATCH /api/users/:id/playlists/:id`
- `DELETE /api/users/:id/playlists/:id`
- `GET /api/users/:id/playlists/:id/tracks`
  - index of all tracks for a playlist
  - accepts pagination params (if I get there)
